const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      { name: '白羊座', id: 1, time: '3/21-4/19' },
      { name: '金牛座', id: 2, time: '4/20-5/20' },
      { name: '双子座', id: 3, time: '5/21-6/21' },
      { name: '巨蟹座', id: 4, time: '6/22-7/22' },
      { name: '狮子座', id: 5, time: '7/23-8/22' },
      { name: '处女座', id: 6, time: '8/23-9/22' },
      { name: '天秤座', id: 7, time: '9/23-10/23' },
      { name: '天蝎座', id: 8, time: '10/24-11/22' },
      { name: '射手座', id: 9, time: '11/23-12/21' },
      { name: '魔蝎座', id: 10, time: '12/22-1/19' },
      { name: '水瓶座', id: 11, time: '1/20-2/18' },
      { name: '双鱼座', id: 12, time: '2/19-3/20' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  gotoDetail(e){
    wx.navigateTo({
      url: '../detail/index?id=' + e.currentTarget.dataset.id      
    })
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
  handlerGohomeClick() {
    wx.switchTab({
      url: '/pages/tool/tool'
    });
  },
})