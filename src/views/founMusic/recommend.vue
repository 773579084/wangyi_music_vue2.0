<template>
  <div>
    <!-- 轮播图 -->
    <bannerVue />
    <!-- 推荐歌单 -->
    <recommendMusicListVue />
    <!-- 热门博客 -->
    <privatecontentVue />
    <!-- 最新音乐 -->
    <newsongVue />
    <!-- 推荐MV -->
    <recommendMVVue />
    <!-- 调整栏目顺序 -->
    <div class="adjust-box">
      <div class="font1">现在可以根据个人喜好，自由调整首页栏目顺序啦~</div>
      <div class="font2">
        调整栏目顺序
      </div>
    </div>
  </div>
</template>

<script>
import recommendMusicListVue from './recommendComponents/recommendMusicList'
import bannerVue from './recommendComponents/banner'
import privatecontentVue from './recommendComponents/privatecontent'
import newsongVue from './recommendComponents/newsong'
import recommendMVVue from './recommendComponents/recommendMV'

export default {
  components: {
    recommendMusicListVue,
    bannerVue,
    privatecontentVue,
    newsongVue,
    recommendMVVue
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/_handle.scss';

 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item--card{
    border-radius: 15px;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .adjust-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    margin-top: 40px;
    margin-bottom: 80px;

    .font1 {
      color: #9f9f9f;
      margin-bottom: 10px;
    }

    .font2 {
      width: 150px;
      height: 40px;
      border: 1px solid #fff;
      @include border_color("border_color1");
      text-align: center;
      line-height: 40px;
      border-radius: 5%;
      @include font_color("font_color2");  // 问题
      cursor: pointer;
    }
  }
</style>
