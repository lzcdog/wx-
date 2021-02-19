import {request} from "../../request/index"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数据
    swiperdata:[],
    //中间导航栏数据
    cnavbardata:[],
    //楼层数据
    floordata:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getswiperdata(),
    this.getcnavbardata(),
    this.getfloordata()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  //获取轮播图数据
  async getswiperdata(){
    const res = await request({
      url : "/home/swiperdata"
    })
    this.setData({
      swiperdata : res.data.message
    })
  },

  //获取中间导航栏数据
  async getcnavbardata(){
    try{
      const res = await request ({
        url : "/home/catitems"
      })
      this.setData({
        cnavbardata : res.data.message
      })
    }
    catch(err){
      console.log(err);
    }
  },

  //获取楼层数据
  async getfloordata(){
    const res = await request({
      url:"/home/floordata"
    })
    this.setData({
      floordata : res.data.message
    })
  }

})