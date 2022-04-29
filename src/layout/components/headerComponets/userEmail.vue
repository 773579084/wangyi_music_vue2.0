<template>
  <div class="user-email">
    <!-- <mail-outlined class="icon-email" /> -->
    <svg class="icon icon-email" aria-hidden="true">
      <use xlink:href="#icon-email" />
    </svg>
    <span class="math-email" />
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
@import '@/styles/_handle.scss';

// 邮件
.user-email {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .math-email {
    position: absolute;
    right: -10px;
    top: -3px;
    width: 15px;
    height: 13px;
    border-radius: 50%;
    background-color: #fff;

    &::before {
      content: '6';
      position: absolute;
      font-size: 12px;
      right: 4px;
      top: -2px;
      @include font_color("font_color2");
    }
  }
}
.icon-email {
  font-size: 18px;
  margin-left: 15px;
  cursor: pointer;
  color: #fad5d5;

  &:hover {
    color: white;
  }
}
</style>
