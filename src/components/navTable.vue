<template>
  <div>
    <el-menu :default-active="activeName" class="el-menu-demo tab" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="(item,index) in tabRoutes" :key="index" :index="item.name ">{{ item.meta.name }}
      </el-menu-item>
    </el-menu>
    <router-view v-if="isview" />
  </div>
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
          activeName: 'recommend', // 导航栏默认选中
          tabRoutes: []
          }
    },
    created() {
        // 获取 foundMusic 的所有子路由
        this.tabRoutes = this.$router.options.routes[this.navTableIndex].children[0].children
        // 调用判定当前路由 改变table栏
        this.selectActive()
    },
    methods: {
        handleSelect(routeName) {
          this.$router.push({ name: routeName })
        },
        selectActive() {
          const path = this.$route.path
          this.activeName = path.split('/')[2]
        }
    },
    beforeRouteEnter(to, from, next) {
      console.log(47, from)
    }
  }

</script>

<style lang="scss">
@import '@/styles/_handle.scss';

.tab {
  margin-bottom: 20px;
}

.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 2px solid #91067e;
  @include border_color("border_color1")

}
</style>

