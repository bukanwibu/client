<template>
  <div class="container">
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

        <div class="card" style="">
          <div class="card-header">Forgot Password</div>
          <div class="card-body">
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
            <button @click="handleSubmit" class="btn btn-primary">
              Submit
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
        email: "",
        errors: [],
        isError: false
      };
    },
    methods: {
      handleSubmit() {
        this.$axios
          .post(`${process.env.SERVER_URL}/users/forgot-password`, {
            email: this.email
          })
          .then(res => {})
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
