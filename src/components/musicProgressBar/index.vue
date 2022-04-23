<template>
  <!-- 进度条 -->
  <div class="music__main__timeBar">
    <div class="time">
      <span>00:00</span>
      <div ref="bar" class="bar">
        <div ref="slid" class="bar__slid" />
      </div>
      <span>04:45</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
@import '@/styles/common.scss';

@keyframes musicRotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.music__main__timeBar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  box-sizing: border-box;
  .time {
    display: flex;
    justify-content: space-between;
    color: $them-font-color;
    span {
      font-size: 1px;
      line-height: 1;
    }
    .bar {
      width: 350px;
      height: 3px;
      background-color: $music-progress-bar;
      border-radius: 8px;
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      margin: 4px 8px 0;

      &__slid {
        position: absolute;
        left: 0;
        top: 0;
        background-color: #e24d80;
        height: 100%;
        width: 0;
        transition: width 0.3s;
      }
    }
  }
}
</style>
