<template>
  <div>
    <label for="username">Username</label><br />
    <input id="username" placeholder="username" v-model="username"/><br />
    <label for="password" >Password</label><br />
    <input
      id="password"
      placeholder="password"
      v-model="password"
      type="password"
    /><br />
    <buttom @click="login()" v-if="loginMode">Login</buttom>
    <buttom @click="register()" v-else>Register</buttom>

    <p @click="loginMode = !loginMode">{{!loginMode ? 'Login now!' : `Don't have an account yet? Register now!`}}</p>
  </div>
</template>


<script>
export default {
    name: "Auth",
    data() {
        return {
            username: '',
            password: '',
            loginMode: true,
        }
    },
    created() {
      if(this.$cookies.isKey('recipes-token')){
        this.$router.push('/')
      }
    },
    methods: {
        login() {
             fetch(`http://127.0.0.1:8000/auth/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            this.$cookies.set('recipes-token', res.token, '12h')
            this.$router.push('/')
          })
          .catch((err) => console.log(err));
        },
        register() {
             fetch(`http://127.0.0.1:8000/api/users/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            this.login();
          })
          .catch((err) => console.log(err));
        }
    }
}
</script>

<style scoped>
  p {
    cursor: pointer;
  }
</style>