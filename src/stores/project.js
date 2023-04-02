import ProjectsService from "@/services/ProjectsService";
import { defineStore } from "pinia";

export const useProjectStore = defineStore("project", {
  state: () => ({
    projects: [],
  }),
  getters: {},
  actions: {
    async load() {
      this.projects = await ProjectsService.getProjects();
    },
  },
});
