<template>
  <div>
    <!-- 头部 -->
    <el-row type="flex">
      <el-col :span="6">
        <el-image :src="userDetail.avatarUrl|imgSize('?param=210y210')" alt="" />
      </el-col>
      <el-col class="userDetail-box" :span="18">
        <div class="top-Info">
          <div class="nickname">{{ userDetail.nickname }}</div>
          <el-row>
            <el-col :span="18">
              <span class="level">Lv{{ userDetail.level }}</span>
              <!-- 女 -->
              <em v-if="userDetail.gender === 2" class="gender2">
                <svg class="icon icon2" aria-hidden="true">
                  <use xlink:href="#icon-nv" />
                </svg>
              </em>
              <!-- 男 -->
              <em v-if="userDetail.gender === 1" class="gender0">
                <svg class="icon icon0" aria-hidden="true">
                  <use xlink:href="#icon-nan" />
                </svg>
              </em>
            </el-col>
            <el-col :span="6">
              <div class="edit-user" @click="goEidtUserFn">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bianji" />
                </svg>
                编辑个人信息
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 下半部分内容 -->
        <div class="focus-on">
          <div class="focus-child1">
            <div class="focus-math">{{ userDetail.authority }}</div>
            <div class="font-style">动态</div>
          </div>
          <div class="focus-child2">
            <div>{{ userDetail.follows }}</div>
            <div class="font-style">关注</div>
          </div>
          <div class="focus-child2 focus-child3">
            <div>{{ userDetail.followeds }}</div>
            <div class="font-style">粉丝</div>
          </div>
          <div class="quit-user edit-user" @click="logoutFn">
            退出登录
          </div>
        </div>
        <div class="font-color">
          所在地区:
        </div>
        <div class="font-color">
          <el-collapse>
            <el-collapse-item :title="`个人介绍：`" name="1">
              <div class="intro">{{ userDetail.signature }}</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import { getUserDetail, UserAccount, logout } from '@/api/user'

export default {
  data() {
    return {
      userId: '',
      userDetail: {
        authority: '',
        avatarUrl: '',
        birthday: '',
        city: '',
        followeds: '',
        follows: '',
        gender: '',
        level: '',
        nickname: '',
        province: '',
        signature: ''
      }
    }
  },
  created() {
    this.getUserData()
  },
  methods: {
    async getUserData() {
      this.userId = JSON.parse(localStorage.getItem('userDetail_01')).userId
      const res = await (await getUserDetail(this.userId)).data
      this.userDetail = new UserAccount(res)
      console.log(25, this.userDetail)
    },
        // 退出登录
    async logoutFn() {
      const res = await logout()
      console.log(278, res)
    },
    // 跳转编辑个人信息详情
    goEidtUserFn() {
      this.$router.push('/userInfo/editUser')
    }
  }
}
</script>

<style scoped lang='scss'>
@import '@/styles/_handle.scss';

.userDetail-box {
  position: relative;
  margin-left: 20px;

  .top-Info {
    padding-bottom: 7px;
    border-bottom: 2px solid #f0f0f0;
    margin-bottom: 7px;
  }

  .nickname {
    font-size: 22px;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .level {
    display: inline-block;
    width: 40px;
    height: 20px;
    font-size: 12px;
    @include font_color("font_color1");
    background-color: #f0f0f0;
    text-align: center;
    line-height: 20px;
    border-radius: 10px;
  }

  .gender2,.gender0 {
    position: absolute;
    left: 50px;
    top: 2px;
    width: 22px;
    height: 22px;
    display: inline-block;
    padding-left: 2px;

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

  .edit-user {
    width: 120xp;
    height: 30px;
    line-height: 30px;
    border: 1px solid #d8d8d8;
    border-radius: 15px;
    text-align: center;
    font-size: 14px;
    color:#373737;
    cursor: pointer;

    &:hover {
      background-color: #f2f2f2;
      color: #000;
    }
  }

  .focus-on {
    display: flex;
    margin-bottom: 12px;
    margin-top: 10px;

    .focus-child1 {
      width: 60px;
      display: flex;
      flex-direction: column;
      border-right: 2px solid #f6f6f6;
    }

    .focus-child2 {
      width: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-right: 2px solid #f6f6f6;
    }

    .focus-child3 {
      border: none;
    }

    .focus-math {
      width: 28px;
      text-align: center;
    }

    .font-style {
      font-size: 14px;
      color: #676767;
    }
  }

  .font-color{
    color:#373737;
    font-size: 14px;
    margin: 6px 0;
  }

  .quit-user {
    position: absolute;
    right: 0;
    top: 95px;
    width: 25%;
    color: white;
    @include background_color("background_color1");

    &:hover {
      color: white;
    }
  }
}

::v-deep .el-image__inner {
  border-radius: 999px;
  border: 1px solid #f6f6f6;
}

::v-deep .el-collapse-item__header,.el-collapse {
  font-size: 14px;
  border: none;
}

</style>
