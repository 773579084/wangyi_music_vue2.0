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
    <svg class="icon player-list" aria-hidden="true" @click="isShowFn">
      <use xlink:href="#icon-24gf-playlist" />
    </svg>

    <!-- 当前播放 抽屉 -->
    <currentPlayerVue :table="table" @changeTableFn="changeTableFn" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import currentPlayerVue from './compoents/currentPlayer.vue'

export default {
  components: {
    currentPlayerVue
  },
  data() {
    return {
      vol: 80,
      table: false
    }
  },
 computed: {
   ...mapState('playerSong', ['audio'])
 },
 watch: {
    vol() {
      this.audio.volume = this.vol / 100
    }
  },
 methods: {
    isShowFn() {
      this.table = !this.table
    },
    changeTableFn() {
      this.table = !this.table
    }
  }
}

</script>

<style scoped lang="scss">
@import '@/styles/_handle.scss';

.right {
  display: flex;
  justify-content: space-evenly;
  width: 100%;

  .player-button {
    width: 22px;
    height: 22px;
     @include font_color("font_color1");
  }

  .player-list {
    margin-top: 2px;
     @include font_color("font_color1");
  }
}
.tone-control {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 20px;
  margin-top: 2px;
  border: 1px solid #ec4141;
  @include border_color("border_color1");
  font-size: 11px;
  @include font_color("font_color1");
  cursor: pointer;
}

::v-deep .el-slider__button {
  border: 2px solid #ec4141;
}

</style>

<style lang="scss">
@import '@/styles/_handle.scss';

.el-slider__bar{
  @include background_color("background_color1");
}
</style>

