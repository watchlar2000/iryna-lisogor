<script>
export default {
  name: "BaseIcon",
  props: {
    width: {
      type: [String, Number],
      default: "90",
    },
    height: {
      type: [String, Number],
      default: "90",
    },
  },
};
</script>

<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 90 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot />
  </svg>
</template>
