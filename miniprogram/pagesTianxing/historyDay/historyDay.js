const app = getApp()
var util = require('../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  getList(){
    var that = this 
    var data = util.formatTimeTwo((new Date().getTime()/1000),'MD')
    console.log(data)
    app.axios({
      url:'https://api.tianapi.com/txapi/lishi/index',
      data:{
        key: app.globalData.tianxingKey,
        date: data
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == '200' ){
        that.setData({
          list: res.data.newslist
        },()=>{
          console.log(that.data.list)
        })
      }
    })
  }
})