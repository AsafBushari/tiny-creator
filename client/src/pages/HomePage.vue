<template>
  <div class="home-page col">
    <div class="form-box col xl-gap">
      <div class="form-box-header col m-gap">
        <h2>Url converter</h2>
        <p class="sub-title">
          Simply and easily convert a full URL to a short URL and vice versa
        </p>
      </div>
      <form @submit.prevent="submit" class="col m-gap">
        <div class="inputs-box col s-gap full-width">
          <img
            @click="toggleMode"
            class="switch-icon-img"
            :src="switchIconPath"
            width="39"
          />
          <div class="form-item col">
            <input
              v-model="url"
              :placeholder="
                currentMode === modes.fullToTiny
                  ? 'Full Url Here..'
                  : 'Tiny Url Here..'
              "
              type="text"
              required
            />
          </div>
          <div
            :class="result && !isError ? 'success' : isError ? 'error' : ''"
            class="result-box"
          >
            <button v-if="result && !isError" class="browse-btn" @click="openUrl">
              {{ browseText }}
              <span><svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg></span>
            </button>
            <p class="sub-title" :title="result">
              {{
                !result && !isError
                  ? currentMode === modes.fullToTiny
                    ? "Your Tiny Url Result Will Be Here.."
                    : "Your Full Url Result Will Be Here.."
                  : result
              }}
            </p>
          </div>
        </div>
        <button type="submit">
          <span v-if="!isLoading"> Submit </span>   
          <span class="fade-element" v-else> {{ loadingText }} </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      switchIconPath: "",
      url: "",
      result: "",
      isError: false,
      isLoading: false,
      loadingText: "Converting..",
      browseText: "Browse",
      currentMode: "",
      modes: {
        fullToTiny: "fullToTiny",
        tinyToFull: "tinyToFull",
      },
    };
  },
  created() {
    this.switchIconPath = require(`@/assets/icons/switch-arrows.svg`);
    this.currentMode = this.modes.fullToTiny;
  },
  methods: {
    async submit() {
      this.isLoading = true;

        if (this.currentMode === this.modes.fullToTiny) {
          try {
            const getFullToTinyRes = await this.$store.dispatch(
              "getFullToTiny",
              {
                url: this.url,
              }
            );
            this.isError = false;
            this.result = getFullToTinyRes.data.tinyUrl;
          } catch (err) {
            this.result = err.response.data;
            this.isError = true;
            console.log(err);
          }
        }

        if (this.currentMode === this.modes.tinyToFull) {
          try {
            const getTinyToFullRes = await this.$store.dispatch(
              "getTinyToFull",
              {
                url: this.url,
              }
            );
            this.isError = false;
            this.result = getTinyToFullRes.data.fullUrl;
          } catch (err) {
            this.result = err.response.data;
            this.isError = true;
            console.log(err);
          }
        }
        this.isLoading = false;

    },
    toggleMode() {
      this.dataReset();

      this.currentMode =
        this.currentMode === this.modes.fullToTiny
          ? this.modes.tinyToFull
          : this.modes.fullToTiny;
    },
    async openUrl() {
      window.open(this.result);
    },
    dataReset() {
      this.browseText = "Browse";
      this.url = this.result = "";
      this.isError = false;
    },
  },
};
</script>
<style scoped lang="scss">

.switch-icon-img {
  border-radius: 50%;
  padding: 5px;
  border: 2px solid $light-blue;
  transition: border 0.2s linear;
  position: absolute;
  right: 20px;
  background-color: white;
  top: calc(39px / 2);
  z-index: 1;
  // transform: translateY(-50%);
  &:hover {
    border: 2px solid $blue;
    transition: border 0.2s linear;
    cursor: pointer;
  }
}
.home-page {
  min-height: 100vh;
  justify-content: center;
  .form-box {
    max-width: 370px;
    border: 1px solid $light-grey;
    border-radius: 20px;
    padding: 25px;
    margin: 0 auto;
    box-shadow: 0px 3px 11px 0px #00000033;
    .form-box-header {
      h2 {
        font-family: "Press Start 2P";
      }
      p {
        font-size: $sub-title-font-size;
      }
    }
    form {
      .inputs-box {
        position: relative;
        .result-box {
          padding: 30px 8px;
          background-color: $light-grey;
          border-radius: 8px;
          position: relative;
          p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
          }
          .browse-btn {
            color: $green;
            position: absolute;
            bottom: 5px;
            right: 5px;
            background-color: unset;
            svg{
              fill: $green;
            }
            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
      }
      text-align: start;
      button[type="submit"] {
        background-color: $blue;
        color: white;
        border-radius: $btn-border-radius;
        padding: 15px;
        &:hover {
          background-color: $deep-blue;
        }
      }
    }
  }
}
.success {
  background-color: $light-green !important;
  border: 2px solid $green;
  p {
    color: $green;
    font-weight: bold;
  }
}
.error {
  background-color: $light-red !important;
  border: 2px solid $red;
  p {
    color: $red;
    font-weight: bold;
  }
}
</style>
