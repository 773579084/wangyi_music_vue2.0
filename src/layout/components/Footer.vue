<template>
  <el-row class="footer">
    <!-- 左模块 -->
    <el-col :span="6">
      <el-row type="flex" justify="start">
        <musicDetailed />
      </el-row>
    </el-col>
    <!-- 中间模块 -->
    <el-col :span="12">
      <el-row type="flex" justify="center">
        <audioControl />
      </el-row>
    </el-col>
    <!-- 右模块 -->
    <el-col :span="6">
      <el-row>
        <rightControl />
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import musicDetailed from './footerComponents/musicDetailed.vue'
import audioControl from './footerComponents/audioControl.vue'
import rightControl from './footerComponents/rightControl.vue'

export default {
  components: {
    musicDetailed,
    audioControl,
    rightControl

  }
}
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
</style>
