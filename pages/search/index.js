// pages/search/index.js
import {request} from "../../request/index"
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
import {debounce} from "../../lib/debounce/debounce"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchdata: [],
    value:""
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
  
  bindinput(event){
    const query	= event.detail.value
    if(!query.trim()){
      return
    }
    clearTimeout(this.t1ime1)
    this.t1ime1 = setTimeout(() => {
      this.ffe(query)
    }, 500);
  }, 
  async ffe(query){
    const res= await request({
      url: "/goods/qsearch",
      data:{query:query}
    })
    this.setData({
      searchdata: res.data.message
    })
  },
  cancleclick(){
    this.setData({
      value: "",
      searchdata: []
    })
  }
})