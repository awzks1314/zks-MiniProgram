const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    c:1003,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.setData({
      c:options.c
    },()=>{
      this.getDeatil()
    })
  },
  getDeatil(){
    var that = this 
    app.axios({
      url:`https://api.oddfar.com/yl/q.php?c=${that.data.c}&encode=json`,
      method:'get'
    }).then(res => {
      if(res.data.code == 200 && res.data.text){
        // res.data.text = res.data.text.replace('。','<br>')
        that.setData({
          result:res.data.text
        })
      }
    })
  },
  copy(){
    wx.setClipboardData({
      data: this.data.result,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})