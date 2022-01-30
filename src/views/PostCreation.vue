<template>
  <div class="post-creation">
    <div class="post-creation__card-container">
      <p class="post-creation__card-container__title">Choix du template</p>
      <CardElement
        v-for="template in templateList"
        :key="`template-${template.id}`"
        :name="template.name"
        :picture="template.picture"
        :width="template.width"
        :height="template.height"
        :id="template.id"
        @selectedTemplate="template = $event"
      />
    </div>
    <PostEditor
      class="post-creation__post-editor"
      :template="template"
    />
  </div>
</template>

<script>

// Components
import CardElement from '@/components/CardElement.vue';
import PostEditor from '@/components/PostEditor.vue';
// Utils
import templateList from '@/utils/templateList.js';

export default {
  name: 'PostCreation',

  components: {
    CardElement,
    PostEditor,
  },

  data() {
    return {
      templateList,
      template: {},
    }
  },
}
</script>

<style lang="scss" scoped>
  .post-creation {
    width: 100vw;
    display: flex;
    background-color: #121212;

    &__card-container {
      display: flex;
      flex-direction: column;
      min-width: 350px;
      padding: 10px;
      // Page height - padding + border size
      height: calc(100vh - 22px);
      background-color: rgb(27, 27, 27);
      overflow-y: scroll;

      .card-element {
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      &__title {
        margin-top: 10px;
        margin-bottom: 20px;
      }
    }
    &__post-editor {
      height: calc(100vh - 100px);
      width: 100%;
    }
  }
</style>
