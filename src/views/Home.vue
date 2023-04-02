<script>
import { useProjectStore } from "../stores/project";

import { mapState } from "pinia";
export default {
  name: "HomeView",
  components: {},
  computed: {
    ...mapState(useProjectStore, ["projects"]),
  },
};
</script>

<template>
  <div class="about">
    <h1>This is a home page</h1>
    <div v-for="p in projects" :key="p.id">{{ p.title }}</div>
  </div>
</template>
