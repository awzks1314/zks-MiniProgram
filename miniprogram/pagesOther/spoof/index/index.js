// miniprogram/pagesOther/spoof/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    randomName: '你的小可爱',
    randomRemark: 'My Love',
    soundUrl: 'https://c.jiangwenqiang.com/music/glgl.mp3'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  inputValue: function inputValue(e) {
    if (e.currentTarget.dataset.type === 'remark') {
      this.setData({
        randomRemark: e.detail.value
      });
    } else {
      this.setData({
        randomName: e.detail.value
      });
    }
  },
  jumpCall: function jumpCall() {
    wx.navigateTo({
      url: '../call/call?randomName=' + this.data.randomName + '&randomRemark=' + this.data.randomRemark + '&soundUrl=' + this.data.soundUrl + '&type=needback'
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '您有一个好友来电请接听',
      path: '/pagesOther/spoof/call/call?randomName=' + this.data.randomName + '&randomRemark=' + this.data.randomRemark + '&soundUrl=' + this.data.soundUrl,
      imageUrl: 'https://7465-teach-1258324355.tcb.qcloud.la/image/phone.png'
    };
  },
})