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
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  grid-template-areas:
    "header"
    "main"
    "footer";
}
.header {
  width: 100%;
  grid-area: header;
  padding: 14px 24px;
}
.main {
  display: grid;
  padding: 18px 24px;
  grid-area: main;
  justify-self: center;
  align-self: start;
  width: 100%;
  max-width: 900px;
  height: 100%;
}

.footer {
  grid-area: footer;
  padding: 14px 24px;
  text-align: center;
}

@media screen and (min-width: 576px) {
  .header,
  .footer {
    padding-inline: 14px 24px;
  }

  .main {
    padding: 18px 24px;
  }
}

@media screen and (min-width: 992px) {
  .main {
    padding-inline: 0;
  }
}
</style>
