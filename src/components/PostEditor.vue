<template>
  <div v-if="currentTemplate" class="post-editor">
    <input
      v-if="!currentImg"
      class="post-editor__input-file"
      type="file"
      accept="image/*"
      @change="fileChange"
    >
    <div class="post-editor__cropper-container">
      <Cropper
        ref="cropper"
        class="post-editor__cropper"
        :src="currentImg"
        :stencil-props="{
          aspectRatio: 4/5
        }"
        @change="refreshAfterCrop"
      />
      <div ref="cropperRender" class="post-editor__cropper-render">
        <img :src="currentImgCropped" alt="">
        <div class="post-editor__logo">
          <img src="../assets/img/logo.png" alt="logo">
          <p>{{ currentTemplate.features.logo.text }}</p>
        </div>
        <p v-if="currentTemplate.features.text.main" class="post-editor__main-text">{{ mainText }}</p>
      </div>
    </div>
    <div v-if="currentTemplate.features.text.main && currentImg" class="post-editor__custom-text">
      <p>Entre le texte ici</p>
      <input type="text" @change="updateMainText">
    </div>
    <!-- <input
      v-if="!currentImg"
      class="post-editor__input-file"
      type="file"
      accept="image/*"
      @change="fileChange"
    >
    <div class="post-editor__post">
      <div v-if="currentImg" class="post-editor__post__pic" :style="`background-image: url(${currentImg})`">
        
      </div>
    </div> -->
  </div>
  <div v-else>
    <p>Choisissez un template</p>
  </div>
</template>

<script>

// Utils
import templateList from '@/utils/templateList.js';
import toCanvas from 'html2canvas';

// Components
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

export default {
  name: 'PostEditor',

  components: {
    Cropper,
  },

  data() {
    return {
      templateList,
      currentImg: null,
      currentImgCropped: this.currentImg,
      mainText: '',
    };
  },

  computed: {
    currentTemplate() {
      return this.$route.query.template
        ? templateList.find((template) => template.id === Number(this.$route.query.template))
        : null;
    },
  },

  methods: {
    fileChange(event) {
      if (event.target.files[0]) this.currentImg = URL.createObjectURL(event.target.files[0]);
    },
    async crop() {
			const { canvas } = this.$refs.cropper.getResult();
			this.currentImgCropped = await canvas.toDataURL();
		},
    async containerToCanvas(refresh) {
      if (refresh) {
        this.crop();
      }
      let cropperRender = null;
      setTimeout(async () => {
        cropperRender = this.$refs.cropperRender;
        const renderCanvas = await toCanvas(cropperRender);
        this.currentImgCropped = renderCanvas.toDataURL();
      }, 1);
    },
    refreshAfterCrop() {
      this.crop();
      this.containerToCanvas();
    },
    updateMainText(e) {
      this.mainText = e.target.value;
      this.containerToCanvas(true);
    }
  },
}
</script>

<style lang="scss" scoped>
  .post-editor {
    overflow: auto;
    display: flex;
    flex-direction: column;
    padding: 50px;

    &__cropper-container {
      display: flex;
    }

    &__cropper {
      width: 40%;
    }
    
    &__cropper-render {
      position: relative;
      width: 45%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(65, 61, 61);

      img {
        width: 100%;
        height: auto;
      }
    }

    &__custom-text {
      margin-top: 20px;

      input {
        width: 300px;
        margin-bottom: 20px;
      }
    }

    &__main-text {
      position: absolute;
      bottom: 100px;
      left: 0;
      text-align: center;
      width: 100%;
      font-size: 72px;
      font-family: 'Anton', sans-serif;
    }

    &__logo {
      position: absolute;
      top: 10%;
      left: 30px;

      img {
        width: 75px;
      }

      p {
        text-align: center;
        width: 10%;
        font-size: 2rem;
        font-family: 'Anton', sans-serif;
      }
    }

    &__post {
      height: 100%;
      max-height: 100%;

      &__pic {
        width: 600px;
        height: calc(100% - 100px);
        background-repeat: no-repeat;
        background-size: 100%;
        padding: 40px;
        position: relative;
      }
    }
  }
</style>
