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
    return Y + M + D
}

export function changeTimeAll(data) {
    var date = new Date(data) // 获取一个时间对象
    const Y = date.getFullYear()
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
    const D = date.getDate()
    const h = date.getHours()
    const h2 = h > 9 ? h : '0' + h
    const m = date.getMinutes()
    const m2 = h > 9 ? m : '0' + m
    // const s = date.getSeconds()
    return Y + '年' + M + '月' + D + '日 ' + h2 + ':' + m2
}
