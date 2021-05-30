<template>
  <div>
    <h2>{{ movie.title }}</h2>
    <p>{{ movie.description }}</p>
    <div class="starHolder">
      <p :class="[movie.avg_rating > 0 ? 'yellow star' : 'star']" />
      <p :class="[movie.avg_rating > 1 ? 'yellow star' : 'star']" />
      <p :class="[movie.avg_rating > 2 ? 'yellow star' : 'star']" />
      <p :class="[movie.avg_rating > 3 ? 'yellow star' : 'star']" />
      <p :class="[movie.avg_rating > 4 ? 'yellow star' : 'star']" />
      ({{ movie.no_of_rating }})
    </div>

    <hr />
    <h3>Rate it!</h3>
    <div class="starHolder">
      <p
        v-for="star in stars"
        :key="star"
        :class="[highlighted >= star ? 'bigStar purple' : 'bigStar']"
        @mouseenter="highlighted = star"
        @mouseleave="highlighted = -1"
        @click="rateClicked(star)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieDetails",
  props: ["movie", "token"],
  data() {
    return {
      stars: [0, 1, 2, 3, 4],
      highlighted: -1,
    };
  },
  methods: {
      rateClicked(rate) {
           fetch(`http://127.0.0.1:8000/api/recipes/${this.movie.id}/rate_movie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({
                stars: rate + 1
            })
        })
        .then(res => res.json())
        .then(() => {
            this.$emit('update')
        })
        .catch(err => console.log(err))
      },
  }
};
</script>

<style scoped>
.starHolder {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 10px;
  margin: 2px;
}
.star {
  height: 10px;
  width: 10px;
  background-color: black;
  margin: 0 2px;
}

.yellow {
  background-color: orange;
}

.bigStar {
  height: 15px;
  width: 15px;
  background-color: black;
  margin: 0 2px;
  cursor: pointer;
}

.purple {
  background-color: blueviolet;
}
</style>