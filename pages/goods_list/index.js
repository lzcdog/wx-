// pages/goods_list/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from '../../request/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsdata: [],
    test: 0,
    title: ['综合','销量', '价格'],
    total:0,
    params:{
      query:"",
      cid:0,
      pagenum:1,
      pagesize:10
    },
    pagenum:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.params.cid = options.cid
    this.getgoodsdata()
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
    this.data.params.pagenum = 1
    this.data.goodsdata = []
    this.getgoodsdata()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pagenum : this.data.params.pagenum+1
    })
    const newpagenum = Math.ceil(this.data.total / this.data.params.pagesize)
    this.data.params.pagenum = this.data.pagenum
    if(this.data.pagenum <= newpagenum){
      this.getgoodsdata()
    }else{
      wx.showToast({
        icon:'none',
        title: '没有商品啦',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //获取商品数据
  async getgoodsdata(cid) {
    const res = await request({
      url: "/goods/search" ,
      data:this.data.params
    })
    console.log(res);
    this.data.goodsdata.push(...res.data.message.goods)
    const newres = this.data.goodsdata
    this.setData({
      total : res.data.message.total,
      goodsdata : newres
    })
    wx.stopPullDownRefresh()
  },

  //获取index
  getindex(event) {
    this.setData({
      test : event.detail.index
    })
  },
  //下拉刷新事件
})