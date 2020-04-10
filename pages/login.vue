<template>
  <div>
    <el-form label-width="120px">
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
        <el-button type="primary" @click="handleSubmit">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        email: "",
        password: ""
      };
    },
    methods: {
      handleSubmit() {
        const BASE_URL = "http://localhost:4000/users/login";

        axios
          .post(BASE_URL, {
            identity: this.email,
            password: this.password
          })
          .then(res => {
            if (res.statusText == "OK") {
              console.log("redirect to /home set mutation");
            }
          })
          .catch(e => console.log(e));
      }
    }
  };
</script>
