import regeneratorRuntime from '../../lib/runtime/runtime';
// import { chooseAddress, showModel, showToast, requestPayment } from '../../lib/asyncwx/asyncwx';
import { request } from '../../request/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ordertitle:['全部订单','待付款','待收货','退款/退货'],
    orderdata: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const token = wx.getStorageSync('token')
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    }
    const pages =  getCurrentPages()
    const {type} = pages[pages.length-1].options
    this.dongtaititle(type)
    this.getorderdata(type)
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
    wx.navigateBack({
      delta: 2
    })
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
  async getorderdata(type){
    const token = wx.getStorageSync('token')
    const header = {
      Authorization: token
    }
    let orderdata = await request({
      url:"/my/orders/all",
      header,
      data:{type}
    })
    orderdata = orderdata.data.message.orders
    orderdata.map(v=>{
      return v.create_time = new Date(v.create_time*1000).toLocaleString()
    })
    console.log(orderdata);
    this.setData({
      orderdata
    })
  },
  tabclick(event){
    const type = event.detail.index+1
    this.getorderdata(type)
  },
  dongtaititle(type){
    const tabcontroller = this.selectComponent(".tabcontroller")
    tabcontroller.dongtaiindex(type)
  }
})