<script>
export default {
  name: "AppFooter",
  computed: {
    fullYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<template>
  <footer class="footer">
    <p>All artistic content Copyright &#169;</p>
    <p>{{ fullYear }} Iryna Lisogor, All rights</p>
  </footer>
</template>

<style></style>
