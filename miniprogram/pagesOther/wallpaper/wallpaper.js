const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    array:[
      {name:'风景',src:'fengjing'},
      {name:'妹子',src:'meizi'},
      {name:'动漫',src:'dongman'},
      {name:'随机',src:''},
    ],
    type:'fengjing',
    url:''
  },
  onLoad(options){
    console.log(options)
    if(options.type){
      this.setData({
        index:options.index,
        type:options.type,
        url:options.url
      })
    }else{
      this.getImg()
    }
    wx.showModal({
      confirmText: '好的',
      content: '长按保存图片ヾ(◍°∇°◍)ﾉﾞ',
      showCancel: false
    })
  },
  getImg(){
    app.axios({
      url:`https://api.btstu.cn/sjbz/api.php?method=mobile&format=json&lx=${this.data.type}`,
      method:'get'
    }).then(res => {
      if(res.data.code == 200){
        this.setData({
          url:res.data.imgurl
        })
      }
    })
    // this.setData({
    //   url:`https://api.btstu.cn/sjbz/api.php?method=mobile&format=images&lx=${this.data.type}&`+Math.ceil(Math.random()*10000)
    // })
  },
  bindPickerChange(e){
    this.setData({
      index: e.detail.value,
      type:this.data.array[e.detail.value].src
    },()=>{
      this.getImg()
    })
  },
  save(){
    wx.downloadFile({
      url: this.data.url,     //仅为示例，并非真实的资源
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.showToast({
                title: '保存图片成功！',
              })
            },
            fail(res) {
              wx.showToast({
                title: '保存图片失败！',
              })
            }
          })
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '您有一个好友邀请你查看壁纸',
      path: '/pagesOther/wallpaper/wallpaper?index=' + this.data.index+'&type='+this.data.type+'&url='+this.data.url    
    };
  }
})