<template>
  <div class="footer-middle">
    <!-- 播放按键 -->
    <div class="play-control">

      <!-- 单曲播放 -->
      <svg v-show="playOrder===1" class="icon player-button" aria-hidden="true" @click="switchListPlayFn">
        <use xlink:href="#icon-danquxunhuan" />
      </svg>

      <!-- 列表播放 -->
      <svg v-show="playOrder===2" class="icon player-button" aria-hidden="true" @click="switchChaosPlayFn">
        <use xlink:href="#icon-liebiaoxunhuan" />
      </svg>

      <!-- 随机播放 -->
      <svg v-show="playOrder===3" class="icon player-button" aria-hidden="true" @click="switchSinglePlayFn">
        <use xlink:href="#icon-24gl-shuffle" />
      </svg>

      <!-- 左播放 -->
      <svg class="icon left-control" aria-hidden="true" @click="upSongFn">
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
      <svg class="icon right-control" aria-hidden="true" @click="downSongFn">
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
    <audio ref="audio" :autoplay="isAudio" :src="songUrl" />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'

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
    ...mapState('playerSong', ['playOrder', 'recentPlayIndex', 'recentPlay']),
    // 生成总时间
     audioTimeText() {
       return this.getTimeText(this.audioTimes)
     },
    // 实时生成当前时间1
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
      // 清除原来数据
      this.audioTimes = 0
      this.currentTime = 0
      // 重播音乐
      this.beginFn()
    },
    // 监听barwidth 一变动 按钮变动
    barWidth: function(newValue) {
      this.buttonMove = newValue
    }

  },
  async created() {
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
    // 点击右播放，歌曲切换到下一首
    downSongFn() {
      if (this.playOrder === 1 || this.playOrder === 2) {
        let index = this.recentPlayIndex
        if (index === this.recentPlay.length - 1) {
          index = -1
        }
        const musicId = this.recentPlay[index + 1].id
        this.saveMusic(musicId)
        this.SAVERECENTLIST()
      } else if (this.playOrder === 3) {
        this.chaosPlayFn()
      }
    },
    // 点击左播放，歌曲切换到上一首
    upSongFn() {
      if (this.playOrder === 1 || this.playOrder === 2) {
        let index = this.recentPlayIndex
        if (index === 0) {
          index = this.recentPlay.length
        }
        const musicId = this.recentPlay[index - 1].id
        this.saveMusic(musicId)
        this.SAVERECENTLIST()
      } else if (this.playOrder === 3) {
        this.chaosPlayFn()
      }
    },
    // 点击单曲循环，切换为列表播放
    switchListPlayFn() {
      this.switchPlay(2)
    },
    // 点击列表循环，切换为乱序播放
    switchChaosPlayFn() {
      this.switchPlay(3)
    },
    // 点击乱序播放，切换至单曲循环
    switchSinglePlayFn() {
      this.switchPlay(1)
    },
    // 修改进度条样式进度
    changeBackFn() {
      this.currentTime = (this.buttonMove / 100) * this.audioTimes
    },
    // 改变音乐
    changeMusicFn() {
      this.$refs.audio.currentTime = this.currentTime
    },
    // 开始播放音乐
    async beginFn() {
      // 开始播放音乐
      this.$nextTick(() => { //
        this.beginMusic(this.$refs.audio)
        // 改变控制组件显示隐藏
        this.controlMusic(true)
        // 获取当前时间
        const vm = this
        this.timer = window.setInterval(function() {
          vm.currentTime = vm.currentTime + 1
          const wordIndex = parseInt(vm.currentTime)
          vm.saveWordIndex(wordIndex)

          // 当前描述超过或等于总时长，就清除定时器
          if (vm.currentTime >= vm.audioTimes) {
            vm.currentTime = vm.audioTimes
            clearInterval(vm.timer)
            // 重新播放 单曲循环
            if (vm.playOrder === 1) {
               vm.audioTimes = 0
               vm.currentTime = 0
               vm.controlMusic(true)
               vm.beginFn()
            } else if (vm.playOrder === 2) {
               vm.audioTimes = 0
               vm.currentTime = 0
               vm.controlMusic(true)
               vm.downSongFn()
            } else if (vm.playOrder === 3) {
               vm.chaosPlayFn()
            }
          }
        }, 1000)
      })
    },
    // 封装乱序播放顺序
    chaosPlayFn() {
      const index = Math.floor(Math.random() * this.recentPlay.length)
      const musicId = this.recentPlay[index].id
      this.saveMusic(musicId)
      this.SAVERECENTLIST()
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
    ...mapActions('playerSong', ['controlMusic', 'beginMusic', 'pauseMusic', 'saveAudio', 'switchPlay', 'saveMusic', 'saveWordIndex', 'saveMusicUrl']),
    ...mapMutations('playerSong', ['SAVERECENTLIST'])
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/index.scss';
@import '@/styles/_handle.scss';

.footer-middle {
  display: flex;
  flex-direction: column;
  align-items: center;

  .right-control{
    transform: rotate(180deg);
  }

  // 播放模式
  .player-button {
    @include font_color("font_color1");
    cursor: pointer;

    &:hover {
      @include font_color("font_color2");
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
    @include font_color("font_color1");

    .pause {
      font-size: 18px;
      cursor: pointer;

      &:hover {
        @include font_color("font_color2");
      }
    }
  }

  // 左右音乐切换
  .left-control,
  .right-control {
    font-size: 18px;
    cursor: pointer;
    @include font_color("font_color1");

    &:hover {
      @include font_color("font_color2");
    }
  }
}

.lyric {
  font-size: 18px;
  cursor: pointer;
  @include font_color("font_color1");

  &:hover {
    @include font_color("font_color2");
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
    @include font_color("font_color1");
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
        @include background_color("background_color1");
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
  border: 2px solid #ec4141;
  @include border_color("border_color1");
}
</style>

<style lang="scss">
@import '@/styles/_handle.scss';

.el-slider__button {
   @include border_color("border_color1");
}
</style>
