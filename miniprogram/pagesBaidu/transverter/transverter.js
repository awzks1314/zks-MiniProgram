const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str:'pencil',
    name:'铅笔风格',
    img:null,
    imgs:null,
    option:[
      {name:'铅笔风格',str:'pencil'},
      {name:'神奈川冲浪里油画风格',str:'wave'},
      {name:'奇异油画风格',str:'mononoke'},
      {name:'卡通画风格',str:'cartoon'},
      {name:'彩色铅笔画风格',str:'color_pencil'},
      {name:'呐喊油画风格',str:'scream'},
      {name:'哥特油画风格',str:'gothic'},
      {name:'薰衣草油画风格',str:'lavender'},
      {name:'彩色糖块油画风格',str:'warm'},  
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  changeIndex(e){
    console.log(e)
    this.setData({
      str:this.data.option[e.detail.value].str,
      name:this.data.option[e.detail.value].name
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
  changeStyle(){    
    const imgB64 = this.data.imgB64;
    if (!imgB64) {
      app.toast('请选择图片~')
      return;
    };
    wx.showLoading({
      title: '绘制中'
    })
    var that = this
    var data = {
      image:that.data.imgB64,
      option:that.data.str
    }
    app.axios({
      url:'https://aip.baidubce.com/rest/2.0/image-process/v1/style_trans?access_token='+wx.getStorageSync('accessToken'),
      data
    }).then(res => {
      if(res.data.image){
        that.setData({
          imgs:res.data.image
        })
        wx.hideLoading()
      }else{
        wx.hideLoading()
        app.toast('请重试~')
      }
    })
  },
})