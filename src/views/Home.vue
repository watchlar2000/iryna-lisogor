<script>
import { mapState } from "pinia";
import { useProjectStore } from "../stores/project";

export default {
  name: "HomeView",
  data() {
    return {
      titleIdx: null,
    };
  },
  computed: {
    ...mapState(useProjectStore, ["projects"]),
  },
};
</script>

<template>
  <div class="post-list">
    <div v-for="p in projects" :key="p.id">
      <div
        @mouseover="titleIdx = p.id"
        @mouseleave="titleIdx = null"
        class="post-item"
      >
        <img :src="p.cover" :alt="p.title" :data-id="p.id" />
        <h3
          v-if="titleIdx === p.id"
          class="title"
          :class="{
            hovered: titleIdx === p.id,
          }"
        >
          {{ p.title }}
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.post-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 36px;
  height: min-content;
}

.post-item {
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 250px;

  img {
    z-index: 0;
    height: 100%;
    object-fit: cover;
  }

  .title {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 24px;
    font-weight: 400;
    padding: 14px;
  }
}

.hovered {
  transition: background-color 0.5s ease;
  background-color: var(--color-background-variant);
}
</style>
