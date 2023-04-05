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
  min-height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: min-content auto min-content;
  grid-template-areas:
    "header"
    "main"
    "footer";
}
.header {
  width: 100%;
  grid-area: header;
  /* background-color: rgb(162, 211, 179); */
}
.main {
  display: grid;
  padding: 14px 32px;
  /* background-color: rgb(235, 189, 157); */
  grid-area: main;
  justify-self: center;
  align-self: start;
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
  /* background-color: rgb(97, 156, 215); */
  grid-area: footer;
  padding: 14px 0;
  text-align: center;
}
</style>
