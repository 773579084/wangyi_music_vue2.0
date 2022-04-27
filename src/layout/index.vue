<template>
  <el-container>
    <!--header-->
    <el-header style="height: 60px">
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
    <musicDetailedVue />
  </el-container>
</template>

<script>
import Header from './components/Header.vue'
import Sider from './components/Sider.vue'
import Content from './components/Content.vue'
import Footer from './components/Footer.vue'
import musicDetailedVue from './components/footerComponents/musicDetailed.vue'

export default {
  components: {
    Header,
    Sider,
    Content,
    Footer,
    musicDetailedVue
  }
}
</script>

<style lang="scss">

</style>
