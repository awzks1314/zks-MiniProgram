// miniprogram/pagesOther/fortune/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pixelRatio: 0,
    windowWidth: 0,
    windowHeight: 0,
    showBgImagePath:'',
    showBgImagePath2:'/images/showtextbg@3x.png',
    showBgImagePath3: '/images/showtextbg@3x.png',
    // showBgImagePath2: 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/showtextbg%403x.png?sign=9b3369f804f3b109be005d30258f2c1f&t=1602386499',
    // showBgImagePath3: 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/showtextbg%403x.png?sign=9b3369f804f3b109be005d30258f2c1f&t=1602386499',
    name: '',
    title: '',
    desc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let arr = wx.getStorageSync('currentFortuneData') || {};
    this.setData({
      name: arr.name +'的2021运势',
      title: arr.title,
      desc: arr.desc
    })
    wx: wx.getSystemInfo({
      success: function (res) {
        that.setData({
          pixelRatio: res.pixelRatio,
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
      }
    })
  },
  returnIndex(){
    wx.navigateBack()
  },
  onReady(){
    this.drawCanvas();
  },
  drawCanvas: function () {
    // 根据像素比绘画不同的图片
    if (this.data.pixelRatio == 2) {
      this.setData({
        showBgImagePath: this.data.showBgImagePath2
      });
    } else {
      this.setData({
        showBgImagePath: this.data.showBgImagePath3
      });
    }
    let ctx = wx.createCanvasContext('myCanvas');
    // 画布宽高
    let ctxW = this.data.windowWidth;
    let ctxH = this.data.windowHeight - 80;
    // 默认像素比
    let pixelRatio = this.data.pixelRatio;
    // 屏幕系数比，以设计稿375*667（iphone7）为例
    let XS = this.data.windowWidth/375;

    // 垂直渐变
    const grd = ctx.createLinearGradient(0, 0, 0, ctxH);
    grd.addColorStop(0, '#0E128D');
    grd.addColorStop(1, '#080E3A');
    ctx.setFillStyle(grd);

    ctx.fillRect(0, 0, ctxW, ctxH);
    console.log(this.data.showBgImagePath)
    ctx.drawImage(this.data.showBgImagePath, ctxW / 2 - 158*XS, 68 * XS, 317 * XS, 361 * XS);
    // ctx.drawImage(this.data.dogBgImagePath, 20 * XS, 331 * XS, 61 * XS, 98 * XS);

    ctx.setFontSize(18 * XS);
    ctx.setFillStyle('#F7F7FA');
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.fillText(this.data.name, ctxW / 2, 92 * XS);

    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.setFontSize(35 * XS);
    ctx.setFillStyle('#232884');
    this.fontLineFeed(ctx, this.data.title, 1, 38 * XS, ctxW / 2, 154 * XS);

    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.setFontSize(14);
    ctx.setFillStyle('#FF72A5');
    this.fontLineFeed(ctx, this.data.desc, 16 * XS, 20 * XS, 190 * XS, 364 * XS);

    ctx.stroke();
    ctx.draw();
  },
  // 文字换行
  /**
   * ctx,画布对象
   * str,需要绘制的文字
   * splitLen,切割的长度字符串
   * strHeight,每行文字之间的高度
   * x,位置
   * y
   */
  fontLineFeed:function(ctx,str,splitLen,strHeight,x,y){
    let strArr=[];
    for (let i = 0, len = str.length / splitLen;i<len;i++){
      strArr.push(str.substring(i * splitLen, i * splitLen + splitLen));
    }
    let s=0;
    for (let j = 0, len = strArr.length ; j < len; j++) {
      s = s + strHeight;
      ctx.fillText(strArr[j], x, y+s);
    }
  },
  // 保存图片
  saveImage: function (e) {
    
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(result){
            wx.showToast({
              title: '图片保存成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '2018运势小程序',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          icon: 'loading',
          duration: 2000
        })
      }
    }
  }
})