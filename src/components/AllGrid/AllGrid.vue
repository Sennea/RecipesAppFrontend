<template>
  <div v-if="items" class="contentWrapper">
    <div class="navWrapper">
      <Navigation
        @categoryClicked="navCategoryClicked($event)"
        :categories="availableCategories"
      />
    </div>
    <div class="appWrapper">
      <div class="topWrapper">
        <Input
          class="searchInput"
          label="Search"
          @change="updateSearchPhrase($event)"
        />
        <div>
          <select @change="filterRecipes($event)">
            <option v-for="(option, index) in options" :key="index">{{
              option
            }}</option>
          </select>
        </div>
      </div>
      <GridHeader :title="title" @clicked="goToHome()" simple="true" />
      <div class="allGridWrapper">
        <div class="firsTwoRowsWrapper">
          <div class="collectionWrapper">
            <div class="bigFirstSlot">
              <RecipeItem
                @addToFavourites="handleItemAddToFavourites(items[0].id)"
                gridStyle="square"
                size="big"
                :item="items[0]"
                @clicked="handleItemClick(items[0].id)"
              />
            </div>
          </div>
          <div class="collectionWrapper">
            <div
              v-for="(item, index) in items.slice(1, 5)"
              :key="index"
              class="smallSlotWrapper"
            >
              <div class="smallSlot">
                <RecipeItem
                  @addToFavourites="handleItemAddToFavourites(item.id)"
                  gridStyle="square"
                  :item="item"
                  @clicked="handleItemClick(item.id)"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-if="items.length > 5" class="collectionWrapper">
          <div
            v-for="(item, index) in items.slice(5, items.length)"
            :key="index"
            class="superSmallSlotWrapper"
          >
            <div class="smallSlot">
              <RecipeItem
                gridStyle="square"
                :item="item"
                @clicked="handleItemClick(item.id)"
              />
            </div>
          </div>
          <div class="superSmallSlotWrapper">
            <div class="smallSlot">
              <RecipeItem gridStyle="square" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GridHeader from "../GridHeader";
import RecipeItem from "../RecipeItem";
import Navigation from "../Navigation";
import Input from "../Authorization/Input";

export default {
  components: { GridHeader, RecipeItem, Navigation, Input },
  name: "FourGrid",
  props: [],
  data() {
    return {
      title: "",
      token: "",
      items: [],
      options: [
        "User Rating Ascending",
        "User Rating Descending",
        "Name Ascending",
        "Name Descending",
        "Date Added Ascending",
        "Date AddedDescending",
      ],
      availableCategories: [],
    };
  },
  created() {
    this.initUpdate();
  },
  methods: {
    initUpdate() {
      if (!this.$cookies.isKey("recipes-token")) {
        this.$router.push("/auth/login");
        return;
      }

      this.token = this.$cookies.get("recipes-token");
      this.title = this.$route.params.name;
      this.getRecipes();
    },

handleItemAddToFavourites(id) {
      console.log('ELOOOOO ', id);
      fetch(`http://127.0.0.1:8000/api/recipes/${id}/favourite/`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            })
              .then((res) => res.json())
              .then((res) => {
                console.log('REEES', res);
              })
              .catch((err) => console.log(err));
          },
    goToHome() {
      this.$router.push("/");
    },
    navCategoryClicked(title) {
      this.$router.push(`/category/${title}`);
      this.initUpdate();
    },
    handleItemClick(id) {
      this.$router.push(`/recipe/${id}`);
    },
    filterRecipes(event) {
      if (!event) return;
      switch (event.target.value) {
        case "User Rating Ascending": {
          this.items = this.items.sort(
            (a, b) => {
              const cond = a.avg_rating < b.avg_rating
                if(cond) {
                  return 1;
                }else {
                  return -1;
                }
              }
          );
          break;
        }
        case "User Rating Descending": {
          this.items = this.items.sort(
            (a, b) => {
              const cond = a.avg_rating < b.avg_rating
                if(cond) {
                  return 1;
                }else {
                  return -1;
                }
              }
          );

          break;
        }
        case "Name Ascending": {
          this.items = this.items.sort(
            (a, b) => {
              const cond = a.title[0].toLowerCase() < b.title[0].toLowerCase()
                if(cond) {
                  return 1;
                }else {
                  return -1;
                }
              }

          );

          break;
        }
        case "Name Descending": {
          this.items = this.items.sort(
            (a, b) => {
              const cond = a.title[0].toLowerCase() < b.title[0].toLowerCase()
                if(cond) {
                  return 1;
                }else {
                  return -1;
                }
              }
          );

          break;
        }
        case "Date Added Ascending": {
          this.items = this.items.sort(
            (a, b) => {
              const cond = a.dateAdded < b.dateAdded
                if(cond) {
                  return 1;
                }else {
                  return -1;
                }
              }
          );

          break;
        }
        case "Date Added Descending": {
          this.items = this.items.sort(
            (a, b) => {
              const cond = a.dateAdded < b.dateAdded
                if(cond) {
                  return 1;
                }else {
                  return -1;
                }
              }
          );
          break;
        }
      }
      console.log("ITEEEMS ", this.items);
    },
    prepareCategory(recipes) {
      let categoriesMap = [];
      let items = [];

      recipes.forEach((r) => {
        r.categories.forEach((rCategory) => {
          if (categoriesMap && !categoriesMap.find((c) => c === rCategory.name))
            categoriesMap.push(rCategory.name);

          if (rCategory.name.toLowerCase() === this.title.toLowerCase()) {
            items.push(r);
          }
        });
      });

      this.availableCategories = categoriesMap;
      this.items = items;
    },
    getRecipes() {
      fetch("http://127.0.0.1:8000/api/recipes/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          this.recipes = res;
          this.prepareCategory(res);
          console.log("danwdnawkdnaw", this.recipes);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.allGridWrapper {
  display: flex;
  flex-direction: column;
}

.firsTwoRowsWrapper {
  display: flex;
  flex-direction: row;
  min-width: 100%;
  height: 100%;
}

.bigFirstSlot {
  margin: 10px;
  flex: 1;
  position: relative;
}

.bigFirstSlot::before {
  display: block;
  content: "";
  padding-top: 100%;
}

.collectionWrapper {
  display: flex;
  flex-direction: row;
  flex-basis: 50%;
  height: 100%;
  flex-wrap: wrap;
}

.smallSlot {
  border-radius: 5px;
  margin: 10px;
  overflow: hidden;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 20px rgb(23, 0, 31);
}

.superSmallSlotWrapper {
  flex-basis: 25%;
}

.smallSlotWrapper {
  flex-basis: 50%;
}

.smallSlot::before {
  display: block;
  content: "";
  padding-bottom: 100%;
}

.contentWrapper {
  display: flex;
  flex-direction: row;
  margin-top: 90px;
  height: 100%;
}

.navWrapper {
  flex-basis: 25%;
  min-width: 25%;
}

.appWrapper {
  flex-basis: 75%;
  min-width: 75%;
}

.topWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 20px 0;
}

.searchInput {
  flex-basis: 70%;
}

.p {
  margin: 0;
}
</style>
