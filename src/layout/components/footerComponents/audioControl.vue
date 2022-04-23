<template>
  <div class="footer-middle">
    <!-- 播放按键 -->
    <div class="play-control">
      <!-- 左播放 -->
      <svg class="icon player-button" aria-hidden="true">
        <use xlink:href="#icon-24gl-shuffle" />
      </svg>
      <svg class="icon left-control" aria-hidden="true">
        <use xlink:href="#icon-zuokuozhan" />
      </svg>
      <!-- 暂停 开始 -->
      <span class="pause-round">
        <svg class="icon set-icon" aria-hidden="true">
          <use xlink:href="#icon-zanting" />
        </svg>
      </span>
      <!-- 右播放 -->
      <svg class="icon right-control" aria-hidden="true">
        <use xlink:href="#icon-zuokuozhan" />
      </svg>
      <div class="lyric">词</div>
    </div>
    <!-- 下层播放进度 -->
    <musicProgressBar />
  </div>
</template>

<script>
import musicProgressBar from '@/components/musicProgressBar/index.vue'

export default {
  components: {
    musicProgressBar
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/index.scss';

.footer-middle {
  display: flex;
  flex-direction: column;
  align-items: center;

  .right-control{
    transform: rotate(180deg);
  }

  // 播放模式
  .player-button {
    color: $them-font-color;
    cursor: pointer;

    &:hover {
      color: $player-button-color;
    }
  }

  .play-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 256px;
    margin-bottom: 5px;
  }

  // 暂停键
  .pause-round {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 999px;
    background-color: #f4f4f4;

    .pause {
      font-size: 18px;
      color: $them-font-color;
      cursor: pointer;

      &:hover {
        color: $player-button-color;
      }
    }
  }

  // 左右音乐切换
  .left-control,
  .right-control {
    font-size: 18px;
    cursor: pointer;
    color: $them-font-color;

    &:hover {
      color: $player-button-color;
    }
  }
}

.lyric {
  font-size: 18px;
  cursor: pointer;
  color: $them-font-color;

  &:hover {
    color: $player-button-color;
  }
}
</style>
