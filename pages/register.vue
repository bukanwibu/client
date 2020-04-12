<template>
  <div class="cotainer">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="alert alert-danger" role="alert" v-if="isError">
          {{ errorMessage }}
        </div>
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
                min="5"
                required
              />
            </div>
            <div class="form-group">
              <label>E-Mail Address</label>
              <input
                type="email"
                class="form-control"
                placeholder="Your email address"
                v-model="email"
                required
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Your password"
                v-model="password"
                required
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
        password: "",
        errorMessage: "",
        isError: false
      };
    },
    methods: {
      handleSubmit() {
        const ENDPOINT = `${process.env.SERVER_URL}/users/register`;
        axios
          .post(ENDPOINT, {
            name: this.name,
            email: this.email,
            password: this.password
          })
          .then(res => {
            if (res.statusText == "Created") {
              alert("Success, your data has been registered.");
              this.name = "";
              this.email = "";
              this.password = "";
              this.$router.push({ path: "/login" });
            }
          })
          .catch(e => {
            this.isError = true;
            this.errorMessage = "Whops. Look's like something went wrong";
            setTimeout(() => {
              this.isError = false;
            }, 5000);
          });
      }
    }
  };
</script>
