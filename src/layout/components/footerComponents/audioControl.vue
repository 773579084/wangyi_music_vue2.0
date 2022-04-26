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

        <!-- 开始 -->
        <svg v-show="!isAudio" class="icon set-icon" aria-hidden="true" @click="beginFn">
          <use xlink:href="#icon-ai23" />
        </svg>

        <!-- 暂停 -->
        <svg v-show="isAudio" class="icon set-icon" aria-hidden="true" @click="pauseFn">
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
    <div class="music__main__timeBar">
      <div class="time">
        <span>{{ currentTimeText }}</span>
        <div ref="bar" class="bar">
          <div ref="slid" class="bar__slid" :style="`width:${barWidth}%`" />
          <el-slider v-model="buttonMove" :style="`left:${barWidth-1}%`" :show-tooltip="false" @input="changeBackFn" @change="changeMusicFn" />
        </div>
        <span>{{ audioTimeText }}</span>
      </div>
    </div>

    <!-- 音乐播放控件 -->
    <audio ref="audio" :autoplay="isAudio" :src="songUrl||''" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      timer: null, // 定时器
      audioTimes: 0, // 总时间
      currentTime: 0, // 当前时间
      vol: null, // 音频音量
      buttonMove: 0
    }
  },
  computed: {
    ...mapGetters(['isAudio', 'songUrl']),
    // 生成总时间
     audioTimeText() {
       return this.getTimeText(this.audioTimes)
     },
    // 实时生成当前时间
    currentTimeText() {
      return this.getTimeText(this.currentTime)
    },
    // 实时计算当前进度条宽度的百分比
    barWidth() {
      return (this.currentTime / this.audioTimes) * 100
    }
  },
  watch: {
    songUrl: function() {
      clearInterval(this.timer)
      const vm = this
      // 一旦音乐地址更换了，就重置数据
      this.timer = window.setInterval(function() {
        vm.currentTime = vm.currentTime + 1
        // 当前描述超过或等于总时长，就清楚定时器
        if (vm.currentTime >= vm.audioTimes) {
          clearInterval(vm.timer)
        }
      }, 1000)
      this.audioTimes = 0
      this.currentTime = 0
      this.controlMusic(true)
    },
    // 监听barwidth 一变动 按钮变动
    barWidth: function(newValue) {
      this.buttonMove = newValue
    }

  },
  created() {
    this.currentTime = 1
  },
  mounted() {
    // 加载·音频并获取音频的总时长
    const vm = this
    const audio = this.$refs.audio
    // 存储audio到vuex中
    this.saveAudio(audio)
    audio.load()
    audio.oncanplay = function() {
      vm.audioTimes = Math.round(audio.duration)
    }
  },
  methods: {
    // 修改进度条样式进度
    changeBackFn() {
      this.currentTime = (this.buttonMove / 100) * this.audioTimes
    },
    // 改变音乐
    changeMusicFn() {
      this.$refs.audio.currentTime = this.currentTime
    },
    beginFn() {
      // 开始播放音乐
      this.beginMusic(this.$refs.audio)
      // 改变控制组件显示隐藏
      this.controlMusic(true)
      // 获取当前时间
      const vm = this
      this.timer = window.setInterval(function() {
        vm.currentTime = vm.currentTime + 1
        // 当前描述超过或等于总时长，就清楚定时器
        if (vm.currentTime >= vm.audioTimes) {
          vm.currentTime = vm.audioTimes
          clearInterval(vm.timer)
        }
      }, 1000)
    },
    // 定时
    pauseFn() {
      // 暂停播放音乐
      this.pauseMusic(this.$refs.audio)
      // 改变控制组件显示隐藏
      this.controlMusic(false)
      // 暂停定时器
      clearInterval(this.timer)
      // console.log(122, this.isAudio, this.timer)
    },
     // 让秒数显示成分钟秒钟的样式
    getTimeText(seconds) {
      let minute
      let second
      minute = Math.floor(seconds / 60)
      second = Math.floor(seconds) - minute * 60
      // 让个位数的时间正常显示
      if (minute <= 9) minute = '0' + minute
      if (second <= 9) second = '0' + second
      return minute + ':' + second
    },
    ...mapActions('playerSong', ['controlMusic', 'beginMusic', 'pauseMusic', 'saveAudio'])
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
    margin-left: 2px;
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

// 进度条
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
    position: relative;
    display: flex;
    justify-content: space-between;
    color: $them-font-color;
    span {
      font-size: 1px;
      line-height: 1;
    }
    .bar {
      width: 350px;
      height: 4px;
      background-color: #cdcdcd;
      border-radius: 8px;
      position: relative;
      border-radius: 8px;
      // overflow: hidden;
      cursor: pointer;
      margin: 4px 8px 0;

      .bar__slid {
        background-color:$header-theme-color;
        height: 100%;
      }
    }
  }
}

::v-deep .el-slider__button-wrapper {
  position: absolute;
  top: -28px;
    width: 12px;
  height: 12px;
}

::v-deep .el-slider__button {
  width: 12px;
  height: 12px;
  border: 2px solid $header-theme-color;
}
</style>
