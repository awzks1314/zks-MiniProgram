
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      toname:options.toname,
      fromname:wx.getStorageSync('userInfo').nickName,
      sentence:options.sentence,
      sex:options.sex,
      relation:options.relation
    })
  },
  getValueto(e){
    this.setData({
      toname:e.detail.value
    })
  },
  getValuefrom(e){
    this.setData({
      fromname:e.detail.value
    })
  },
  bindChangeText(e){
    this.setData({
      sentence:e.detail.value
    })
  },
  gotoUp(){
    wx.reLaunch({
    url:`../preview/preview?state=0&sex=${this.data.sex}&name=${this.data.toname}&sex=${this.data.sex}&relation=${this.data.relation}&sentence=${this.data.sentence}&fromname=${this.data.fromname}`
    })
  }
})