<script>
export default {
  name: 'ImageList',
  data() {
    return {
      spaceBetween: 10,
      swiper: null,
    };
  },
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <div class="image-list">
    <div v-for="img in images" :key="img.id">
      <img :src="img.url" :alt="img.name" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.image-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 36px;
  height: min-content;
}

.swiper {
  width: 100%;
}
</style>
