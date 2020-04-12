<template>
  <div class="container">
    <el-header>Welcome page</el-header>

    <input
      type="file"
      :name="'document'"
      :disabled="isProcessing"
      @change="filesChange($event.target.files);"
      accept="image/*"
      class="input-file"
    />

    <div v-if="status !== ''">
      {{ status }} {{ percentage }}%
    </div>
    <el-input
      type="textarea"
      :autosize="{ minRows: 3}"
      placeholder="Result"
      v-model="result"
      v-if="result != ''"
    />
  </div>
</template>

<script>
  import { createWorker, PSM, OEM } from "tesseract.js";

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
