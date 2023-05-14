import ProjectsService from "@/services/ProjectsService";
import NProgress from "nprogress";
import { defineStore } from "pinia";

export const useProjectStore = defineStore("project", {
  state: () => ({
    projects: [],
    projectsByCategory: [],
    currentProject: null,
    error: null,
  }),
  getters: {},
  actions: {
    async getProjects() {
      try {
        NProgress.start();
        const projectsData = await ProjectsService.fetchProjects();

        if (projectsData === undefined) throw new Error("404");

        const sortedProjectsData = projectsData.sort(
          (a, b) => b.date.seconds - a.date.seconds,
        );

        this.projects = sortedProjectsData;

        return sortedProjectsData;
      } catch (e) {
        this.error = e.message;
      } finally {
        NProgress.done();
      }
    },
    async getProjectBySlug(slug) {
      await this.checkIfProjectsLoaded();
      this.currentProject = this.projects.find((p) => p.slug === slug);
    },
    async getProjectsByCategory(category) {
      await this.checkIfProjectsLoaded();
      this.projectsByCategory = this.projects.filter(
        (p) => p.category === category,
      );
    },
    async checkIfProjectsLoaded() {
      if (!this.projects.length) await this.getProjects();
    },
  },
});
