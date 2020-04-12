<template>
  <div class="container">
    <div class="col-md-12">
      <div class="text-center" v-if="status !== ''">
        <h3>{{ status }}</h3>
        <div class="progress">
          <div
            class="progress-bar"
            role="progressbar"
            :style="{width: percentage + '%'}"
            :aria-valuenow="percentage"
            :aria-valuemin="0"
            :aria-valuemax="100"
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
      updateProgress(m) {
        let MAX_PERCENTAGE = 1;
        let DECIMAL_COUNT = 0;
        if (m.status === "recognizing text") {
          const result = (m.progress / MAX_PERCENTAGE) * 100;
          this.percentage = result.toFixed(DECIMAL_COUNT);
          this.status = "Recognizing Text";
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
