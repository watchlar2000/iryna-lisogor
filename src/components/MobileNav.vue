<script>
import BaseNav from "./BaseNav.vue";

export default {
  name: "MobileNav",
  components: {
    BaseNav,
  },
  props: {
    shown: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<template>
  <transition name="mobile-menu">
    <base-nav v-show="shown" class="nav mobile-nav" />
  </transition>
</template>

<style lang="scss" scoped>
.nav {
  position: relative;

  a {
    font-size: 36px;
  }
}

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
}

// Transitions
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
