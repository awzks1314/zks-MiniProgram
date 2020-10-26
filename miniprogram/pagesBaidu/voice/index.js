const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spd:5,
    pit:5,
    vol:5,
    currentIndex:1,
    query:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.innerAudioContext = wx.createInnerAudioContext()
    if(!wx.getStorageSync('accessToken') || wx.getStorageSync('accessTime')<0){
      this.getKey()
    }
  },
  // 获取秘钥
  getKey(){
    var that = this 
    app.axios({
      url:'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=4CTd9SqIRlNDxzIRpetgMvBV&client_secret=SvujKGkk8L0fuPDenLiaGOAGocyHtDVN',
      method:'get'
    }).then(res => {
      console.log(res)
      if(res.data.refresh_token){
        wx.setStorageSync('accessToken', res.data.access_token)
        wx.setStorageSync('accessTokenTime', res.data.expires_in)
      }
    })
  },
  add(e){
    let type = e.currentTarget.dataset.type
    if(type == 'spd'){
      if(  this.data.spd>= 15){
        app.toast('已达到最大值~')
      }else{
        this.setData({
          spd:this.data.spd+1
        })
      }
    }else if(type == 'pit'){
      if(  this.data.pit>= 15){
        app.toast('已达到最大值~')
      }else{
        this.setData({
          pit:this.data.pit+1
        })
      }
    }else if(type == 'vol'){
      if(  this.data.vol>= 15){
        app.toast('已达到最大值~')
      }else{
        this.setData({
          vol:this.data.vol+1
        })
      }
    }
  },
  reduce(e){
    let type = e.currentTarget.dataset.type
    if(type== 'spd'){
      if(  this.data.spd== 1){
        app.toast('已达到最小值~')
      }else{
        this.setData({
          spd:this.data.spd-1
        })
      }
    }else if(type == 'pit'){
      if( this.data.pit== 1){
        app.toast('已达到最小值~')
      }else{
        this.setData({
          pit:this.data.pit-1
        })
      }
    }else if(type == 'vol')
      if( this.data.vol== 1){
        app.toast('已达到最小值~')
      }else{
        this.setData({
          vol:this.data.vol-1
        })
      }
    },
    change(e){
      if(e.currentTarget.dataset.index == this.data.currentIndex){
        return
      }else{
        this.setData({
          currentIndex:e.currentTarget.dataset.index
        })
      }
    },
    // 得到输入值
    getValue(e){
      this.setData({
        query:e.detail.value
      })
    },
    // 播放
    play(){
      if(!this.data.query){
        app.toast('输入合成内容~')
        return
      }
      var that = this
      // var data = {
      //   tex:that.data.query,
      //   tok:wx.getStorageSync('accessToken'),
      //   cuid:'abczks123456',
      //   ctp:1,
      //   lan:'zh',
      //   spd:that.data.spd,
      //   pit:that.data.pit,
      //   vol:that.data.vol,
      //   per:that.data.currentIndex
      // }
      if (wx.setInnerAudioOption) {
          wx.setInnerAudioOption({
          obeyMuteSwitch: false,
          autoplay: true
          })
        }else {
          this.data.innerAudioContext.obeyMuteSwitch = false;
          this.data.innerAudioContext.autoplay = true;
        }
      //监听各个阶段
      this.data.innerAudioContext.onCanplay(() => {
        console.log('可以播放');
      });
      this.data.innerAudioContext.onError((res) => {
        console.log(res.errMsg);
        console.log(res.errCode);
      });
      this.data.innerAudioContext.autoplay = true
      this.data.innerAudioContext.src = 'https://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=zks123456&tok='+wx.getStorageSync('accessToken')+'&tex=' + encodeURIComponent(that.data.query) + `&vol=${that.data.vol}&per=${that.data.currentIndex}&spd=${that.data.spd}&pit=${that.data.pit}&aue=3`;
      this.data.innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    }
    
})