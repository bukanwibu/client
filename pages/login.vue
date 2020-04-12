<template>
  <div class="cotainer">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="alert alert-danger" role="alert" v-if="isError">
          {{ errorMessage }}
        </div>
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div class="form-group">
              <label>E-Mail Address</label>
              <input
                type="email"
                class="form-control"
                placeholder="Your email address"
                v-model="email"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Your password"
                v-model="password"
              />
            </div>
            <button @click="handleSubmit" class="btn btn-block btn-primary">
              Login
            </button>
            <nuxt-link to="/forgot-password" class="btn btn-link"
              >Forgot password</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        email: "",
        password: "",
        errorMessage: "",
        isError: false
      };
    },
    methods: {
      handleSubmit() {
        const ENDPOINT = `${process.env.SERVER_URL}/users/login`;
        axios
          .post(ENDPOINT, {
            identity: this.email,
            password: this.password
          })
          .then(res => {
            if (res.statusText == "OK") {
              this.$store.commit("auth/SET_AUTHENTICATE", res.data);
              this.$router.push({ path: "/" });
            }
          })
          .catch(e => {
            this.isError = true;
            this.errorMessage = "Whops. Look's like something went wrong";
            this.identity = "";
            this.password = "";

            setTimeout(() => {
              this.isError = false;
            }, 5000);
          });
      }
    }
  };
</script>
