const groupData = require('../../../utils/groupData.js');
const Util = require('../../../utils/utils.js');

Page({
    data: {
        groupData: groupData.groupData
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
