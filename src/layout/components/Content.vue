<template>
  <div class="content">
    <router-view />
  </div>
</template>

<script></script>

<style scoped lang="scss">
@media (min-width:1450px) {
  .content {
    width: 1200px;
  }
}

@media (max-width:1450px) {
  .content {
    width: 100%;
  }
}

.content {
  height: 100%;
  margin: 0 auto;
  padding: 10px 10px 0;
}
</style>
