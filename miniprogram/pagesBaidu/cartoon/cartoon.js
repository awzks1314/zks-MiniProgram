const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type
    },()=>{
      this.data.type == 'selfie_anime' && wx.setNavigationBarTitle({
        title: '动漫人像',
      })
      this.data.type == 'colourize' && wx.setNavigationBarTitle({
        title: '黑白老照片上色',
      })
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
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        const tempFilePaths = res.tempFilePaths[0];
        if (tempFilePaths.size > 1024 * 1000) {
          return wx.showToast({ icon: 'none', title: '图片过大, 请重新拍张小的！' })
        }
        that.getB64ByUrl(tempFilePaths);
 
        that.setData({
          imgs:null,
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
  changeCartoon(){
    if(!this.data.imgB64){
      app.toast('请上传图片~')
      return
    }
    var that = this
    wx.showLoading({
      title: '绘制中'
    })
    app.axios({
      url:`https://aip.baidubce.com/rest/2.0/image-process/v1/${that.data.type}?access_token=`+wx.getStorageSync('accessToken'),
      data:{
        image:that.data.imgB64
      }
    }).then(res => {
      wx.hideLoading()
      if(res.data.image){
        that.setData({
          img:null,
          imgs:res.data.image
        })
      }else{
        app.toast('请重试或者联系开发人员')
      }
    })
  }
})