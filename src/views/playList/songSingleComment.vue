<template>
  <el-row>
    <el-col :span="24">
      <el-input
        v-model="musicDetailComment"
        :rows="3"
        type="textarea"
        class="comment-frame"
        placeholder="请输入内容"
        maxlength="140"
        show-word-limit
      />
      <div>
        <svg class="icon aite-icon" aria-hidden="true">
          <use xlink:href="#icon-aite" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jinghao" />
        </svg>
        <el-button class="comment" round size="small">评论</el-button>
      </div>
    </el-col>
    <!-- 用户评论区 -->
    <el-col :span="24" style="margin:25px 0 12px 0">最新评论 ({{ playListData.commentCount }})</el-col>
    <!-- 评论区 -->
    <commentVue v-if="isCom" :detail-comments="detailComments" />
    <!-- 分页按钮 -->
    <el-col :span="24" class="pages">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="limit"
        :current-page="offset"
        :total="total"
        @current-change="currentChangeFn"
      />
    </el-col>
  </el-row>
</template>

<script>
import { getCommentsApi } from '@/api/playList'
import commentVue from '@/components/comment'

export default {
  components: {
    commentVue
  },
  props: {
    playListData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      musicDetailComment: null, // 用户评论
      detailComments: [],
      isCom: false,
      isTree: false, // 控制评论嵌套
      limit: 20, // 控制每一页展示的数量
      offset: 1, // 控制分页
      total: null // 歌单评论数
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    async getComments() {
      const detailId = localStorage.getItem('musicDetail_01')
      // 获取总按钮数
      this.total = this.playListData.commentCount
      // 请求数据 offset ->页数
      this.detailComments = await await (await getCommentsApi(detailId, this.limit, this.offset)).data.comments
      this.isCom = true
      // console.log(58, await (await getCommentsApi(detailId, 20, 2)).data.comments)
    },
    // 用于控制分页器变动
    currentChangeFn(offset) {
      this.offset = offset
      // 重新渲染数据
      this.getComments()
    }
  }
}
</script>

<style scoped lang='scss'>
.comment-frame {
    border-radius: 5px;
    margin-top: 20px;
    margin-bottom: 10px;
}

.aite-icon {
  margin-right: 10px;
}

.el-row {
  padding-right: 0;
}

.comment {
  float: right;
}

.pages {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
