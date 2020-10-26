const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bir:null,
    month:null,
    dat:null
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
  },
  bindDateChange(e){
    console.log(e)
    var str = e.detail.value
    str = str.split('-')
    this.setData({
      bir:e.detail.value,
      month:str[1],
      day:str[2]
    })
  },
  startTest(){
    if(!this.data.str){
      app.toast('选择生日~')
      return
    }
    var that = this
    app.axios({
      url:'https://api.tianapi.com/txapi/dob/index',
      data:{
        key:app.globalData.tianxingKey,
        m:that.data.month,
        d:that.data.day
      }
    }).then(res => {
      if(res.data.code == 200 && res.data.newslist){
        that.setData({
          infoList:res.data.newslist
        })
      }else{
        app.toast(res.data.msg)
      }
    })
  },
})