<template>
  <canvas v-if="currentTemplate" class="post-editor">
    <img :src="require(`../assets/img/${currentTemplate.picture}`)">
  </canvas>
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
    };
  },

  computed: {
    currentTemplate() {
      return this.$route.query.template
        ? templateList.find((template) => template.id === Number(this.$route.query.template))
        : null;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
