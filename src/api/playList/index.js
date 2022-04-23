import request from '@/utils/request'

// 获取歌单详情
export function getDetail(id) {
    return request({
        url: '/playlist/detail',
        params: {
            id
        }
    })
}

// 获取歌单所有歌曲
export function getTrackAll(id) {
    return request({
        url: '/playlist/track/all',
        params: { id }
    })
}
