<template>
  <div class="cotainer">
    <div class="row justify-content-center">
      <div class="col-md-6">
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
        password: ""
      };
    },
    methods: {
      handleSubmit() {
        const BASE_URL = "http://localhost:4000/users/login";

        axios
          .post(BASE_URL, {
            identity: this.email,
            password: this.password
          })
          .then(res => {
            if (res.statusText == "OK") {
              console.log("redirect to /home set mutation");
            }
          })
          .catch(e => console.log(e));
      }
    }
  };
</script>
