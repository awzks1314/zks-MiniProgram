const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:null,
    showTips:true,
    isBottomSheetVisiable: false,//是否显示弹框标识
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      image:wx.getStorageSync('topImg')
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
  handleClick (e) {
    if (e.type === 'tap') {
      // 短按拍照为拍摄照片
      this.getImage()
    } else if (e.type === 'longpress') {
      // 长按拍照为选择照片
      this.getImage('album')
    }
  },
  getImage (type = 'camera') {
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success(res) {
        const tempFilePaths = res.tempFilePaths[0];
        // 图片过大
        if (tempFilePaths.size > 1024 * 1000) {
          return wx.showToast({ icon: 'none', title: '图片过大, 请重新拍张小的！' })
        }
        that.getB64ByUrl(tempFilePaths);
 
        that.setData({
          image: tempFilePaths,
          showTips:false
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
        // that.setData({
        //   imgB64: res.data
        // });
        that.detail(res.data)
      }
    })
  },
  detail(src){
    console.log('start')
    wx.showLoading({
      title: '分析中'
    })
    var that = this 
    app.axios({
      url:'https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token='+wx.getStorageSync('accessToken'),
      header:{
        "Content-Type":"application/json"
      },
      data:{
        image:src,
        image_type:"BASE64",
        face_field:"age,beauty,expression,face_shape,gender,glasses,landmark,landmark150,race,quality,eye_status,emotion,face_type,mask,spoofing"
      }
    }).then(res => {
      wx.hideLoading()
      if(res.data.error_msg == 'SUCCESS' && res.data.result){
        that.setData({
          result:res.data.result.face_list[0]
        })
      }else{
        app.toast('找不到你的小脸蛋喽~')
      }
    })   
  },
  onShow(){
    
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {
    if (!this.data.result) return
    // 如果有分析结果，则分享
    return { title: `刚刚测了我的颜值「${this.data.result.beauty}」你也赶紧来试试吧！` }
  }
})