const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:1
  },
  onLoad: function (options) {
    this.setData({
      id: options.id ? options.id:1
    })
    this.getDetail()
  },
  getDetail(){
    console.log('111')
    var that = this
    app.axios({
      url: app.globalData.jixuUrl,
      data:{
        astroid:that.data.id,
        appkey: app.globalData.jixukey
      }
    }).then(res => {
      if(res.data.msg == 'ok' && res.data.result){
        that.setData({
          info:res.data.result
        })
      }else{
        that.setData({
          info: 'l'
        })
      }
    })
  },
})