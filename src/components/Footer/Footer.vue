<template>
  <div class="wrapper">
    <div class="logo" @click="goHome()">
      <h3>🍤 RECIPES APP 🍪</h3>
    </div>
    <div class="info">
      <p>It is a recipe app :)</p>
    </div>
     <div class="info">
      <p>Contact: 666-777-888</p>
    </div>
    <div class="info">
      <p @click="goToTop()">Go to top ^</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    goHome() {
      this.$router.push("/");
    },
    goToTop() {
      document.body.scrollTo({ 
  top: 0,
  behavior: 'smooth' 
});
    },
  },
};
</script>

<style scoped>
.wrapper {
  min-height: 50px;
  background-color: rgb(45, 115, 182);
  display: flex;
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
}

h3 {
  margin: 0 10px;
  cursor: pointer;
}

h3:hover {
    color: white;
}

p {
  margin: 0 10px;
  cursor: pointer;
}

p:hover {
    color: white
}

.logo {
  display: flex;
  flex-direction: row;
}

.info {
  display: flex;
  flex-direction: row;
  border-right: 1px solid black;
  border-left: 1px solid black;
}

</style>