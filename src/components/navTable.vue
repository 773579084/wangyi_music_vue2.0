<template>
  <el-tabs v-model="activeName" @tab-click="routeGo(activeName)">
    <el-tab-pane v-for="(item,index) in tabRoutes" :key="index" :label="item.meta.name" :name="item.name">
      <!-- 路由展示区 -->
      <router-view v-if="isview" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    props: {
        navTableIndex: {
            type: Number, String,
            required: true
        },
        isview: {
          type: Boolean,
          required: false,
          default: true
        }
    },
    data() {
      return {
          activeName: '', // 导航栏默认选中
          tabRoutes: []
          }
    },
    created() {
        // console.log(this.$router.options.routes)
        // 获取 foundMusic 的所有子路由
        this.tabRoutes = this.$router.options.routes[this.navTableIndex].children[0].children
        // 默认选项为子路由第一个
        this.activeName = this.tabRoutes[0].name
    },
    beforeUpdate() {
      if (this.$router.history.current.path === '/home/foundMusic/recommend') {
        this.activeName = 'recommend'
      }
    },
    methods: {
        routeGo(routeName) {
          this.$router.push({ name: routeName })
        }
    }
  }

</script>

<style lang="scss">
@import '@/styles/index.scss';

::v-deep .el-tabs__nav-wrap {
  height: 0;
}
</style>

