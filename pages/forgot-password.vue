<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="Email">
        <el-input placeholder="Please input" v-model="email" type="email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit"
          >Reset Password</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        email: ""
      };
    },
    methods: {
      handleSubmit() {
        const BASE_URL = "http://localhost:4000/users/forgot-password";

        axios
          .post(BASE_URL, {
            email: this.email
          })
          .then(res => {
            console.log(res);
          })
          .catch(e => console.log(e));
      }
    }
  };
</script>
