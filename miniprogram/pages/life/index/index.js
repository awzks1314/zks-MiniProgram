// birth.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  bindDateChange: function (e) {
    var today = new Date(),
      birth = e.detail.value.split("-"),
      year = today.getFullYear() - parseInt(birth[0]),
      month = year * 12 + today.getMonth() - parseInt(birth[1]) + 1;
    if (month >= 900) {
      wx.showModal({
        title: "Over 900 months!",
        content: "Enjoy your magical life!",
        showCancel: false,
      })
    } else {
      app.birthday = e.detail.value;
      try {
        wx.setStorageSync('birthday', app.birthday)
      } catch (e) {
      }
      wx.redirectTo({
        url: '/pages/life/detail/index'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var today = new Date(),
      endDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    this.setData({
      today: endDate,
    })
  }
})