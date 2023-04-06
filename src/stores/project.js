import ProjectsService from "@/services/ProjectsService";
import { defineStore } from "pinia";

export const useProjectStore = defineStore("project", {
  state: () => ({
    projects: [],
  }),
  getters: {},
  actions: {
    async load() {
      const projectsData = await ProjectsService.getProjects();
      this.projects = projectsData.sort(
        (a, b) => b.date.seconds - a.date.seconds
      );
    },
    async getProject(slug) {
      if (this.projects.length === 0) {
        await this.load();
      }
      return this.projects.find((p) => p.slug === slug);
    },
  },
});
