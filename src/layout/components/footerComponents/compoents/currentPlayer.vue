<template>
  <div>
    <el-drawer
      :title="`当前播放`"
      :visible.sync="table"
      direction="rtl"
      size="40%"
      :modal="false"
      :before-close="handleClose"
      :append-to-body="true"
      :with-header="false"
    >
      <el-row class="current-title" style="">
        <h1 class="title">当前播放</h1>
        <el-col style="color:#cfcfcf" :span="14">{{ `共${recentPlay.length}首` }}</el-col>
        <el-col :span="6">
          <svg class="icon player-button" aria-hidden="true">
            <use xlink:href="#icon-xinjianwenjian" />
          </svg>
          收藏全部
        </el-col>
        <el-col style="color: #507daf;" :span="4">清空列表</el-col>
      </el-row>

      <!-- 当前音乐表单 -->
      <!-- :row-class-name="tableRowClassName" 给当前播放的音乐字体变色 -->
      <el-table
        ref="table"
        :data="recentPlay"
        stripe
        style="width: 100%; cursor: pointer;"
        lazy
        :row-class-name="tableRowClassName"
        @row-dblclick="playSongFn"
      >
        <el-table-column prop="index" width="60">
          <template v-slot="{$index}">
            {{ $index > 8 ? $index + 1 : '0'+ ($index+1) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="标题"
          width=""
          show-overflow-tooltip
        />
        <el-table-column
          prop="artist"
          label="歌手"
          width="180"
        />
        <el-table-column
          prop="time"
          label="时间"
          width="80"
        />
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  props: {
    table: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState('playerSong', ['recentPlay', 'recentPlayIndex'])
  },
  created() {
    // 调用vuex获取本地数据
    this.SAVERECENTLIST()
  },
  methods: {
    // 给当前播放的音乐字体变色
    tableRowClassName({ row, rowIndex }) {
      // console.log(81, this.recentPlayIndex, rowIndex)
      if (rowIndex === this.recentPlayIndex) {
        return 'warning-row'
      }
    },
    // 播放音乐
    playSongFn(e) {
      this.saveMusic(e.id)
      this.SAVERECENTLIST()
    },
    handleClose() {
      this.$emit('changeTableFn')
    },
    ...mapMutations('playerSong', ['SAVERECENTLIST']),
    ...mapActions('playerSong', ['saveMusic'])
  }
}
</script>

<style scoped lang='scss'>
@import '@/styles/index.scss';
@import '@/styles/_handle.scss';

.current-title {
  margin:0px 0 10px 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f3f3f3;
  cursor: pointer;

  .title {
      @include font_color("font_color1");
  }
}

// ::v-deep .el-table .warning-row {
//   color: $header-theme-color;
// }

::v-deep .el-drawer {
  padding: 60px 0 72px 0;
}

::v-deep .el-drawer__header {
  font-size: 25px;
  font-weight: bold;
    @include font_color("font_color1");
}

::v-deep .has-gutter {
  display: none;
}

::v-deep .el-drawer__body {
        // 修改滚动条样式
    &::-webkit-scrollbar {
        width: 5px;
        height: 1px;
    }

    // 滑块部分
    &::-webkit-scrollbar-thumb {
        background-color: #e1e1e1;
    }
}
</style>

<style lang="scss">
@import '@/styles/_handle.scss';

.el-table .warning-row {
  @include font_color("font_color2");
}
</style>
