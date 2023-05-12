<script>
export default {
  name: "NotFound",
  props: {
    resource: {
      type: String,
      default: "data",
    },
  },
};
</script>

<template>
  <div class="error nav">
    <h3>There is some network issues...</h3>
    <router-link
      :to="{ name: 'home' }"
      class="link"
    >Back to home page</router-link>
  </div>
</template>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.link {
  margin-top: 18px;
}
</style>
