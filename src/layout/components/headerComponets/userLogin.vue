<template>
  <div class="user-login">
    <div class="user-avatar">
      <!-- <user-outlined style="font-size: 23px" /> -->
      <svg class="icon user-icon" aria-hidden="true">
        <use xlink:href="#icon-tubiao_yonghu" />
      </svg>
    </div>
    <span class="no-login">
      <span> 未登录</span>
      <svg class="icon down-arrow" aria-hidden="true">
        <use xlink:href="#icon-xiajiantou" />
      </svg>
    </span>
  </div>
</template>

<script>
export default {

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
</style>
