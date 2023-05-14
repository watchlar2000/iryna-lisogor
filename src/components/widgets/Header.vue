<script>
import MobileNav from "../MobileNav.vue";
import IconBurger from "../shared/icons/IconBurger.vue";
import IconClose from "../shared/icons/IconClose.vue";
import IconLogo from "../shared/icons/IconLogo.vue";
import AppNav from "./AppNav.vue";

export default {
  name: "AppHeader",
  components: {
    MobileNav,
    IconBurger,
    IconClose,
    IconLogo,
    AppNav,
  },
  data() {
    return {
      mobile: null,
      mobileMenu: null,
      currentWindowWidth: null,
    };
  },
  created() {
    this.isMobile();
    window.addEventListener("resize", this.isMobile);
  },
  methods: {
    toggleMobileMenu() {
      document.body.style.overflow = "hidden";
      this.mobileMenu = !this.mobileMenu;
    },
    isMobile() {
      this.currentWindowWidth = window.innerWidth;
      if (this.currentWindowWidth <= 1100) {
        this.mobile = true;
        this.mobileMenu = false;
        return;
      }
      this.mobile = false;
      this.mobileMenu = false;
      document.body.style.overflow = "visible";
    },
    closeMobileMenu() {
      this.mobileMenu = false;
      document.body.style.overflow = "visible";
    },
  },
  watch: {
    $route: {
      handler: "closeMobileMenu",
    },
  },
};
</script>

<template>
  <div>
    <header class="header">
      <router-link to="/">
        <IconLogo
          @click.native="closeMobileMenu"
          width="145"
          class="logo"
          :alt="mobileMenu"
        />
      </router-link>
      <app-nav v-if="!mobile" class="nav" />
      <div v-if="mobile" class="pointer icon">
        <IconBurger
          v-if="!mobileMenu"
          @click.native="toggleMobileMenu"
          :width="46"
        />
        <IconClose v-else @click.native="closeMobileMenu" />
      </div>
    </header>
    <MobileNav :shown="mobileMenu" @close="closeMobileMenu" />
  </div>
</template>

<style lang="scss">
.header {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  .logo,
  .icon {
    z-index: 50;
  }
}

.nav {
  display: flex;
  gap: 36px;
}
</style>
