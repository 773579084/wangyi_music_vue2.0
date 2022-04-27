// 获取歌曲详情的接口
import { getSongDetail, SongDetail } from '@/api'
// 获取歌曲 MP3 的url地址
import { getMusicUrl } from '@/api/playerSong'

export default {
  namespaced: true,
  state: {
    id: null, // 当前音乐ID
    musicDetail: {}, // 存储歌单id地址
    musicPlyerUrl: null, // 存储音乐播放地址
    isAudio: false, // 控制音乐播放控件图标
    audio: null, // 播放控件
    recentPlay: [], // 当前播放歌单
    recentPlayIndex: null, // 当前播放正在播放的歌曲的索引值index
    playOrder: 1 // 控制音乐播放顺序 1:单曲循环 2：列表播放 3：乱序播放
  },
  mutations: {
    // 获取音乐 ID 和 最近播放歌单
    SAVEMUSIC(state) {
      state.id = localStorage.getItem('playerSong_01')
      state.musicPlyerUrl = localStorage.getItem('musicURL_01')
      state.musicDetail = JSON.parse(localStorage.getItem('musicDetail_01'))
      state.recentPlayIndex = Number(localStorage.getItem('recentPlayIndex_01'))
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

      // 求当前播放音乐在当前音乐列表里面的索引值
      const id = localStorage.getItem('playerSong_01')
      const currentMusicIndex = requestCurrentIndexFn(id, state.recentPlay)
      localStorage.setItem('recentPlayIndex_01', currentMusicIndex)
      state.recentPlayIndex = Number(localStorage.getItem('recentPlayIndex_01'))
    },
    // 切换播放模式
    SWITCHPLAY(state, num) {
      state.playOrder = num
    }
  },
  actions: {
    // 保存音乐 ID
    async saveMusic(context, id) {
      // 存储歌曲id
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
    },
    // 切换播放模式
    switchPlay(context, num) {
      context.commit('SWITCHPLAY', num)
    }
  }
}

// 封装求当前播放音乐在当前音乐列表里面的索引值的函数
function requestCurrentIndexFn(id, list) {
  const currentMusicIndex = list.findIndex((item) => {
    return item.id === Number(id)
  })
  // console.log(97, currentMusicIndex)
  return currentMusicIndex
}
