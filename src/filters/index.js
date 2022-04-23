// 控制图片大小
export function imgSize(imgUrl, size) {
    return imgUrl + size
}

// 播放量 数字优化
export function playerNumber(math) {
    const arr = String(math).split('')
    if (arr.length > 4) {
        const newMath = ((arr.reverse()).splice(0, 4)).join('') + '万'
        return newMath
    }
    return math
}

// 时间戳 转换
export function changeTime(data) {
    var date = new Date(data) // 获取一个时间对象
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = date.getDate() + ' '
    // const h = date.getHours() + ':'
    // const m = date.getMinutes() + ':'
    // const s = date.getSeconds()
    return Y + M + D
}
