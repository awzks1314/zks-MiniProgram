const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'哈士奇',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      title: "查询中"
    })
    var that = this
    app.axios({
      url:'https://api.tianapi.com/txapi/pet/index',
      data:{
        key:app.globalData.tianxingKey,
        name:that.data.value
      }
    }).then(res => {
      console.log(res)
      wx.hideLoading({})
      if(res.data.code == 200 && res.data.newslist){
        res.data.newslist[0].desc = res.data.newslist[0].desc.trim()
        res.data.newslist[0].characterFeature = res.data.newslist[0].characterFeature.trim()
        res.data.newslist[0].feature = res.data.newslist[0].feature.trim()
        res.data.newslist[0].careKnowledge = res.data.newslist[0].careKnowledge.trim()
        res.data.newslist[0].feedPoints = res.data.newslist[0].feedPoints.trim()
        that.setData({
          newlist:res.data.newslist[0]
        })
      }else{
        app.toast(res.data.msg)
        that.setData({
          newlist:null
        })
      }
    })
  },
})