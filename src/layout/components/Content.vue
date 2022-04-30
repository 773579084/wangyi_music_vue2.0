<template>
  <div class="content">
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>

<style scoped lang="scss">
@media (min-width:1450px) {
  .content {
    max-width: 1240px;
  }
}

@media (max-width:1450px) {
  .content {
    width: 100%;
  }
}

.content {
  margin: 0 auto;
  padding: 10px 10px 0;
}
</style>
