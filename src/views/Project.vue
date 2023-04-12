<script>
import ImageList from "@/components/ImageList.vue";

export default {
  name: "AboutView",
  components: { ImageList },
  props: {
    projectData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div class="image-list" v-if="projectData">
    <ImageList :images="projectData.images || []" />
  </div>
</template>

<style lang="scss" scoped></style>
