<template>
  <div class="container">
    <div class="my-3 p-3 bg-white rounded shadow-sm">
      <h6 class="border-bottom border-gray pb-2 mb-0">Histories</h6>
      <div class="media text-muted pt-3" v-for="history in histories">
        <svg
          class="bd-placeholder-img mr-2 rounded"
          width="32"
          height="32"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
          aria-label="Placeholder: 32x32"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#007bff" />
          <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
        </svg>
        <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
          <strong class="d-block text-gray-dark">@username</strong>
          Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
          tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum
          massa justo sit amet risus.
        </p>
      </div>
      <small class="d-block text-right mt-3">
        <a href="#">All updates</a>
      </small>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        histories: []
      };
    },
    mounted() {
      const ENDPOINT = `${process.env.SERVER_URL}/texts`;
      this.$axios
        .get(ENDPOINT, {
          headers: {
            token: this.$store.state.auth.token
          }
        })
        .then(res => {
          if (res.status == 200) {
            this.histories = res.data;
          }
        })
        .catch(e => console.log(e));
    }
  };
</script>
