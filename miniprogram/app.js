//app.js
let reque = require('utils/request.js')
App({
  axios: reque.axios,
  toast: reque.toast,
    
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env:"weixindemo-pw3dn",
        traceUser: true,
      })
    }
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.globalData.systeminfo = res
        this.globalData.isIPhoneX = /iphonex/gi.test(res.model.replace(/\s+/, ''))
      },
    })
    this.checkUpdateVersion();//若有新版本，强制更新
  },
  
  //检测更新
  checkUpdateVersion: function() {
    var that = this
    //创建 UpdateManager 实例
    const updateManager = wx.getUpdateManager();
    //检测版本更新
    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        //监听小程序有版本更新事件
        updateManager.onUpdateReady(function() {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate();
              } else if (res.cancel){
                wx.showModal({
                  title: '温馨提示~',
                  content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                  success: function (res) {
                    that.checkUpdateVersion()
                    return;
                    //第二次提示后，强制更新           
                    if (res.confirm) {
                      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                      updateManager.applyUpdate()
                    } else if (res.cancel) {
                      //重新回到版本更新提示
                      that.checkUpdateVersion()
                    }
                  }
                })
              }
            }
          })
        })
        updateManager.onUpdateFailed(function() {
          // 新版本下载失败
          wx.showModal({
            title: '已经有新版本咯~',
            content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索“荣e购”打开呦~',
          })
        })
      }
    })
  },
  globalData:{
    jixukey:'',//极速数据
    jixuUrl:'',//星座url
    djshKey:'',//点睛数据
    djshUrl:'',//点睛数据
    keepscreenon:false,
    systeminfo: {},//系统信息
    isIPhoneX: false,//是否是iphoneX
    weatherKey:'',//和风天气key
    weatherIconUrl: '',//天气图标地址
    requestWeather:{
      sevenDay:'https://free-api.heweather.com/s6/weather',//7天天气
      hour:'https://free-api.heweather.com/s6/weather/hourly',//24小时
    },
    daySentence:'',//每日一句
    tianxingKey:'',//天行数据
  }
})
