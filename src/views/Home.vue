<script>
import ProjectsList from "@/components/ProjectsList.vue";
import { useProjectStore } from "@/stores/project";
import { mapActions, mapState } from "pinia";

export default {
  name: "HomeView",
  components: {
    ProjectsList,
  },
  mounted() {
    if (!this.projects.length) this.getProjects();
  },
  methods: {
    ...mapActions(useProjectStore, ["getProjects"]),
  },
  computed: {
    ...mapState(useProjectStore, ["projects"]),
  },
};
</script>

<template>
  <projects-list :projects="projects" />
</template>