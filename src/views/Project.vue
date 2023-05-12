<script>
import ImageList from "@/components/ImageList.vue";
import { useProjectStore } from "@/stores/project";
import { mapActions, mapState } from "pinia";

export default {
  name: "AboutView",
  components: {
    ImageList,
  },
  props: {
    slug: {
      type: String,
    },
  },
  mounted() {
    this.getProjectBySlug(this.slug);
  },
  methods: {
    ...mapActions(useProjectStore, ["getProjectBySlug"]),
  },
  computed: {
    ...mapState(useProjectStore, ["currentProject"]),
  },
};
</script>

<template>
  <div v-if="currentProject !== null">
    <image-list :images="currentProject?.images" />
  </div>
</template>
