// 获取歌曲详情的接口
import { getSongDetail, SongDetail } from '@/api'
// 获取歌曲 MP3 的url地址
import { getMusicUrl } from '@/api/playerSong'

export default {
  namespaced: true,
  state: {
    id: null, // 音乐ID
    musicDetail: {}, // 存储音乐详情地址
    musicPlyerUrl: null, // 存储音乐播放地址
    isAudio: false, // 控制音乐播放控件图标
    audio: null, // 播放控件
    recentPlay: [] // 最近播放歌单
  },
  mutations: {
    // 获取音乐 ID 和 最近播放歌单
    SAVEMUSIC(state) {
      state.id = localStorage.getItem('playerSong_01')
      state.musicPlyerUrl = localStorage.getItem('musicURL_01')
      state.musicDetail = JSON.parse(localStorage.getItem('musicDetail_01'))
    },
    // 控制音乐播放
    CONTROLMUSIC(state, value) {
      state.isAudio = value
    },
    // 存储audio这个控件
    SAVEAUDIO(state, value) {
      state.audio = value
    },
    // 获取最近播放歌单
    SAVERECENTLIST(state) {
      state.recentPlay = JSON.parse(localStorage.getItem('recentList_01'))
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
    },
    // 控制音乐播放
    controlMusic(context, value) {
      context.commit('CONTROLMUSIC', value)
    },
    // 开始播放音乐
    beginMusic(context, value) {
      value.play()
    },
    // 暂停播放音乐
    pauseMusic(context, value) {
      value.pause()
    },
    // 存储audio这个播放控件
    saveAudio(context, value) {
      context.commit('SAVEAUDIO', value)
    },
    // 存储歌曲播放歌单列表
    saveRecentList(context, arr) {
      // 存储最近播放歌单
      localStorage.setItem('recentList_01', JSON.stringify(arr))
      context.commit('SAVERECENTLIST')
    }
  }
}
