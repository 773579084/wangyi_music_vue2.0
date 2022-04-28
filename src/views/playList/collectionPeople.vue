<template>
  <div style="margin-top:25px">
    <el-row>
      <el-col :span="24">
        <!-- 收藏者 box -->
        <div v-for="item in collectors" :key="item.userId" class="collect-box">
          <el-col :span="2" class="avatar">
            <el-image lazy :src="item.avatarUrl|imgSize('?param=100y100')" />
          </el-col>
          <el-col :span="22" class="nick-name">
            <i>{{ item.nickname }}</i>
            <!-- 女 -->
            <em v-if="item.gender === 2" class="gender2">
              <svg class="icon icon2" aria-hidden="true">
                <use xlink:href="#icon-nv" />
              </svg>
            </em>
            <!-- 男 -->
            <em v-if="item.gender === 0" class="gender0">
              <svg class="icon icon0" aria-hidden="true">
                <use xlink:href="#icon-nan" />
              </svg>
            </em>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSubApi } from '@/api/playList'

export default {
  data() {
    return {
      collectors: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.collectors = await (await (await getSubApi(localStorage.getItem('musicDetailId_01', 30))).data.subscribers)
      // console.log(29, await getSubApi(localStorage.getItem('musicDetail_01', 100)))
    }
  }
}
</script>

<style scoped lang='scss'>
.collect-box {
  display: flex;
  justify-content: center;
  float: left;
  width: 50%;
  margin: 10px 0;

  .nick-name {
    display: flex;
    align-items: center;
    margin-left:10px
  }

  .avatar {
     width: 100px;
     height: 100px;
     border-radius: 999px;
  }

  .gender2,.gender0 {
    width: 22px;
    height: 22px;
    display: inline-block;
    padding-left: 2px;
    margin-left: 10px;

    .icon0 {
      color: #359ccf;
    }

    .icon2 {
      color: #e64887;
    }
  }

  .gender0 {
    background-color: #c0f3ff;
    border-radius: 999px;
  }

  .gender2 {
    background-color: #ffcde8;
    border-radius: 999px;
  }
}

::v-deep .el-image__inner {
            width: 100%;
            height: 100%;
            border-radius: 999px;
     }
</style>
