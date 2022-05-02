<template>
  <div>
    <musicTitle title="最新音乐" />
    <div class="show-list">
      <div v-for="(item,index) in list" :key="index" class="box">
        <div v-for="item2 in item" :key="item2.id" class="list" @dblclick="getMusicIdFn(item2.id)">
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
            },
            musicId: null,
            newSongList: [] // 最新音乐列表=》需要放置到
        }
    },
    created() {
      this.getData()
  },
    methods: {
      async getData() {
        const res = await (await newsong(12)).data.result
        this.newSongList = res
        this.list.mewSongList1 = res.filter((value, index) => { return index < 4 })
        this.list.newSongList2 = res.filter((value, index) => { return index > 3 && index < 8 })
        this.list.newSongList3 = res.filter((value, index) => { return index > 7 })
      },
      getMusicIdFn(id) {
        // 存储音乐id
        this.$store.dispatch('playerSong/saveMusic', id)
        // 加工数据
        const newSongList = this.mixCurrentPlay(this.newSongList)
        this.$store.dispatch('playerSong/saveRecentList', newSongList)
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
                background-color: #eaeaea37;
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
