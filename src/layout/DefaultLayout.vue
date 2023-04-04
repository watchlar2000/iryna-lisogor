<script>
import AppFooter from "@/components/Footer.vue";
import AppHeader from "@/components/Header.vue";

export default {
  name: "DefaultLayout",
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<template>
  <div class="container">
    <AppHeader class="header" />
    <main class="main">
      <slot />
    </main>
    <AppFooter class="footer" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: rgb(212, 172, 172);
  min-height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 125px auto min-content;
  grid-template-areas:
    "header"
    "main"
    "footer";
}
.header {
  width: 100%;
  grid-area: header;
  background-color: rgb(162, 211, 179);
}
.main {
  display: grid;
  background-color: rgb(235, 189, 157);
  grid-area: main;
  justify-self: center;
  width: 100%;
  max-width: 900px;
  height: 100%;
}

/* @media screen and (min-width: 576px) {
  .main {
    margin: 0 24px;
  }
} */
.footer {
  background-color: rgb(97, 156, 215);
  grid-area: footer;
  padding: 10px 0;
}
</style>
