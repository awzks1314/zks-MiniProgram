const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:null,
    list:[
      // {
      //   name:'GitHub',
      //   icon:'explore',
      //   url:'',
      //   color:'#19be6b',
      // },
      {
        name:'关于作者',
        icon:'people',
        url:'/pagesHome/index/index?type=author',
        color:'#4e77d9',
      },
      {
        name:'更新日志',
        icon:'community',
        url:'/pagesHome/log/log',
        color:'#ff7900',
      },
      {
        name:'赞赏支持',
        icon:'like-fill',
        url:'/pagesHome/index/index?type=money',
        color:'#ed3f14',
      },
      {
        name:'特别鸣谢',
        icon:'agree',
        url:'/pagesHome/index/index?type=thank',
        color:'#5677fc',
      },
      {
        name:'意见反馈',
        icon:'send',
        // url:'/pagesHome/index/index?type=opinion',
        url:'',
        color:'#80848f',
      },
      {
        name:'手机信息',
        icon:'mobile',
        url:'/pagesHome/mobileInfo/mobileInfo',
        color:'#aaa',
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.changeHead()
  },
  changeHead(){
    // var str="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    // var st = ''
    // for(var i = 0;i < 13;i++){
    //   st += str.charAt(Math.floor(Math.random()*str.length))
    // }
    this.setData({
      // url:`https://api.adorable.io/avatars/282/${st}.png`,
      url:'http://api.btstu.cn/sjtx/api.php?lx=a1&format=images?'+Math.floor(Math.random()*10000)
    })
  },
  gotoUrl(e){
    console.log(e)
    if(e.currentTarget.dataset.url){
      wx.navigateTo({
        url: e.currentTarget.dataset.url      
      })
    }else{
      app.toast('添加作者微信私聊~')
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})