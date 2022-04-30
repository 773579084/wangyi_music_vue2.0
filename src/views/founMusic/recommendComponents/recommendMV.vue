<template>
  <div>
    <musicTitle title="推荐MV" />
    <div class="exclusive-music">
      <div v-for="item in exclusiveList" :key="'recommendMV'+item.id" class="box">
        <div class="img-show">
          <el-image class="cover" lazy :src="item.picUrl|imgSize('?param=365y160')" />
          <!-- 播放数量显示 -->
          <em class="play-number">
            <svg class="icon set-icon" aria-hidden="true">
              <use xlink:href="#icon-ai23" />
            </svg>
            <span>{{ item.playCount|playerNumber }}</span>
          </em>
        </div>
        <!-- 底部字体展示 -->
        <span class="font-show">
          <div class="music-name">{{ item.name }}</div>
          <div class="author">{{ item.artistName }}</div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import musicTitle from '@/components/musicTitle.vue'
import { recommendMV } from '@/api/foundMusic/recommend'

export default {
    components: {
        musicTitle
    },
    data() {
        return {
            exclusiveList: []
        }
    },
    created() {
      this.getData()
    },
    methods: {
      async getData() {
        this.exclusiveList = await (await recommendMV()).data.result.splice(1)
      //  console.log(await (await recommendMV()).data)
      }
    }
}

</script>

<style scoped lang='scss'>
@import '@/styles/_handle.scss';

.exclusive-music {
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    .box {
        position: relative;
        width: 31%;

        .player-icon{
            position: absolute;
            top: 0;
            left: 0;
            width: 25px;
            height: 25px;
            margin: 5px;
            color: white;
        }
    }

    .font-show {
      margin-top: 8px;
      font-size: 18px;

      .music-name{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        @include font_color("font_color1");
      }

      .author {
        font-size: 12px;
        color: #676767;
      }
    }

    .play-number {
      position: absolute;
      top: 0;
      right: 20px;
      color: white;
      margin: 5px;
      margin-top: 7px;
      margin-right: 9px;

      .set-icon{
          margin-right: 3px;
      }
    }

}
</style>
