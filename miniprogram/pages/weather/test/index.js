let utils = require('../../../utils/utils')
let globalData = getApp().globalData
const key = globalData.weatherKey
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIPhoneX: globalData.isIPhoneX,
    bcgImgList: [],
    lifestyles: {
      'comf': '舒适度指数',
      'cw': '洗车指数',
      'drsg': '穿衣指数',
      'flu': '感冒指数',
      'sport': '运动指数',
      'trav': '旅游指数',
      'uv': '紫外线指数',
      'air': '空气污染扩散条件指数',
      'ac': '空调开启指数',
      'ag': '过敏指数',
      'gl': '太阳镜指数',
      'mu': '化妆指数',
      'airc': '晾晒指数',
      'ptfc': '交通指数',
      'fsh': '钓鱼指数',
      'spi': '防晒指数',
    },
    detailsDic: {
      key: ['tmp', 'fl', 'hum', 'pcpn', 'wind_dir', 'wind_deg', 'wind_sc', 'wind_spd', 'vis', 'pres', 'cloud', ''],
      val: {
        tmp: '温度(℃)',
        fl: '体感温度(℃)',
        hum: '相对湿度(%)',
        pcpn: '降水量(mm)',
        wind_dir: '风向',
        wind_deg: '风向角度(deg)',
        wind_sc: '风力(级)',
        wind_spd: '风速(mk/h)',
        vis: '能见度(km)',
        pres: '气压(mb)',
        cloud: '云量',
      },
    },
    bcgImgIndex: 0,//背景图
    bcgImg: '',//图片地址
    // 粗暴直接：移除后再创建，达到初始化组件的作用
    showHeartbeat: true,//爱心
     // 需要查询的城市
     searchCity: '',
     located: true,//切换城市
    // heartbeat 时禁止搜索，防止动画执行
    enableSearch: true,
    bcgImgAreaShow: false,//是否展示切换背景
    weatherIconUrl: globalData.weatherIconUrl,//图标地址
    cityDatas: {},//当前城市信息
    hourlyDatas: [],//每小时信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.isIPhoneX)
    let obj = wx.getMenuButtonBoundingClientRect();
    this.setData({
      width: obj.left,
      height: obj.top + obj.height + 8,
      inputTop: obj.top + (obj.height - 30) / 2,
      arrowTop: obj.top + (obj.height - 32) / 2,
      searchKey: options.searchKey || ""
    })
    this.getImgList() //得到数据库背景
    this.getCityDatas()//得到城市信息
    this.loadWeather()//天气
  },
  getImgList(){
    const db = wx.cloud.database()
    db.collection('weather').get().then(res => {
      this.setData({
        bcgImgList:res.data
      },()=>{
        this.setBcgImg()//选择图片
      })
    })
  },
  // 选择城市
  gotoChoose(){
    wx.navigateTo({
      url: '/pages/weather/toCitychoose/index'      
    })
  },
  onPullDownRefresh (res) {
    this.onLoad()
  },
  // 加载天气
  loadWeather(){
    console.log(this.data.located)
    if (this.data.located) {
      this.init({})
    } else {
      this.search(this.data.searchCity)
      this.setData({
        searchCity: '',
      })
    }
  },
  // 得到天气
  getWeather(location){
    app.axios({
      url:globalData.requestWeather.sevenDay ,
      data:{
        location,
        key
      }
    }).then(res => {
      console.log(res)
      if (res.statusCode === 200) {
        let data = res.data.HeWeather6[0]
        if (data.status === 'ok') {
          this.clearInput()
          this.success(data, location)
        } else {
          app.toast('查询失败')
        }
      }
    })
  },
  // 得到小时
  getHourly(location){
    console.log('xiaoshi')
    app.axios({
      url:globalData.requestWeather.hour,
      data:{
        location,
        key
      }
    }).then(res => {
      console.log(res)
      if (res.statusCode === 200) {
        let data = res.data.HeWeather6[0]
        if (data.status === 'ok') {
          this.setData({
            hourlyDatas: data.hourly || []
          })
        }
      }else{
        app.toast('查询失败')
      }
    })
  },
  // 得到城市背景
  getCityDatas() {
    let cityDatas = wx.getStorage({
      key: 'cityDatas',
      success: (res) => {
        this.setData({
          cityDatas: res.data,
          hourlyDatas:res.data.hourly
        })
      },
    })
  },
  // 返回
  handlerGobackClick(delta) {
    const pages = getCurrentPages();
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: delta
      });
    } else {
      wx.switchTab({
        url: '/pages/tool/tool'
      });
    }
  },
  // 设置背景图
  setBcgImg (index) {
    console.log(this.data.bcgImgList)
    if (index !== undefined) {
      this.setData({
        bcgImgIndex: index,
        bcgImg: this.data.bcgImgList[index].src,
      })
      // this.setNavigationBarColor()
      return
    }
    wx.getStorage({
      key: 'bcgImgIndex',
      success: (res) => {
        let bcgImgIndex = res.data || 0
        this.setData({
          bcgImgIndex,
          bcgImg: this.data.bcgImgList[bcgImgIndex].src,
        })
        // this.setNavigationBarColor()
      },
      fail: () => {
        this.setData({
          bcgImgIndex: 0,
          bcgImg: this.data.bcgImgList[0].src,
        })
        // this.setNavigationBarColor()
      },
    })
  },
  // 选择背景图
  chooseBcg (e) {
    let dataset = e.currentTarget.dataset
    let src = dataset.src
    let index = dataset.index
    this.setBcgImg(index)
    wx.setStorage({
      key: 'bcgImgIndex',
      data: index,
    })
  },
  // 爱心
  dance() {
    this.setData({
      enableSearch: false,
    })
    let heartbeat = this.selectComponent('#heartbeat')
    heartbeat.dance(() => {
      this.setData({
        showHeartbeat: false,
        enableSearch: true,
      })
      this.setData({
        showHeartbeat: true,
      })
    })
  },
  // 搜索
  commitSearch (res) {
    let val = ((res.detail || {}).value || '').replace(/\s+/g, '')
    this.search(val)
  },
  // 初始化
  init(params, callback) {
    this.setData({
      located: true,
    })
    wx.getLocation({
      success: (res) => {
        this.getWeather(`${res.latitude},${res.longitude}`)
        this.getHourly(`${res.latitude},${res.longitude}`)
        callback && callback()
      },
      fail: (res) => {
        this.fail(res)
      }
    })
  },
  // 搜索
  search (val, callback) {
    if (val === '520' || val === '艾维') {
      this.clearInput()
      this.dance()
      return
    }
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300,
    })
    if (val) {
      this.setData({
        located: false,
      })
      this.getWeather(val)
      this.getHourly(val)
    }
    callback && callback()
  },
  // 清除输入框
  clearInput () {
    this.setData({
      searchText: '',
    })
  },
  // 展示背景区域
  showBcgImgArea () {
    this.setData({
      bcgImgAreaShow: true,
    })
  },
  // 隐藏背景区域
  hideBcgImgArea () {
    this.setData({
      bcgImgAreaShow: false,
    })
  },
  
  success (data, location) {
    this.setData({
      openSettingButtonShow: false,
      searchCity: location,
    })
    wx.stopPullDownRefresh()
    let now = new Date()
    // 存下来源数据
    data.updateTime = now.getTime()
    data.updateTimeFormat = utils.formatDate(now, "MM-dd hh:mm")
    wx.setStorage({
      key: 'cityDatas',
      data,
    })
    this.setData({
      cityDatas: data,
    })
  },
  fail(res) {
    wx.stopPullDownRefresh()
    let errMsg = res.errMsg || ''
    // 拒绝授权地理位置权限
    if (errMsg.indexOf('deny') !== -1 || errMsg.indexOf('denied') !== -1) {
      wx.showToast({
        title: '需要开启地理位置权限',
        icon: 'none',
        duration: 2500,
        success: (res) => {
          if (this.canUseOpenSettingApi()) {
            let timer = setTimeout(() => {
              clearTimeout(timer)
              wx.openSetting({})
            }, 2500)
          } else {
            this.setData({
              openSettingButtonShow: true,
            })
          }
        },
      })
    } else {
      wx.showToast({
        title: '网络不给力，请稍后再试',
        icon: 'none',
      })
    }
  },
  onShareAppMessage (res) {
    return {
      title:  '快来查询今天的天气如何',
      path:  '/pages/weather/test/index'
    }
  },
})