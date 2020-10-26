//index.js
//获取应用实例
const app = getApp()
var colorUtil = require('../util/colordeal.js');
// var cloudUtil = require('/util/cloudAnima.js');
// var netUtil = require('../network/net.js');


Page({
  data: {
    playMusicName: '自然风声',
    playMusicDes: '聆听大自然最质朴的声音',
    playlink:'http://yss.yisell.com/yisell/pays2018050819052088/sound/yisell_sound_2007_12_20_3_11_20593.mp3',
    playBgOrignColor: '#005F8C',//历史颜色
    playBgOrignColorEnd: '#f0f0f0',//历史颜色  
    playBgClorStart: '#005F8C',//当前颜色
    playBgClorEnd: '#f0f0f0',//渐变色
    playIndex: 0,//当前播放的索引位置
    isPlay:false,
    userInfo: {},
    playsrc: 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/sleep/wind128.png?sign=a740679e73512a283225cfc1bcd14342&t=1602386215',
    playbtn: 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/sleep/play.png?sign=a740679e73512a283225cfc1bcd14342&t=1602386215',
    pausebtn: 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/sleep/pause.png?sign=6e7906db298228cce0bd99e561afe9cb&t=1602386256',
    prebtn: 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/sleep/pre.png?sign=6e7906db298228cce0bd99e561afe9cb&t=1602386256',
    nextbtn: 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/sleep/next.png?sign=6e7906db298228cce0bd99e561afe9cb&t=1602386256',
    listbtn: 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/sleep/list.png?sign=6e7906db298228cce0bd99e561afe9cb&t=1602386256',
    likebtn: 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/sleep/like.png?sign=6e7906db298228cce0bd99e561afe9cb&t=1602386256',    
    voice:'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/sleep/voice.png?sign=cff609e35e6d6021f9999c538c967976&t=1602386324',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isBottomSheetVisiable: false,//是否显示弹框标识

    //testData
    array: [{
      musicName: '自然风声',
      musicDes: '聆听大自然最质朴的声音',
      link:'http://yss.yisell.com/yisell/pays2018050819052088/sound/yisell_sound_2007_12_20_3_11_20593.mp3',
      musicImg: 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/sleep/wind128.png?sign=a740679e73512a283225cfc1bcd14342&t=1602386215',
      musicImgSmall:'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/sleep/wind.png?sign=a740679e73512a283225cfc1bcd14342&t=1602386215',
      musicBgStart: '#005F8C',
      musicBgEnd:'#f0f0f0'
    }, {
      musicName: '雷雨天气',
      musicDes: '打雷下雨的雨夜',
      link:'http://yss.yisell.com/yisell/pays2018050819052088/sound/yisell_sound_2008_1_19_14_39_556564.mp3',
      musicImg: 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/sleep/rain.png?sign=a740679e73512a283225cfc1bcd14342&t=1602386215',
      musicImgSmall: 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/sleep/rain48.png?sign=a740679e73512a283225cfc1bcd14342&t=1602386215',
      musicBgStart: '#111111',
      musicBgEnd: '#f0f0f0'
    }, {
      musicName: '沙漠风尘',
      musicDes: '沙漠深处的狂风',
      link:'http://yss.yisell.com/yisell/ybys2018050819052088/sound/yisell_sound_2014032622352420234_88366.mp3',
      musicImg: 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/sleep/storm.png?sign=a740679e73512a283225cfc1bcd14342&t=1602386215',
      musicImgSmall: 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/sleep/storm48.png?sign=a740679e73512a283225cfc1bcd14342&t=1602386215',
      musicBgStart: '#B95C00',
      musicBgEnd: '#f0f0f0'
    }, {
      musicName: '林中鸟语',
      musicDes: '林间小鸟的清越啼鸣',
      link:'http://yss.yisell.com/yisell/pays2018050819052088/sound/yisell_sound_2007_12_5_16_59_307735.mp3',
      musicImg: 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/sleep/trees.png?sign=a740679e73512a283225cfc1bcd14342&t=1602386215',
      musicImgSmall: 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/sleep/trees48.png?sign=a740679e73512a283225cfc1bcd14342&t=1602386215',
      musicBgStart: '#119F11',
      musicBgEnd: '#f0f0f0'
    }, {
      musicName: '大海之音',
      musicDes: '大海潺潺的流水声音',
      link:'http://yss.yisell.com/yisell/pays2018050819052088/sound/yisell_sound_2007_11_23_11_27_584661.mp3',
      musicImg: 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/sleep/sea.png?sign=a740679e73512a283225cfc1bcd14342&t=1602386215',
      musicImgSmall: 'https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/sleep/sea48.png?sign=a740679e73512a283225cfc1bcd14342&t=1602386215',
      musicBgStart: '#003973',
      musicBgEnd: '#f0f0f0'
    }]

  },

  onReady: function () {
    this.drawBg()
    // cloudUtil.drawAnimaCloud()//白云飘动动画
    // netUtil.getMusicList();
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onShow() {
  },
  //绘制渐变背景
  drawBg: function () {
    var height;
    var width;
    wx.getSystemInfo({
      success: function(res) {
        height=res.screenHeight;
        width=res.screenWidth;
      },
    })
    var context = wx.createCanvasContext('myCanvas')
    const grd = context.createLinearGradient(0, 0, 0, height)
    grd.addColorStop(0, this.data.playBgClorStart)
    grd.addColorStop(0.7, this.data.playBgClorEnd)
    grd.addColorStop(1, this.data.playBgClorStart)
    context.setFillStyle(grd)
    context.fillRect(0, 0, width, height)
    context.draw()
  },
  //渐变背景切换动画
  drawBgAnim: function () {
    var height;
    var width;
    wx.getSystemInfo({
      success: function (res) {
        height = res.screenHeight;
        width = res.screenWidth;
      },
    })
    var duration = 500;
    var step = 50;
    var orignColor = this.data.playBgOrignColor;
    var orignColorEnd = this.data.playBgOrignColorEnd;
    
    var destiColor = this.data.playBgClorStart;
    var destiColorEnd = this.data.playBgClorEnd;
    

    //导航栏渐变
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: destiColor,
      animation: {
        duration: duration,
        timingFunc: 'linear'
      }
    });
    //获取渐变颜色值
    var array = [];
    var arrayEnd=[];
    array = colorUtil.gradient(orignColor, destiColor, step);
    arrayEnd = colorUtil.gradient(orignColorEnd, destiColorEnd, step);
    var timeStep = duration / array.length;
    console.log(timeStep);
    var i = 0
    setInterval(function () {
      if (i < array.length) {
        var context = wx.createCanvasContext('myCanvas')
        const grd = context.createLinearGradient(0, 0, 0, height)
        grd.addColorStop(0, array[i])
        grd.addColorStop(0.7, arrayEnd[i])
        grd.addColorStop(1, array[i])
        context.setFillStyle(grd)
        context.fillRect(0, 0, width, height)
        context.draw()
        i++;
      }
    }, timeStep)


  },

  //列表按钮点击
  bindViewTap: function () {
    this.showModal()
  },



  // 列表弹框动画
  showModal: function () {
    var heightV = 300;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    this.animation = animation
    var isV = false
    if (this.data.isBottomSheetVisiable == true) {
      animation.translateY(heightV).step()
      isV = false;

    } else {
      animation.translateY(-heightV).step()
      isV = true;
    }
    this.setData({
      animationAlert: animation.export(),
      isBottomSheetVisiable: isV,
    })
  },

  //隐藏弹框动画
  hideAlert: function () {
    var heightV = 300;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    this.animation = animation
    var isV = false
    if (this.data.isBottomSheetVisiable == true) {
      animation.translateY(heightV).step()
      isV = false;

    }
    this.setData({
      animationAlert: animation.export(),
      isBottomSheetVisiable: isV,
    })
  },


  //点击弹框背景
  clickAlertBg: function () {
    this.showModal()
  },

  //点击列表item
  clickAlertList: function (event) {
    var origColor = this.data.playBgClorStart;//将当前颜色保存为历史颜色
    var origColorEnd = this.data.playBgClorEnd;//将当前颜色保存为历史颜色
    this.setData({
      playMusicName: event.currentTarget.dataset.name,
      playMusicDes: event.currentTarget.dataset.des,
      playBgOrignColor: origColor,
      playIndex: event.currentTarget.dataset.id,
      playBgClorStart: event.currentTarget.dataset.bgstart,
      playBgClorEnd: event.currentTarget.dataset.bgend,
      playsrc:event.currentTarget.dataset.cover,
      playlink:event.currentTarget.dataset.link,
    })
    this.drawBgAnim()
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    //暂停监听
    backgroundAudioManager.src = this.data.playlink
    this.playMusic()
  },
  //下一首
  clickNext: function () {
    var origColor = this.data.playBgClorStart;//将当前颜色保存为历史颜色
    var array = [];
    array = this.data.array;
    if (this.data.playIndex+1 > array.length - 1) {
      this.setData({
        playIndex: -1,
      })
    }

    this.setData({
      playMusicName: array[this.data.playIndex + 1].musicName,
      playMusicDes: array[this.data.playIndex + 1].musicDes,
      playBgOrignColor: origColor,
      playIndex: this.data.playIndex + 1,
      playBgClorStart: array[this.data.playIndex + 1].musicBgStart,
      playBgClorEnd: array[this.data.playIndex + 1].musicBgEnd,
      playsrc: array[this.data.playIndex + 1].musicImg,
      playlink: array[this.data.playIndex + 1].link
    })
    this.drawBgAnim()
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    //暂停监听
    backgroundAudioManager.src = this.data.playlink
    this.playMusic()
  },
  //上一首
  clickPre: function () {
    var origColor = this.data.playBgClorStart;//将当前颜色保存为历史颜色
    var array = [];
    array = this.data.array;
    if (this.data.playIndex-1 < 0) {
      this.setData({
        playIndex: array.length
      })
    }

    this.setData({
      playMusicName: array[this.data.playIndex - 1].musicName,
      playMusicDes: array[this.data.playIndex - 1].musicDes,
      playBgOrignColor: origColor,
      playIndex: this.data.playIndex - 1,
      playBgClorStart: array[this.data.playIndex - 1].musicBgStart,
      playBgClorEnd: array[this.data.playIndex - 1].musicBgEnd,
      playsrc: array[this.data.playIndex - 1].musicImg,
      playlink: array[this.data.playIndex + 1].link
    })
    this.drawBgAnim()
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    //暂停监听
    backgroundAudioManager.src = this.data.playlink
    this.playMusic()
  },

  //播放点击事件
  playMusic:function(){
    var that=this
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    var isp=this.data.isPlay==true?false:true;
    if(isp==true){

      if(backgroundAudioManager.src==null){
        backgroundAudioManager.title = this.data.playMusicName
        backgroundAudioManager.epname = this.data.playMusicDes
        backgroundAudioManager.singer = '优质睡眠'
        backgroundAudioManager.coverImgUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521440401578&di=ec47a4c86e104e436a7696b78290f204&imgtype=0&src=http%3A%2F%2Fpic.2265.com%2Fupload%2F2017-7%2F20177141332134035.png'
        backgroundAudioManager.src = this.data.playlink 
      }else{
        if (backgroundAudioManager.currentTime == backgroundAudioManager.duration) {
          backgroundAudioManager.startTime=0;
        }
        backgroundAudioManager.play();
      }
    }else{
      backgroundAudioManager.pause();
    }
    //播放监听
    backgroundAudioManager.onPlay(function(){
      that.setData({
        isPlay:true
      })
      
    })
    //暂停监听
    backgroundAudioManager.onPause(function () {
      that.setData({
        isPlay: false
      })
    })
    //停止监听
    backgroundAudioManager.onStop(function () {
      that.setData({
        isPlay: false
      })
    })
    //放完监听
    backgroundAudioManager.onEnded(function(){
      that.setData({
        isPlay: false
      })
    })  
  },

  error(e) {
    console.log(e.detail)
  }

})
