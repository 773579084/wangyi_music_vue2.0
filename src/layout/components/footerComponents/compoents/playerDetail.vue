<template>
  <div ref="playPage" class="big-box">
    <div class="container">
      <!-- 顶部收起框 -->
      <el-row type="flex" style="height:60px;padding-left: 20px;" align="middle">
        <el-col class="play-header" :span="24">
          <svg class="icon down-icon" aria-hidden="true" @click="hiddenPlayerFn">
            <use xlink:href="#icon-zuo" />
          </svg>
        </el-col>
      </el-row>

      <!-- 音乐标题 -->
      <el-row type="flex" justify="center">
        <el-row :span="24" class="music-name">{{ songDetail.name }}</el-row>
      </el-row>
      <el-row type="flex" justify="center">
        <el-row :span="24" class="music-author">
          <div class="author-album">
            {{ songDetail.artist }} - {{ songDetail.album }}
          </div>
        </el-row>
      </el-row>

      <!-- 中部 打碟区域 歌词轮播区域 -->
      <el-row>
        <el-col class="round" :span="12" style="position:relative">
          <div class="play-disc ">
            <img :class="[isAudio?'track-running':'track-paused']" src="@/assets/images/play-needle.png">
          </div>
          <div :class="[isAudio?'running-ani':'paused-ani']" class="disc disc-rotate">
            <img class="track-disc" src="@/assets/images/play-disc.png" alt="">
            <img class="track-img" :src="songDetail.pic|imgSize('?param=210y210')">
          </div>
        </el-col>

        <!-- 歌词 -->
        <el-col class="word" :span="12" style="position:relative">
          <ul ref="lyric" class="lyric">
            <li v-for="(item, key, index) in songWordList" :key="key" :class="{each:true, choose: (index==lyricIndex)}">{{ item }}</li>
          </ul>
        </el-col>
      </el-row>

      <!-- 底部评论展示区 -->
      <songSingleCommentVue v-if="isShowComment" class="viewComment" :is-music="isMusic" :play-list-data="MusicComments" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getSongDetail, SongDetail } from '@/api'
import { getMusicWord, getMusicComment } from '@/api/playerSong/index'
import SongColor from '@/api/const'
import songSingleCommentVue from '@/views/playList/songSingleComment.vue'

export default {
  components: {
    songSingleCommentVue
  },
  data() {
    return {
      songDetail: {}, // 歌曲信息
      songWordList: [], // 歌词索引列表
      lyricIndex: null,
      MusicComments: { commentCount: 0 }, // 歌曲评论
      isMusic: true, // 判断是获取歌曲评论
      isShowComment: false
    }
  },
  computed: {
    ...mapState('playerSong', ['playHeaderShow', 'id', 'isAudio', 'wordIndex'])
  },
  watch: {
    // 监听控制器，弹出弹出
    playHeaderShow: function() {
      if (this.playHeaderShow) {
        this.$refs.playPage.style.top = 0
      } else {
        this.$refs.playPage.style.top = 'calc(100vh - 60px)'
      }
    },
    id: async function() {
      this.getSongDetail()
    },
    wordIndex: function() {
      if (this.wordIndex === 1) this.$refs.lyric.scrollTop = 0
      let i = 0
      for (const key in this.songWordList) {
          if (+key === this.wordIndex) {
              this.lyricIndex = i
              if (i > 5) {
                 this.$refs.lyric.scrollTop = 30 * (i - 5)
              }
          }
          i++
      }
    }
  },
  created() {
    this.getSongDetail()
  },
  methods: {
    // 隐藏播放框
    hiddenPlayerFn() {
      this.isShowHeader(false)
    },
    // 处理歌词的函数
    disposeWord(resWord) {
         // 处理歌词，转化成key为时间，value为歌词的对象
     const lyricArr = resWord.split('[').slice(1) // 先以[进行分割
    //  console.log(85, lyricArr)
     const lrcObj = {}
     lyricArr.forEach(item => {
         const arr = item.split(']')	// 再分割右括号
        //  console.log(89, arr)
         // 时间换算成秒
         const m = parseInt(arr[0].split(':')[0])
         const s = parseInt(arr[0].split(':')[1])
         arr[0] = m * 60 + s
         if (arr[1] !== '\n') { // 去除歌词中的换行符
             lrcObj[arr[0]] = arr[1]
         }
     })
     // 存储数据
     this.songWordList = lrcObj
    },
    // 获取歌曲信息
    async getSongDetail() {
      // 获取歌曲信息
        let musicId = null
        if (this.id) {
          musicId = this.id
        } else {
          musicId = localStorage.getItem('playerSong_01')
        }
        const res = await (await getSongDetail(musicId)).data.songs
        this.songDetail = new SongDetail(res)
        this.changeBackColor()
        // 获取歌词
        const resWord = await (await getMusicWord(musicId)).data.lrc.lyric
        this.disposeWord(resWord)
        // 获取歌曲评论
        const resComments = await (await getMusicComment(this.id, 20)).data
        this.MusicComments.commentCount = resComments.total
        this.isShowComment = true
    },
    // 动态变换 背景颜色
    changeBackColor() {
      const ColorIndex = Math.floor(Math.random() * SongColor.playSongColor.length)
      this.$refs.playPage.style.backgroundImage = SongColor.playSongColor[ColorIndex]
    },
    ...mapActions('playerSong', ['isShowHeader'])
  }
}
</script>

<style scoped lang='scss'>
@import '@/styles/_handle.scss';

@keyframes rotation{
    from {-webkit-transform:  rotate(0deg);}
    to {-webkit-transform:  rotate(360deg);}
}

.big-box {
  position: fixed;
  top: calc(100vh - 60px);
  left: 0;
  width: 100%;
  z-index: 2001;
  height: calc(100vh - 60px);
  overflow-y: auto;
  transition:top .2s linear;
  background-image: linear-gradient(#ececfa,#f6f6fd,#fdfdfe,#ffff);

      // 修改滚动条样式
    &::-webkit-scrollbar {
        width: 5px;
        height: 1px;
    }

    // 滑块部分
    &::-webkit-scrollbar-thumb {
        background-color: #e1e1e1;
    }

  .container {
    width: 1200px;
    margin: 0 auto;
  }

  .down-icon {
    transform: rotate(-90deg);
  }

  .music-name {
    margin-top: 10px;
    font-size: 40px;
    @include font_color("font_color1");
  }

  .music-author {
    display: flex;
    justify-content: center;
    color: #85868c;

    .author-album {
      text-align: center;
      width: 280px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

// 打碟
  .round {
    margin-top:25px;
    height: 400px;

    .play-disc {
        position: absolute;
        top: -11%;
        left: 43%;
        z-index: 3;

        &>img {
          width: 60%;
          height: 60%;
        }

        // 控制打碟
        .track-paused {
          transform: rotate(-30deg);
          transform-origin: left top;
        }
        .track-running {
          transform: rotate(0deg);
          transform-origin: left top;
        }
    }

    .disc-rotate {
      animation: rotation 20s linear infinite;
      -moz-animation: rotation 20s linear infinite;
      -webkit-animation: rotation 20s linear infinite;
      -o-animation: rotation 20s linear infinite;
    }

    .running-ani {
      animation-play-state:running;
    }
    .paused-ani {
      animation-play-state:paused;
    }

    .disc {
      position: absolute;
      top: 0%;
      left: 12%;
      width: 400px;
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius:999px;
      .track-disc {
        transform: scale(.4);
      }

      // 音乐头像
      .track-img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border-radius: 999px;
      }
    }

  }

  // 歌词
  .word {
    height: 400px;
    margin-top: 50px;
  }

  .lyric {
    width: 400px;
    height: 400px;
    position: absolute;
    // 滚动条
    overflow: auto;
    color: #616161;
    font-size: 10px;
    font-weight: normal;
    padding: 5px 10px;
    border-left: none;

    .each {
      height: 30px;
      line-height: 30px;
      text-align: center;
    }

    .choose {
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        @include font_color("font_color2");
    }

    // 修改滚动条样式
    &::-webkit-scrollbar {
        width: 3px;
        height: 1px;
    }

    // 滑块部分
    &::-webkit-scrollbar-thumb {
        background-color: #e1e1e1;
    }
  }

  // 评论区
  .viewComment {
      margin-top: 120px;
      padding: 0 150px;
  }
}
</style>
