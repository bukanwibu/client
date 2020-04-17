<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-secondary" style="width: 100%; position:fixed; top: 0; z-index:2">
    <nuxt-link class="navbar-brand" to="/"
      ><img
        src="../static/icon.png"
        width="50"
        height="50"
      />ReadPict</nuxt-link
    >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto"></ul>
      <form class="form-inline my-2 my-lg-0">
        <ul class="navbar-nav mr-auto">
          <template v-if="!isLoggedIn">
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                to="/login"
                :class="{ 'active': this.$route.path === '/login' }"
                >Login</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                to="/register"
                :class="{ 'active': this.$route.path === '/register' }"
                >Register</nuxt-link
              >
            </li>
          </template>
          <template v-else>
            <nuxt-link
              class="nav-link"
              to="/histories"
              :class="{ 'active': this.$route.path === '/histories' }"
              >Histories</nuxt-link
            >
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ this.$store.state.auth.user.email }}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" @click="logout">Logout</a>
              </div>
            </li>
          </template>
        </ul>
      </form>
    </div>
  </nav>
</template>

<script>
  export default {
    computed: {
      isLoggedIn() {
        return this.$store.state.auth.isLoggedIn;
      }
    },
    methods: {
      logout() {
        this.$swal({
          title: "Do you really want to logout?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, logout!"
        }).then(result => {
          if (result.value) {
            this.$store.commit("auth/LOGOUT");
            this.$router.push({ path: "/" });
          }
        });
      }
    }
  };
</script>
