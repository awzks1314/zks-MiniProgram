const app = getApp()
var bmap = require('../../libs/bmap-wx.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array1:[
      {name:'北京',id:11},{name:'天津',id:12},{name:'河北',id:13},{name:'河南',id:41},{name:'山东',id:37},{name:'山西',id:14},{name:'陕西',id:61},
      {name:'内蒙古',id:15},{name:'辽宁',id:21},{name:'吉林',id:22},{name:'黑龙江',id:23},{name:'上海',id:31},{name:'江苏',id:32},
      {name:'安徽',id:34},{name:'江西',id:36},{name:'湖北 ',id:42},{name:'湖南',id:43},{name:'重庆',id:50},{name:'四川',id:51},
      {name:'贵州',id:52},{name:'云南',id:53},{name:'广东',id:44},{name:'广西',id:45},{name:'福建',id:35},{name:'甘肃',id:62},
      {name:'宁夏',id:64},{name:'新疆',id:65},{name:'西藏',id:54},{name:'海南',id:46},{name:'浙江',id:33},{name:'宁夏',id:63}
    ],
    index1:null,
    // 院校类型
    typeList:[
      {name:'综合',id:5000},{name:'理工',id:5001},{name:'农林',id:5002},{name:'医药',id:5003},{name:'师范',id:5004},{name:'语言',id:5005},
      {name:'财经',id:5006},{name:'政法',id:5007},{name:'体育',id:5008},{name:'艺术',id:5009},{name:'民族',id:5010},{name:'军事',id:5011},{name:'其他',id:5012},
    ],
    typeIndex:null,
    // 办学类型
    schoolTypeList:[
      {name:'普通本科',id:6000},{name:'独立学院',id:6002},{name:'本科(高职)',id:6001},{name:'中外合作办学',id:6003},{name:'其他',id:6007},
    ],
    schoolTypeIndex:null,
    levelList:[
      {name:'985工程',type:'f985'},{name:'211工程',type:'f211'},{name:'一流大学建设高校',type:'dual_class',id:38001},{name:'一流学科建设高校',type:'dual_class',id:38000},{name:'教育部直属',type:'department',id:1},{name:'中央部委',type:'central',id:1},{name:'强基计划',type:'admissions',id:1},
    ],
    levelListIndex:null,
    page:1,
    size:20,
    uri:'apidata/api/gk/school/lists',
    key: "49ddf6a102a11bff74936f74f77e96b3",
    left: 0,
    right: 40,
    bottom: 100,
    bgColor: "#5677fc",
    lists: [{
      //图标/图片地址
      imgUrl: "https://7765-weixindemo-pw3dn-1300152060.tcb.qcloud.la/tool/32.png?sign=63af6a60b2b9a0d8057a47e4f32a6928&t=1602384095",
      //图片高度 rpx
      imgHeight: 64,
      //图片宽度 rpx
      imgWidth: 64,
      //名称
      text: "查看",
      //字体大小
      fontSize: 34,
      //字体颜色
      color: "#fff"
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 加入对比
  addComparison(e){
    var comparsion = wx.getStorageSync('comparsion') || []
    console.log(comparsion)
    // 没有重复就加入
    // var list =  wx.getStorageSync('comparsion') || []
    if(comparsion && comparsion.indexOf(e.currentTarget.dataset.id) != -1){
      app.toast('请勿重复添加~')
    }else{
      if(comparsion.length==3){
        app.toast('当前对比数量达到上限，请删除重新添加~')
      }else{
        console.log('开始加入')
        comparsion.push(e.currentTarget.dataset.id)
        wx.setStorageSync('comparsion', comparsion)
        app.toast('成功加入对比，点开悬浮按钮进行查看',1500)
        this.setData({
          comparsion
        })
      }
    }
  },
  onShow(){
    this.setData({
      comparsion:wx.getStorageSync('comparsion') || []
    })
  },
  // 查看详情
  detail(e){

  },
  // 点击
  onClick(e){
    wx.navigateTo({
      url: './comparison/comparison',
    })
  },
  // 重置
  reset(){
    this.setData({
      list:null,
      keyword:null,
      index1:null,
      province_id:null,
      typeIndex:null,
      type:null,
      schoolTypeIndex:null,
      school_type:null,
      levelListIndex:null,
      leveltype:null,
      levelId:null,
      page:1
    })
  },
  // 得到关键词
  getValue(e){
    this.setData({
      keyword: e.detail.value
    })
  },
  // 选择所在区域
  bindPickerChange1(e){
    console.log(e)
    this.setData({
      index1: e.detail.value,
      province_id:this.data.array1[e.detail.value].id
    })
  },
  // 选择院校类型
  bindPickerChange(e){
    this.setData({
      typeIndex: e.detail.value,
      type:this.data.typeList[e.detail.value].id
    })
  },
  // 选择办学类型
  bindPickerChange2(e){
    this.setData({
      schoolTypeIndex: e.detail.value,
      school_type:this.data.schoolTypeList[e.detail.value].id
    })
  },
  // 选择高校层次
  bindPickerChange3(e){
    this.setData({
      levelListIndex: e.detail.value,
      leveltype:this.data.levelList[e.detail.value].type,
      levelId:this.data.levelList[e.detail.value].id
    })
  },
  // 搜索
  search(){
    var data = {
      page:this.data.page,
      size:this.data.size,
      uri:this.data.uri
    }
    // 有搜索
    if(this.data.keyword){
      data.keyword = this.data.keyword
    }
    // 有省份
    if(this.data.province_id){
      data.province_id = this.data.province_id
    }
    // 有院校类型
    if(this.data.type){
      data.type = this.data.type
    }
    // 有办学类型
    if(this.data.school_type){
      data.school_type = this.data.school_type
    }
    // 有高校层次
    if(this.data.leveltype){
      if(this.data.leveltype == 'f985'){data.f985 = 1}
      else if(this.data.leveltype == 'f211'){data.f211 = 1}
      else if(this.data.leveltype == 'dual_class'){data.dual_class = this.data.levelId}
      else if(this.data.leveltype == 'department'){data.department = 1}
      else if(this.data.leveltype == 'central'){data.department = 1}
      else if(this.data.leveltype == 'admissions'){data.department = 1}
    }
    var that = this
    app.axios({
      url:'https://api.eol.cn/gkcx/api/',
      data,
      shake:true
    }).then(res => {      
      if(res.data.message == '成功' && res.data.data && res.data.data.item){
        // console.log(res.data.data.item)
        res.data.data.item.forEach(k => {
          k.addressList = k.address.split(',')
        })
        that.setData({
          list:res.data.data.item
        })
      }
    })
  },
  // 打开地图
  gotomap(e){
    // console.log(e.currentTarget.dataset.info)
    var address = null
    if(e.currentTarget.dataset.info.indexOf('：') == -1){
      address = e.currentTarget.dataset.info
    }else{
      address = e.currentTarget.dataset.info.split('：')[1]
    }
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'i1WbR87VMoXLWWVAKrWkOTbFdmaVxbOK'
    });
    var fail = function (data) {
      //console.log(data)
    };
    var success = function (data) {
      let wxMarkerData = []
      wxMarkerData = data.wxMarkerData;
      //console.log(wxMarkerData)
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude
      },()=>{
        BMap.regeocoding({
          location: that.data.latitude + ',' + that.data.longitude,
          success: function (res) {
            //console.log("location????????", res);
            that.setData({
              address: res.wxMarkerData[0].desc,
              name: res.wxMarkerData[0].address
            },()=>{
              wx.openLocation({
                latitude: that.data.latitude,
                longitude: that.data.longitude,
                name: address,
                address: address ,
                scale: 20
              })
            })
          },
        })
      });
    }
    // 发起geocoding检索请求  
    BMap.geocoding({
      address: address,
      fail: fail,
      success: success,
      iconPath: null,
      iconTapPath: null
    }); 
  },
  copy(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.info,
    })
  },
  // 上一页
  previousPage(){
    if(this.data.page == 1){
      app.toast('已经是第一页了~')
      return
    }else{
      this.setData({
        page:+this.data.page - 1
      },()=>{
        this.search()
      })
    }
  },
  // 下一页
  nextPage(){
    if(!this.data.list || this.data.list.length == 0){
      app.toast('请重试~')
      return
    }else{
      this.setData({
        page:this.data.page + 1
      },()=>{
        this.search()
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})