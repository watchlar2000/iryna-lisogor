<script>
import Swiper, { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default {
  name: "ImageList",
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
  mounted() {
    const swiper = new Swiper(this.$refs.swiper, {
      modules: [Navigation, Pagination, Scrollbar],
      autoHeight: true,
      spaceBetween: 100,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    swiper.on("slideChange", function () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  },
};
</script>

<template>
  <div class="image-list">
    <div ref="swiper" class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="img in images" :key="img.id">
          <img :src="img.url" :alt="img.name" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
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
