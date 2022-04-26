<template>
  <div class="right">
    <!-- 音质控制 -->
    <div class="tone-control">
      <i>标准</i>
    </div>

    <!-- 音效控制器 -->
    <svg class="icon player-button" aria-hidden="true">
      <use xlink:href="#icon-kongzhi" />
    </svg>

    <!-- 音量控制器 -->
    <el-popover placement="bottom" width="100" trigger="hover">
      <div class="block">
        <el-slider v-model="vol" />
      </div>
      <svg slot="reference" class="icon player-button" aria-hidden="true">
        <use xlink:href="#icon-yinliang101" />
      </svg>
    </el-popover>

    <!-- 多人一起听 -->
    <svg class="icon player-button" aria-hidden="true">
      <use xlink:href="#icon-peoples" />
    </svg>

    <!-- 播放列表 -->
    <svg class="icon player-list" aria-hidden="true">
      <use xlink:href="#icon-24gf-playlist" />
    </svg>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      vol: 30
    }
  },
 computed: {
   ...mapState('playerSong', ['audio'])
 },
 watch: {
    vol() {
      this.audio.volume = this.vol / 100
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/index.scss';

.right {
  display: flex;
  justify-content: space-around;
  width: 225px;

  .player-button {
    width: 22px;
    height: 22px;
    color: $them-font-color;
  }

  .player-list {
    margin-top: 2px;
    color: $them-font-color;
  }
}
.tone-control {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 20px;
  margin-top: 2px;
  border: 1px solid $them-font-color;
  font-size: 11px;
  color: $them-font-color;
}

::v-deep .el-slider__bar{
  background-color: $header-theme-color;
}

::v-deep .el-slider__button {
  border: 2px solid $header-theme-color;
}
</style>
