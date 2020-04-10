<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="Name">
        <el-input placeholder="Please input" v-model="name" type="text" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input placeholder="Please input" v-model="email" type="email" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          placeholder="Please input password"
          v-model="password"
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">Register</el-button>
      </el-form-item>
    </el-form>
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
