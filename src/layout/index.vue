<template>
  <el-container>
    <!--header-->
    <el-header v-show="!playHeaderShow" style="height: 60px">
      <Header />
    </el-header>
    <!--容器嵌套使用-->
    <el-container>
      <!--aside-->
      <el-aside style="width: 220px">
        <Sider />
      </el-aside>
      <!--main-->
      <el-main>
        <Content />
      </el-main>
    </el-container>
    <!-- 底部 -->
    <el-footer>
      <Footer />
    </el-footer>
    <!-- 音乐 纯享 模式  -->
    <playerDetailVue />
  </el-container>
</template>

<script>
import Header from './components/Header.vue'
import Sider from './components/Sider.vue'
import Content from './components/Content.vue'
import Footer from './components/Footer.vue'
import playerDetailVue from './components/footerComponents/compoents/playerDetail.vue'
import { mapState } from 'vuex'
// 获取初始化数据的接口
import { newsong } from '@/api/foundMusic/recommend'
import { getMusicUrl } from '@/api/playerSong'

export default {
  components: {
    Header,
    Sider,
    Content,
    Footer,
    playerDetailVue
  },
  computed: {
    ...mapState('playerSong', ['playHeaderShow'])
  },
  created() {
    const musicId = localStorage.getItem('playerSong_01')
    if (!musicId) { this.initMusicDetail() }
  },
  methods: {
    getMusicIdFn(id) {
      // 存储音乐id
      this.$store.dispatch('playerSong/saveMusic', id)
      // 加工数据
      const newSongList = this.mixCurrentPlay(this.newSongList)
      this.$store.dispatch('playerSong/saveRecentList', newSongList)
    },
        // 用户第一次登录初始化
    async initMusicDetail() {
      const newSongList = await (await newsong(12)).data.result
      // 加工数据
      const SongList = this.mixCurrentPlay(newSongList)
      localStorage.setItem('recentList_01', JSON.stringify(SongList))

      const musicId = newSongList[0].id
      localStorage.setItem('playerSong_01', musicId)

      const musicUrl = await (await getMusicUrl(musicId)).data.data[0].url

      localStorage.setItem('musicURL_01', musicUrl)
      localStorage.setItem('recentPlayIndex_01', 0)
      window.location.reload()
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_handle.scss';

.el-header {
  @include background_color("background_color1"); // 主题背景色
}
//  @include font_color("font_color1");   默认色
//  @include font_color("font_color2");   主题色

// @include border_color("border_color1"); 主题颜色的边框

.el-aside,.el-main,.el-footer {
   @include background_color("background_color2");
}

.el-main {
  @include font_color("font_color1");
}

::v-deep .el-footer {
  padding: none;
}
</style>

<style lang="scss">
@import "@/styles/_handle.scss";

.el-radio__input.is-checked+.el-radio__label {
  @include font_color("font_color2");
}

.el-radio__input.is-checked .el-radio__inner {
  @include background_color("background_color1");
  @include border_color("border_color1");
}

.el-date-table td.current:not(.disabled) span,.el-pagination.is-background .el-pager li:not(.disabled).active,.el-button--primary {
  @include background_color("background_color1");
}

.el-radio__inner:hover,.el-range-editor.is-active, .el-range-editor.is-active:hover, .el-select .el-input.is-focus .el-input__inner,.el-input.is-active .el-input__inner, .el-input__inner:focus,.el-textarea__inner:focus {
   @include border_color("border_color1");
}

.el-button:focus, .el-button:hover {
  @include border_color("border_color1");
}

.el-pagination.is-background .el-pager li:not(.disabled):hover { color: #606266!important;}
</style>
