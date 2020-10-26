// miniprogram/pages/navigation/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    routers: [
      {
        name: '身份证归属地',
        color:'blue',
        title:'identity card',
        link:'../main/main?type=1'
      },
      {
        name: '手机号归属地',
        color:'green',
        title:'cell-phone',
        link:'../main/main?type=2'
      },
      // {
      //   name: '地址查邮编',
      //   color:'purple',
      //   title:'location',
      //   link:'../main/main?type=3'
      // },
      {
        name: 'IP查地址',
        color:'mauve',
        title:'ip address',
        link:'../main/main?type=4'
      },
      // {
      //   name: '电影院',
      //   color:'pink',
      //   title:'cinema',
      //   link:'../map/map?key=电影院'
      // },
      // {
      //   name: '商场',
      //   color:'brown',
      //   title:'shopping mall',
      //   link:'../map/map?key=商场'
      // },
      // {
      //   name: '加油站',
      //   color:'redpink',
      //   title:'petrol station',
      //   link:'../map/map?key=加油站'
      // },
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