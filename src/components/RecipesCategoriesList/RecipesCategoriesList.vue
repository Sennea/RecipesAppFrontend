<template>
      <div :key="index" v-for="(value, name, index) in categoriesOfRecipes" class="categoryWrapper">
        <BigSmallGrid @itemClicked="handleItemClick($event)" v-if="index %3 === 0 && value.length > 2" @showAll="showAllClicked($event)" :items="value" :title="name" />
        <RowThreeGrid @itemClicked="handleItemClick($event)" v-if="index %3 === 1 && value.length > 2" @showAll="showAllClicked($event)" :items="value" :title="name"  />
        <FourGrid @itemClicked="handleItemClick($event)" v-if="index %3 === 2 && value.length > 2" @showAll="showAllClicked($event)" :items="value" :title="name" />
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
      this.getMovies();
    } else {
      this.$router.push("/auth/login");
    }
  },
  data() {
    return {
      movies: [],
      selectedMovie: null,
      editedMovie: null,
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
    updateSearchPhrase(event) {
      this.searchPhrase = event && event.target.value;
      console.log("DASNDKNASD", this.searchPhrase);
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
          Authorization: `Token ${this.token}`,
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
      this.getMovies();
    },
    getMovies() {
      fetch("http://127.0.0.1:8000/api/recipes/", {
        method: "GET",
        headers: {
          Authorization: `Token ${this.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          this.movies = res;
          if (this.selectedMovie) {
            this.selectedMovie = this.movies.find(
              (movie) => movie.id === this.selectedMovie.id
            );
          }
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