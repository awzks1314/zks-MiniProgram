const mobilePage = require('../../../utils/groupData.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobileList:mobilePage.mobilePage
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeType(e){
    console.log(e)
    this.data.mobileList.forEach((l,index)=> {
      if(index == e.currentTarget.dataset.index){
        l.isShow = !l.isShow
      }else{
        l.isShow = false
      }
    })
    this.setData({
      mobileList:this.data.mobileList
    })
  },
  callMobile(e){
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.mobile
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})