<template>
  <div>
    <el-backtop :visibility-height="300" style="right: 30px; bottom: 80px;" />
  </div>
</template>

<script>
export default {
    name: 'GoTopVue'
}
</script>

<style scoped lang='scss'>
@import '@/styles/index.scss';

::v-deep .el-backtop, .el-calendar-table td.is-today {
  color: $header-theme-color;
}
</style>
