const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    constellation:null,
    list:['白羊','金牛','双子','巨蟹','狮子','处女','天秤','天蝎','射手','魔蝎','水瓶','双鱼'],
    lists:['所有星座','白羊','金牛','双子','巨蟹','狮子','处女','天秤','天蝎','射手','魔蝎','水瓶','双鱼'],         
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindDateChange(e){
    console.log(e)
    this.setData({
      index:this.data.list[e.detail.value],
    })
  },
  bindDateChange1(e){
    
    this.setData({
      indexs:this.data.lists[e.detail.value],
    })
  },
  startTest(){
    var data = {
      key:app.globalData.tianxingKey,
      me:this.data.index,
    }
    if(this.data.indexs == '所有星座'){
      data.all = 0
    }else{
      data.he = this.data.indexs
    }
    var that = this
    app.axios({
      url:'https://api.tianapi.com/txapi/xingzuo/index',
      data
    }).then(res => {
      if(res.data.code == 200 && res.data.newslist){
        that.setData({
          infoList:res.data.newslist
        })
      }else{
        app.toast(res.data.msg)
      }
    })
  }
})