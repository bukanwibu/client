<template>
  <div class="" style="">
    <section class="text-center" id="intro">
      <div class="container">
        <h1>ReadPict</h1>
        <br/>
        <p class="lead">
          We present an online OCR (Optical Character Recognition) <br/>
          service to extract text from image. Upload photo to our image <br/>
          click on convert and get your text file instantly.
        </p>
      </div>
    </section>
    <div class="" style="background-color:#DBD7D7; opacity:0.9; min-height:550px">
      <div style="padding-top:5vh; margin-top:2vh; margin-bottom:3vh">
        <h1 style="text-align: center;">Try it yourself ...</h1>
      </div>
      <div class="container" style="display: flex; flex-direction: column;">
        <div style="margin: 0px auto; display: flex; flex-direction: column;" class="col-md-4">
            <input
              ref="fileUpload"
              type="file"
              :name="'document'"
              :disabled="isProcessing"
              @change="filesChange($event.target.files);"
              accept="image/*"
              class="input-file form-control"
              style="border: none; margin: 5px auto"
            />
            <img style="margin: 5px auto" id="blah" src="https://bajorental.com/wp-content/uploads/2018/05/arrow-down-gif.gif" alt="your image" />
        </div>
        <div style="" class="col-md-12 mt-2">
            <h5 style="text-align: center"> Your result will be shown here... </h5>
            <div class="col-md-12 mt-2 mb-2">
              <div class="text-center" v-if="status !== ''">
                <h4>{{ status }}</h4>
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
            <textarea-autosize
              class="form-control"
              v-model="result"
              :min-height="50"
              style="opacity: 0.7;"
            />
            <div style="bottom: 0">
              <button class="btn btn-danger mt-3" @click="reset">Clear</button>
              <button
                class="btn btn-primary mt-2 ml-1"
                @click="save"
                v-if="this.$store.state.auth.isLoggedIn"
              >
              💾 Save
              </button>
            </div>
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
        var reader = new FileReader();

        reader.onload = function(e) {
          $('#blah')
             .attr('src', e.target.result)
        }

        reader.readAsDataURL(fileList[0])
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
  #intro {
    padding-top: 4rem;
    padding-bottom: 4rem;
    margin-bottom: 0;
    margin-top: 7rem
  }
  @media (min-width: 768px) {
    #intro {
      padding-top: 10rem;
      padding-bottom: 10rem;
    }
  }
  #intro p:last-child {
    margin-bottom: 0;
  }

  #intro h1 {
    font-weight: 300;
  }

  #intro .container {
    max-width: 40rem;
  }

  img{
    max-width:300px;
  }
  input {
    border: none;
    padding:10px;
    background:#ffff;
    opacity: 0.7;
  }
</style>
