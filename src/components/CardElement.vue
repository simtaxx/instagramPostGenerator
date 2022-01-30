<template>
  <div
    class="card-element"
    :style="isHover ? 'z-index: 1;' : ''"
    @click="updateRouteTemplate"
  >
    <img
      class="card-element__picture"
      :src="require(`../assets/img/${picture}`)"
      :alt="picture"
      @mouseover="isHover = true"
    >
    <p>{{ name }}</p>
    <!-- Hidden -->
    <img
      :class="{ 'card-element__zoom-picture': isHover }"
      :style="zoomedPictureStyle"
      :src="require(`../assets/img/${picture}`)"
      :alt="picture"
     @mouseleave="isHover = false"
    >
  </div>
</template>

<script>
export default {
  name: 'CardElement',

  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      isHover: false,
    };
  },

  computed: {
    zoomedPictureStyle() {
      return this.isHover
        ? `width: ${this.width}px; height: ${this.height}px`
        : 'opacity: 0; width: 0; height: 0;';
    },
  },

  methods: {
    updateRouteTemplate() {
      if (Number(this.$route.query.template) !== this.id) {
        this.$router.push({ query: { template: this.id } })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .card-element {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100px;
    cursor: pointer;
    border-radius: 5px;
    background-color: rgba(233, 233, 233, 0.3);
    transition: transform 0.2s;

    &__picture {
      max-width: 100px;
      margin-right: 20px;
    }

    &__zoom-picture {
      position: absolute;
      top: 0;
      left: 0;
      background-image: url('../assets/img/example.png');
      opacity: 1;
      transition: opacity 0.2s;
    }

    &:hover {
      transform: scale(1.02);
    }
  }
</style>
