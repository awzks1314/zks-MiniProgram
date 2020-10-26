const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    list:null,
    current:0,
    isShow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  // 滑动
  changeCurrent(e){
    console.log(e)
    if(e.detail.current == (+this.data.list.length -1)){
      this.getList()
    }
    this.setData({
      isShow:false,
      current:e.detail.current
    })
  },
  reduce(){
    if(this.data.current==0){
      app.toast('到头了~')
      return
    }else{
      this.setData({
        isShow:false,
        current:+this.data.current-1
      })
    }
  },
  add(){
    console.log(this.data.current)
    if(this.data.current== +this.data.list.length){
      this.getList()
      return
    }else{
      this.setData({
        isShow:false,
        current:+this.data.current+1
      })
    }
  },
  changeShow(){
    this.setData({
      isShow:true
    })
  },
  // 得到数据
  getList(){
    var that = this
    app.axios({
      url:'https://api.tianapi.com/txapi/naowan/index',
      data:{
        key:app.globalData.tianxingKey,
        num:10
      }
    }).then(res => {
      if(res.data.code == 200 && res.data.newslist){

        if(that.data.list && that.data.list.length>0){
          that.setData({
            list:[...that.data.list,...res.data.newslist]
          })
        }else{
          that.setData({
            list:res.data.newslist
          })
        }
      }else{
        app.toast(res.data.msg)
      }
    })
  }
})