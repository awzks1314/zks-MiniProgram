//index.js
//获取应用实例
var app = getApp();

Page({
  data: {
    relation: [{"id": "1","name": "长辈","img":"elder"},{"id": "2","name": "师长","img":"teacher"},{"id": "3","name": "领导","img":"leader"},{"id": "4","name": "同事","img":"colleague"},{"id": "5","name": "朋友","img":"friend"},{"id": "6","name": "恋人","img":"lover"},{"id": "7","name": "晚辈","img":"younger"},{"id": "8","name": "前任","img":"ex"}],
    gender: [{"id": "0","name": "男","img":"male"},{"id": "1","name": "女","img":"female"}],
    userInfo: {},
    query: {
      relationID:1,
      genderID:1,
      isMore: false
    }
  },
  changeToName(e) {
    let name = e.detail.value
    if (name.length > 10) {
      this.setData({
        isMore: true
      })
    } else {
      this.setData({
        isMore: false
      })
    }

    if (!name) {
      app.setToName(name)
    }
  },
  //事件处理函数
  generate: function(e) {    
    let data = e.detail.value;
    if (!data.toname){
      app.toast('请填写称呼')
      return
    }
    wx.navigateTo({
      url : `/pagesOther/wishes/preview/preview?state=0&relation=${data.relationID}&sex=${data.genderID}&name=${data.toname}`
    })
  },
  "tap_relation" : function(e){
    this.setData({"query.relationID":e.currentTarget.dataset.id});
  },
  "tap_gender" :function(e){
    this.setData({"query.genderID":e.currentTarget.dataset.id});
  },
  onLoad: function () {
    var that = this;    
    this.setData({
      relation1 : that.data.relation.slice(0,4),
      relation2 : that.data.relation.slice(4,8)
    });
  }
})
