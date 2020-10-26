// miniprogram/pages/inquire/main/main.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:null,
    title:null,
    url:null,
    searchKey:null,
    info:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type
    var title = null
    var url = null
    if(type == 1){
      title = '身份证归属地'
      url = '/idcode/get'
    }else if(type == 2){
      title = '手机号归属地'
      url = '/mobile/get'
    }else if(type == 3){
      title = '地址查邮编'
      url = '/addtopost/get'
    }else{
      title = 'IP查地址'
      url = '/ipaddr/get'
    }
    this.setData({
      title:title,
      type,
      url:app.globalData.djshUrl+''+url
    })
  },
  // 输入得到值
  changeSearchKey(e){
    let val = e.detail.value;
    this.setData({
      searchKey: val
    });
  },
  // 确定
  searchTap(){
    let key = this.data.searchKey;
    if (key == '' || !key) {
      wx.showModal({
        content: '内容不能为空',
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: '#888'
      });
      return;
    }
    var  data = {
      cn_to_unicode: 1,
      token: app.globalData.djshKey,
    }
    if (this.data.type == 1) { data.idnum = key}
    else if (this.data.type == 2) { data.phone_num = key}
    else if (this.data.type == 3) { data.jiedao = key }
    else if (this.data.type == 4) { data.ip = key }
    var that = this
    app.axios({
      url: that.data.url,
      data
    }).then(res => {
      if (res.data.ErrorCode == 0){
          that.setData({
            info: res.data.Result
          })
      }else{
        app.toast(res.data.ErrorReason)
      }
    })
      
    },
  handlerGobackClick() {
      const pages = getCurrentPages();
      if (pages.length >= 2) {
        wx.navigateBack({
          delta: 1
        });
      } else {
        wx.switchTab({
          url: '/pages/tool/tool'
        });
      }
    },
    handlerGohomeClick() {
      wx.switchTab({
        url: '/pages/tool/tool'
      });
    },
})