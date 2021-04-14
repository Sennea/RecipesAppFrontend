<template>
  <div  class="authWrapper" >
    <Input
      class="authInputWrapper"
      label="Login"
      type="text"
      :error="loginError"
      @change="updateLogin($event)"
    />
    <Input
    class="authInputWrapper"
      label="Password"
      type="password"
      :error="passwordError"
      @change="updatePassword($event)"
    />
    <button class="authButton" @click="login()" v-if="loginMode">Login</button>
    <button class="authButton" @click="register()" v-else>Register</button>
    <h4 class="inputError" :v-if="validationError">{{ validationError }}</h4>

    <p @click="loginMode = !loginMode">
      {{
        !loginMode ? "Login now!" : `Don't have an account yet? Register now!`
      }}
    </p>
  </div>
</template>

<script>
import Input from "./Input.vue";
export default {
  components: { Input },
  name: "Authorization",
  data() {
    return {
      username: "",
      password: "",
      loginMode: true,
      loginError: "",
      passwordError: "",
      validationError: "",
    };
  },
  created() {
    if (this.$cookies.isKey("recipes-token")) {
      this.$router.push("/");
    }
    this.loginMode = this.$route.params.option === 'login';
  },
  methods: {
    updateLogin(event) {
      this.loginError = "";
      this.validationError = "";
      this.username = event && event.target.value;
    },
    updatePassword(event) {
      this.passwordError = "";
      this.validationError = "";
      this.password = event && event.target.value;
    },
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
          this.validationError = "";
          this.loginError = this.username ? "" : "Login is required";
          this.passwordError = this.password ? "" : "Password is required";
          console.log('RES ', res)
          if (res.token) {
            this.$cookies.set("recipes-token", res.token, "12h");
            this.$router.push("/");
          } else {
            this.validationError =
              "Unable to login with this credentials. Try again";
          }
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
    },
  },
};
</script>

<style scoped>
.authWrapper {
  padding: 100px 0 40px;
  height: 100%;
}
p {
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: rgb(0, 20, 15);
  text-decoration: 2px rgb(0, 20, 15) underline;
}
.authButton {
  width: 40%;
   background: white;
  font-size: 12px;
  border-radius: 5px;
  outline: none;
border: none;
  box-shadow: 0 0 10px rgb(0, 20, 15);
  padding: 5px;
  margin: 20px auto;
}
.authButton:hover {
  background-color: white;
  font-weight: bold;
}

.authButton:active {
  outline: none;
border: none;
}

.inputError {
  font-size: 12px;
  font-weight: bold;
  color: rgb(0, 20, 15);
  margin-top: -8px;
}

.authInputWrapper {
  width: 40%;
    margin: 20px auto;

}
</style>