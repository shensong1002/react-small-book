function timeFormat(createTime, startTime) {
    let timeInterval = Math.ceil((startTime - createTime) / 1000)
    if (timeInterval >= 1 && timeInterval < 60) {
        timeInterval = timeInterval + ' 秒'
    } else if (timeInterval >= 60 && timeInterval < 3600) {
        timeInterval = Math.floor(timeInterval / 60) + ' 分钟'
    } else if (timeInterval >= 3600 && timeInterval < 86400) {
        timeInterval = Math.floor(timeInterval / 3600) + ' 小时'
    } else {
        timeInterval = Math.floor(timeInterval / 86400) + ' 天'
    }
    return timeInterval
}

export default timeFormat
