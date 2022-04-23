<template>
  <div>
    <!-- 顶部导航栏 -->
    <navTable :nav-table-index="navTableIndex" />
  </div>
</template>

<script>
import navTable from '@/components/navTable.vue'

export default {
  components: {
    navTable
  },
  data() {
    return {
      navTableIndex: 1
    }
  }
}
</script>

<style lang="scss">

</style>
