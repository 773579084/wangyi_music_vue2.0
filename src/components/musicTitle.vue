<template>
  <div class="title">
    <h1 class="music-title">{{ title }}</h1>
    <svg class="icon right-arrow" aria-hidden="true">
      <use xlink:href="#icon-zuo" />
    </svg>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String, Number,
      required: true
    }
  }
}
</script>

<style scoped lang='scss'>
.title {
    position: relative;
    margin-top: 30px;
    margin-bottom: 10px;
     cursor: pointer;
}

.music-title {
    display: inline-block;
    font-size: 30px;
}

.right-arrow {
    position: absolute;
    top: 38px;
    width: 28px;
    height: 28px;
    transform: rotate(180deg);
}
</style>
