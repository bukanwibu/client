<template>
  <el-container>
    <el-header>Welcome page</el-header>
    <input
      type="file"
      :name="'document'"
      :disabled="isProcessing"
      @change="filesChange($event.target.files);"
      accept="image/*"
      class="input-file"
    />

    <textarea v-model="result" />
    {{ percentage }}%
  </el-container>
</template>

<script>
  import { createWorker, PSM, OEM } from "tesseract.js";

  export default {
    data() {
      return {
        isProcessing: false,
        result: "",
        percentage: "0"
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
      }
    }
  };
</script>

<style></style>
