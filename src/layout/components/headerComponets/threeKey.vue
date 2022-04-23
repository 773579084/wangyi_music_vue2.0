<template>
  <div>
    <!-- <line-outlined class="narrow" /> -->
    <!-- <border-outlined class="amplification" /> -->
    <!-- <close-outlined class="exit" /> -->
    <img src="@/assets/images/sub.png" class="narrow">
    <img src="@/assets/images/full-screen.png" class="amplification">
    <img src="@/assets/images/close.png" class="exit">
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.narrow,
.amplification,
.exit {
  width: 18px;
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
  margin-left: 15px;
  font-size: 16px;
}
</style>
