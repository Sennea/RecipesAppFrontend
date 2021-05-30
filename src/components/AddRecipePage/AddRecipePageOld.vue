<template>
  <div class="adminPageWrapper">
    <div>
      <h4>Select what You want to add</h4>
      <div>
        <select class="selectBox" v-model="selectedOption">
          <option>Recipe</option>
          <option>Category</option>
        </select>
      </div>
    </div>
    <div v-if="selectedOption === 'Category'">
      <div class="optionsWrapper">
        <label for="categoryTitle">Provide category name</label>
        <input
          class="input"
          v-model="categoryTitle"
          id="categoryTitle"
          type="text"
        />
      </div>
    </div>

    <div v-if="selectedOption === 'Recipe'">
      <div class="optionsWrapper">
        <div class="fieldWrapper">
          <label for="recipeTitle">Provide recipe title</label>
          <input
            class="input"
            v-model="recipeTitle"
            id="recipeTitle"
            type="text"
          />
        </div>

        <div class="fieldWrapper">
          <label for="recipeDescription">Provide recipe description</label>
          <textarea
            class="input"
            v-model="recipeDescription"
            id="recipeDescription"
            type="text"
          />
        </div>

        <div class="fieldWrapper">
          <label for="recipeImage">Provide recipe image url</label>
          <input
            class="input"
            v-model="recipeImage"
            id="recipeImage"
            type="text"
          />
        </div>

        <div class="sectionWrapper">
          <p>Preparation Time</p>
          <div class="sectionItemsWrapper">
            <div class="fieldWrapper">
              <label for="recipePreparationTime">Time</label>
              <input
                class="input"
                v-model="recipePreparationTime"
                id="recipeImage"
                type="text"
              />
            </div>
            <div class="fieldWrapper">
              <label for="recipePreparationTimeUnit">Unit</label>
              <select
                id="recipePreparationTimeUnit"
                class="selectBoxInner"
                v-model="selectedOption"
              >
                <option
                  v-for="(timeUnit, index) in recipePreparationTimeUnits"
                  :key="index"
                  >{{ timeUnit }}</option
                >
              </select>
            </div>
          </div>
        </div>

        <div class="sectionWrapper">
          <p>Category</p>
          <div class="sectionItemsWrapper">
            <div class="fieldWrapper">
              <label for="recipeCategory">From Existing</label>
              <div
                class="specificOptionInfoWrapper"
                v-for="(recipeCategory, index) in recipeCategories"
                :key="index"
              >
                <div class="specificOptionWrapperWithDelete">
                  <select
                    id="recipeCategory"
                    class="selectBoxInner"
                    v-model="selectedOptionCategory"
                  >
                    <option
                      v-for="(category, index) in availableCategories"
                      :key="index"
                      >{{ category }}</option
                    >
                  </select>
                  <button
                    class="specificOptionDeleteButton"
                    @click="deleteRecipeCategory(index)"
                  >
                    X
                  </button>
                </div>
              </div>
              <button class="addMoreButton" @click="moreRecipeCategories()">
                Add another
              </button>
            </div>
            <div class="fieldWrapper">
              <label for="recipeTitleNew">New</label>
              <div
                class="specificOptionInfoWrapper"
                v-for="(recipeCategory, index) in recipeCategories"
                :key="index"
              >
                <div class="specificOptionWrapperWithDelete">
                  <input
                    @change="upadateRecipeCategory($event, index)"
                    id="recipeTitleNew"
                    type="text"
                    class="multipleInput"
                  />
                  <button
                    class="specificOptionDeleteButton"
                    @click="deleteRecipeCategory(index)"
                  >
                    X
                  </button>
                </div>
              </div>
              <button class="addMoreButton" @click="moreRecipeCategories()">
                Add another
              </button>
            </div>
          </div>
        </div>

        <div class="sectionWrapper">
          <p>Ingredients</p>
          <div class="sectionItemsWrapper">
            <div class="fieldWrapper">
              <label for="recipeIngredient">Provide recipe ingredients</label>
              <div
                class="specificOptionInfoWrapper"
                v-for="(recipeIngredient, index) in recipeIngredients"
                :key="index"
              >
                <div class="specificOptionWrapperWithDelete">
                  <div class="specificOptionWrapper">
                    <label for="recipeIngredientName">Name From Existing</label>
                    <input
                      class="multipleInput"
                      @change="
                        upadateRecipeIngredient($event, index, 'ingredient')
                      "
                      id="recipeIngredientName"
                      type="text"
                    />
                    <label for="recipeIngredientQuantity">Quantity</label>
                    <input
                      class="multipleInput"
                      @change="
                        upadateRecipeIngredient($event, index, 'quantity')
                      "
                      id="recipeIngredientQuantity"
                      type="text"
                    />
                    <label for="recipeIngredientUnit">Unit</label>
                    <select
                      :class="['selectBox', 'selectBoxInner']"
                      @change="upadateRecipeIngredient($event, index, 'unit')"
                      if="recipeIngredientUnit"
                    >
                      <option>g</option>
                      <option>dag</option>
                      <option>kg</option>
                      <option>ml</option>
                      <option>l</option>
                    </select>
                  </div>
                  <button
                    class="specificOptionDeleteButton"
                    @click="deleteRecipeIngredient(index)"
                  >
                    X
                  </button>
                </div>
              </div>
              <button class="addMoreButton" @click="moreRecipeIngredients()">
                Add another
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button v-if="selectedOption" @click="onSubmit()" class="submitButton">
      SUBMIT
    </button>
  </div>
</template>

<script>
export default {
  name: "AddRecipePageOld",
  props: ["title"],
  data() {
    return {
      recipePreparationTimeUnits: ["seconds", "minutes", "hours"],
      recipeLevels: ["novice", "beginner", "expert"],
      selectedOption: "",
      availableCategories: [""],
      recipeIngredients: [{ ingredient: "", quantity: 0, unit: "g" }],
      recipeCategories: [{ name: "" }],
      categoryTitle: "",
      ingredientName: "",
      recipeTitle: "",
      recipeDescription: "",
      recipeImage: "",
      recipeLevel: "",
      recipePreparationTime: "",
      recipePreparationTimeUnit: "",
      recipeSteps: [],
      token: "",
    };
  },
  created() {
    if (!this.$cookies.isKey("recipes-token")) {
      this.$router.push("/auth/login");
      return;
    }
    console.log("TOKEEEEN ", this.$cookies.get("recipes-token"));
    this.token = this.$cookies.get("recipes-token");
  },
  methods: {
    moreRecipeIngredients() {
      this.recipeIngredients.push({ ingredient: "", quantity: 0, unit: "g" });
    },
    deleteRecipeIngredient(index) {
      this.recipeIngredients = this.recipeIngredients.splice(index);
    },
    moreRecipeCategories() {
      this.recipeCategories.push({ name: "" });
    },
    deleteRecipeCategory(index) {
      this.recipeCategories = this.recipeCategories.splice(index);
    },
    upadateRecipeCategory(event, index) {
      this.recipeCategories[index].name = event ? event.target.value : "";
    },
    upadateRecipeIngredient(event, index, field) {
      this.recipeIngredients[index][field] = event ? event.target.value : "";
    },
    postIngredient() {
      fetch(`http://127.0.0.1:8000/api/ingredients/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.ingredientName,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("RES", res);
        })
        .catch((err) => console.log(err));
    },
    postCategory() {
      fetch(`http://127.0.0.1:8000/api/categories/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.categoryTitle,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("RES", res, this.token);
        })
        .catch((err) => console.log(err));
    },
    postRecipe() {
      fetch(`http://127.0.0.1:8000/api/recipes/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.recipeTitle,
          imageUrl: this.recipeImage,
          description: this.recipeDescription,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("RES", res);
        })
        .catch((err) => console.log(err));
    },
    postRecipeCategories() {
      fetch(`http://127.0.0.1:8000/api/recipes/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.categoryTitle,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("RES", res);
        })
        .catch((err) => console.log(err));
    },
    postRecipeIngredients() {
      fetch(`http://127.0.0.1:8000/api/recipes/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.categoryTitle,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("RES", res);
        })
        .catch((err) => console.log(err));
    },
    onSubmit() {
      console.log("", `Bearer ${this.$cookies.get("recipes-token")}`);
      this.token = this.$cookies.get("recipes-token");
      switch (this.selectedOption) {
        case "Ingredient":
          this.postIngredient();
          break;
        case "Category":
          this.postCategory();
          break;
        case "Recipe": {
          this.postRecipe();
          break;
        }
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
.adminPageWrapper {
  height: auto;
  width: 70%;
  margin: auto;
  padding: 90px 10px 40px;
}

.optionsWrapper {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin: 20px auto 0;
}

.specificOptionWrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: baseline;
}

.specificOptionInfoWrapper {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0 10px 10px 10px;
  margin-top: 10px;
}

.specificOptionWrapperWithDelete {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  width: 100%;
}

.selectBox {
  width: 100%;
  background: rgb(130, 162, 192);
  border: 0px;
  border-radius: 10px;
  padding: 5px;
}

.selectBoxInner {
  background: white;
  width: 100%;
  border: 0px;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0 0 5px rgb(0, 20, 15);
}

.input {
  padding: 5px;
  border-radius: 10px;
  margin: 5px 0 20px;
  width: 100%;
  background-color: white;
  border: 0px;
  box-shadow: 0 0 5px rgb(0, 20, 15);
}

.multipleInput {
  padding: 5px;
  border-radius: 10px;
  width: 100%;
  background-color: white;
  border: 0px;
  box-shadow: 0 0 5px rgb(0, 20, 15);
}

.specificOptionDeleteButton {
  border-radius: 10px;
  border: 0px;
  height: 20px;
  background-color: white;
  box-shadow: 0 0 5px rgb(0, 20, 15);
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;
}

.addMoreButton {
  border-radius: 10px;
  width: 100%;
  border: 0px;
  margin: 10px 0 20px;
  padding: 5px;
  background-color: white;
  box-shadow: 0 0 5px rgb(0, 20, 15);
  cursor: pointer;
}

.submitButton {
  border: 0px;
  border-radius: 10px;
  margin-top: 20px;
  width: 100%;
  cursor: pointer;
  background-color: rgb(130, 162, 192);
  box-shadow: 0 0 5px black;
  padding: 5px;
  margin-bottom: 20px;
}

.fieldWrapper {
  background-color: rgb(130, 162, 192);
  width: 100%;
  padding: 20px;
}

.fieldWrapper:nth-of-type(2n + 2) {
  background-color: rgb(161, 178, 194);
}

.ssectionWrapper {
  display: flex;
  flex-direction: column;
}

.sectionItemsWrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
}
</style>
