<template>
  <div>
    <Navbar />
    <section class="jumbotron text-center">
      <div class="container">
        <h1>ReadPict</h1>
        <p class="lead text-muted">
          We present an online OCR (Optical Character Recognition) service to
          extract text from image. Upload photo to our image to text converter,
          click on convert and get your text file instantly.
        </p>
      </div>
    </section>
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
  .jumbotron {
    padding-top: 3rem;
    padding-bottom: 3rem;
    margin-bottom: 0;
    background-color: #fff;
  }
  @media (min-width: 768px) {
    .jumbotron {
      padding-top: 6rem;
      padding-bottom: 6rem;
    }
  }

  .jumbotron p:last-child {
    margin-bottom: 0;
  }

  .jumbotron h1 {
    font-weight: 300;
  }

  .jumbotron .container {
    max-width: 40rem;
  }
</style>
