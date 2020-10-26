const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      list:wx.getStorageSync('comparsion') || []
    },()=>{
      this.data.list && this.getInfoList()
    })
  },
  getInfoList(){
    var list = []
    var that = this
    this.data.listInfo = []
    this.data.list && this.data.list.forEach(k => {
       app.axios({
        url:`https://static-data.eol.cn/www/school/${k}/pc_index.json`,
        method:'get'
      }).then(res => {
        if(res.statusCode == 200 && res.data){
          that.setData({
            listInfo:[...that.data.listInfo,res.data]
          })
        }
      })
    })
    console.log(this.data.listInfo)
    // this.setData({
    //   listInfo:list
    // },()=>{
    //   console.log(this.data.listInfo)
    // })
  },
  dele(e){
    this.data.list.splice(e.currentTarget.dataset.index,1)
    this.getInfoList()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})