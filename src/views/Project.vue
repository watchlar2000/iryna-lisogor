<script>
import { mapActions } from "pinia";
import { useProjectStore } from "../stores/project";

export default {
  name: "AboutView",
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
    this.projectData = this.getProject(this.slug);
  },
  methods: {
    ...mapActions(useProjectStore, ["getProject"]),
  },
};
</script>

<template>
  <div class="image-list" v-if="projectData">
    <div v-for="img in projectData.images" :key="img.id">
      <img :src="img.url" :alt="img.name" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 36px;
  height: min-content;
}
</style>
