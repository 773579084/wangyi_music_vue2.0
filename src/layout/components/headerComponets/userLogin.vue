<template>
  <div>
    <div class="user-login" @click="openLoginFn">
      <!-- 个人中心头像 -->
      <div class="user-avatar">
        <img :src="userDetail.avatarUrl|imgSize('?param=30y30')" alt="">
        <svg class="icon user-icon" aria-hidden="true">
          <use xlink:href="#icon-tubiao_yonghu" />
        </svg>
      </div>
      <span class="no-login">
        <span>{{ userDetail.nickname?userDetail.nickname:'未登录' }} </span>
        <svg class="icon down-arrow" aria-hidden="true">
          <use xlink:href="#icon-xiajiantou" />
        </svg>
      </span>
    </div>

    <!-- 登录 -->
    <el-card v-if="isShowBoolean" shadow="always" class="box-card login-box">
      <!-- 关闭 -->
      <svg class="icon close-icon" aria-hidden="true" @click="closeLoginFn">
        <use xlink:href="#icon-tianjia_huaban" />
      </svg>

      <!-- 扫码登录 -->
      <div v-show="isShowIndex === 1" class="scan-code">
        <div class="scan-title">扫码登录</div>
        <img class="scan-img" :src="qrImg">
        <div v-show="isError" class="scan-mask">
          <p>二维码已失效</p>
          <el-button type="primary" @click="clickFlush">点击刷新</el-button>
        </div>
        <p class="scan-p">
          使用
          <a
            :href="qrurl"
            target="_blank"
            style="color:#1d7bc7;"
          >网易云音乐App
          </a>
          扫码登录
        </p>
        <div class="scan-jump" @click="goPhoneLoginFn">
          选择其他方式登录
          <svg class="icon right-arrow" aria-hidden="true">
            <use xlink:href="#icon-zuo" />
          </svg>
        </div>
      </div>

      <!-- 手机号码登录 -->
      <div v-show="isShowIndex === 2" class="phone-login">
        <!-- 扫码页跳转 -->
        <div class="go-code" @click="goScanCodeLoginFn">
          <svg class="icon right-arrow" aria-hidden="true">
            <use xlink:href="#icon-zuo" />
          </svg>
          扫码登录
        </div>

        <div class="img-box">
          <img class="login-img" src="@/assets/images/wangyi-login.png">
        </div>
        <!-- form -->
        <div style="width:80%" class="form-login">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
            <el-form-item prop="loginPhone">
              <svg class="icon login-arrow" aria-hidden="true">
                <use xlink:href="#icon-shouji" />
              </svg>
              <el-input v-model="loginForm.loginPhone" type="text" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item prop="loginPass">
              <svg class="icon login-arrow" aria-hidden="true">
                <use xlink:href="#icon-mima" />
              </svg>
              <el-input v-model="loginForm.loginPass" type="password" placeholder="请输入密码" />
            </el-form-item>
            <div class="login-button" @click="LoginFn">登录</div>

            <div class="go-register" @click="goRegisterFn">注册 </div>

            <!-- 第三方登录 -->
            <div class="other-login">
              <div class="other-icon icon-weixin">
                <svg class="icon other-wei" aria-hidden="true">
                  <use xlink:href="#icon-weixin" />
                </svg>
              </div>
              <div class="other-icon icon-qq">
                <svg class="icon other-wei " aria-hidden="true">
                  <use xlink:href="#icon-qq" />
                </svg>
              </div>
              <div class="other-icon icon-xinlang">
                <svg class="icon other-wei" aria-hidden="true">
                  <use xlink:href="#icon-weibo" />
                </svg>
              </div>
            </div>

          </el-form>
        </div>
      </div>

      <!-- 注册 -->
      <div v-show="isShowIndex === 3" class="phone-login">
        <!-- 返回 phone login -->
        <div class="go-code" @click="goLoginFn">
          <svg class="icon right-arrow" aria-hidden="true">
            <use xlink:href="#icon-zuo" />
          </svg>
          返回登录
        </div>

        <div class="img-box">
          <img class="login-img" src="@/assets/images/wangyi-login.png">
        </div>
        <!-- form -->
        <div style="width:80%" class="form-login">
          <el-form ref="registerForm" :rules="RegisterRules" :model="RegisterForm">
            <el-form-item prop="RegisterPhone">
              <svg class="icon login-arrow" aria-hidden="true">
                <use xlink:href="#icon-shouji" />
              </svg>
              <el-input v-model="RegisterForm.RegisterPhone" type="text" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item prop="RegisterPass">
              <svg class="icon login-arrow" aria-hidden="true">
                <use xlink:href="#icon-mima" />
              </svg>
              <el-input v-model="RegisterForm.RegisterPass" type="password" placeholder="设置登录密码" />
            </el-form-item>
            <div class="login-button" @click="RegisterFn">注册</div>

            <div class="other-register">其他注册方式 </div>

            <!-- 第三方登录 -->
            <div class="other-login">
              <div class="other-icon icon-weixin">
                <svg class="icon other-wei " aria-hidden="true">
                  <use xlink:href="#icon-weixin" />
                </svg>
              </div>
              <div class="other-icon icon-qq">
                <svg class="icon other-wei " aria-hidden="true">
                  <use xlink:href="#icon-qq" />
                </svg>
              </div>
              <div class="other-icon icon-xinlang">
                <svg class="icon other-wei " aria-hidden="true">
                  <use xlink:href="#icon-weibo" />
                </svg>
              </div>
            </div>
          </el-form>

        </div>
      </div>

      <!-- 待确认 -->
      <div v-show="isShowIndex === 4" class="phone-login wait-confirm">
        <h1>扫码登录</h1>
        <div class="img-box">
          <img class="login-img" src="@/assets/images/wangyi-login.png">
        </div>
        <div class="font1">扫描成功</div>
        <div class="font2">请在手机确认登录</div>
      </div>

      <!-- 验证码 -->
      <div v-show="isShowIndex === 6" class="phone-login">
        <!-- 返回 phone login -->
        <div class="go-code" @click="goLoginFn">
          <svg class="icon right-arrow" aria-hidden="true">
            <use xlink:href="#icon-zuo" />
          </svg>
          返回登录
        </div>

        <div class="img-box">
          <img class="login-img" src="@/assets/images/wangyi-login.png">
        </div>
        <div class="font3">为了安全，我们会向你的手机发送短信校验码</div>
        <div class="auth-code">
          <input v-model="authCode" class="auth-input" placeholder="请填写验证码" type="text">
          <button v-show="isShowCode" disabled class="backward-time">00:{{ countDown > 9 ? countDown : '0' + countDown }}</button>
          <button v-show="!isShowCode" style="background-color:#ec4141;color: white;" class="backward-time" @click.prevent="againSendFn">重新发送</button>
        </div>
        <div class="login-button" @click="authCodeFn">下一步</div>
      </div>

    </el-card>

  </div>
</template>

<script>
import { valudMobile, valudPass } from '@/utils/validate'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import { getQRKey, createQR, sendAuthCode, checkAuthCode, checkPhoneRegister, phoneLoginApi, userAccount } from '@/api/user'
import request from '@/utils/request'

export default {
  data() {
    return {
      // 登录
      loginForm: {
        loginPhone: null,
        loginPass: null
      },
      loginRules: {
        loginPhone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          {
            pattern: valudMobile(),
            message: '手机号码格式不正确',
            trigger: 'blur'
          }
        ],
        loginPass: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            pattern: valudPass(),
            message: '长度至少为8，含有一个字母和一个数字',
            trigger: 'blur'
            }
        ]
      },
      // 注册
      RegisterForm: {
        RegisterPhone: null,
        RegisterPass: null
      },
      RegisterRules: {
        RegisterPhone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          {
            pattern: valudMobile(),
            message: '手机号码格式不正确',
            trigger: 'blur'
          }
        ],
        RegisterPass: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            pattern: valudPass(),
            message: '长度至少为8，含有一个字母和一个数字',
            trigger: 'blur'
           }
        ]
      },
      isShowIndex: 1, // 控制登录模式切换 1为扫码 2手机登录 3为注册 4为待确认  6验证码
      isError: false, // 二维码失效
      qrImg: null, // base64 二维码
      qrurl: null, // 跳转到网易官网登录
      authCode: '', // 用户输入验证码
      countDown: 60, // 倒计时
      isShowCode: true, // true:倒计时 false：重新发起请求
      timer: null, // 验证码定时器
      codeTimer: null // 轮询定时器
    }
  },
  computed: {
    ...mapState('user', ['isShowBoolean', 'userDetail', 'isLogin']),
    ...mapGetters(['userId'])
  },
  watch: {
    isShowBoolean: function() {
      if (this.isShowBoolean) {
        this.getQRFn()
      } else {
        clearTimeout(this.codeTimer)
      }
    }
  },
  created() {
    if (localStorage.getItem('userDetail_01')) { this.SAVEUSERDETAIL() }
    this.USERSTATE()
    if (this.userId) { this.CONTROLROUTES() }
  },
  methods: {
    // 重新发送验证码http请求
    againSendFn() {
      this.isShowCode = true
      this.countDown = 60
      this.authCode = ''
      this.timer = setInterval(() => {
        this.countDown--
        if (this.countDown === 0) {
          clearInterval(this.timer)
          this.isShowCode = false
        }
      }, 1000)
    },
    // 验证码发起成功后回调
    async authCodeFn() {
      if (this.authCode.length !== 0) {
        clearInterval(this.timer)
        this.countDown = 60
        const res = await (await checkAuthCode(this.RegisterForm.RegisterPhone, this.authCode)).data.data
        if (res) {
          // 判断 手机号 是否已经 注册
          const res = await (await checkPhoneRegister(this.RegisterForm.RegisterPhone)).data
          if (res.exist === 1) {
            // 已注册
            this.isShowIndex = 2
            // 清空注册数据
            this.RegisterForm = {
              RegisterPhone: null,
              RegisterPass: null
            }
            this.authCode = ''
            // 提示用户已注册
            this.$message({
            message: '该手机号码已注册，用户名称：' + res.nickname,
            type: 'warning',
            offset: 80
          })
          } else {
            // 未注册，跳转login -- 此模块未详细做，没有新手机号码测试
            this.isShowIndex = 2
          }
        } else {
          this.$message({
            message: '注册失败',
            type: 'warning',
            offset: 80
          })
        }
      } else {
        this.authCode = ''
        this.$message({
          message: '请勿输入空字符',
          type: 'warning',
          offset: 80
        })
      }
    },
    // login
    LoginFn() {
      this.$refs.loginForm.validate(async(valid) => { //
        if (valid) {
          const res = await (await phoneLoginApi(this.loginForm.loginPhone, this.loginForm.loginPass)).data
          // 存储用户数据
          this.saveUserDetail(res.profile)
          // 存储cookie
          this.loginSuccessFn(res.cookie)
          this.controlRoutes(true)
          // 清除数据
          this.loginForm = {
            loginPhone: null,
            loginPass: null
          }
          clearTimeout(this.codeTimer)
          window.location.reload()
        }
      })
    },
    // 登录成功后调用
    loginSuccessFn(cookie) {
      this.$message({
        message: '恭喜你，登录成功',
        type: 'success',
        offset: 80
      })
      // 存储cookie
      this.saveCookie(cookie)
      clearTimeout(this.codeTimer)
      this.isShowIndex = 1
      this.userState(true)
      // 关闭登录页面
      this.isShowFn(false)
    },
    // 注册
    RegisterFn() {
      this.$refs.registerForm.validate(async(valid) => { //
        if (valid) {
          this.isShowIndex = 6
          // 发起请求验证码
          await sendAuthCode(this.RegisterForm.RegisterPhone)

          this.timer = setInterval(() => {
            this.countDown--
            if (this.countDown === 0) {
              clearInterval(this.timer)
              this.isShowCode = false
            }
          }, 1000)
        }
      })
    },
    // 二维码登录
    async getQRFn() {
      const unikey = await (await getQRKey()).data.data.unikey
      const qrRes = await (await createQR(unikey)).data.data
      this.qrImg = qrRes.qrimg
      this.qrurl = qrRes.qrurl
      // 轮询 二维码登录状态
      const res = await this.polling('get', '/login/qr/check', unikey)
      if (res.data.code === 800) { // 失效
        console.log(800, res)
        this.isShowIndex = 1
        this.isError = true
      } else if (res.data.code === 803) { // 成功
        this.loginSuccessFn(res.data.cookie)
        const userDetail = await userAccount(this.$store.getters.token)
        this.saveUserDetail(userDetail.data.profile)
        this.controlRoutes(true)
        clearTimeout(this.codeTimer)
        window.location.reload()
      }
    },
    // 轮询
    polling(type, url, key, delay = 1000) {
      return new Promise((resolve, reject) => {
        request({
          type,
          url,
          withCredentials: true,
          params: {
            key,
            t: Date.now()
          }
        }).then(res => {
          if (res.data.code === 800) {
            clearTimeout(this.codeTimer)
            resolve(res)
          } else if (res.data.code === 801) {
            console.log(58)
            this.codeTimer = setTimeout(() => {
              resolve(this.polling(type, url, key, delay))
            }, delay)
          } else if (res.data.code === 802) {
            this.codeTimer = setTimeout(() => {
              resolve(this.polling(type, url, key, delay))
            }, delay)
            console.log(64)
            this.isShowIndex = 4
          } else if (res.data.code === 803) {
            resolve(res)
          }
        })
      })
    },
    // 二维码过期 点击重新刷新
    clickFlush() {
      this.isError = false
      this.getQRFn()
    },
    // 关闭 登录
    closeLoginFn() {
      clearTimeout(this.codeTimer)
      this.isShowFn(false)
    },
    openLoginFn() {
      if (this.isLogin) {
        this.$router.push('/userInfo/')
      } else {
        this.isShowFn(true)
      }
    },
    // 控制注册 登录跳转
    goPhoneLoginFn() {
      this.isShowIndex = 2
    },
    goScanCodeLoginFn() {
      this.isShowIndex = 1
    },
    goRegisterFn() {
      this.isShowIndex = 3
    },
    goLoginFn() {
      clearInterval(this.timer)
      this.countDown = 60
      this.isShowIndex = 2
    },
    ...mapActions('user', ['isShowFn', 'saveUserDetail', 'saveCookie', 'userState', 'controlRoutes']),
    ...mapMutations('user', ['SAVEUSERDETAIL', 'USERSTATE', 'CONTROLROUTES'])
  }
}
</script>

<style scoped lang="scss">
.user-login {
  display: flex;
  align-items: center;
  cursor: pointer;

  .user-avatar {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    border-radius: 9999px;
    width: 30px;
    height: 30px;
    margin-right: 7px;
    background-color: #e0e0e0;

   .user-icon{
     width: 22px;
     height: 22px;
   }
  }

  .no-login {
    position: relative;
    color: #fad5d5;

    span {
      margin-right: 4px;
    }

    .down-arrow{
      position: absolute;
      top: 2px;
      width: 12px;

    }

    &:hover {
      color: white;
    }
  }
}

// 扫码登录
.login-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 350px;
  height: 480px;

  .close-icon {
    position: absolute;
    right: 0;
    top: 0;
    margin: 3px 3px 0 0;
    width: 25px;
    height: 25px;
    transform: rotate(45deg);
    color: #9f9f9f;
  }

  // 扫码
  .scan-code {
    margin: 80px 0 40px 0;

    &>.scan-title {
      text-align: center;
      font-weight: normal;
      margin-bottom: 20px;
      font-size: 28px;
    }

    &>.scan-img {
      display: block;
      margin: auto;
      width: 43%;
      height: 43%;
    }

    .scan-mask {
      position: absolute;
      left: 108px;
      top: 143px;
      width: 38%;
      height: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: rgba(0, 0, 0, 0.605);

      &>P {
        color: white;
      }
    }

    &>.scan-p {
      text-align: center;
      font-size: 14px;
    }

    &>.scan-jump {
      text-align: center;
      font-size: 12px;
      margin-top: 100px;
      cursor: pointer;

      .right-arrow {
        width: 10px;
        height: 10px;
        transform: rotate(180deg);
      }
    }
  }
}

// 手机登录
.phone-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 0 30px 0;

  .go-code {
    position: absolute;
    left: 0;
    top: 0;
    margin: 10px 0 0px 6px;
    font-size: 14px;
    cursor: pointer;

    .right-arrow {
        width: 10px;
        height: 10px;
        margin-bottom: 2px;
    }
  }

  .img-box {
    text-align: center;

    .login-img {
     width: 80%;
    }
  }

  .form-login {

    .login-arrow {
      position: absolute;
      left: 6px;
      top: 10px;
      z-index: 200;
      color: #aeaeae;
    }

    .login-button {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      color: white;
      text-align: center;
      font-size: 18px;
      border: none;
      line-height: 40px;
      background-color: #ea4848;
      cursor: pointer;
    }

    .go-register {
      margin-top: 12px;
      text-align: center;
      text-decoration: underline;
      cursor: pointer;
    }

    .other-login {
      display: flex;
      justify-content: space-around;

      .other-icon {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 999px;
        margin-top: 20px;
        border: 1px solid #c9c9c9;
      }

      .icon-weixin,.icon-qq,.icon-xinlang {
        &:hover {
          background-color: #efefef;
        }
      }

      .other-wei {
        width: 23px;
        height: 23px;
      }
    }
  }
}

// 注册
.other-register {
  margin-top: 20px;
  font-size: 12px;
  text-align: center;
  color: #666666;
}

// 待确认
.wait-confirm {
  margin-top: 60px;
}

.font3 {
  margin-top: 20px;
  margin-bottom: 30px;
  font-size: 12px;
  color: #000;
}

// 验证码确认
.auth-code {
  width: 70%;
  display: flex;
  margin: 0px 0 30px 0;

  .auth-input {
    width: 47%;
    height: 40px;
    border-radius: 5px;
    padding-left: 15px;
    border: 1px solid #d8d8d8;
  }

  .backward-time {
    text-align: center;
    width: 47%;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    margin-left: 6%;
    border: 1px solid #d8d8d8;
    background-color: #dedede;
    color: #999999;
  }
}

.login-button {
  width: 70%;
  height: 40px;
  border-radius: 5px;
  color: white;
  text-align: center;
  font-size: 18px;
  border: none;
  line-height: 40px;
  background-color: #ea4848;
  cursor: pointer;
}

::v-deep .el-input__inner {
  padding: 0 28px;
}
</style>
