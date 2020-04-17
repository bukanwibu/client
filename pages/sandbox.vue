      <div class="row" style="display: flex; justify-content: center; flex-direction: row">
        <div class="col-md-8 mb-2">
          <input
            ref="fileUpload"
            type="file"
            :name="'document'"
            :disabled="isProcessing"
            @change="filesChange($event.target.files);"
            accept="image/*"
            class="input-file form-control"
            style="border: none"
          />
        </div>
        <div>
          <img id="blah" src="https://assets.corusent.com/wp-content/uploads/2015/09/slider-transparent-placeholder.png" alt="your image" />
        </div>
        <div class="col-md-12 mt-4 mb-4" v-if="result != ''" style="display: flex; justify-content: center; flex-direction: row">
          <textarea-autosize
            class="form-control"
            v-model="result"
            :min-height="50"
            style="opacity: 0.7;"
          />
          <div style="display: flex; align-content: center; flex-direction: column">
            <button class="btn btn-danger mt-3 mb-2" @click="reset">Clear</button>
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
