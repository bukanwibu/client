<template>
  <div>
    <Navbar style="margin-bottom: 20px" />
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
 body {
  background-image: url('../static/bg.gif');
  background-size: cover;
  background-repeat: no-repeat;
 }
</style>
