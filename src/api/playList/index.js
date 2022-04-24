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

// 获取歌单评论
export function getCommentsApi(id, limit, offset, before) {
    return request({
        url: '/comment/playlist',
        params: {
            id: id,
            limit: limit,
            offset: offset,
            before
        }
    })
}

/** 获取歌单收藏者 */
export function getSubApi(id, limit) {
    return request({
        url: '/playlist/subscribers',
        params: {
            id: id,
            limit
        }
    })
}
