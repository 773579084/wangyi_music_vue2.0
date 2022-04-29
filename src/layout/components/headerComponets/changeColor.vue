<template>
  <el-popover
    placement="bottom"
    width="300"
    trigger="click"
    :visible-arrow="false"
  >
    <div class="change-color-box">
      <div class="title">主题</div>
      <div v-for="(item,index) in colorThemList" :key="index" class="small-box">
        <div :style="{backgroundColor:item}" :data-index="index" @click="changeColorFn">
          <svg v-show="index === isShowIconIndex" slot="reference" class="icon set-icon right-icon" aria-hidden="true">
            <use xlink:href="#icon-danxuan-xuanzhong" />
          </svg>
        </div>
      </div>
    </div>
    <svg slot="reference" class="icon set-icon clothes-icon" aria-hidden="true">
      <use xlink:href="#icon-yifu" />
    </svg>
  </el-popover>

</template>

<script>
import List from '@/api/const/index'

export default {
  data() {
    return {
      colorThemList: [], // 颜色列表
      isShowIconIndex: 1 // 选中图表显示 与 隐藏
    }
  },
  created() {
    this.colorThemList = List.colorThem
    // console.log(32, this.colorThemList)
  },
  methods: {
    changeColorFn(e) {
      const index = Number(e.target.dataset.index)
      this.isShowIconIndex = index

      // 判断索引值更改颜色
      if (index === 0) {
        window.document.documentElement.setAttribute('data-theme', 'themeRedWine')
      } else if (index === 1) {
        window.document.documentElement.setAttribute('data-theme', 'themeRed')
      } else if (index === 2) {
       window.document.documentElement.setAttribute('data-theme', 'themePick')
      } else if (index === 3) {
       window.document.documentElement.setAttribute('data-theme', 'themePinkBlue')
      } else if (index === 4) {
       window.document.documentElement.setAttribute('data-theme', 'themeBlue1')
      } else if (index === 5) {
       window.document.documentElement.setAttribute('data-theme', 'themeBlue2')
      } else if (index === 6) {
       window.document.documentElement.setAttribute('data-theme', 'themeGreen')
      } else if (index === 7) {
       window.document.documentElement.setAttribute('data-theme', 'themeGreen2')
      } else if (index === 8) {
       window.document.documentElement.setAttribute('data-theme', 'themeYellow')
      } else if (index === 9) {
       window.document.documentElement.setAttribute('data-theme', 'themeYellow2')
      } else if (index === 10) {
       window.document.documentElement.setAttribute('data-theme', 'themeRed2')
      } else if (index === 11) {
       window.document.documentElement.setAttribute('data-theme', 'themeBlue3')
      } else if (index === 12) {
       window.document.documentElement.setAttribute('data-theme', 'themePick2')
      } else if (index === 13) {
       window.document.documentElement.setAttribute('data-theme', 'themeGreen3')
      } else if (index === 14) {
       window.document.documentElement.setAttribute('data-theme', 'themeGreen4')
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import '@/styles/_handle.scss';

.clothes-icon {
  margin-left: 20px;
  margin-top: 4px;
}

.change-color-box {
  width: 274px;
  height: 200px;

  .title {
    @include font_color("font_color1");
    font-weight: bold;
    font-size: 18px;
    margin: 10px 0 10px 7px;
  }

  .small-box {
    background-color: skyblue;

    &>div {
      float: left;
      width: 40px;
      height: 40px;
      margin: 7px;
      border-radius: 3px;
      cursor: pointer;

      .right-icon {
        margin-top: 26px;
        margin-left: 26px;
      }
    }
  }
}

::v-deep {
  top:61px;
  left: 425px;
}
</style>
