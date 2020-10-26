// pages/life/life.js
var app = getApp();
function checkBirth(that) {
  if (!app.birthday) {
    try {
      app.birthday = wx.getStorageSync('birthday')
      if (!app.birthday) {
        wx.navigateTo({
          url: '../index/index',
        })
      }
    } catch (e) {
    }
  };
  if (app.birthday) {
    setForm(app.birthday, that)
  }
}
function setForm(birthday, that) {
  var today = new Date(),
    birth = birthday.split("-"),
    year = today.getFullYear() - parseInt(birth[0]),
    month = year * 12 + today.getMonth() - parseInt(birth[1]) + 1,
    day = today.getDate() - parseInt(birth[2]),
    bgColor,
    list = [];
  if (day < 0) {
    month--;
  }
  for (var i = 0; i < 900; i++) {
    var key = Math.floor(Math.random() * 8)
    if (i < month) {  //已过
      bgColor = "orange";
    } else if (i == month) {
      bgColor = "#0081ff";
    } else {
      switch (key) {
        case 1:
          bgColor = "#d2d1d8";
          break;
        case 2:
          bgColor = "#b1b0b5";
          break;
        case 3:
          bgColor = "#c4c4c5";
          break;
        case 4:
          bgColor = "#dedee2";
          break;
        default:
          bgColor = "#e4e4f3";
          break;
      }
    }
    list.push({ color: bgColor });
  };
  var birthDate = new Date(birth[0] + "/" + birth[1] + "/" + birth[2] + " 00:00:00"),
    days = Math.floor((today.getTime() - birthDate.getTime()) / (24 * 3600 * 1000)),
    text = "You have lived " + days + " days.\nMaybe " + (900 - month) + " months left.";
    that.setData({
      list: list,
      text: text,
    });
}
Page({
  reset: function () {    
    wx.redirectTo({
      url: '../index/index',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var windowWidth, width;
    wx.getSystemInfo({
      success: function (res) {
        windowWidth = res.windowWidth;
        width = Math.floor(windowWidth / 750 * 20) * 30 + Math.floor(windowWidth / 750 * 4) * 30;

      }
    });
    console.log(width)
    this.setData({
      boxWidth: width + 'px',
    })
    checkBirth(this);
  }
})