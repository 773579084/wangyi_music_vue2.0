<template>
  <div class="header">
    <!-- 左部模块 -->
    <div class="left">
      <!-- logo部分 -->
      <logo />
      <!-- 路由跳转按钮 -->
      <routerGo />
      <!-- 搜索框 -->
      <musicSearch />
      <!-- 麦克风 -->
      <microphone />
    </div>
    <!-- 右部模块 -->
    <div class="right">
      <!-- 用户登录 -->
      <userLogin />

      <!-- 换肤 -->
      <changeColor />

      <!-- 设置 -->
      <svg class="icon set-icon" aria-hidden="true">
        <use xlink:href="#icon-shezhi" />
      </svg>

      <!-- 用户信件 -->
      <userEmail />

      <!-- github -->
      <svg class="icon set-icon github-icon" aria-hidden="true" @click="goGitHub">
        <use xlink:href="#icon-github-fill" />
      </svg>

      <!-- gitee -->
      <svg class="icon set-icon gitee-icon" aria-hidden="true" @click="goGitee">
        <use xlink:href="#icon-gitee2" />
      </svg>
      <div class="vertical-bar">|</div>

      <!-- 三大键 -->
      <threeKey />
    </div>
  </div>
</template>

<script>
import logo from './headerComponets/logo.vue'
import routerGo from './headerComponets/routerGo.vue'
import musicSearch from './headerComponets/musicSearch.vue'
import microphone from './headerComponets/microphone.vue'
import userLogin from './headerComponets/userLogin.vue'
import userEmail from './headerComponets/userEmail.vue'
import threeKey from './headerComponets/threeKey.vue'
import changeColor from './headerComponets/changeColor'

export default {
  components: {
    logo,
    routerGo,
    musicSearch,
    microphone,
    userLogin,
    userEmail,
    threeKey,
    changeColor
  },
  methods: {
    goGitHub() {
      window.location.href = 'https://github.com/773579084'
    },
    goGitee() {
      window.location.href = 'https://gitee.com/zhao-wenchao110/dashboard/projects'
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  height: 100%;

}

.left {
  display: flex;
  align-items: center;
}

.right {
  display: flex;
  align-items: center;
}

// 换肤
.change-skin {
  margin-left: 15px;
  color: #fad5d5;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: white;
  }
}

// 设置
.set-icon {
  margin-left: 10px;
  cursor: pointer;
  color: #fad5d5;

  &:hover {
    color: white;
  }
}

.github-icon{
  margin-left: 20px;
}

.github-icon {
  width: 20px;
  height: 20px;
  margin-bottom: 3px;
}

.gitee-icon{
  margin-bottom: 2px;
}

.vertical-bar {
  margin-left: 15px;
  font-size: 20px;
}
</style>
