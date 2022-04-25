<template>
  <div class="header-logo" @click="$router.push({name:'foundMusic'})">
    <img src="@/assets/images/logo.png">
    网易云音乐
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
.header-logo {
  width: 178px;
  font-size: 19px;
  cursor: pointer;

  img {
    width: 35px;
    height: 35px;
    margin-bottom: 4px;
  }
}
</style>
