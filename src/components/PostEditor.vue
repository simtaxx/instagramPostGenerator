<template>
  <div v-if="currentTemplate" class="post-editor">
    <input
      v-if="!currentImg"
      class="post-editor__input-file"
      type="file"
      accept="image/*"
      @change="fileChange"
    >
    <input class="post-editor__main-text" type="text" @change="mainText = $event.target.value">
    <div class="post-editor__post">
      <div v-if="currentImg" class="post-editor__post__pic" :style="`background-image: url(${currentImg})`">
        <div class="post-editor__post__logo">
          <img src="../assets/img/logo.png" alt="logo">
          <p>{{ currentTemplate.features.logo.text }}</p>
        </div>
        <p v-if="currentTemplate.features.text.main" class="post-editor__post__main-text">{{ mainText }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Choisissez un template</p>
  </div>
</template>

<script>

// Utils
import templateList from '@/utils/templateList.js';

export default {
  name: 'PostEditor',

  props: {
  },

  data() {
    return {
      templateList,
      currentImg: null,
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
  },
}
</script>

<style lang="scss" scoped>
  .post-editor {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 50px;

    &__main-text {
      
      width: 300px;
      margin-bottom: 20px;
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

      &__logo {

        img {
          width: 100px;
        }

        p {
          text-align: center;
          width: 10%;
        }
      }

      &__main-text {
        position: absolute;
        bottom: 100px;
        left: 0;
        text-align: center;
        width: 100%;
        font-size: 45px;
      }
    }
  }
</style>
