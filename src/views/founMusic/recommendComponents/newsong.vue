<template>
  <div>
    <musicTitle title="最新音乐" />
    <div class="show-list">
      <div v-for="(item,index) in list" :key="index" class="box">
        <div v-for="item2 in item" :key="item2.id" class="list">
          <div class="show">
            <smallBox :imgurl="item2.picUrl" />
            <div class="music-details">
              <div class="font">
                {{ item2.name }}
                <span v-show="item2.song.alias[0]" class="music-introduce">({{ item2.song.alias[0] }})</span>
              </div>
              <div class="font author">
                <i>{{ item2.song.artists[0].name }}</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import musicTitle from '@/components/musicTitle'
import smallBox from '@/components/smallBox'
import { newsong } from '@/api/foundMusic/recommend'

export default {
    components: {
        musicTitle,
        smallBox
    },
    data() {
        return {
            list: {
                newSongList2: null,
                newSongList3: null
            }
        }
    },
    created() {
      this.getData()
    },
    methods: {
      async getData() {
        const res = await (await newsong()).data.result
        this.list.mewSongList1 = res.splice(6)
        this.list.newSongList2 = res.splice(2)
        this.list.newSongList3 = this.list.mewSongList1
        // console.log(await (await newsong()).data.result)
      }
    }
}
</script>

<style scoped lang='scss'>
.show-list {
    display: flex;
    justify-content: space-between;
     cursor: pointer;

    .box {
        display: flex;
        flex-direction: column;
        width: 32%;
        height: 300px;
    }

    .list {
        display: flex;
        flex: 1;
        align-items: center;
        padding:0 10px 10px 0;
    }

    .show {
        display: flex;
        width: 100%;

        .music-details{
            display: flex;
            flex-direction: column;
            width: 80%;

            &:hover {
                background-color: #eaeaea;
            }

        .font {
            position: relative;
            flex: 1;
            line-height: 1.6;
            font-size: 18px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            .music-introduce {
                position: absolute;
                top: -1px;
                width: 90%;
                margin-left: 5px;
                vertical-align: top;
                color: #9f9f9f;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }

        .author{
            font-size: 14px;
            color: #9f9f9f;
        }
    }
    }
}
</style>
