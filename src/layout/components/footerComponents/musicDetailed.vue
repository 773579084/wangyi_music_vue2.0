<template>
  <div class="footer-left">
    <div class="music-avatar">
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
        <i>{{ songName }}</i>
        <svg class="icon collect" aria-hidden="true">
          <use xlink:href="#icon-aixin" />
        </svg>
      </div>
      <div class="music-author">{{ songAuthor }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(['songName', 'songAuthor', 'songImg'])
    // songName() {
    //   return this.$store.getters.songName
    // }
  },
  created() {
    // 调用vuex获取本地数据
    this.SAVEMUSIC()
  },
  methods: {
    ...mapMutations('playerSong', ['SAVEMUSIC'])
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/index.scss';

.footer-left {
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

    &:hover {
      font-weight: bold;
    }
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
