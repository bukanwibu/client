<template>
  <div class="cotainer">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <div class="form-group">
              <label>Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Your name"
                v-model="name"
              />
            </div>
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
              Register
            </button>
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
        name: "",
        email: "",
        password: ""
      };
    },
    methods: {
      handleSubmit() {
        const BASE_URL = "http://localhost:4000/users/register";
        axios
          .post(BASE_URL, {
            name: this.name,
            email: this.email,
            password: this.password
          })
          .then(res => {
            if (res.statusText == "Created") {
              console.log("success and redirect to login or force to home");

              this.name = "";
              this.email = "";
              this.password = "";
            }
          })
          .catch(e => console.log(e));
      }
    }
  };
</script>
