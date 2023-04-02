<script>
export default {
  name: "AboutView",
  props: {
    slug: {
      type: String,
    },
  },
};
</script>

<template>
  <div class="about">
    <h1>This is {{ slug }} project.</h1>
  </div>
</template>
