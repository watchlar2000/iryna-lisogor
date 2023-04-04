<script>
export default {
  name: "AppHeader",
};
</script>

<template>
  <header class="header">
    <h1>Logo</h1>
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
  padding: 0 24px;
}

.nav {
  a {
    font-size: 22px;
    color: #2c3e50;
    margin-left: 36px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
