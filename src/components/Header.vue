<script>
import IconLogo from "./icons/IconLogo.vue";

export default {
  name: "AppHeader",
  components: {
    IconLogo,
  },
};
</script>

<template>
  <header class="header">
    <IconLogo width="145" />
    <nav class="nav">
      <router-link to="/">Work</router-link>
      <router-link to="/about">About & Contacts</router-link>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
}

.nav {
  a {
    font-size: 24px;
    font-weight: 500;
    color: var(--color-title);
    margin-left: 36px;
    transition: all 0.1s ease;

    &:link,
    &:visited {
      color: var(--color-title);
    }

    &.router-link-exact-active {
      color: var(--color-secondary);
    }

    &:hover,
    &:focus {
      color: var(--color-primary);
      outline: none;
    }
  }

  /* &:active {
    color: var(--color-secondary);
  } */
}
</style>
