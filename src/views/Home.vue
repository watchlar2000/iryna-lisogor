<script>
// import { mapState } from "pinia";
// import { useProjectStore } from "../stores/project";

export default {
  name: "HomeView",
  data() {
    return {
      titleIdx: null,
    };
  },
  props: {
    projects: {
      type: Array,
      required: true,
    },
  },
  // computed: {
  //   ...mapState(useProjectStore, ["projects"]),
  // },
};
</script>

<template>
  <div class="post-list">
    <div v-for="p in projects" :key="p.id">
      <router-link :to="{ name: 'project', params: { slug: p.slug } }">
        <div
          @mouseover="titleIdx = p.id"
          @mouseleave="titleIdx = null"
          class="post-item"
        >
          <img :src="p.cover" :alt="p.title" :data-id="p.id" />
          <div
            v-if="titleIdx === p.id"
            class="title"
            :class="{
              hovered: titleIdx === p.id,
            }"
          ></div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.post-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 36px;
  height: min-content;
}

.post-item {
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 350px;

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
  /* background-color: var(--color-background-variant); */
  background-color: hsla(0, 0%, 100%, 0.35);
}

@media screen and (min-width: 576px) {
  .post-item {
    height: 450px;
  }
}

@media screen and (min-width: 768px) {
  .post-list {
    grid-template-columns: repeat(2, 1fr);
  }
  .post-item {
    height: 350px;
  }
}

@media screen and (min-width: 992px) {
  .post-list {
    grid-template-columns: repeat(3, 1fr);
  }

  .post-item {
    height: 250px;
  }
}
</style>
