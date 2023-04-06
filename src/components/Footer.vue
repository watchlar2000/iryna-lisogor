<script>
import IconBehance from "./icons/IconBehance.vue";
import IconInstagram from "./icons/IconInstagram.vue";
import IconMail from "./icons/IconMail.vue";

export default {
  name: "AppFooter",
  components: {
    IconBehance,
    IconInstagram,
    IconMail,
  },
  computed: {
    fullYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<template>
  <footer class="footer">
    <div class="socials-list">
      <a href="https://www.instagram.com/iryna_lisogor/" target="_blank"
        ><IconInstagram :width="50"
      /></a>
      <a href="https://www.behance.net/lisogorka8741b" target="_blank"
        ><IconBehance :width="50"
      /></a>
      <a href="mailto:iryna.lisogor.artwrk@gmail.com" target="_blank"
        ><IconMail :width="50"
      /></a>
    </div>
    <div>
      <p>All artistic content Copyright &#169;</p>
      <p>{{ fullYear }} Iryna Lisogor, All rights</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  color: var(--color-title);
  font-size: 14px;
}
.socials-list {
  display: flex;
  gap: 18px;
  width: 100%;
  justify-content: flex-end;
  padding-right: 24px;
}
</style>
