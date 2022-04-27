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
        <div class="music-name">
          <i class="song-name">{{ songName }}</i>
          <svg class="icon collect" aria-hidden="true">
            <use xlink:href="#icon-aixin" />
          </svg>
        </div>
        <div class="music-author">{{ songAuthor }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(['songName', 'songAuthor', 'songImg'])
  },
  created() {
    // 调用vuex获取本地数据
    this.SAVEMUSIC()
  },
  methods: {
    // 控制左侧播放模式切换
    showMusicDetailFn() {
      this.$refs.avatarBox.style.top = 60 + 'px'
    },
    hiddenFn() {
      this.$refs.avatarBox.style.top = 0 + 'px'
    },
    ...mapMutations('playerSong', ['SAVEMUSIC'])
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/index.scss';

.four-button {
  position: absolute;
  top: -66px;
  left: 0px;
  height: 60px;
  align-items: center;
  background-color: #fff;

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

.footer-left,.footer-left2 {
  position: relative;
  top: 0;
  display: flex;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: .4s linear;
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
      color: rgba(255, 255, 255, 0.555);
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
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;

  .music-name > i {
    cursor: pointer;
    color: $them-font-color;
  }

  .collect {
    font-size: 18px;
    margin-left: 6px;
    margin-bottom: 3px;
    color: $them-font-color;
    vertical-align: middle;
    cursor: pointer;

    &:hover {
      color: #000;
    }
  }

  .music-author {
    color: #5f5f5f;
    font-size: 12px;
  }
}
</style>
