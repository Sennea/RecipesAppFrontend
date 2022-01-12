<template>
   <vue-recaptcha  ref="recaptcha"
                  @verify="onCaptchaVerified"
                  @expired="onCaptchaExpired"
                  sitekey="6LcN5NodAAAAAPeEs12v1dzgHlqKFQGzjJ8NJUvW"></vue-recaptcha>
</template>

<script>
import { VueRecaptcha } from "vue-recaptcha";

export default {
  name: "Recaptcha",
   components: {
    'vue-recaptcha': VueRecaptcha
  },
  data() {
    return {
      email: "",
      password: "",
      passwordConfirmation: "",
      status: "",
      sucessfulServerResponse: "",
      serverError: "",
    };
  },

  created() {
    console.log("RECAPTHCA", VueRecaptcha);
  },

  methods: {
    submit: function() {
      this.$refs.recaptcha.execute();
    },
    onCaptchaVerified: function(recaptchaToken) {
      const self = this;
      self.status = "submitting";
      //self.$refs.recaptcha.reset();
      console.log('ON CaPTCHA VERIVIED', recaptchaToken)

      fetch(`http://127.0.0.1:8000/api/auth/recaptcha/`, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
        },
        body: JSON.stringify({
            email: "self.email",
            password: "self.password",
            recaptchaToken: recaptchaToken,
        })
      })
        .then((response) => {
          console.log('RESPONSE ', response);
          if(response.status === 200){
            this.$emit("captchaVerified");
          }
            self.sucessfulServerResponse = response.data.message;
        })
        .catch((err) => {
                console.log('ON CAPTCHA VERIFIED ERROR ', err);
            self.serverError = getErrorMessage(err);
            //helper to get a displayable message to the user
            function getErrorMessage(err) {
              console.log('ON CAPTCHA VERIFIED ERROR - get err message ', err);
              let responseBody;
              responseBody = err.response;
              if (!responseBody) {
                responseBody = err;
              } else {
                responseBody = err.response.data || responseBody;
              }
              return responseBody.message || JSON.stringify(responseBody);
            }
          })
          .then(() => {
            self.status = "";
          })
    },
    onCaptchaExpired: function() {
      console.log('ON CAPTCHA EXPIRED')
      this.$refs.recaptcha.reset();
       this.$emit("captchaReset");
    },
  },
};
</script>


<style scoped>
.wrapper {
}
</style>