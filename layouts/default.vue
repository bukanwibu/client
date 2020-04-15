<template>
  <div style="background-color:#ffff; ">
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

</style>
