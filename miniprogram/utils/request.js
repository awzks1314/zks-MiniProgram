//接口请求封装
// let config = require('./config.js');
function request_fn(params) {
  wx.showNavigationBarLoading()
  // const url = `${config.config.url}${params.url}`
  var header = {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  return new Promise(function (resolve, reject) {
    console.log(params)
    wx.request({
      url: params.url,
      method: params.method || "post",
      data: params.data || {},
      header: header,
      success: (res) => {
        if(res.statusCode == 200 ){
          resolve(res)
        } else{
          wx.showToast({
            title: '网络异常，请稍后再试！gdefail1',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          // reject(res)
        }
      },
      fail: function (res) {  
        wx.showToast({
          title: '网络异常，请稍后再试！gdefail2',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        // reject(res)
      },
      complete: function () {
        // wx.hideLoading()
        wx.hideNavigationBarLoading()
      }
    })

  }).catch(res => {
    // reject(res)
  })
}
/* ajax防抖 */
var timeOut = null
function request(params) {
  let shake = params.shake || false // 是否防抖
  let shakeTime = params.shakeTime || 1000 //默认防抖时间300毫秒
  if (shake) {
    return new Promise((resolve, reject) => {
      timeOut && clearTimeout(timeOut)
      /* 第一种防抖效果：防抖时间内只执行第一次 */
      let timer = !timeOut
      if (timer) {
          request_fn(params).then(res => {
              resolve(res)
          })
      }
      timeOut = setTimeout(() => {
          timeOut = null
      }, shakeTime)

      /* 第二种防抖效果：防抖时间内停止触发后执行 */
      // timeOut = setTimeout(() => {
      //   request_fn(params).then(res => {
      //     resolve(res)
      //   })
      // }, shakeTime)
    })
  } else {
    return new Promise((resolve, reject) => {
      request_fn(params).then(res => {
        resolve(res)
      })
    })
  }
}
// 消息提醒
function toast(text, duration, success) {
  wx.showToast({
    title: text,
    icon: success ? 'success' : 'none',
    mask:true,
    duration: duration || 1000
  })
}
module.exports = {
  axios: request,
  toast: toast
}