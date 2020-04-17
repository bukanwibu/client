<template>
  <div class="container">
    <section class="jumbotron text-center" id="intro">
      <div class="container">
        <h1>ReadPict</h1>
        <p class="lead">
          We present an online OCR (Optical Character Recognition) service to
          extract text from image. Upload photo to our image to text converter,
          click on convert and get your text file instantly.
        </p>
      </div>
    </section>
    <div class="col-md-12">
      <div class="text-center" v-if="status !== ''">
        <h3>{{ status }}</h3>
        <div class="progress">
          <div
            class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            :style="{width: percentage + '%'}"
          >
            {{ percentage }}%
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12 mt-4" style="display: flex; justify-content: center;">
      <div class="row" style="display: flex; justify-content: center">
        <div class="col-md-12">
          <input
            ref="fileUpload"
            type="file"
            :name="'document'"
            :disabled="isProcessing"
            @change="filesChange($event.target.files);"
            accept="image/*"
            class="input-file form-control"
            style=""
          />
        </div>
        <div class="col-md-12 mt-4 mb-4" v-if="result != ''" style="">
          <textarea-autosize
            class="form-control"
            v-model="result"
            :min-height="50"
            style=""
          />
          <button class="btn btn-danger mt-3 mb-2" @click="reset">Clear</button>
          <button
            class="btn btn-primary mt-3 ml-1"
            @click="save"
            v-if="this.$store.state.auth.isLoggedIn"
          >
            💾 Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from "vuex";
  import { createWorker, PSM, OEM } from "tesseract.js";

  export default {
    middleware: "auth",
    data() {
      return {
        isProcessing: false,
        result: "",
        percentage: 0,
        status: ""
      };
    },
    mounted() {
      console.log(this.$store.state.auth.isLoggedIn);
    },
    methods: {
      filesChange(fileList) {
        if (!fileList.length) return;
        this.recognize(fileList[0]);
      },
      reset() {
        this.$refs.fileUpload.value = "";
        this.status = "";
        this.percentage = 0;
        this.result = "";
      },
      updateProgress(m) {
        let MAX_PERCENTAGE = 1;
        let DECIMAL_COUNT = 0;
        if (m.status === "recognizing text") {
          const result = (m.progress / MAX_PERCENTAGE) * 100;
          this.percentage = result.toFixed(DECIMAL_COUNT);
          this.status = "Recognizing Text...";
        }
        if (
          m.status === "loading tesseract core" ||
          m.status === "initializing api"
        ) {
          this.status = "Initializing API";
        }
      },
      async recognize(file) {
        const worker = createWorker({
          logger: m => this.updateProgress(m)
        });

        const img = file;
        await worker.load();
        await worker.loadLanguage("eng");
        await worker.initialize("eng", OEM.LSTM_ONLY);
        await worker.setParameters({
          tessedit_pageseg_mode: PSM.SINGLE_BLOCK
        });

        const {
          data: { text }
        } = await worker.recognize(img);

        this.result = text;
        this.isProcessing = false;
        this.status = "";
      },
      save() {
        const ENDPOINT = `${process.env.SERVER_URL}/texts`;
        this.$axios
          .post(
            ENDPOINT,
            { data: this.result },
            {
              headers: {
                token: this.$store.state.auth.token
              }
            }
          )
          .then(res => {
            this.$router.push({ path: "/histories" });
          })
          .catch(e => console.log(e));
      }
    }
  };
</script>

<style scope>
  .jumbotron {
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 0;
    background-color: #ffff;
    opacity: 0.7;
  }
  @media (min-width: 768px) {
    .jumbotron {
      padding-top: 3rem;
      padding-bottom: 3rem;
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
