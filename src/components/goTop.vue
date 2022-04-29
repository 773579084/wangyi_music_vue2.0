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

<style lang='scss'>
@import '@/styles/_handle.scss';

.el-backtop, .el-calendar-table td.is-today {
  @include font_color("font_color2");
}
</style>
