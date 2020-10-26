const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    circleIndex:1,//性别
    number:2,//名字长度
    num:10,//生成数量
    word:null,//名字中包含的字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  circle(e){
    this.setData({
      circleIndex:e.currentTarget.dataset.index
    })
  },
  changeNumber(e){
    this.setData({
      number:e.currentTarget.dataset.number
    })
  },
  add(e){
    if(this.data.num >=50){
      return
    }else{
      this.setData({
        num:+this.data.num + 5
      })
    }
  },
  reduce(e){
    if(this.data.num<=1){
      return
    }else{
      this.setData({
        num:+this.data.num - 5
      })
    }
  },
  // 得到值
  getValue(e){
    this.setData({
      word:e.detail.value
    })
  },
  // 开始取名
  startBename(){
    console.log(this.data.word)
    var that = this
    var data = {
      key : app.globalData.tianxingKey,
      sex :that.data.circleIndex,
      wordnum : that.data.number,
      num:that.data.num
    }
    if(that.data.word){
      data.word = that.data.word
    }
    app.axios({
      url:'https://api.tianapi.com/txapi/cname/index',
      data,
      shake:true,
      shakeTime:3000
    }).then(res => {
      if(res.data.code == 200 &&  res.data.newslist){
        that.setData({
          List:res.data.newslist
        })
      }else{
        app.toast(res.data.msg)
      }
    })
  }
})