<script>
import BaseNav from './BaseNav.vue';
import MobileNav from "./MobileNav.vue";
import IconBurger from "./icons/IconBurger.vue";
import IconClose from "./icons/IconClose.vue";
import IconLogo from "./icons/IconLogo.vue";

export default {
  name: "AppHeader",
  components: {
    MobileNav,
    IconBurger,
    IconClose,
    IconLogo,
    BaseNav
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
    $route() {
      this.mobileMenu = false;
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
      <base-nav
        v-if="!mobile"
        class="nav"
      />
      <div
        v-if="mobile"
        class="pointer icon"
      >
        <IconBurger
          v-if="!mobileMenu"
          @click.native="toggleMobileMenu"
          :width="46"
        />
        <IconClose
          v-else
          @click.native="closeMobileMenu"
        />
      </div>
    </header>
    <MobileNav
      :shown="mobileMenu"
      @close="closeMobileMenu"
    />
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
  a {
    margin-left: 36px;
  }
}
</style>
