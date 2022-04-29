<template>
  <div class="big">
    <div class="music-box">
      <img :src="imgurl|imgSize('?param=60y60')" alt="">
    </div>
    <!-- 播放图标 -->
    <svg class="icon player-icon" aria-hidden="true">
      <use xlink:href="#icon-24gf-playCircle" />
    </svg>
  </div>
</template>

<script>
export default {
    props: {
        imgurl: {
            type: String,
            reuqired: true,
            default: ''
        }
    }
}
</script>

<style scoped lang='scss'>
.big {
    position: relative;
    margin-right: 10px;
    border: 1px solid #f2f2f2;
    border-radius: 12%;
    cursor: pointer;

    .music-box {
        width: 60px;
        height: 60px;
        border-radius: 12%;
        background-color: skyblue;

        img {
            border-radius: 12%;
        }
    }

    .player-icon{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 30px;
        color: white;
    }
}

</style>
