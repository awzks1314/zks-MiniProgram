const util = require('../../../utils/utils');
const wiishes = require('../../../utils/wish');
const app = getApp();

let o;

Page({
  data: {
    index:-1,
    toname: '',
    relation: 1,
    sex: 1,
    today: '',
    sentday: '',
    sentence: '',
    wishesId: '',
    state: 0, //0 换一个, 1 制作我的祝福话
    showOverlay: false
  },
  finishCard () {
    this.setData({
      state: '1'
    })
  },
  changeOne (e) {
   const wishList = wiishes.sentence//祝福语
   const list = wiishes.classify[this.data.relation]
   const wish = list[this.data.sex]//当前关系性别所对应的祝福语
   if(this.data.index < wish.length){
     this.setData({
       index:this.data.index + 1
     })
   }
   if(this.data.index == wish.length){
    this.setData({
      index:0
    })
   }
   const a = wish[this.data.index]
   this.setData({
    sentence:wishList[a]
   })  
  },
  shareTips () {
    let that = this;
    this.setData({
      showOverlay: true
    })
    setTimeout(function() {
      that.hideOverlay()
    }, 1500);
  },
  hideOverlay () {
    this.setData({
      showOverlay: false
    })
  },
  // 调整到制作页面
  customCard () {
    wx.redirectTo({
      url: `/pagesOther/wishes/inedx/index`
    })
  },
  //跳转到自定义页面
  bindViewTap(){
    if (this.data.state === '0') {
      wx.navigateTo({
        url: `../custom/custom?toname=${this.data.toname}&sentence=${this.data.sentence}&relation=${this.data.relation}&sex=${this.data.sex}`
      })
    }
  },
  onLoad (options) {
    
    console.log('options', options)
    o = options;
  },
  // 授权
  getUserInfo(e){
    if (e.detail.userInfo) {
      let info = e.detail.userInfo
      wx.setStorageSync('userInfo', info);
      app.toast('请愉快的体验本小程序把~')
      this.setData({
        showModel:false
      })
      this.onShow()
    }
  },
  onShow(){
    let that = this;
    if(!wx.getStorageSync('userInfo')){
      this.setData({
        showModel:true
      })
      return
    }
    if (o.state === '0') {
      // 初始化数据
      this.setData({
        toname: o.name,
        state: o.state,
        fromname:o.fromname?o.fromname:null,
        sentence:o.sentence?o.sentence:'',
        relation: o.relation,
        sex: o.sex,
        today : util.formatTimeTwo(new Date().getTime()/1000,'Y年M月D日')
      })

      // 获取祝福话
      if(!o.sentence){
        this.changeOne();
      }
    }
    if (o.state === '1') {
      console.log('接收贺卡')
      this.setData({
          state: o.state,
          toname: o.toname,
          fromname: o.fromname,
          fromavatar: o.fromavatar,
          sentday: o.sentday,
          sentence: o.sentence
      })
    }

    //判断是否需要展示 点击跳转至自定义页面的提示
    let preview_custom_hint = wx.getStorageSync('preview-custom-hint') || false;
    this.setData({
      showCustomHint : preview_custom_hint,
      userInfo:wx.getStorageSync('userInfo')
    })
  },
  onShareAppMessage () {
    this.hideOverlay()
    return {
      title: `${this.data.userInfo.nickName}给您发来祝福`,
      desc: "你也可以制作祝福话送给TA哟！",
      path: '/pagesOther/wishes/preview/preview?&state=1&fromavatar='+this.data.userInfo.avatarUrl+'&toname='+this.data.toname+'&fromname='+this.data.userInfo.nickName+'&sentday='+this.data.today+'&sentence='+this.data.sentence
    }
  },
  confirmCustomHint : function(){
    wx.setStorageSync('preview-custom-hint',true);
    this.setData({
      showCustomHint:true
    })
  }
})
