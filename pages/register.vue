<template>
  <div class="cotainer">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <Error v-if="isError">
          <template v-slot:header>
            Error
          </template>
          <template v-slot:body>
            <ul>
              <li v-for="e in errors">{{ e }}</li>
            </ul>
          </template>
        </Error>
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
  import Error from "~/components/Error";

  export default {
    components: {
      Error
    },
    data() {
      return {
        name: "",
        email: "",
        password: "",
        errors: [],
        isError: false
      };
    },
    methods: {
      handleSubmit() {
        const ENDPOINT = `${process.env.SERVER_URL}/users/register`;
        this.$axios
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
            this.errors = e.response.data.error;
            setTimeout(() => {
              this.isError = false;
            }, 5000);
          });
      }
    }
  };
</script>
