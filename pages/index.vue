<template>
  <div class="container">
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
    <div class="col-md-12">
      <div class="text-center" v-if="status !== ''">
        <h3>{{ status }}</h3>
        <div class="progress">
          <div
            class="progress-bar"
            role="progressbar"
            :style="{width: percentage + '%'}"
          >
            {{ percentage }}%
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12 mt-4">
      <div class="row">
        <div class="col-md-12">
          <input
            ref="fileUpload"
            type="file"
            :name="'document'"
            :disabled="isProcessing"
            @change="filesChange($event.target.files);"
            accept="image/*"
            class="input-file form-control"
          />
        </div>
        <div class="col-md-12 mt-4" v-if="result != ''">
          <textarea-autosize
            class="form-control"
            v-model="result"
            :min-height="50"
          />
          <button class="btn btn-danger mt-3" @click="reset">Clear</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import { createWorker, PSM, OEM } from "tesseract.js";
  import TextareaAutosize from "vue-textarea-autosize";

  Vue.use(TextareaAutosize);

  export default {
    data() {
      return {
        isProcessing: false,
        result: "",
        percentage: 0,
        status: ""
      };
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
      }
    }
  };
</script>

<style scope>
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
