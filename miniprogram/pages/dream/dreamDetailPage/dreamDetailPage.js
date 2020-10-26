const titleData = require('../../../utils/titleData.js');
const Util = require('../../../utils/utils.js');

Page({
    data: {
      index: null, // 当前显示的标题列表的下标
      title:null,
      titleData: titleData
    },
    onLoad(options){
      console.log(options)
      this.setData({
        index:options.index?options.index:0,
        title:options.name?options.name:'自然类'
      })
    },
    // 定义转发
    onShareAppMessage: Util.shareConfig,
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
});