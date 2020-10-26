// miniprogram/pages/navigation/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    routers: [
      {
        name: '动物识别',
        color:'blue',
        title:'animal',
        link:'/pagesBaidu/photoAnimal/photoAnimal?type=animal'
      },
      {
        name: '植物识别',
        color:'green',
        title:'plant',
        link:'/pagesBaidu/photoAnimal/photoAnimal?type=plant'
      },
      {
        name: '货币识别',
        color:'purple',
        title:'currency',
        link:'/pagesBaidu/photoAnimal/photoAnimal?type=currency'
      },
      {
        name: '菜品识别',
        color:'mauve',
        title:'dish',
        link:'/pagesBaidu/photoAnimal/photoAnimal?type=dish'
      },
      {
        name: 'logo识别',
        color:'pink',
        title:'logo',
        link:'/pagesBaidu/photoAnimal/photoAnimal?type=logo'
      },
      {
        name: '红酒识别',
        color:'brown',
        title:'redwine',
        link:'/pagesBaidu/photoAnimal/photoAnimal?type=redwine'
      },
      {
        name: '图片转换',
        color:'redpink',
        title:'transverter',
        link:'/pagesBaidu/transverter/transverter'
      },
      {
        name: '动漫人像',
        color:'orange',
        title:'cartoon',
        link:'/pagesBaidu/cartoon/cartoon?type=selfie_anime'
      },
      {
        name: '黑白照上色',
        color:'olive',
        title:'colourize',
        link:'/pagesBaidu/cartoon/cartoon?type=colourize'
      },
      // {
      //   name: '厕所',
      //   color:'green',
      //   title:'lavatory',
      //   link:'../map/map?key=厕所'
      // },
    ]
    // {
    //   name: '动物识别',
    //   key:14,
    //   link: '/pagesBaidu/photoAnimal/photoAnimal?type=animal'
    // },
    // {
    //   name: '植物识别',
    //   key:15,
    //   link: '/pagesBaidu/photoAnimal/photoAnimal?type=plant'
    // },
    // {
    //   name: '货币识别',
    //   key:16,
    //   link: '/pagesBaidu/photoAnimal/photoAnimal?type=currency'
    // },
    // {
    //   name: '菜品识别',
    //   key:17,
    //   link: '/pagesBaidu/photoAnimal/photoAnimal?type=dish'
    // },
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