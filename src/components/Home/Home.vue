<template>
  <div class="contentWrapper">
    <div class="navWrapper">
      <Navigation @categoryClicked="categoryClicked($event)" :categories="availableCategories" />
    </div>
    <div class="appWrapper">
      <div class="topWrapper">
        <Input class="searchInput" label="Search" @change="updateSearchPhrase($event)" />
      </div>
      <SearchResultsGrid @showAll="showAllClicked($event)" v-if="searchRecipes.length" :items="searchRecipes" />
      <RecipesCategoriesList :categoriesOfRecipes="categoriesOfRecipes"  />
    </div>
  </div>
</template>


<script>
import Navigation from "../Navigation";
import SearchResultsGrid from "../SearchResultsGrid";
import Input from "../Authorization/Input";
import RecipesCategoriesList from "../RecipesCategoriesList";

export default {
  name: "Home",
  components: {
    Navigation,
    SearchResultsGrid,
    Input,
    RecipesCategoriesList
  },
  data() {
    return {
      categoriesOfRecipes: {},
      availableCategories: [],
      selectedMovie: null,
      editedMovie: null,
      token: "",
      recipes: [],
      searchRecipes: [],
      userFavourites: []
    };
  },
  methods: {
    showAllClicked(title) {
      this.$router.push(`/category/${title}`);
    },
    categoryClicked(title) {
      this.$router.push(`/category/${title}`);
    },
    updateSearchPhrase(event){
      const searchPhrase = event && event.target.value;
      const searchRecipes = [];
      const regex = new RegExp(searchPhrase,'gi')
      this.recipes.forEach(r=> { 
        if(r.title.match(regex))
        { 
          searchRecipes.push(r)
        }
      })

      console.log('JOJOJO', searchRecipes)

      this.searchRecipes = searchRecipes;
    },
    movieClicked(movieId) {
      this.editedMovie = null;
      this.selectedMovie = this.movies.find((movie) => movie.id === movieId);
    },
    movieEdit(movieId) {
      this.selectedMovie = null;
      this.editedMovie = this.movies.find((movie) => movie.id === movieId);
    },
    movieDelete(movieId) {
      fetch(`http://127.0.0.1:8000/api/recipes/${movieId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then(() => {
          this.movies = this.movies.filter((movie) => movie.id !== movieId);
        })
        .catch((err) => console.log(err));
    },
    newMovie() {
      this.selectedMovie = null;
      this.editedMovie = { title: "", description: "" };
    },
    update() {
      this.getRecipes();
    },
    prepareCategories(recipes) {
      let categoriesMap = [];
      let availableCategories= {};
      recipes.forEach(r => {
        r.categories.forEach(rCategory => {
          if(categoriesMap && !categoriesMap.find(c => c === rCategory.name))
            categoriesMap.push(rCategory.name);

          availableCategories = {
            ...availableCategories,
            [rCategory.name]: [...(availableCategories[rCategory.name] || []),r] 
          }
        })})

        this.availableCategories = categoriesMap;
        this.categoriesOfRecipes = availableCategories;
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
          console.log('RES', res)
          this.prepareCategories(res);
        })
        .catch((err) => console.log(err));
    },
   
  },
    created() {
    if(!this.$cookies.isKey("recipes-token")){
      this.$router.push("/auth/login");
      return;
    }
    this.token = this.$cookies.get("recipes-token");
    this.getRecipes();
  },
  
};
</script>

<style scoped>
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
  flex-basis: 100%
}

.p {
  margin: 0;
}
</style>