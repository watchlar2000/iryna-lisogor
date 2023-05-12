<script>
export default {
  name: "NotFound",
  props: {
    resource: {
      type: String,
      default: "data",
    },
  },
  computed: {
    toCapital() {
      const resource = this.resource;
      return resource[0].toUpperCase() + resource.slice(1);
    },
  },
};
</script>

<template>
  <div class="error nav">
    <h3>404 | {{ toCapital }} not found...</h3>
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
