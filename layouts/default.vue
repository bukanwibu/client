<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">
        <nuxt-link to="/" class="link">Awesome Project</nuxt-link>
      </el-menu-item>
      <el-menu-item index="2">
        <nuxt-link to="/pricing" class="link">Pricing</nuxt-link>
      </el-menu-item>
      <el-menu-item index="3">
        <nuxt-link to="/login" class="link">Login</nuxt-link>
      </el-menu-item>
    </el-menu>
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar";

  export default {
    components: {
      Navbar
    }
  };
</script>

<style>
  html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  .link {
    text-decoration: none;
  }
</style>
