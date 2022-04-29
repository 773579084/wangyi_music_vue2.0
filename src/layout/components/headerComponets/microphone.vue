<template>
  <div class="microphone">
    <svg class="icon microphone-icon" aria-hidden="true">
      <use xlink:href="#icon-icon--" />
    </svg>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.microphone {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #eaeaea22;
  cursor: pointer;

  .microphone-icon {
    opacity: 0.8;
  }
}
</style>
