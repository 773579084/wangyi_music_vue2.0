<template>
  <div class="router-go">
    <span @click="$router.back()">
      <svg class="icon  right-left" aria-hidden="true">
        <use xlink:href="#icon-zuo" />
      </svg>
    </span>
    <span @click="$router.forward()">
      <svg class="icon right-arrow" aria-hidden="true">
        <use xlink:href="#icon-zuo" />
      </svg>
    </span>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.router-go {
  display: flex;
  // width: 56px;
  margin-left: 48px;

  .icon {
    width: 16px;
    height: 16px;
  }

  .right-left{
    margin-left: 3px;
  }

  .right-arrow{
    transform: rotate(180deg);
    margin-right: 4px;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    margin-right: 6px;
    border-radius: 50%;
    background-color: #eaeaea22;
    cursor: pointer;
  }
}
</style>
