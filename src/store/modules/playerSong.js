// 获取歌曲详情的接口
import { getSongDetail, SongDetail } from '@/api'
// 获取歌曲 MP3 的url地址
import { getMusicUrl } from '@/api/playerSong'

export default {
    namespaced: true,
    state: {
        id: null,
        musicDetail: {}, // 存储音乐详情地址
        musicPlyerUrl: null // 存储音乐播放地址
    },
    mutations: {
        SAVEMUSIC(state, musicUrl) {
            state.id = localStorage.getItem('playerSong_01')
            state.musicPlyerUrl = localStorage.getItem('musicURL_01')
            state.musicDetail = JSON.parse(localStorage.getItem('musicDetail_01'))
        }
    },
    actions: {
        // 保存音乐 ID
        async saveMusic(context, id) {
            localStorage.setItem('playerSong_01', id)

            // 存储音乐详情数据
            const musicDetailRes = await (await getSongDetail(id)).data.songs
            const songs = new SongDetail(musicDetailRes)
            localStorage.setItem('musicDetail_01', JSON.stringify(songs))

            // 存储音乐播放地址
            const musicUrl = await (await getMusicUrl(id)).data.data[0].url
            localStorage.setItem(`musicURL_01`, musicUrl)
            context.commit('SAVEMUSIC')
        }
    }
}
