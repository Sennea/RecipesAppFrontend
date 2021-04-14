<template>
  <div class="wrapper">
    <div class="logo" @click="goHome()">
      <h3>🍤 RECIPES APP 🍪</h3>
    </div>
    <div class="info">
      <p @click="goHome()">Home</p>
      <p @click="goToBottom()">About</p>
      <p @click="goToBottom()">Contact us</p>
    </div>
    <div class="account">
      <p v-if="loggedIn" @click="favorites()" class="heart"><HeartFull/></p>
      <p v-if="loggedIn" @click="admin()">Add</p>
      <p v-if="!loggedIn" @click="login()">Login</p>
      <p v-if="!loggedIn" @click="register()">Register</p>
      <p v-if="loggedIn" @click="logout()">Logout</p>
    </div>
  </div>
</template>

<script>
import HeartFull from '../icons/HeartFull'

export default {
  name: "Header",
  components: {
    HeartFull
  },
  data() {
    return {
      loggedIn: false,
    }
  },
  created() {
    this.loggedIn = this.$cookies.isKey("recipes-token")
  },
  methods: {
    favorites() {
      this.$router.push("/favorites");
    },
    logout() {
      this.$cookies.remove("recipes-token");
      this.$router.push("/auth/login");
    },
     admin() {
      this.$router.push("/admin");
    },
    login() {
      this.$router.push("/auth/login");
    },
    register() {
      this.$router.push("/auth/register");
    },
    goHome() {
      this.$router.push("/");
    },
    goToBottom() {
      document.body.scrollBy({ 
      top: document.body.scrollHeight,
      behavior: 'smooth' 
});
    },
  },
};
</script>

<style scoped>
.wrapper {
  min-height: 100px;
  background-color: rgb(45, 115, 182);
  border-bottom-left-radius: 20%;
  border-bottom-right-radius: 20%;
  position: fixed;
  top: 0;
  left: -17px;
  right: 0;
  z-index: 100000;
  display: flex;
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  margin: auto;
}

.heart {
  fill: rgb(253, 226, 255);
}

.heart:hover {
fill: rgb(251, 202, 255)
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
    color: white;
}

.logo {
  display: flex;
  flex-direction: row;
}

.account {
  display: flex;
  flex-direction: row;
}

.info {
  display: flex;
  flex-direction: row;
}
</style>