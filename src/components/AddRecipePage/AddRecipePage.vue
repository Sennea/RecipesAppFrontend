<template>
  <div class="addPageWrapper">
    <Input label="Title" type="text" @change="updateRecipeTitle($event)" />
    <Input
      label="Description"
      type="text"
      @change="updateRecipeDescription($event)"
    />
    <Input label="ImageUrl" type="text" @change="updateRecipeImage($event)" />

    <MultipleSelection
      @fieldChanged="updateRecipePreparationTime($event)"
      title="Preparation"
      v-bind:fields="[
        { title: 'Time', input: true },
        { title: 'Unit', select: true, options: availableTimeUnits },
      ]"
    />
    <MultipleSelection
      @fieldChanged="updateRecipeIngredients($event)"
      title="Ingredients"
      v-bind:fields="[
        { title: 'Existing', select: true, options: availableIngredients },
        { title: 'Amout', input: true },
        { title: 'Unit', select: true, options: availableUnits },
        { title: 'More', button: true },
      ]"
      :amount="ingredientsAmount"
    />
    <MultipleSelection
      @fieldChanged="updateRecipeCategories($event)"
      title="Categories"
      v-bind:fields="[
        { title: 'Existing', select: true, options: availableCategories },
        { title: 'More', button: true },
      ]"
      :amount="categoriesAmount"
    />
    <MultipleSelection
      @fieldChanged="updateRecipeSteps($event)"
      title="Steps"
      v-bind:fields="[
        { title: 'Description', textarea: true },
        { title: 'Order', select: true, options: availableRecipeOrder },
        { title: 'More', button: true },
      ]"
      :amount="stepsAmount"
    />
    <button @click="onSubmit()">Post Recipe</button>
  </div>
</template>

<script>
import Input from "../Authorization/Input.vue";
import MultipleSelection from "./MultipleSelection.vue";
export default {
  name: "AddRecipePage",
  components: { Input, MultipleSelection },
  props: ["title"],
  data() {
    return {
      token: "",
      newRecipe: {
        ingredients: [],
        categories: [],
        steps: [],
      },
      categoriesAmount: 1,
      ingredientsAmount: 1,
      stepsAmount: 1,
      newCategory: "",
      availableTimeUnits: ["", "minutes", "hours"],
      availableIngredients: [1, 2, 3, 4, 5, 6],
      availableCategories: [],
      availableRecipeOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      availableUnits: ['', 'pinch', 'teaspoon', 'tablespoon', 'piece', 'kg', 'gram'],
      availableCategoriesWithIds: [],
      availableIngredientsWithIds: [],
      availableUnitsWithIds: {'pinch': 6, 'teaspoon': 5, 'tablespoon': 4, 'piece': 3, 'kg': 2, 'gram': 1},
      recipeToPost: {}
    };
  },
  created() {
    if (!this.$cookies.isKey("recipes-token")) {
      this.$router.push("/auth/login");
      return;
    }
    console.log("TOKEEEEN ", this.$cookies.get("recipes-token"));
    this.token = this.$cookies.get("recipes-token");
    this.fetchAvailableCategories();
    this.fetchAvailableIngredients()
  },
  methods: {
    updateRecipeTitle(event) {
      this.newRecipe = {
        ...this.newRecipe,
        title: event && event.target.value,
      };
      console.log("NDAKNKDAKNSDS", this.newRecipe);
    },
    updateRecipeDescription(event) {
      this.newRecipe = {
        ...this.newRecipe,
        description: event && event.target.value,
      };
      console.log("NDAKNKDAKNSDS", this.newRecipe);
    },
    updateRecipeImage(event) {
      this.newRecipe = {
        ...this.newRecipe,
        imageUrl: event && event.target.value,
      };
      console.log("NDAKNKDAKNSDS", this.newRecipe);
    },

    updateRecipePreparationTime(event) {
      switch (event.title) {
        case "Time": {
          this.newRecipe = {
            ...this.newRecipe,
            preparationTime: event.event,
          };
          break;
        }
        case "Unit": {
          this.newRecipe = {
            ...this.newRecipe,
            preparationTimeUnit: event.event,
          };
          break;
        }
        default:
          break;
      }
      console.log("NDAKNKDAKNSDS", this.newRecipe);
    },
    updateRecipeIngredients(event) {
      console.log('EVEVVEEVE', event)
      switch (event.title) {
        case "Existing": {
          if (
            this.newRecipe.ingredients.length &&
            this.newRecipe.ingredients[event.index]
          ) {
            this.newRecipe.ingredients[event.index].existing = event.event;
          } else {
            this.newRecipe = {
              ...this.newRecipe,
              ingredients: [
                ...(this.newRecipe.ingredients || []),
                {
                  existing: event.event,
                },
              ],
            };
          }
          break;
        }
        case "New": {
          if (
            this.newRecipe.ingredients.length &&
            this.newRecipe.ingredients[event.index]
          ) {
            this.newRecipe.ingredients[event.index].new = event.event;
          } else {
            this.newRecipe = {
              ...this.newRecipe,
              ingredients: [
                ...(this.newRecipe.ingredients || []),
                {
                  new: event.event,
                },
              ],
            };
          }
          break;
        }
        case "Amount": {
          if (
            this.newRecipe.ingredients.length &&
            this.newRecipe.ingredients[event.index]
          ) {
            this.newRecipe.ingredients[event.index].quantity = event.event;
          } else {
            this.newRecipe = {
              ...this.newRecipe,
              ingredients: [
                ...(this.newRecipe.ingredients || []),
                {
                  quantity: event.event,
                },
              ],
            };
          }
          break;
        }
        case "Unit": {
          if (
            this.newRecipe.ingredients.length &&
            this.newRecipe.ingredients[event.index]
          ) {
            console.log('this.availableUnitsWithIds[event.event]', this.availableUnitsWithIds[event.event]);
            console.log('EVENT ', event.event);
            console.log('ALLLLL ', this.availableUnitsWithIds)
            this.newRecipe.ingredients[event.index].unit = this.availableUnitsWithIds[event.event];
          } else {
            this.newRecipe = {
              ...this.newRecipe,
              ingredients: [
                ...(this.newRecipe.ingredients || []),
                {
                  unit: this.availableUnitsWithIds[event.event],
                },
              ],
            };
          }
          break;
        }
        case "More": {
          this.ingredientsAmount = this.ingredientsAmount + 1;
          break;
        }
        default: {
          break;
        }
      }
      console.log('ELOO ', this.newRecipe)
    },
    updateRecipeCategories(event) {
      console.log('EVENT', event)
      switch (event.title) {
        case "Existing": {
          if (
            this.newRecipe.categories.length &&
            this.newRecipe.categories[event.index]
          ) {
            this.newRecipe.categories[event.index].existing = event.event;
          } else {
            this.newRecipe = {
              ...this.newRecipe,
              categories: [
                ...(this.newRecipe.categories || []),
                {
                  existing: event.event,
                },
              ],
            };
          }
          break;
        }
        case "New": {
          if (
            this.newRecipe.categories.length &&
            this.newRecipe.categories[event.index]
          ) {
            this.newRecipe.categories[event.index].new = event.event;
          } else {
            this.newRecipe = {
              ...this.newRecipe,
              categories: [
                ...(this.newRecipe.categories || []),
                {
                  new: event.event,
                },
              ],
            };
          }
          break;
        }
        case "More": {
          this.categoriesAmount = this.categoriesAmount + 1;
          break;
        }
        default: {
          break;
        }
      }
      console.log("NDAKNKDAKNSDS", this.newRecipe);
    },
    updateRecipeSteps(event) {
      switch (event.title) {
        case "Description": {
          if (
            this.newRecipe.steps.length &&
            this.newRecipe.steps[event.index]
          ) {
            this.newRecipe.steps[event.index].existing = event.event;
          } else {
            this.newRecipe = {
              ...this.newRecipe,
              steps: [
                ...(this.newRecipe.steps || []),
                {
                  description: event.event,
                },
              ],
            };
          }
          break;
        }
        case "Order": {
          if (
            this.newRecipe.steps.length &&
            this.newRecipe.steps[event.index]
          ) {
            this.newRecipe.steps[event.index].order = event.event;
          } else {
            this.newRecipe = {
              ...this.newRecipe,
              steps: [
                ...(this.newRecipe.steps || []),
                {
                  order: event.event,
                },
              ],
            };
          }
          break;
        }
        case "More": {
          this.stepsAmount = this.stepsAmount + 1;
          break;
        }
        default: {
          break;
        }
      }
      console.log('DJWADWDa', this.newRecipe)
    },
    postRecipe() {
      console.log('recipeToPost', this.recipeToPost)
      fetch(`http://127.0.0.1:8000/api/recipes/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.recipeToPost),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
    },
    onSubmit() {
      this.token = this.$cookies.get("recipes-token");
                const prepared = {
            title: this.newRecipe.title,
            description: this.newRecipe.description,
            imageUrl: this.newRecipe.imageUrl,
            level: 2,
            preparationTime: this.newRecipe.preparationTime,
            preparationTimeUnit: this.newRecipe.preparationTimeUnit,
            steps: this.newRecipe.steps.map(step => ({
              description: step.description,
              order: step.order
            })),
            categories: [],
            ingredients: []
          }
          this.newRecipe.categories.forEach(category => {
            if(category.existing) {
              prepared.categories.push(this.availableCategoriesWithIds.find(c => c.name === category.existing).id);

            }
          })

          this.newRecipe.ingredients.forEach(ingredient => {
            if(ingredient.existing) {
              const find = this.availableIngredientsWithIds.find(c => c.name === ingredient.existing);
              prepared.ingredients.push({
                ingredient: find.id,
                quantity: 1,
                unit: ingredient.unit
              })
            }
          })

          this.recipeToPost = prepared;
          this.postRecipe();
    },
        fetchAvailableCategories() {
      fetch(`http://127.0.0.1:8000/api/categories/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const allCategories = res.map(r => r.name);
          this.availableCategories = allCategories;
          this.availableCategoriesWithIds = res;
        })
        .catch((err) => console.log(err));
    },

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
          console.log('dASDASDAS', res);
          const alIngredients = res.map(r => r.name);
          this.availableIngredients = alIngredients;
          this.availableIngredientsWithIds = res;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.addPageWrapper {
  margin-top: 150px;
  height: 100%;
}
</style>
