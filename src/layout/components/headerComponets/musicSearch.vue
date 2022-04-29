<template>
  <div class="music-search">
    <svg class="icon search-icon" aria-hidden="true">
      <use xlink:href="#icon-Magnifier" />
    </svg>
    <input type="text" value="古风">
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.music-search {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 160px;
  height: 32px;
  margin: 0 10px;
  border-radius: 999px;
  padding: 0 10px;
  background-color: #eaeaea22;

  .search-icon {
    opacity: 0.9;
    margin-top: 2px;
  }

  input {
    width: 100%;
    height: 19px;
    padding: 0 5px;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    outline: none;
    font-size: 12px;
    background-color: transparent;
  }
}
</style>
