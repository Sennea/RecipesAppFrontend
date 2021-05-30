<template>
<div>
  <button @click="logout()">Logout</button> 
  <div class="layout">
    <div>
      <h3>List of recipes</h3>
      <MovieItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @movie-clicked="movieClicked($event)"
        @movie-delete="movieDelete($event)"
        @movie-edit="movieEdit($event)"
      />
      <button @click="newMovie">New Recipe</button>
    </div>
    <div>
      <h3>Recipe Detail</h3>
      <MovieDetails v-if="selectedMovie" :movie="selectedMovie" :token="token" @update="update()" />
      <MovieEdit v-if="editedMovie" :movie="editedMovie" :token="token" @update="update()"/>
    </div>
  </div>
</div>
</template>


<script>
import MovieItem from "./MovieItem";
import MovieDetails from "./MovieDetails";
import MovieEdit from "./MovieEdit";

export default {
  name: "Movies",
  components: { MovieItem, MovieDetails, MovieEdit },
  data() {
    return {
      movies: [],
      selectedMovie: null,
      editedMovie: null,
      token: ''
    };
  },
  methods: {
    logout() {
      this.$cookies.remove('recipes-token');
      this.$router.push('/auth/login')
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
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
        })
        .then(() => {
           this.movies = this.movies.filter(movie => movie.id !== movieId) 
        })
        .catch(err => console.log(err))
    },
    newMovie() {
        this.selectedMovie = null;
        this.editedMovie = {title: '', description: ''}
    },
    update() {
      this.getMovies();
    },
    getMovies() {
      fetch("http://127.0.0.1:8000/api/recipes/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log('ERRERERE', res);
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
  created() {
    if(this.$cookies.isKey('recipes-token')){
      this.token = this.$cookies.get('recipes-token')
      this.getMovies();
    } else {
      this.$router.push('/auth/login')
    }
  },
};
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>