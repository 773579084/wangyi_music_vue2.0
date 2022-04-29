<template>
  <div class="comment-box">
    <el-row v-for="(item,index) in detailComments" :key="index" class="comment-list">
      <el-col :span="1">
        <div class="left">
          <el-image lazy class="avatar" :src="item.user.avatarUrl|imgSize('?param=40y40')" />
        </div>
      </el-col>
      <el-col style="margin-left: 12px;font-size:12px;" :span="22">
        <i style="font-size:12px;color:#507dbe;">{{ item.user?item.user.nickname:"xxx" }}</i>：{{ item.content }}
        <el-col v-if="commentTreeFn(item.beReplied)" class="tree-box">
          <i class="tree-nickname">@  {{ item.beReplied[0].user.nickname }}</i>:{{ item.beReplied[0].content }}
        </el-col>
        <div style="margin-top:4px">
          {{ item.time|changeTimeAll(item.time) }}
          <div style="float:right">
            <svg class="icon  three-icon" aria-hidden="true">
              <use xlink:href="#icon-dianzan" />
            </svg>
            {{ item.likedCount===0?'': item.likedCount }}
            |
            <svg class="icon three-icon" aria-hidden="true">
              <use xlink:href="#icon-fenxiang" />
            </svg>
            |
            <svg class="icon three-icon" aria-hidden="true">
              <use xlink:href="#icon-pinglun" />
            </svg>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    props: {
        detailComments: {
            type: Array, Object,
            required: true
        }
    },
    methods: {
        // 用于判定嵌套评论隐藏 - 显示
        commentTreeFn(beReplied) {
            return beReplied.length
        }
    }
}
</script>

<style scoped lang='scss'>
.comment-box {
  margin-top: 160px;
}

.comment-list {
  padding: 20px 0;
  border-bottom: 1px solid #f2f2f2;

  .tree-box {
    background-color: #f4f4f4;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
  }

  .tree-nickname {
    font-size:12px;
    color:#507dbe;
  }

  .three-icon {
    width: 14px;
    height: 14px;
  }

  .left {
    width: 40px;
    height: 40px;

    .avatar {
      width: 40px;
      height: 40px;
      margin-right: 20px;
      border-radius: 999px;
    }
}
}

</style>
