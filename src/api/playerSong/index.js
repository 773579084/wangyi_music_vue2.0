import request from '@/utils/request'

/** 获取歌曲url */
export function getMusicUrl(id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}

// 获取歌词
export function getMusicWord(id) {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}

// 获取歌曲评论
export function getMusicComment(id, limit, offset, before) {
  return request({
    url: '/comment/music',
    params: {
      id: id,
      limit: limit,
      offset: offset,
      before
    }
  })
}
