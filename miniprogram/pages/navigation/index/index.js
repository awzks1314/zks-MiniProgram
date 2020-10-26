// miniprogram/pages/navigation/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    routers: [
      {
        name: '美食',
        color:'blue',
        title:'fine good',
        link:'../map/map?key=美食'
      },
      {
        name: '民宿',
        color:'green',
        title:'homestay',
        link:'../map/map?key=民宿'
      },
      {
        name: '地铁',
        color:'purple',
        title:'subway',
        link:'../map/map?key=地铁'
      },
      {
        name: '公交站',
        color:'mauve',
        title:'bus station',
        link:'../map/map?key=公交站'
      },
      {
        name: '电影院',
        color:'pink',
        title:'cinema',
        link:'../map/map?key=电影院'
      },
      {
        name: '商场',
        color:'brown',
        title:'shopping mall',
        link:'../map/map?key=商场'
      },
      {
        name: '加油站',
        color:'redpink',
        title:'petrol station',
        link:'../map/map?key=加油站'
      },
      {
        name: '停车场',
        color:'orange',
        title:'park',
        link:'../map/map?key=停车场'
      },
      {
        name: '公园',
        color:'olive',
        title:'park',
        link:'../map/map?key=公园'
      },
      {
        name: '厕所',
        color:'green',
        title:'lavatory',
        link:'../map/map?key=厕所'
      },
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