<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%;height: auto;"
  >
    <el-table-column
      prop="index"
      label=""
    />
    <el-table-column
      prop="name"
      label="操作"
    />
    <el-table-column
      prop="address"
      label="标题"
    />
    <el-table-column
      prop="address"
      label="歌手"
    />
    <el-table-column
      prop="address"
      label="专辑"
    />
    <el-table-column
      prop="address"
      label="时间"
    />
  </el-table>
</template>

<script>
import { getTrackAll } from '@/api/playList'

export default {
  props: {
    playListData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
       tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市'
        }]
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
        console.log(73, await getTrackAll(trackIds[i].id))
      }
    }
  }
}
</script>

<style scoped lang='scss'></style>
