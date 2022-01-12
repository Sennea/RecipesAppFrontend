<template>
  <div v-if="item.title" class="infoPageWrapper">
    <div class="mainInfo">
      <div class="staticInfoWrapper">
        <h1>{{ item.title }}</h1>
        <div class="statsWrapper">
          <div class="stat">
            <div class="heartsWrapper">
              <div
                v-for="(heartState, index) in hearts"
                :key="index"
                @mouseenter="manageHeartHover(index)"
                @mouseleave="resetHeartHover()"
                @click="ratingClicked(index)"
                :class="['heart', heartState === 1 ? 'heartRed' : 'heartDark']"
              >
                <HeartFull />
              </div>
            </div>
            <p>{{ `${item.avg_rating} / 5` }}</p>
          </div>
          <div class="stat">
            <p>🐹</p>
            <p>
              {{
                item.level[0].toUpperCase() +
                item.level.slice(1, item.level.length)
              }}
            </p>
          </div>
          <div class="stat">
            <p>⌛</p>
            <p>{{ item.preparationTime }}</p>
          </div>
        </div>
      </div>
      <div class="stepsWrapper">
        <h3>Steps....</h3>
        <div class="scrollableSection">
          <div v-for="step in item.steps" :key="`step-${step.order}`" class="step">
            <input
              class="input"
              type="checkbox"
              :id="`step-${step.order}`"
              v-model="checked"
              @click="changeStepStatus(step.order)"
            />
            <label
              :class="['label', step.finished && 'labelShadowed']"
              :for="`step-${step.order}`"
              >{{ step.description }}</label
            >
          </div>

          <div class="commentsWrapper">
            <div
              v-for="comment in item.comments"
              class="singleComment"
              :key="comment.id"
            >
              <p class="autor" v-if="comment.user">
                {{ comment.user.username }}
              </p>
              <p class="comment">
                {{ comment.content }}
              </p>
              <p class="date">{{ comment.dateAdded }}</p>
            </div>
            <textarea
              class="newComment"
              placeholder="Leave a comment...."
              id="comments"
              @change="changeCommentContent($event)"
            />
            <label class="postComment" for="comments" @click="postComment()"
              >Post</label
            >
          </div>
        </div>
      </div>
    </div>
    <div class="additionalInfo">
      <div
        class="imageWrapper"
        :style="{ 'background-image': 'url(' + item.imageUrl + ')' }"
      ></div>
      <h3 class="description">
        {{ item.description }}
      </h3>
      <div class="ingredientsWrapper scrollableSection">
        <div
          class="ingredient"
          v-for="(ingredient) in item.ingredients"
          :key="`ingredient-${ingredient.ingredient}`"
        >
          <input
            class="input"
            type="checkbox"
            :id="`ingredient-${ingredient.ingredient}`"
            @click="changeIngredientStatus(ingredient.ingredient)"
          />
          <label
            :class="['label', ingredient.finished && 'labelCrossed']"
            :for="`ingredient-${ingredient.ingredient}`"
          >
            {{
              ingredients.find(ing => ing.id === ingredient.ingredient).name +
              " " +
              ingredient.quantity +
              " " +
              ingredient.unit
            }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeartFull from "../icons/HeartFull";

export default {
  name: "InfoPage",
  components: { HeartFull },
  created() {
    if (!this.$cookies.isKey("recipes-token")) {
      this.$router.push("/auth/login");
      return;
    }
    this.token = this.$cookies.get("recipes-token");
    this.getRecipe(this.$route.params.id);
    this.recipeId = this.$route.params.id;
    this.fetchAvailableIngredients();
  },
  data() {
    return {
      item: {},
      hearts: new Array(5).fill(0),
      comments: [],
      recipeId: 0,
      userId: 1,
      newCommentContent: "",
      ingredients: [],
    };
  },
  methods: {
        fetchAvailableIngredients() {
      fetch(`http://127.0.0.1:8000/api/ingredients/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          this.ingredients = res;
        })
        .catch((err) => console.log(err));
    },
    manageHeartHover(index) {
      this.hearts = this.hearts.map((h, i) => (i <= index ? 1 : 0));
    },
    changeCommentContent(e) {
      if (e && e.target.value) {
        console.log("fjesifseifkefs", e.target.value);
        this.newCommentContent = e.target.value;
      }
    },
    resetHeartHover() {
      const index = Math.floor(this.item.avg_rating - 1);
      this.hearts = this.hearts.map((h, i) => (i <= index ? 1 : 0));
    },
    changeIngredientStatus(index) {
      const ingredients = this.item.ingredients.map((ing) =>
        ing.ingredient === index ? { ...ing, finished: !ing.finished } : ing
      );
      this.item = {
        ...this.item,
        ingredients,
      };
    },
    changeStepStatus(index) {
      const steps = this.item.steps.map((step) =>
        step.order === index ? { ...step, finished: !step.finished } : step
      );
      this.item = {
        ...this.item,
        steps,
      };
    },
    ratingClicked(index) {
      this.addRating(index+1);
    },
    addRating(amount) {
      fetch(`http://127.0.0.1:8000/api/recipes/${this.recipeId}/rate/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          stars: amount,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          this.manageHeartHover(amount - 1);
          this.item = {
            ...this.item, 
            avg_rating: amount
          }
        })
        .catch((err) => console.log(err));
    },
    postComment() {
      fetch(`http://127.0.0.1:8000/api/recipes/${this.recipeId}/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          content: this.newCommentContent,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          this.newCommentContent = "";
        })
        .catch((err) => console.log(err));
    },

    getRecipe(id) {
      fetch(`http://127.0.0.1:8000/api/recipes/${id}/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log('dWADADW', res);
          this.item = res;
          const rating = Math.floor(res.avg_rating);
          this.manageHeartHover(rating - 1);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.infoPageWrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
  max-height: calc(100vh - 65px);
  width: 100%;
  overflow: hidden;
  padding: 80px 0 0 0;
}

.mainInfo {
  flex-basis: 60%;
  display: flex;
  flex-direction: column;
}

.additionalInfo {
  flex-basis: 40%;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px 20px 20px 60px;
  position: relative;
}

.staticInfoWrapper {
  display: flex;
  flex-direction: column;
  padding: 10px 70px 0px 30px;
}

.statsWrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

p {
  margin: 0;
}

.heart {
  cursor: pointer;
  padding: 2px 2px;
}

.heartRed {
  fill: red;
}

.heartsWrapper {
  display: flex;
}

.imageWrapper {
  border-radius: 50%;
  background: rgb(45, 115, 182);
  width: 200px;
  border: 5px solid rgb(45, 115, 182);
  position: absolute;
  top: 40px;
  left: 0;
  transform: translateX(-50%);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.imageWrapper::before {
  display: block;
  content: "";
  padding-top: 100%;
}

.stat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stepsWrapper {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin-top: 40px;
  background: white;
  height: 100%;
  padding: 0 20px;
  width: 100%;
  border-right: 5px solid rgb(45, 115, 182);
  box-shadow: 10px 10px 10px rgb(45, 115, 182);
  overflow: hidden;
}

.step {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

.description {
  margin-left: 50px;
  justify-content: flex-start;
  display: flex;
  font-size: 12px;
  min-height: 160px;
}

.ingredientsWrapper {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.ingredient {
  display: flex;
  margin-bottom: 10px;
}

.labelCrossed {
  text-decoration: line-through;
}

.labelShadowed {
  color: rgb(161, 178, 194);
}

.input {
  display: flex;
  align-self: baseline;
  -webkit-appearance: none;
  background-color: white;
  border: 3px solid rgb(45, 115, 182);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  padding: 9px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
}

.input:active,
.input:checked:active {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px 1px 3px rgba(0, 0, 0, 0.1);
}

.input:checked {
  background-color: rgb(161, 178, 194);
  border: 3px solid rgb(45, 115, 182);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05),
    inset 15px 10px -12px rgba(255, 255, 255, 0.1);
  color: rgb(14, 62, 107);
}

.input:checked:after {
  content: "\2714";
  font-size: 26px;
  position: absolute;
  top: -13px;
  left: 1px;
  color: rgb(45, 115, 182);
}

.scrollableSection {
  overflow-y: scroll;
  overflow-x: hidden;
  margin-right: -200px;
  padding-right: 200px;
}

.commentsWrapper {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  text-align: left;
}

.singleComment {
  display: flex;
  flex-direction: column;

  border: 1px rgb(161, 178, 194) solid;
  border-radius: 5px;
  margin-top: 10px;
  padding: 20px;
  width: 100%;
}

.autor {
  color: black;
  margin-bottom: 10px;
}

.comment {
  margin-bottom: 10px;
  width: 100%;
}

.newComment {
  margin-top: 10px;
  border: 1px rgb(161, 178, 194) solid;
  border-radius: 5px;
  width: 100%;
}

.postComment {
  padding: 5px;
  border: 1px rgb(161, 178, 194) solid;
  border-radius: 5px;
  font-size: 0.8em;
  width: 40%;
  text-align: center;
  margin: 10px auto 30px;
}

.postComment:hover {
  background: rgb(196, 213, 230);
}

.date {
  color: rgb(161, 178, 194);
  font-size: 0.8em;
}
</style>