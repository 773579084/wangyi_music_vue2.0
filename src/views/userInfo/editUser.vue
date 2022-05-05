<template>
  <div class="user-box">
    <h1>编辑个人信息</h1>
    <el-row type="flex">
      <el-col :span="14">
        <el-form abel-width="100px">
          <el-form-item label="昵称:">
            <el-input v-model="userDetail.nickname" placeholder="请输入昵称" />
          </el-form-item>
          <el-form-item label="介绍:">
            <el-input v-model="userDetail.signature" :rows="4" placeholder="请输入自我介绍" maxlength="300" show-word-limit type="textarea" />
          </el-form-item>
          <el-form-item label="生日：">
            <el-date-picker v-model="userDetail.birthday" style="width:85%" popper-class type="date" placeholder="您的生日" />
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group v-model="userDetail.gender">
              <el-radio :label="0">保密</el-radio>
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 地区 -->
          <el-form-item label="地区：">
            <el-select v-model="userDetail.province" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="userDetail.city" class="right-select" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <div class="btn">
            <el-button class="save" round>保存</el-button>
            <el-button round>取消</el-button>
          </div>

        </el-form>
      </el-col>
      <el-col :span="8" class="avatar-box">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <el-image v-if="imgAvatar" :src="imgAvatar|imgSize('?param=150y150')" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <div class="edit-avatar-btn">
          点击图片修改头像
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            imgAvatar: ''
        }
    },
    computed: {
        ...mapState('user', ['userDetail'])
    },
    created() {
        this.imgAvatar = this.userDetail.avatarUrl
    },
    methods: {
      handleAvatarSuccess(res, file) {
          console.log(76, file)
      }
    }
}
</script>

<style scoped lang='scss'>
@import '@/styles/_handle.scss';

.el-input,.el-textarea {
    width: 85%;
}

.save {
   color: white;
   @include background_color("background_color1");
   border: none;
}

.btn {
    margin-left: 55px;
}

.avatar-box {
    margin-left: 40px;

    .edit-avatar-btn {
        width: 150px;
        display: flex;
        justify-content: center;
        margin-top: 20px;
        font-size: 14px;
        color: #373737;
    }
}

.right-select {
    margin-left: 20px;
}

</style>
