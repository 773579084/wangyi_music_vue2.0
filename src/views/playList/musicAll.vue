<template>
  <div v-loading="loading">
    <el-table style="width: 100%; cursor: pointer;" lazy :data="musicList" @row-dblclick="playSongFn">
      <el-table-column label="序号" width="60">
        <template v-slot="{$index}">
          {{ $index > 8 ? $index + 1 : '0'+ ($index+1) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <svg class="icon collect-icon" aria-hidden="true">
          <use xlink:href="#icon-aixin" />
        </svg>
        <svg class="icon set-icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai" />
        </svg>
      </el-table-column>
      <el-table-column
        prop="name"
        label="标题"
        wiidth="400"
        show-overflow-tooltip
      />
      <el-table-column
        prop="artist"
        label="歌手"
        show-overflow-tooltip
      />
      <el-table-column
        prop="album"
        label="专辑"
        show-overflow-tooltip
      />
      <el-table-column
        prop="time"
        label="时间"
        width="100"
        show-overflow-tooltip
      />
    </el-table>
  </div>
</template>

<script>
import { getSongDetail, SongDetail } from '@/api/index'
import { mapActions } from 'vuex'

export default {
  props: {
    playListData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
        musicList: [],
        promiseControl: [],
        isPromise: true,
        loading: true
    }
  },
  created() {
   // 获取歌单歌曲详情
    this.getTrackAll()
    this.loading = false
  },
  beforeCreate() {
    Promise.reject(this.promiseControl)
  },
  methods: {
    // 播放音乐
    playSongFn(e) {
      this.saveMusic(e.id)
      this.saveRecentList(this.musicList)
    },
    async getTrackAll() {
      const trackIds = this.playListData.trackIds || []
      // 遍历请求数据
      for (let i = 0; i < trackIds.length; i++) {
        this.promiseControl.push(Promise.all([getSongDetail(trackIds[i].id)]))
      }

      this.promiseControl.forEach(item => {
          item.then(res => {
            this.musicList.push(new SongDetail(res[0].data.songs))
        })
      })
    },
    ...mapActions('playerSong', ['saveMusic', 'saveRecentList'])
  }
}
</script>

<style scoped lang='scss'>
.collect-icon {
  margin-right: 10px;
}
</style>
