const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:null,
    type:null,
    currencyObject:null,
    list:null,
    logoList:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type
    })
    if(!wx.getStorageSync('accessToken') || wx.getStorageSync('accessTime')<0){
      this.getKey()
    }
  },
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
  /**
   * 选择图片
   */
  chooseimgTap: function() {
    this.setData({
      list:null,
      currencyObject:null
    });
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths[0];
        // 图片过大
        if (tempFilePaths.size > 1024 * 1000) {
          return wx.showToast({ icon: 'none', title: '图片过大, 请重新拍张小的！' })
        }
        that.getB64ByUrl(tempFilePaths);
 
        that.setData({
          img: tempFilePaths
        });
 
      }
    })
  },
  /**
   * 转b64
   */
  getB64ByUrl: function(url) {
    const FileSystemManager = wx.getFileSystemManager();
    var that = this
    FileSystemManager.readFile({
      filePath: url,
      encoding: 'base64',
      success(res) {
        // console.log(res.data);
        that.setData({
          imgB64: res.data
        });
      }
    })
  },
 
  /**
   * 植物识别
   */
  plantTap: function(e) {
    const imgB64 = this.data.imgB64;
    if (!imgB64) {
      app.toast('请选择图片~')
      return;
    };
    if(this.data.type == 'logo'){
      this.getlogo()
    }
    else if(this.data.type == 'dish'){
      this.getResultDish()
    }else{
      this.getResult();
    }
  },
  // logo
  getlogo(){
    var that = this
    wx.showLoading({
      title: '识别中'
    })
    app.axios({
      url:`https://aip.baidubce.com/rest/2.0/image-classify/v2/${that.data.type}?access_token=`+wx.getStorageSync('accessToken'),
      data:{
        image:this.data.imgB64
      }
    }).then(res => {
      wx.hideLoading()
      if (res.data.result && res.data.result.length>0){
        res.data.result.forEach(k => {
          k.pre = (Number(k.probability)*100).toFixed(4)
        })
        that.setData({
          logoList:res.data.result
        })
      }else{
        app.toast('没有识别到，请重新选择')
      }
    })
  },
  // 菜品 
  getResultDish(){
    var that = this
    wx.showLoading({
      title: '识别中'
    })
    app.axios({
      url:`https://aip.baidubce.com/rest/2.0/image-classify/v2/${that.data.type}?access_token=`+wx.getStorageSync('accessToken'),
      data:{
        image:this.data.imgB64,
        filter_threshold:0.95,
        baike_num:5
      }
    }).then(res => {
      wx.hideLoading()
      if(res.data.result){
        res.data.result.forEach(k => {
          k.pre = (Number(k.probability)*100).toFixed(4)
        })
        that.setData({
          dishList:res.data.result
        })
      }else{
        app.toast('请重试或者联系开发人员')
      }
    })
  },
  // 植物，货币
  getResult(data){
    var that = this
    wx.showLoading({
      title: '识别中'
    })
    app.axios({
      url:`https://aip.baidubce.com/rest/2.0/image-classify/v1/${that.data.type}?access_token=`+wx.getStorageSync('accessToken'),
      data:{
        image:this.data.imgB64
      }
    }).then(res => {
      wx.hideLoading()
      if(res.data.result && res.data.result.hasdetail == 0){
        app.toast('请重试或者联系开发人员')
      }else if(res.data.result && that.data.type == 'currency'){
        // 货币
        that.setData({
          currencyObject:res.data.result
        })
      }else if(res.data.result && that.data.type == 'redwine'){
        // 红酒
        that.setData({
          redwineList:res.data.result
        })
      }else if(res.data.result){
        // 植物 动物
        res.data.result.forEach(k => {
          k.pre = (Number(k.score)*100).toFixed(4)
        })
        that.setData({
          list:res.data.result
        })
      }else{app.toast('请重试或者联系开发人员')}
    })
  }
})