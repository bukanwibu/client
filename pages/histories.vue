<template>
  <div class="container">
    <div class="my-3 p-3 bg-white rounded shadow-sm">
      <h4 class="pb-2 mb-0 text-center">
        Histories ({{ histories.length }})
      </h4>
      <div class="border-bottom border-gray mt-5 mb-2"></div>
      <div class="media text-muted pt-3" v-for="(history, i) in histories">
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
          <rect width="100%" height="100%" fill="#674EDE" />
          <text x="50%" y="50%" fill="#674EDE" dy=".3em">32x32</text>
        </svg>
        <p class="media-body pb-3 mb-0 small lh-125">
          <strong class="d-block text-gray-dark"
            >{{ history.createdAt | moment }}</strong
          >
          <small class="d-block text-right mb-3">
            <button class="btn btn-dark" @click="toggle(i)">
              {{ history.isHide ? '🙈 See in detail' : '💥 Collapse' }}
            </button>
            <button class="btn btn-danger ml-1" @click="remove(i)">
              Delete
            </button>
          </small>

          <textarea-autosize
            class="form-control"
            v-model="history.data"
            :min-height="50"
            v-if="history.isHide == false"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";

  export default {
    middleware: "auth",
    data() {
      return {
        histories: []
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      toggle(i) {
        this.histories[i].isHide = !this.histories[i].isHide;
      },
      remove(i) {
        this.$swal({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(result => {
          if (result.value) {
            const id = this.histories[i]._id;
            const ENDPOINT = `${process.env.SERVER_URL}/texts/${id}`;
            this.$axios
              .delete(ENDPOINT, {
                headers: {
                  token: this.$store.state.auth.token
                }
              })
              .then(res => {
                if (res.status == 200) {
                  this.fetchData();
                  this.$swal(
                    "Deleted!",
                    "Your file has been deleted.",
                    "success"
                  );
                }
              })
              .catch(e => console.log(e));
          }
        });
      },
      fetchData() {
        this.histories = [];

        const ENDPOINT = `${process.env.SERVER_URL}/texts`;
        this.$axios
          .get(ENDPOINT, {
            headers: {
              token: this.$store.state.auth.token
            }
          })
          .then(res => {
            if (res.status == 200) {
              res.data.map((row, i) => {
                this.histories.push({
                  index: i,
                  _id: row._id,
                  data: row.data,
                  createdAt: row.createdAt,
                  updatedAt: row.updatedAt,
                  isHide: true
                });
              });
            }
          })
          .catch(e => console.log(e));
      }
    },
    filters: {
      moment: function(date) {
        return moment(date).format("MMMM Do YYYY, h:mm:ss a");
      }
    }
  };
</script>
