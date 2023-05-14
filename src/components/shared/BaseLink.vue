<script>
export default {
  name: "BaseLink",
  props: {
    href: {
      type: String,
      default: "/",
    },
  },
};
</script>

<template>
  <a :href="href" target="_blank">
    <slot />
  </a>
</template>
