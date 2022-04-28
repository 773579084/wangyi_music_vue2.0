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
  }
}
</script>

<style lang="scss">
::v-deep .el-footer {
  padding: none;
}
</style>
