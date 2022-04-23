<template>
  <div>
    <span class="music-box">
      <!-- 右上角音乐图标 -->
      <div class="mask" />
      <img :src="personalizeditem.picUrl" class="box-img">
      <i>
        <img class="music-log" src="@/assets/images/logo.png" alt="">
      </i>
      <!-- 左上角播放量 -->
      <em class="play-number">
        <svg class="icon set-icon" aria-hidden="true">
          <use xlink:href="#icon-ai23" />
        </svg>
        <span>{{ personalizeditem.playCount |playerNumber }}</span>
      </em>
      <!-- 播放图标 -->
      <svg class="icon player-icon" aria-hidden="true">
        <use xlink:href="#icon-24gf-playCircle" />
      </svg>
    </span>
    <!-- 底部字体展示 -->
    <span class="font-show">
      {{ personalizeditem.name }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    personalizeditem: {
      type: Object, Array,
      required: true
    }
  }
}
</script>

<style scoped lang='scss'>
@import '@/styles/index.scss';

 .music-box {
    position: relative;
    display: block;
    height: 230px;
    border-radius: 5%;
    margin-bottom: 7px;
     cursor: pointer;

    &:hover {

        .player-icon {
          opacity: 1;
        }
      }

    .mask {
      position: absolute;
      top: 0;
      width: 100%;
      height: 38px;
      border-radius: 5%;
      background-color: rgba(0, 0, 0, 0.315);
    }

    .music-log {
      position: absolute;
      left: 0;
      width: 28px;
      height: 28px;
      margin: 5px;
    }

    .box-img {
      width: 100%;
      height: 100%;
      border-radius: 5%;
    }

    .play-number {
      position: absolute;
      right: 0;
      color: white;
      margin: 5px;
      margin-top: 7px;
      margin-right: 9px;

      .set-icon{
          margin-right: 3px;
      }
    }

    .player-icon {
      @extend .position-right-down-icon;
    }
  }

  .font-show {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 18px;
  }
</style>
