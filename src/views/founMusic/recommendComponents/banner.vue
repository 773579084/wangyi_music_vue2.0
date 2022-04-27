<template>
  <el-carousel :interval="4000" type="card" height="230px">
    <el-carousel-item v-for="(item,index) in banners" :key="index">
      <img class="banner-img" :src="item.imageUrl">
      <div class="banner-title">{{ item.typeTitle }}</div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { getBanner } from '@/api/foundMusic/recommend'

export default {
  data() {
    return {
      banners: []
    }
  },
 created() {
      this.getData()
  },
  methods: {
    async getData() {
     //  imageUrl 图片地址  typeTitle 图片标题 titleColor 标题颜色
     const res = await (await getBanner()).data.banners
     this.banners = res
    }
  }
}
</script>

<style scoped lang='scss'>
@import '@/styles/index.scss';

  .banner-img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .banner-title {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 777;
    @extend .fc;
    width: 60px;
    height: 25px;
    border-radius: 10px;
    font-size: 12px;
    color: white;
    background-color: $header-theme-color;
  }
</style>
