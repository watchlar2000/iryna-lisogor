<script>
export default {
  name: "IconMail",
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
    <path
      d="M45 87.1301C68.2678 87.1301 87.13 68.2679 87.13 45.0001C87.13 21.7324 68.2678 2.87012 45 2.87012C21.7322 2.87012 2.87 21.7324 2.87 45.0001C2.87 68.2679 21.7322 87.1301 45 87.1301Z"
      stroke="#4F535C"
      stroke-width="4"
      stroke-miterlimit="10"
    />
    <path
      d="M18.91 26.4302C16.45 35.9902 19 63.8302 21.15 65.2502C24.14 67.2302 66.11 66.0202 70.49 64.4002C72.94 63.4902 73.62 29.0102 72.16 25.8502C70.7 22.7002 20.01 22.1602 18.91 26.4302Z"
      stroke="#4F535C"
      stroke-width="4"
      stroke-miterlimit="10"
    />
    <path
      d="M19.02 25.6001C19.02 25.6001 40.2 54.2201 45.7 54.7101C50.62 55.1401 68.47 30.9701 72.16 25.8601"
      stroke="#4F535C"
      stroke-width="4"
      stroke-miterlimit="10"
    />
  </svg>
</template>
