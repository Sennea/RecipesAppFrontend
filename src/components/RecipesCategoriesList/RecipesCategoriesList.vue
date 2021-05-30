<template>
      <div :key="index" v-for="(value, name, index) in categoriesOfRecipes" class="categoryWrapper">
        <BigSmallGrid @addToFavourites="handleItemAddToFavourites($event)" @itemClicked="handleItemClick($event)" v-if="index %3 === 0 && value.length > 2" @showAll="showAllClicked($event)" :items="value" :title="name" />
        <RowThreeGrid @addToFavourites="handleItemAddToFavourites($event)" @itemClicked="handleItemClick($event)" v-if="index %3 === 1 && value.length > 2" @showAll="showAllClicked($event)" :items="value" :title="name"  />
        <FourGrid @addToFavourites="handleItemAddToFavourites($event)" @itemClicked="handleItemClick($event)" v-if="index %3 === 2 && value.length > 2" @showAll="showAllClicked($event)" :items="value" :title="name" />
    </div>
</template>


<script>
import BigSmallGrid from "../BigSmallGrid";
import RowThreeGrid from "../RowThreeGrid";
import FourGrid from "../FourGrid";

export default {
  name: "RecipesCategoriesList",
  props: ['categoriesOfRecipes'],
  components: {
    BigSmallGrid,
    RowThreeGrid,
    FourGrid,
  },
  created() {
    if (this.$cookies.isKey("recipes-token")) {
      this.token = this.$cookies.get("recipes-token");
    } else {
      this.$router.push("/auth/login");
    }
  },
  data() {
    return {
      token: "",
      searchPhrase: "",
    };
  },
  methods: {
    logout() {
      this.$cookies.remove("recipes-token");
      this.$router.push("/auth/login");
    },
    handleItemClick(id) {
      this.$router.push(`/recipe/${id}`);
    },
    showAllClicked(title) {
      this.$router.push(`/category/${title}`);
    },
    categoryClicked(title) {
      this.$router.push(`/category/${title}`);
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
  },
  
};
</script>

<style scoped>
    .categoryWrapper {
        margin-top: 40px;
    }
</style>