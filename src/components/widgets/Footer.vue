<script>
import { socialLinks } from "@/utils/consts";
import BaseLink from "../shared/BaseLink.vue";
import IconBehance from "../shared/icons/IconBehance.vue";
import IconInstagram from "../shared/icons/IconInstagram.vue";
import IconMail from "../shared/icons/IconMail.vue";

export default {
  name: "AppFooter",
  data() {
    return {
      socialLinks,
    };
  },
  components: {
    IconBehance,
    IconInstagram,
    IconMail,
    BaseLink,
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
      <BaseLink v-for="link in socialLinks" :key="link.href" :href="link.href">
        <component :is="link.component" :width="50" />
      </BaseLink>
    </div>
    <div>
      <p>All artistic content Copyright &#169;</p>
      <p>{{ fullYear }} Iryna Lisogor, All rights</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  color: #96979a;
  font-size: 16px;
}

.socials-list {
  display: flex;
  gap: 18px;
  width: 100%;
  justify-content: flex-end;
}
</style>
