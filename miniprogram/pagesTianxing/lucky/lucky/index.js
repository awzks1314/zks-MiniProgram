const app = getApp()
// const { ajaxData, href, text } = app.globalData.config
var util = require('../../../utils/utils.js');
Page({
  data: {
    // baiduurl:'https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?',//黄道吉日
    daySentenceUrl: "https://api.tianapi.com/txapi/everyday/index", //每日一句
    topBgUrl: wx.getStorageSync('topImg'),
    todayData: {}
  },
  onLoad: function () {
    var data = new Date()
    this.setData({
      year:data.getFullYear(),
      month: data.getMonth()+1,
      day:data.getDate()
    })
    this.fetchTodayData()
    this.getWord()
  },
  // 获取每日一句
  getWord(){
    var that = this
    app.axios({
      url: that.data.daySentenceUrl,
      data:{
        key: app.globalData.tianxingKey
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == 200 && res.data.newslist[0]){
        that.setData({
          wordInfo: res.data.newslist[0]
        })
      }
    })
  },
  // 拿到数据
  fetchTodayData: function () {
    var that = this
    var data = util.formatTimeTwo((new Date().getTime() / 1000), 'YMD')
    console.log(data)
    var lis = ''
    app.axios({
      url: app.globalData.djshUrl + '/wannianli/get?token=' + app.globalData.djshKey+'&date='+data,
      method:'get'
    }).then(res => {
      console.log(res)
      if (res.data.Result){
        res.data.Result.do = res.data.Result.do.slice(0,17)
        res.data.Result.nodo = res.data.Result.nodo.slice(0, 17)
        res.data.Result.nongli = res.data.Result.nongli.slice(0,-6)
          that.setData({
            todayData: res.data.Result
          }, () => {
            console.log(that.data.todayData)
          })
      }
    })
  },
  // bindShareTap: function () {
  //   this.generalShareImg()
  // },
  // generalShareImg: function () {
  //   var info = this.data.todayData
  //   var img = wx.getStorageSync('topImg')[0]
  //   img = img.replace('http:','https:')
  //   this.data.playData = {
  //     width: '750rpx',
  //     height: '1334rpx',
  //     background: '#fff',
  //     views: [
  //       {
  //         type: 'image',
  //         url: img,
  //         css: {
  //           width: '750rpx',
  //           height: '600rpx'
  //         }
  //       },
  //       {
  //         type: 'text',
  //         text: info.year + '年' + info.month + '月' + info.day+'日',
  //         css: {
  //           top: '480rpx',
  //           left: '375rpx',
  //           maxLines: 1,
  //           align: 'center',
  //           fontSize: '28rpx'
  //         }
  //       },
  //       {
  //         type: 'text',
  //         text: info.lMonth + '月' + info.lDate,
  //         css: {
  //           top: '520rpx',
  //           left: '375rpx',
  //           maxLines: 1,
  //           align: 'center',
  //           fontSize: '28rpx'
  //         }
  //       },
  //       {
  //         type: 'text',
  //         text: info.day ,
  //         css: {
  //           top: '560rpx',
  //           left: '375rpx',
  //           maxLines: 1,
  //           align: 'center',
  //           fontSize: '200rpx'
  //         }
  //       },
  //       {
  //         type: 'text',
  //         text: '周' + info.cnDay,
  //         css: {
  //           top: '750rpx',
  //           left: '375rpx',
  //           maxLines: 1,
  //           align: 'center',
  //           fontSize: '28rpx'
  //         }
  //       },
  //       {
  //         type: 'text',
  //         text: '本站拥有目前国内最大的黄道日历和时辰时局数据库,',
  //         css: {
  //           top: '800rpx',
  //           left: '375rpx',
  //           maxLines: 3,
  //           align: 'center',
  //           fontWeight: 'bold',
  //           fontSize: '32rpx',
  //           color: '#000000'
  //         }
  //       }
  //     ]
  //   }
  //   this.setData({
  //     playData: this.data.playData,
  //     maskHidden: !this.data.maskHidden,
  //   })
  // },
  onShareAppMessage: function () {
    return {
      title: '快来查看你的今日幸运签吧!',
      path: '/pagesTianxing/lucky/lucky/index'
    }
  },
})
