<script>
export default {
  name: "IconBurger",
  props: {
    width: {
      type: [String, Number],
      default: "31",
    },
    height: {
      type: [String, Number],
      default: "31",
    },
  },
};
</script>

<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 31 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.4386 1.97287L28.9385 28.4729"
      stroke="#3D4C55"
      stroke-width="3"
      stroke-linecap="round"
    />
    <path
      d="M28.9387 1.97286L2.43865 28.9729"
      stroke="#3D4C55"
      stroke-width="3"
      stroke-linecap="round"
    />
  </svg>
</template>
