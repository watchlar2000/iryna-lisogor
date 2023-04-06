<script>
import IconCloseVue from "./icons/IconClose.vue";

export default {
  name: "MobileNav",
  props: {
    shown: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    IconCloseVue,
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
    <nav v-show="shown" class="nav mobile-nav">
      <IconCloseVue @click.native="close" class="close-button pointer" />
      <router-link to="/" @click.native="close">Work</router-link>
      <router-link to="/about" @click.native="close"
        >About & Contacts</router-link
      >
    </nav>
  </transition>
</template>

<style lang="scss" scoped>
.mobile-nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-height: 100vh;
  z-index: 5;
  background: var(--color-background);
  font-size: 48px;
}

.close-button {
  position: absolute;
  top: 75px;
  right: 55px;
}

// Transitions
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.15s ease;
}
.mobile-menu-enter,
.mobile-menu-leave-to {
  opacity: 0;
}
</style>
