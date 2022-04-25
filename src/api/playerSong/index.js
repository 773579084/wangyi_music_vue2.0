import request from '@/utils/request'

/** 获取歌曲url */
export function getMusicUrl(id) {
    return request({
        url: '/song/url',
        params: {
            id: id
        }
    })
}
