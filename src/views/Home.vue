<script>
import { mapState } from "pinia";
import { useProjectStore } from "../stores/project";

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
    <!-- <div v-for="p in projects" :key="p.id" class="post-item">
      <h2>{{ p.title }}</h2>
      <img :src="p.cover" alt="p.title" />
    </div> -->
  </div>
</template>

<style scoped lang="scss">
.post-item {
  /* height: 100px; */
}
</style>
