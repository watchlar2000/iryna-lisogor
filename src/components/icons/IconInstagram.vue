<script>
export default {
  name: "IconInstagram",
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
      d="M44 65.1501C54.5762 65.1501 63.15 56.5764 63.15 46.0001C63.15 35.4238 54.5762 26.8501 44 26.8501C33.4237 26.8501 24.85 35.4238 24.85 46.0001C24.85 56.5764 33.4237 65.1501 44 65.1501Z"
      stroke="#4F535C"
      stroke-width="4"
      stroke-miterlimit="10"
    />
    <path
      d="M67.34 28.8602C70.2837 28.8602 72.67 26.4739 72.67 23.5302C72.67 20.5865 70.2837 18.2002 67.34 18.2002C64.3963 18.2002 62.01 20.5865 62.01 23.5302C62.01 26.4739 64.3963 28.8602 67.34 28.8602Z"
      fill="#4F535C"
    />
  </svg>
</template>
