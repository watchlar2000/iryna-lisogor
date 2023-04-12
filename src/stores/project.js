import ProjectsService from "@/services/ProjectsService";
import { defineStore } from "pinia";

export const useProjectStore = defineStore("project", {
  state: () => ({
    projects: [],
    error: null,
  }),
  getters: {},
  actions: {
    async load() {
      try {
        const projectsData = await ProjectsService.getProjects();

        if (projectsData === undefined) throw new Error("404");

        const sortedProjectsData = projectsData.sort(
          (a, b) => b.date.seconds - a.date.seconds
        );

        this.projects = sortedProjectsData;

        return sortedProjectsData;
      } catch (e) {
        this.error = e.message;
      }
    },
    async getProject(slug) {
      if (this.projects.length === 0) {
        await this.load();
      }
      return this.projects.find((p) => p.slug === slug);
    },
  },
});
