<template>
  <div>
    <Navbar style="margin-bottom: 20px;" />
    <nuxt />
    <Footer/>
  </div>
</template>
<script>
  import Navbar from "@/components/Navbar";
  import Footer from "@/components/Footer";

  export default {
    components: {
      Navbar,
      Footer
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
