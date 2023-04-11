<script>
import DefaultLayout from "@/layout/DefaultLayout.vue";

export default {
  name: "App",
  components: {
    DefaultLayout,
  },
};
</script>

<template>
  <div id="app">
    <DefaultLayout>
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </DefaultLayout>
  </div>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.1s, transform 0.2s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-10%);
}
</style>
