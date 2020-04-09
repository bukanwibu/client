<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">
        <nuxt-link to="/" class="link">Awesome Project</nuxt-link>
      </el-menu-item>
      <el-menu-item index="2">
        <nuxt-link to="/pricing" class="link">Pricing</nuxt-link>
      </el-menu-item>
      <el-menu-item index="3">Login</el-menu-item>
    </el-menu>
    <nuxt />
  </div>
</template>

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
