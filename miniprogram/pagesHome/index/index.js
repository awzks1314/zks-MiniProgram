// miniprogram/pagesHome/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'thank',
    currentTab:0,
    title:[
      {name:'微信'},{name:'支付宝'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type
    })
    if(options.type == 'author') {
      this.changeHead()
    } 
  },
  changeHead(){
    // var str="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    // var st = ''
    // for(var i = 0;i < 13;i++){
    //   st += str.charAt(Math.floor(Math.random()*str.length))
    // }
    this.setData({
      // url:`https://api.adorable.io/avatars/282/${st}.png`
      url:'http://api.btstu.cn/sjtx/api.php?lx=a1&format=images?'+Math.floor(Math.random()*10000)
    })
  },
  open(e){
    var url = ''
    if(e.currentTarget.dataset.type == 'wechat'){
      url = 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/myimg/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20201022164933.jpg?sign=ed2eae5d337dbf7e56f31542293ab4b3&t=1603356685  '
    }else if(e.currentTarget.dataset.type == 'qq'){
      url = 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/myimg/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202010221649332.jpg?sign=a8c2a9a948cc6fb63c978364f251359b&t=1603356620'
    }else{
      url = 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/myimg/qrcode_for_gh_a8e35b77f20f_344.jpg?sign=199d8fe25083c3c3a320e8ddc5ced44e&t=1603356719'
    }
    wx.previewImage({
      urls: [url],
      current: url
    })
    // this.setData({
    //   img:url,
    //   imgShow:true
    // })
  },
  // popup(){
  //   this.setData({
  //     imgShow:false
  //   })
  // },
   // 改变选择tab
   change(e){
    this.setData({
      currentTab:e.detail.index,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})