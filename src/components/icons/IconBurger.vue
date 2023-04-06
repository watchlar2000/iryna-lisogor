<script>
export default {
  name: "IconBurger",
  props: {
    width: {
      type: [String, Number],
      default: "56",
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
    viewBox="0 0 56 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 2H54"
      stroke="#3D4C55"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2 15.5H54"
      stroke="#3D4C55"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2 29H54"
      stroke="#3D4C55"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
