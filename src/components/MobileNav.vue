<script>
import AppNav from "./widgets/AppNav.vue";

export default {
  name: "MobileNav",
  components: {
    AppNav,
  },
  props: {
    shown: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close(e) {
      const tag = e.target.tagName;
      if (tag === "A") {
        this.$emit("close");
      }
    },
  },
};
</script>

<template>
  <transition name="mobile-menu">
    <app-nav v-show="shown" class="nav mobile-nav" @click.native="close" />
  </transition>
</template>

<style lang="scss" scoped>
.mobile-nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-height: 100vh;
  z-index: 5;
  background: var(--color-background);
  font-size: 28px;
  font-weight: 500;

  a {
    color: red;
  }
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.mobile-menu-enter,
.mobile-menu-leave-to {
  transition-delay: 0.1s;
  opacity: 0;
  transform: translateY(-10%);
}

@media screen and (min-width: 576px) {
  .mobile-nav {
    font-size: 36px;
  }
}
</style>
