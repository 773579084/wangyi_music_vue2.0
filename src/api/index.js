import request from '@/utils/request'
import { formatDate } from '@/utils/tools'

// 获取歌曲详情
export function getSongDetail(ids) {
    return request({
        url: '/song/detail',
        params: { ids: ids }
    })
}

// 对歌曲数据解析封装
export class SongDetail {
    constructor(songs) {
        this.id = songs[0].id
        this.name = songs[0].name
        this.album = songs[0].al.name
        this.artist = songs[0].ar[0].name
        this.pic = songs[0].al.picUrl
        this.time = formatDate(new Date(songs[0].dt), 'mm:ss')
    }
}

