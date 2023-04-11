<script>
import IconBurgerVue from "./icons/IconBurger.vue";
import IconLogo from "./icons/IconLogo.vue";
import MobileNav from "./MobileNav.vue";

export default {
  name: "AppHeader",
  components: {
    MobileNav,
    IconBurgerVue,
    IconLogo,
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
      if (this.currentWindowWidth <= 768) {
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
      <router-link to="/"
        ><IconLogo
          @click.native="closeMobileMenu"
          width="145"
          class="logo"
          :alt="mobileMenu"
      /></router-link>
      <nav v-if="!mobile" class="nav">
        <router-link to="/">Work</router-link>
        <router-link to="/about">About & Contacts</router-link>
      </nav>
      <IconBurgerVue
        v-else
        @click.native="toggleMobileMenu"
        class="pointer"
        :width="46"
      />
    </header>
    <MobileNav :shown="mobileMenu" @close="closeMobileMenu" />
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  .logo {
    z-index: 50;
  }
}
</style>
