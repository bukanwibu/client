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
          <div class="card-header">Reset Password</div>
          <div class="card-body">
            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="New Password"
                v-model="password"
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
        token: "",
        password: "",
        isError: false,
        errors: []
      };
    },
    mounted() {
      this.token = this.$router.currentRoute.params.id;
    },
    methods: {
      handleSubmit() {
        let config = {
          headers: {
            token: this.token
          }
        };

        this.$axios
          .post(
            `${process.env.SERVER_URL}/users/update-password`,
            { password: this.password },
            config
          )
          .then(res => console.log(res))
          .catch(e => console.log(e));
      }
    }
  };
</script>
