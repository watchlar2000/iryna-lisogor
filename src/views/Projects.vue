<script>
import ProjectsList from "@/components/ProjectsList.vue";
import { useProjectStore } from "@/store/project";
import { mapActions, mapState } from "pinia";

export default {
  name: "ProjectsView",
  components: {
    ProjectsList,
  },
  methods: {
    ...mapActions(useProjectStore, ["getProjectsByCategory"]),
    getProjects() {
      const category = this.$route.name;
      this.getProjectsByCategory(category);
    },
  },
  computed: {
    ...mapState(useProjectStore, ["projectsByCategory"]),
  },
  watch: {
    $route: {
      handler: "getProjects",
      immediate: true,
    },
  },
};
</script>

<template>
  <projects-list :projects="projectsByCategory" />
</template>
