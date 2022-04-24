<template>
  <el-table :data="musicList">
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
      prop="album"
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
      prop="name"
      label="专辑"
      show-overflow-tooltip
    />
    <el-table-column
      prop="time"
      label="时间"
      width="100"
    />
  </el-table>
</template>

<script>
import { getSongDetail, SongDetail } from '@/api/index'

export default {
  props: {
    playListData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
        musicList: []
    }
  },
  created() {
  // 获取歌单歌曲详情
    this.getTrackAll()
  },
  methods: {
    async getTrackAll() {
      const trackIds = this.playListData.trackIds || []
      for (let i = 0; i < trackIds.length; i++) {
        const res = await getSongDetail(trackIds[i].id)
        const song = new SongDetail(res.data.songs)
        this.musicList.push(song)
      }
      // console.log(78, this.musicList)
    }
  }
}
</script>

<style scoped lang='scss'>
.collect-icon {
  margin-right: 10px;
}
</style>
