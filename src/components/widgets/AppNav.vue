<template>
  <nav class="nav">
    <router-link :to="{ name: 'home' }" class="nav__item"
      >All works</router-link
    >
    <router-link :to="{ name: 'illustrations' }" class="nav__item"
      >Illustrations</router-link
    >
    <router-link :to="{ name: 'character-design' }" class="nav__item"
      >Character design</router-link
    >
    <router-link :to="{ name: 'sketches' }" class="nav__item"
      >Sketches</router-link
    >
    <router-link :to="{ name: 'about' }" class="nav__item"
      >About & Contacts</router-link
    >
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  &__item {
    font-size: 24px;
    font-weight: 500;
    color: var(--color-title);
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
      color: var(--color-secondary-hover);
      outline: none;
    }
  }
}
</style>
