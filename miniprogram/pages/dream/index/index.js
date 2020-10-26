const Util = require('../../../utils/utils.js');
Page({
    data: {
        searchKey: '' // 输入查询的关键字
    },
    // 检查输入内容
    checkData() {
        let key = this.data.searchKey;

        if (key == '') {
            wx.showModal({
                content: '请输入您的梦境',
                showCancel: false,
                confirmText: '我知道了',
                confirmColor: '#888'
            });
            return false;
        }

        return true;
    },
    // 执行搜索
    searchTap() {
        if (!this.checkData()) return;

        let key = this.data.searchKey;

        let index1 = key.indexOf('梦到了');

        if (index1 != -1) {
            key = key.substr(index1 + 3);
        }

        let index2 = key.indexOf('梦到');

        if (index2 != -1) {
            key = key.substr(index2 + 2);
        }

        wx.navigateTo({
            url: '../detail/detail?key=' + key
        });
    },
  // 搜索内容变动
  changeSearchKey(e) {
    let val = e.detail.value;

    this.setData({
      searchKey: val
    });
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
    
    // 定义转发
    onShareAppMessage: Util.shareConfig
});
