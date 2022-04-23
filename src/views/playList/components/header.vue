<template>
  <div class="big-box">
    <div class="left">
      <img :src="playListData.coverImgUrl|imgSize('?param=200y200')" alt="">
    </div>
    <div class="right">
      <!-- 歌单标题 -->
      <div class="title">
        <div class="music-list">歌单</div>
        <h1 class="music-list-title">{{ playListData.name }}</h1>
      </div>
      <!-- 歌单作者及创建时间 -->
      <div class="author-Info">
        <div class="music-list-buddha">
          <img class="buddha" :src="playListData.creator?`${playListData.creator.avatarUrl}`:''" alt="">
          <span class="author-name">{{ playListData.creator?playListData.creator.nickname:"" }}</span>
        </div>
        <div class="build-time">{{ playListData.updateTime|changeTime }}创建</div>
      </div>
      <!-- 四大按钮 -->
      <div class="btns">
        <!-- 播放全部 -->
        <div class="player-all">
          <!-- 播放图标 -->
          <svg class="icon player-icon" aria-hidden="true">
            <use xlink:href="#icon-ai23" />
          </svg>
          <i class="font">播放全部</i>
          <svg class="icon collect-icon" aria-hidden="true">
            <use xlink:href="#icon-tianjia_huaban" />
          </svg>
        </div>
        <!-- 收藏 -->
        <div class="collect">
          <svg class="icon file-icon" aria-hidden="true">
            <use xlink:href="#icon-xinjianwenjian" />
          </svg>
          <span class="font">
            收藏(<i>{{ playListData.subscribedCount|playerNumber }}</i>)
          </span>
        </div>
        <!-- 分享 -->
        <div class="collect">
          <svg class="icon file-icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang" />
          </svg>
          <span class="font">
            分享(<i>{{ playListData.shareCount |playerNumber }}</i>)
          </span>
        </div>
        <!-- 下载全部 -->
        <div>
          <div class="collect">
            <svg class="icon file-icon" aria-hidden="true">
              <use xlink:href="#icon-xiazai" />
            </svg>
            <span class="font">
              <i>下载全部</i>
            </span>
          </div>
        </div>
      </div>
      <!-- 标签 歌曲 简介 -->
      <div>
        <div>
          标签：<i style="color: #0b58b0;">{{ playListData.tags?playListData.tags.join('/'):playListData.tags }}</i>
        </div>
        <div>
          歌曲：<i style="color: $nochange-colo;margin-right: 10px;">{{ playListData.trackCount |playerNumber }}</i>
          播放：<i style="color: $nochange-colo;">{{ playListData.playCount |playerNumber }}</i>
        </div>
        <el-collapse>
          <el-collapse-item :title="`简介：`" name="1">
            <div class="intro">{{ playListData.description }}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playListData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang='scss'>
@import '@/styles/index.scss';

.big-box {
    display: flex;
    padding: 0 20px;

    .left {
        width: 200px;
        height: 200px;
        margin-right: 15px;

        img {
          border-radius: 4%;
        }
    }

    .right {
        flex: 1;
        padding-top: 8px;
    }

    .title {
        display: flex;
        align-items: center;
        margin-bottom: 8px;

        .music-list{
            width: 48px;
            height: 26px;
            border: 1px solid $header-theme-color;
            color: $header-theme-color;
            text-align: center;
            line-height: 26px;
            margin-right: 10px;
        }

        .music-list-title{
            font-size: 24px;
            line-height: 1;
            margin: 0;
            margin-top: 2px;
        }
    }

    .author-Info{
        display: flex;
        align-items: center;
        margin-bottom: 8px;

        .music-list-buddha{
            color: #0b58b0;

            .author-name{
                display: inline-block;
                height: 17px;
                vertical-align: middle;
                margin-left: 8px;
                margin-top: -2px;
                font-size: 14px;
                overflow: hidden;
            }

            .buddha{
                width: 30px;
                height: 30px;
                border-radius: 999px;
                border-radius: 999px;
            }
        }

        .build-time{
            margin-left: 12px;
            margin-top: 2px;
            font-size: 14px;
            color: #676767;
            letter-spacing: 2px;
        }
    }

// 四大按钮
    .btns {
        display: flex;
        margin-bottom: 15px;

        .button {
            display: flex;
            align-items: center;
            width: 150px;
            height: 40px;
            padding-left: 20px;
            border-radius: 999px;
            border: 1px solid #d8d8d8;
            cursor: pointer;
        }

        .button-width {
            width: 24px;
            height: 24px;
        }

        .player-all {
            @extend  .button;
            color: white;
            background-color: $header-theme-color;
            border:none;

            .player-icon{
                @extend .button-width;
                margin-right: 4px;
            }

            .font{
                margin-top: 5px;
                margin-right: 8px;
            }

            .collect-icon {
                width: 20px;
                height: 20px;
            }
        }

        .collect {
            @extend .button;
            margin-left: 10px;

            .file-icon{
                @extend .button-width;
            }

            .font{
                margin-top: 5px;
                margin-left: 6px;
            }
        }
    }
}

// 简介
::v-deep .el-collapse-item__header,.el-collapse {
   border: none;
   line-height: 1;
   height: auto;
   font-size: 16px;
   margin-top: 5px;
 }

 ::v-deep .el-collapse-item__wrap {
   border: none;
   margin-top: 5px;

 }

 .intro {
    font-size: 16px;
    color: $nochange-color;
 }
</style>
