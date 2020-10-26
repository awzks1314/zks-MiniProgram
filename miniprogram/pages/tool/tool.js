const app = getApp()
const amap = require('../../libs/amap-wx.js')
Page({
  data: {
    showModel:false,
    current:0,
    list:[
      {
        title:'常用',
        id:0,
        cont:[
          {
            name: '天气 ',
            key:1,
            link: '/pages/weather/test/index'
          },
          {
            name: '日历',
            key:2,
            link: '/pages/calendar/calendar'
          },
          {
            name: '幸运签',
            key: 3,
            link: '/pagesTianxing/lucky/lucky/index'
          },
          {
            name: '翻译',
            key: 4,
            link: '/pagesBaidu/translate/translate'
          },
          {
            name: '智能春联',
            key: 5,
            link: '/pagesBaidu/newYear/newYear'
          },
          {
            name: 'AI写诗',
            key: 6,
            link: '/pagesBaidu/compose/compose'
          },
          {
            name: '2021运势',
            key: 7,
            link: '/pagesOther/fortune/index/index'
          },
          {
            name: '睡眠Music',
            key: 8,
            link: '/pagesOther/sleep/sleep/index'
          },
          {
            name: '手持弹幕',
            key: 9,
            link: '/pagesOther/barrage/index'
          },
          {
            name: '恶搞来电',
            key: 10,
            link: '/pagesOther/spoof/index/index'
          }   
        ]
      },
      {
        title: '娱乐',
        id: 2,
        cont: [
          {
            name: '体质指数',
            key:40,
            link: '/pagesOther/physique/physique'
          },
          {
            name: '随机壁纸',
            key:41,
            link: '/pagesOther/wallpaper/wallpaper'
          },
          {
            name: '周公解梦',
            key:31,
            link: '/pages/dream/index/index'
          },
          {
            name: '星座运势',
            key:32,
            link: '/pages/constellation/constellation/index'
          },
          {
            name: '过去的今日',
            key: 34,
            link: '/pagesTianxing/historyDay/historyDay'
          },
          {
            name: '人生计时',
            key:33,
            link: '/pages/life/index/index'
          },
          {
            name: '宠物大全',
            key:35,
            link: '/pagesTianxing/animal/animal'
          },
          {
            name: '换个名字',
            key:36,
            link: '/pagesTianxing/bename/bename'
          },
          {
            name: '生日性格',
            key:37,
            link: '/pagesTianxing/character/character'
          },
          {
            name: '星座匹配',
            key:38,
            link: '/pagesTianxing/matching/matching'
          },
          {
            name: '脑筋急转弯',
            key:39,
            link: '/pagesTianxing/brains/brains'
          }
        ]
      },
      {
        title: '查询',
        id: 1,
        cont: [
          {
            name: '有趣AI',
            key:21,
            link: '/pagesBaidu/index/index'
          },
          {
            name: '归属地',
            key:22,
            link: '/pages/inquire/index/index'
          },
          {
            name: '电话本',
            key:23,
            link: '/pages/yellowPage/index/index'
          },
          {
            name: '附近导航',
            key:24,
            link: '/pages/navigation/index/index'
          },
          // {
          //   name: '语音合成',
          //   key:25,
          //   link: '/pagesBaidu/voice/index'
          // },
          {
            name: '新年祝福语',
            key: 26,
            link: '/pagesOther/wishes/index/index'
          },
          {
            name: '颜值在线',
            key: 27,
            link: '/pagesBaidu/faceScore/index'
          },
          {
            name: '后浪文学',
            key: 28,
            link: '/pagesOther/literature/index/index'
          },
          {
            name: '全国大学',
            key: 29,
            link: '/pagesOther/university/university'
          }
        ]
      },
    ]
  },
  onLoad: function(options) {
    // this.daySentence()
    this.setData({
      amapPlugin: new amap.AMapWX({
        key: app.globalData.tianxingKey
      })
    },()=>{
      this.getLocation()
      this.getImg()
    })
  },
  // 得到图片
  getImg(){
    var that = this
    var list = []
    app.axios({
      url:'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1',
      method:'get'
    }).then(res => {
      //console.log(res)
      if (res.data.images.length > 0) {
        res.data.images.forEach(r => {
          list.push(`https://s.cn.bing.net${r.url}`)
        })
        wx.setStorageSync('topImg', list)
        this.setData({
          imgUrls: list
        })
      }
    })
  },
  bindImageTap(e){    
    wx.previewImage({
      urls: this.data.imgUrls,
    })
  },
  // 获取地理位置
  getLocation(callback) {
    const that = this
    this.data.amapPlugin.getRegeo({
      success: (data) => {
        // wx.setStorageSync('lng', data[0].longitude)
        // wx.setStorageSync('lat', data[0].latitude)
      },
      fail: (info) => {
      }
    })
  },
  // 授权
  getUserInfo(e){
    if (e.detail.userInfo) {
      let info = e.detail.userInfo
      wx.setStorageSync('userInfo', info);
      app.toast('请愉快的体验本小程序把~')
      this.setData({
        showModel:false
      })
    }
  },
  hide8(){
    this.setData({
      showModel:false
    })
  },
  gotoUrl(e){
    console.log(e)
    if(!wx.getStorageSync('userInfo')){
      this.setData({
        showModel:true
      })
      return
    }
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  onShareAppMessage(){

  }
})