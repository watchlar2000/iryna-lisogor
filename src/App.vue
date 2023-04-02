<script>
import ProjectsService from "./services/ProjectsService";

export default {
  name: "App",
  mounted() {
    ProjectsService.getProjects();
  },
};
</script>

<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss"></style>
