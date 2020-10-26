const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!wx.getStorageSync('accessToken')){
      this.getKey()
    }
  },
  getKey(){
    var that = this 
    app.axios({
      url:'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=4CTd9SqIRlNDxzIRpetgMvBV&client_secret=SvujKGkk8L0fuPDenLiaGOAGocyHtDVN',
      method:'get'
    }).then(res => {
      console.log(res)
      if(res.data.refresh_token){
        wx.setStorageSync('accessToken', res.data.access_token)
        wx.setStorageSync('accessTokenTime', res.data.expires_in)
      }
    })
  },
   // 得到值
   getValue(e){
    this.setData({
      value:e.detail.value
    })
  },
  search(){
    if(!this.data.value){
      app.toast('内容不能为空~')
      return
    }
    wx.showLoading({
      title: '生成中~'      
    })
    this.setData({
      index:+this.data.index + 1
    })
    var that = this
    wx.request({
      url: 'https://aip.baidubce.com/rpc/2.0/creation/v1/couplets?access_token='+wx.getStorageSync('accessToken'),
      data:{
        text: that.data.value,
        index: that.data.index
      },
      header:{
        "Content-Type":"application/json"
      },
      method:'post',
      success: (result) => {
        if(result.data.couplets){
          that.setData({
            couplets:result.data.couplets
          })
        }else{
          app.toast('重试或联系开发人员~')
        }
        wx.hideLoading()
      },
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})