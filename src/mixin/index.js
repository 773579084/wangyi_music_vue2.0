import { CurrentSong } from '@/api'

// 封装全局方法，混入mixin
export default {
  methods: {
    // 优化当前播放列表数据结构
    mixCurrentPlay(arr) {
      const newArr = []
      arr.forEach(item => {
        newArr.push(new CurrentSong(item))
      })
      return newArr
    }
  }
}
