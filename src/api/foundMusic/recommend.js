import request from '@/utils/request'

// 获取轮播图
export function getBanner() {
    return request({
        url: '/banner'
    })
}

// 推荐歌单 列表
export function getPersonalized(limit = 9) {
    return request({
        url: '/personalized',
        params: {
            limit
        }
    })
}

// 独家放送
export function privatecontent() {
    return request({
        url: '/personalized/privatecontent'
    })
}

// 最新音乐
export function newsong() {
    return request({
        url: '/personalized/newsong'
    })
}

// 推荐Mv
export function recommendMV() {
    return request({
        url: '/personalized/mv'
    })
}
