<template>
  <div class="footer">
    <!-- 左模块 -->
    <musicDetailed />
    <!-- 中间模块 -->
    <audioControl />
    <!-- 右模块 -->
    <rightControl />
  </div>
</template>

<script>
import musicDetailed from './footerComponents/musicDetailed.vue'
import audioControl from './footerComponents/audioControl.vue'
import rightControl from './footerComponents/rightControl.vue'

export default {
  components: {
    musicDetailed, audioControl, rightControl
  }
}
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
</style>
