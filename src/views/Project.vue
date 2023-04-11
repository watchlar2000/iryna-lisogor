<script>
// import ImageItem from "@/components/ImageItem.vue";
import ImageList from "@/components/ImageList.vue";
import { mapActions } from "pinia";
import { useProjectStore } from "../stores/project";

export default {
  name: "AboutView",
  components: { ImageList },
  data() {
    return {
      projectData: [],
    };
  },
  props: {
    slug: {
      type: String,
    },
  },
  created() {
    this.getProjectData();
  },
  methods: {
    ...mapActions(useProjectStore, ["getProject"]),
    async getProjectData() {
      this.projectData = await this.getProject(this.slug);
    },
  },
};
</script>

<template>
  <div class="image-list" v-if="projectData">
    <ImageList :images="projectData.images || []" />
    <!-- <div v-for="img in projectData.images" :key="img.id">
      <img v-lazyload :data-src="img.url" :alt="img.name" />
    </div> -->
  </div>
</template>

<style lang="scss" scoped></style>
