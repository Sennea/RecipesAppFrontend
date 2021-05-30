<template>
  <div>
    <label for="title">Title</label><br />
    <input id="title" placeholder="title" v-model="localMovie.title" /><br />
    <label for="description">Title</label><br />
    <textarea
      id="description"
      placeholder="description"
      v-model="localMovie.description"
    /><br />
    <buttom @click="saveMovie()">Save recipe</buttom>
  </div>
</template>

<script>
export default {
  name: "MovieEdit",
  props: ["movie", "token"],
  data() {
    return {
      localMovie: { ...this.movie },
    };
  },
  watch: {
    movie: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.localMovie = { ...this.movie };
      }
    },
  },
  methods: {
    saveMovie() {
      if (this.movie.id) {
        fetch(`http://127.0.0.1:8000/api/recipes/${this.movie.id}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`
          },
          body: JSON.stringify({
            title: this.localMovie.title,
            description: this.localMovie.description,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            this.$emit("update");
          })
          .catch((err) => console.log(err));
      } else {
           fetch(`http://127.0.0.1:8000/api/recipes/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`
          },
          body: JSON.stringify({
            title: this.localMovie.title,
            description: this.localMovie.description,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            this.$emit("update");
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style scoped>
</style>