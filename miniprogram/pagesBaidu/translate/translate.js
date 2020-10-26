const md5 = require('../../public/js/md6.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query:null,//翻译内容
    currentIndex:0,//当前选择
    str:'zh',//翻译目标
    resultList:null,
    list:[
      {name:'中文',string:'zh'},
      {name:'繁体',string:'cht'},
      {name:'英文 ',string:'en'},
      {name:'粤语',string:'yue'},
      {name:'日语',string:'jp'},
      {name:'文言文',string:'wyw'},
      {name:'韩语',string:'kor'},
      {name:'法语',string:'fra'},
      {name:'泰语',string:'th'},
      {name:'越南语',string:'vie'},
      {name:'俄语',string:'ru'},
      {name:'德语',string:'de'},
      {name:'西班牙语',string:'spa'},
      {name:'葡萄牙语',string:'pt'},
      {name:'意大利语',string:'it'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 重置翻译结果
  rest(){
    if(!this.data.query){
      app.toast('无内容，无需重置')
      return
    }
    this.setData({
      query:null
    })
  },
  // 复制翻译结果
  copy(){
    var data = this.data.resultList&&this.data.resultList[0]
    wx.setClipboardData({
      data: data.dst,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  // 得到输入值
  getValue(e){
    this.setData({
      query:e.detail.value
    })
  },
  // 翻译
  tanslate(){
    console.log(this.data.query)
    if(!this.data.query){
      app.toast('请输入翻译内容')
      return
    }
    wx.showLoading({
      title: '翻译中'
    })
    var that = this
    var salt = Math.ceil(Math.random()*10**10)
    var sign = '20200416000422100'+that.data.query+salt+'jakMswxkC065sXTjsvQ1'
    console.log(sign)
    sign = md5.md5(sign)
    console.log(sign)
    var data  = {
      q:that.data.query,
      from:'auto',
      to:that.data.str,
      appid:'20200416000422100',
      salt,
      sign
    }
    app.axios({  
      url:'https://fanyi-api.baidu.com/api/trans/vip/translate',
      data
    }).then(res => {
      wx.hideLoading()
      if(res.data.trans_result){
        that.setData({
          resultList:res.data.trans_result
        })
      }
    })
  },
  changeIndex(e){
    console.log(e)
    this.setData({
      str:e.currentTarget.dataset.str,
      currentIndex:e.currentTarget.dataset.index,
    })
  },
})