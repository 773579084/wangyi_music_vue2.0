<template>
  <div ref="avatarBox" class="footer-left">
    <!-- 四大按钮 -->
    <el-row type="flex" style="width:250px" class="four-button">
      <!-- 下滑 -->
      <el-col :span="5">
        <svg class="icon down-arrow" aria-hidden="true" @click="hiddenFn">
          <use xlink:href="#icon-zuo" />
        </svg>
      </el-col>
      <el-col :span="19">
        <el-row type="flex">
          <!-- 喜欢 -->
          <el-col :span="6" class="icon-back">
            <svg class="icon collect" aria-hidden="true">
              <use xlink:href="#icon-aixin" />
            </svg>
          </el-col>
          <!-- 收藏 -->
          <el-col :span="6" class="icon-back">
            <svg class="icon collect" aria-hidden="true">
              <use xlink:href="#icon-xinjianwenjian" />
            </svg>
          </el-col>
          <!-- 下载 -->
          <el-col :span="6" class="icon-back">
            <svg class="icon collect" aria-hidden="true">
              <use xlink:href="#icon-xiazai" />
            </svg>
          </el-col>
          <!-- 分享 -->
          <el-col :span="6" class="icon-back">
            <svg class="icon collect" aria-hidden="true">
              <use xlink:href="#icon-fenxiang" />
            </svg>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <!-- 歌曲封面 信息 展示 -->
    <div class="footer-left2">
      <div class="music-avatar" @click="showMusicDetailFn">
        <el-image :src="songImg|imgSize('?param=48y48')" />
        <div class="none-mask">
          <div class="avatar-mask">
            <svg class="icon up-arrow" aria-hidden="true">
              <use xlink:href="#icon-zuo" />
            </svg>
          </div>
        </div>
      </div>
      <div class="music-detailed">
        <div class="title-music">
          <div class="music-name">
            <i class="song-name">{{ songName }}</i>
          </div>
          <svg class="icon collect love-icon" aria-hidden="true">
            <use xlink:href="#icon-aixin" />
          </svg>
        </div>
        <div class="music-author">{{ songAuthor }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters(['songName', 'songAuthor', 'songImg']),
    ...mapState('playerSong', ['playHeaderShow'])
  },
  watch: {
    playHeaderShow: function() {
      if (this.playHeaderShow) {
        this.$refs.avatarBox.style.top = 60 + 'px'
      } else {
        this.$refs.avatarBox.style.top = 0 + 'px'
      }
    }
  },
  created() {
    // 调用vuex获取本地音乐数据
    this.getInitMusicIdFn()
  },
  methods: {
    // 初始化音乐数据
    getInitMusicIdFn() {
        this.SAVEMUSIC()
    },
    // 点击显示播放模式
    showMusicDetailFn() {
      this.isShowHeader(true)
      this.$refs.avatarBox.style.top = 60 + 'px'
    },
    // 点击隐藏播放模式
    hiddenFn() {
      this.isShowHeader(false)
      this.$refs.avatarBox.style.top = 0 + 'px'
    },
    ...mapMutations('playerSong', ['SAVEMUSIC']),
    ...mapActions('playerSong', ['isShowHeader', 'saveMusic'])
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/index.scss';
@import '@/styles/_handle.scss';

.four-button {
  position: absolute;
  top: -66px;
  left: 0px;
  height: 60px;
  align-items: center;
  @include background_color("background_color2");

  .down-arrow {
    transform: rotate(-90deg);
  }

  .icon-back {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 999px;
    border: 1px solid #ececec;
    margin-right: 10px;
  }
}

.footer-left {
  position: relative;
  top: 0;
  display: flex;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: .2s linear;
}

.footer-left2 {
  display: flex;
}

.music-avatar {
  position: relative;
  width: 48px;
  height: 48px;
  cursor: pointer;

  &:hover .none-mask {
    display: block;
  }

  .none-mask {
    display: none;
  }
  .avatar-mask {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    background-color: rgba(0, 0, 0, 0.3);

    .up-arrow {
      @include font_color("font_color1");
      font-size: 20px;
      margin-top: 5px;
      transform: rotate(90deg);
    }
  }

  img {
    width: 100%;
    border-radius: 5px;
  }
}

.music-detailed {
  display: flex;
  margin-left: 10px;
  flex-direction: column;

  .title-music {
    display: flex;

    .love-icon {
      margin-top: 2px;
    }
  }

  .music-name {
    max-width: 135px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .music-name > i {
    cursor: pointer;
    @include font_color("font_color1");
  }

  .collect {
    font-size: 18px;
    margin-left: 6px;
    margin-bottom: 3px;
    @include font_color("font_color1");
    vertical-align: middle;
    cursor: pointer;

    &:hover {
      color: #000;
    }
  }

  .music-author {
    @include font_color("font_color1");
    font-size: 12px;
  }
}
</style>
