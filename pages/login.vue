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
          <div class="card-header">Login</div>
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
            <button @click="handleSubmit" class="btn btn-primary">
              Login
            </button>
            <br />
            <br />
            <div style="display: flex; justify-content:center">
              <nuxt-link to="/forgot-password" class="btn btn-link"
                ><span>Forgot password</span></nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import Error from "~/components/Error";

  export default {
    middleware: "guest",
    components: {
      Error
    },
    data() {
      return {
        email: "",
        password: "",
        errors: [],
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
            this.errors = e.response.data.error;
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

<style>
  .card {
    margin-top: 20vh;
    animation: fadein 2s;
    -moz-animation: fadein 2s; /* Firefox */
    -webkit-animation: fadein 2s; /* Safari and Chrome */
    -o-animation: fadein 2s; /* Opera */
  }

  @keyframes fadein {
    from {
      background-color: #6c6ade;
    }
    to {
      background-color: #ffff;
    }
  }
  @-moz-keyframes fadein {
    /* Firefox */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    /* Safari and Chrome */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    /* Opera */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
