<template>
  <div class="user-box">
    <h1>编辑个人信息</h1>
    <el-row type="flex">
      <el-col :span="14">
        <el-form ref="userList" :rules="userRules" :model="userList" abel-width="100px">
          <!-- 昵称 -->
          <el-form-item prop="nickname" label="昵称:">
            <el-input v-model="userList.nickname" placeholder="请输入昵称" />
          </el-form-item>

          <!-- 自我介绍 -->
          <el-form-item prop="signature" label="介绍:">
            <el-input
              v-model="userList.signature"
              :rows="4"
              placeholder="请输入自我介绍"
              maxlength="300"
              show-word-limit
              type="textarea"
            />
          </el-form-item>

          <!-- 生日 -->
          <el-form-item label="生日：">
            <el-date-picker
              v-model="userList.birthday"
              style="width: 85%"
              popper-class
              placeholder="您的生日"
            />
          </el-form-item>

          <!-- 性别 -->
          <el-form-item label="性别：">
            <el-radio-group v-model="userList.gender">
              <el-radio :label="0">保密</el-radio>
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 地区 -->
          <el-form-item label="地区：">
            <el-select
              v-model="userList.province"
              placeholder="请选择"
              @change="changeProvinceFn"
            >
              <el-option
                v-for="item in provinceArr"
                :key="item.adcode"
                :label="item.name"
                :value="item.adcode"
              />
            </el-select>
            <el-select
              v-model="userList.city"
              class="right-select"
              placeholder="请选择"
              @change="changeCityFn"
            >
              <el-option
                v-for="item in cityArr"
                :key="item.adcode"
                :label="item.name"
                :value="item.adcode"
              />
            </el-select>
          </el-form-item>

          <!-- 保存 取消 -->
          <div class="btn">
            <el-button class="save" round @click="saveUserFn">保存</el-button>
            <el-button round @click="cancelFn">取消</el-button>
          </div>
        </el-form>
      </el-col>

      <!-- 头像 -->
      <el-col :span="8" class="avatar-box">
        <el-upload
          action="#"
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="handleAvatarSuccessFn"
        >
          <el-image
            v-if="userList.imgAvatar"
            :src="userList.imgAvatar | imgSize('?param=150y150')"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <div class="edit-avatar-btn">点击图片修改头像</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import {
  getRegionApi,
  updateUserApi,
  getUserDetail,
  checkNicknameApi
} from '@/api/user'
import { msToDate } from '@/utils/tools'

export default {
  data() {
    return {
      userList: {
        userId: '',
        nickname: '',
        imgAvatar: '',
        province: '',
        city: '',
        signature: '',
        birthday: '',
        gender: ''
      },
      provinceArr: [],
      cityArr: [],
      provinceId: '', // 省 id
      cityId: '', // 市 id
      userRules: {
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'blur' },
          { min: 4, max: 30, message: '昵称为4~30个字，不可以包含除-和_意外的特殊字符', trigger: 'blur' }
        ],
        signature: [
          { max: 300, message: '介绍最多为300字，不要超出哦！', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('user', ['userDetail']),
    ...mapGetters(['token'])
  },
  watch: {
    userDetail: function() {
      this.getData(this.userDetail)
    }
  },
  created() {
    this.getData(this.userDetail)
    this.getProvinceFn()
    this.getCityFn(this.userList.province)
  },
  methods: {
    /* 初始化数据 */
    getData(data) {
      this.userList = { ...data }
      const timeData = msToDate(data.birthday)
      this.userList.birthday = timeData
    },
    /* 保存用户数据 */
    async saveUserFn() {
      this.$refs.userList.validate(async(valid) => {
        if (valid) {
          const birthday = new Date(this.userList.birthday).getTime()
          const gender = this.userList.gender
          const nickname = this.userList.nickname
          const province = this.userList.province
          const city = this.userList.city
          const signature = this.userList.signature
          const cookie = this.token

          const updateList = {}
          let duplicated = ''

          if (gender !== this.userDetail.gender) {
            updateList.gender = gender
          }
          if (birthday !== this.userDetail.birthday) {
            updateList.birthday = birthday
          }
          if (nickname !== this.userDetail.nickname) {
            updateList.nickname = nickname
            console.log(146)
            duplicated = await (await checkNicknameApi(nickname)).data.duplicated
          }
          if (province !== this.userDetail.province) {
            updateList.province = province
          }
          if (city !== this.userDetail.city) {
            updateList.city = city
          }
          if (signature !== this.userDetail.signature) {
            updateList.signature = signature
          }

          if (duplicated) {
            this.$message({
              message: '昵称已被占用！',
              type: 'warning',
              offset: 80
            })
            return
          }

          const res = await updateUserApi(updateList, cookie)
          if (res.data.code === 200) {
            this.$message({
              message: '修改成功！',
              type: 'success',
              offset: 80
            })
            /* 更新vuex user里的数据 */
            const userList = await (
              await getUserDetail(this.userList.userId)
            ).data.profile
            this.saveUserDetail(userList)
          }
        }
      })
    },
    /* 获得省级区域 */
    async getProvinceFn() {
      const resProvince = await (
        await getRegionApi('', '')
      ).data.districts[0].districts
      this.provinceArr = resProvince
    },
    /* 获得城市list */
    async getCityFn(data) {
      const resCity = await (
        await getRegionApi(data, '')
      ).data.districts[0].districts
      this.cityArr = resCity
      this.userList.city = resCity[0].name
    },
    /* 拿到 省 */
    changeProvinceFn(e) {
      this.provinceId = e
      this.getCityFn(this.userList.province)
    },
    /* 拿到 市 */
    changeCityFn(e) {
      this.cityId = e
    },
    /* 头像上传触发 */
    handleAvatarSuccessFn(res, file) {
      console.log(76, file)
    },
    /* 取消按钮 */
    cancelFn() {
      this.$router.push('/userInfo/')
      /* 清空cookie 用户数据*/
      
    },
    /* vuex */
    ...mapActions('user', ['saveUserDetail'])
  }
}
</script>

<style scoped lang='scss'>
@import "@/styles/_handle.scss";

.el-input,
.el-textarea {
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

::v-deep .el-textarea__inner {
  margin-left: 10px;
}

::v-deep .el-radio__input.is-checked+.el-radio__label,.el-radio__input.is-checked .el-radio__inner {
  @include font_color("font_color2");
}

::v-deep .el-button:focus{
  color: #606266!important;;
}

::v-deep .el-button:focus, .el-button:hover {
  color: #606266!important;;
}
</style>
