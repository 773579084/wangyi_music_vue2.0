<template>
  <div>
    <musicTitle title="推荐歌单" />
    <div class="music-list">
      <div>
        <div class="music-box">
          <img src="@/assets/images/calendar_bg.png" class="day-background">
          <!-- 日历 -->
          <svg class="icon calendar-icon" aria-hidden="true">
            <use xlink:href="#icon-w_rili" />
          </svg>
          <span class="new-day">{{ newDay }}</span>
          <!-- 播放图标 -->
          <svg class="icon player-icon" aria-hidden="true">
            <use xlink:href="#icon-24gf-playCircle" />
          </svg>
          <!-- 上层遮罩 -->
          <div class="mask">
            根据您的音乐口味生成每日更新
          </div>
        </div>
        <!-- 底部字体展示 -->
        <span class="font-show">
          每日歌曲推荐
        </span>

      </div>
      <musicBox v-for="item in personalizedList" :key="item.id" :personalizeditem="item" @click.native=" goMusicList(item.id)" />
    </div>
  </div>
</template>

<script>
import { getPersonalized } from '@/api/foundMusic/recommend'
import musicBox from '@/components/musicBox.vue'
import musicTitle from '@/components/musicTitle.vue'

export default {
   components: {
    musicBox,
    musicTitle
  },
  data() {
  const day = (new Date()).getDate()

    return {
    newDay: day,
    personalizedList: []
    }
  },
  created() {
    this.getDate()
  },
  methods: {
    async getDate() {
    //  获取推荐歌单
    this.personalizedList = await (await getPersonalized(9)).data.result
    // console.log(await (await getPersonalized(9)).data)
    },
    // 跳转歌单详情
    goMusicList(id) {
      this.$router.push({
        path: '/playlist/musicAll',
        query: { id }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
@import '@/styles/index.scss';

   .music-list {
    @extend .m-show;
  }

   .music-box {
     position: relative;
    display: block;
    height: 230px;
    border-radius: 5%;
    background-color: skyblue;
    margin-bottom: 7px;
    cursor: pointer;
    overflow: hidden;

    &:hover {

      .player-icon {
        opacity: 1;
      }

      .mask {
        top: 0;
      }
    }

    .day-background {
      width: 100%;
      height: 100%;
      border-radius: 5%;
    }

    .calendar-icon {
      @extend .position-center;
      width: 60%;
      height: 60%;
      color: white;
    }

    .new-day {
      @extend .position-center;
      margin-top: 10%;
      color: white;
      font-size: 36px;
    }

    .player-icon {
      @extend .position-right-down-icon;
    }

    .mask {
      position: absolute;
      top: -65px;
      padding: 10px 8px;
      border-radius: 5%;
      background-color: rgba(0, 0, 0, 0.315);
      color: white;
      line-height: 1.4;
      transition:all 1.2s;
       cursor: pointer;
    }
  }

  .font-show {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 18px;
  }
</style>
