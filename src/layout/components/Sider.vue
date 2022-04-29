<template>
  <div class="silder">
    <div @click="$router.push({name:'recommend'})">发现音乐</div>
    <div @click="$router.push({name:'podcast'})">博客</div>
    <div @click="$router.push({name:'video'})">视频</div>
    <div @click="$router.push({name:'focus'})">关注</div>
    <div @click="$router.push({name:'live'})">直播</div>
    <div @click="$router.push({name:'privateFM'})">私人FM</div>

    <i class="my-music">我的音乐</i>
    <!-- <div class="my-music"> -->
    <div class="download-local" @click="$router.push({name:'localDownload'})">
      <svg class="icon download" aria-hidden="true">
        <use xlink:href="#icon-xiazai" />
      </svg>
      <i>本地与下载</i>
    </div>
    <div @click="$router.push({name:'recentPlay'})">
      <svg class="icon player-icon" aria-hidden="true">
        <use xlink:href="#icon-guangqi_shijianshunxu" />
      </svg>
      <i>最近播放</i>
    </div>
    <!-- </div>   -->

    <span class="extend" @click="isShow = !isShow">
      <i>创建的歌单</i>
      <svg class="icon right-arrow" aria-hidden="true">
        <use xlink:href="#icon-ai23" />
      </svg>
      <svg class="icon add-music" aria-hidden="true">
        <use xlink:href="#icon-tianjia_huaban" />
      </svg>
    </span>
    <div v-show="isShow">我喜欢的音乐</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true
    }
  },
  methods: {

  }
}

</script>

<style scoped lang="scss">
@import '@/styles/_handle.scss';

.silder {
  padding-top: 10px;
}

.silder > div {
  font-size: 16px;
  line-height: 2;
  margin: 5px 0;
  @include font_color("font_color1");
  cursor: pointer;

  &:hover {
    font-weight: bold;
    background-color: #f5f5f6;
  }
}

.silder > .my-music {
  display: block;
  margin-top: 12px;
  line-height: 2;
  color: #9f9f9f;
  cursor: default;

  div {
    font-size: 14px;
    @include font_color("font_color1");
    line-height: 2.5;
    cursor: pointer;
  }
}

.my-music:hover > .download-local{
  font-weight: bold;
  background-color: #f5f5f6;
}

.download, .player-icon {
  width: 14px;
  height: 14px;
  margin-right: 4px;
  @include font_color("font_color1");
}

.player-icon{
  width: 16px;
  height: 16px;
}

.extend {
  display: block;
  margin-top: 12px;
  color: #9f9f9f!important;
  cursor: pointer;

  .right-arrow {
    width: 10px;
    height: 10px;
    margin-bottom: 3px;
    margin-left: 2px;
  }
}
.add-music {
  width: 14px;
  height: 14px;
  float: right;
  margin-top: 8px;
  color: #817a7a;
}
</style>
