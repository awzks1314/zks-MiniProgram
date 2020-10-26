// miniprogram/pages/navigation/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    routers: [
      {
        name: '土味情话',
        color:'blue',
        title:'Earthy',
        link:'../detail/detail?c=1001&&name=土味情话'
      },
      {
        name: '精神语录',
        color:'green',
        title:'spirit',
        link:'../detail/detail?c=1002&&name=精神语录'
      },
      {
        name: '网易云热评',
        color:'purple',
        title:'buzz',
        link:'../detail/detail?c=1003&&name=网易云热评'
      },
      {
        name: '舔狗日记',
        color:'mauve',
        title:'journal',
        link:'../detail/detail?c=1006&&name=舔狗日记'
      },
      {
        name: '诗词',
        color:'pink',
        title:'poetry',
        link:'../detail/detail?c=2009&&name=诗词'
      },
      {
        name: '哲学',
        color:'brown',
        title:'philosophy',
        link:'../detail/detail?c=2011&&name=哲学'
      },
      {
        name: '开车',
        color:'redpink',
        title:'drive',
        link:'../detail/detail?c=1004&&name=开车'
      },
      // {
      //   name: '停车场',
      //   color:'orange',
      //   title:'park',
      //   link:'../map/map?key=停车场'
      // },
      // {
      //   name: '公园',
      //   color:'olive',
      //   title:'park',
      //   link:'../map/map?key=公园'
      // },
      // {
      //   name: '厕所',
      //   color:'green',
      //   title:'lavatory',
      //   link:'../map/map?key=厕所'
      // },
    ]
  },
  handlerGobackClick() {
    const pages = getCurrentPages();
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: 1
      });
    } else {
      wx.switchTab({
        url: '/pages/tool/tool'
      });
    }
  },
  gotoUrl(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.link
    })
  }
})