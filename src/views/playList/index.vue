<template>
  <div>
    <!-- 头部 -->
    <headerVue :play-list-data="playListData" />
    <!-- 导航栏 -->
    <div class="navBar">
      <navTableVue :nav-table-index="navTableIndex" class="nav" :isview="false" />
      <input v-show="$route.name==='musicAll'" v-model="inputValue" placeholder="搜索歌单音乐" class="search">
      <svg v-show="$route.name==='musicAll'" class="icon set-icon search-icon" aria-hidden="true">
        <use xlink:href="#icon-Magnifier" />
      </svg>
    </div>
    <router-view v-if="isGetData" class="view" :play-list-data="playListData" />
    <!-- 回到顶部 -->
    <goTopVue />
  </div>
</template>

<script>
import headerVue from './components/header'
import navTableVue from '@/components/navTable.vue'
import { getDetail } from '@/api/playList'
import goTopVue from '@/components/goTop.vue'

export default {
    components: {
        headerVue,
        navTableVue,
        goTopVue
    },
    data() {
      return {
        navTableIndex: 2, // 更加路由渲染navTab
        inputValue: null,
        playListData: {},
        isGetData: false // 初始为false，就不会被渲染对应的子组件
      }
    },
    created() {
      this.isRouterChildren = true
      const id = localStorage.getItem('musicDetail_01') || ''
      this.getData(id)
    },
    beforeDestroy() {

    },
    methods: {
      async getData(id) {
        this.playListData = await (await getDetail(id)).data.playlist
        this.isGetData = true
      }
    }
}
</script>

<style scoped lang='scss'>
@import '@/styles/index.scss';

.nav{
  margin-left: 20px;
  margin-top: 30px;
}

.view{
  padding-left: 20px;
  padding-bottom: 40px;
}

.navBar {
  position: relative;

  .search {
     position: absolute;
     top: 2px;
     right: 0;
     width: 200px;
     height: 30px;
     padding:0 30px 0 15px;
     border-radius: 15px;
     background-color:#f7f7f7;
     border: none;
     outline:none
  }

  .search-icon {
    position: absolute;
    top: 9px;
    right: 9px;
  }

}

</style>
