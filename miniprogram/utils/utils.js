function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
let formatDate = (nDate, date) => {
  if (isNaN(nDate.getTime())) {
    // 不是时间格式
    return '--'
  }
  let o = {
    'M+': nDate.getMonth() + 1,
    'd+': nDate.getDate(),
    'h+': nDate.getHours(),
    'm+': nDate.getMinutes(),
    's+': nDate.getSeconds(),
    // 季度
    'q+': Math.floor((nDate.getMonth() + 3) / 3),
    'S': nDate.getMilliseconds()
  }
  if (/(y+)/.test(date)) {
    date = date.replace(RegExp.$1, (nDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(date)) {
      date = date.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return date
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function formatTimeTwo(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(parseInt(formatNumber(date.getMonth() + 1)) < 10 ? 0 + '' + parseInt(formatNumber(date.getMonth() + 1)) : parseInt(formatNumber(date.getMonth() + 1)));
  returnArr.push(parseInt(formatNumber(date.getDate())) < 10 ? 0 + '' + parseInt(formatNumber(date.getDate())) : parseInt(formatNumber(date.getDate())));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
let isEmptyObject = (obj) => {
  for (let i in obj) {
    return false
  }
  return true
}
let shareConfig = (option = {}) => {
  let title = '来查查你的梦在预示着什么?',
      path = '/pages/dream/index/index';

  if (option.title && option.title != '') {
      title = option.title;
  }

  if (option.path && option.path != '') {
      path = option.path;
  }

  return {
      title: title,
      path: path
  }
}

module.exports = {
  formatTime: formatTime,
  shareConfig: shareConfig,
  isEmptyObject,
  formatDate,
  formatTimeTwo
}
