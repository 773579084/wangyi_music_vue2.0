<template>
  <div>
    <musicTitle :title="title" />
    <div class="exclusive-music">
      <div v-for="item in exclusiveList" :key="'privatecontent'+item.id" class="box">
        <div class="img-show">
          <el-image class="cover" lazy :src="item.picUrl|imgSize('?param=365y160')" />
          <!-- 播放图标 -->
          <svg class="icon player-icon" aria-hidden="true">
            <use xlink:href="#icon-bofang" />
          </svg>
        </div>
        <!-- 底部字体展示 -->
        <span class="font-show">
          {{ item.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import musicTitle from '@/components/musicTitle.vue'
import { privatecontent } from '@/api/foundMusic/recommend'

export default {
    components: {
        musicTitle
    },
    data() {
        return {
            title: '',
            exclusiveList: []
        }
    },
    created() {
      this.getData()
    },
    methods: {
      async getData() {
        this.title = await (await privatecontent()).data.name
        this.exclusiveList = await (await privatecontent()).data.result
    //    console.log(await (await privatecontent()).data)
      }
    }
}

</script>

<style scoped lang='scss'>
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
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin-top: 8px;
      font-size: 18px;
    }
}
</style>
