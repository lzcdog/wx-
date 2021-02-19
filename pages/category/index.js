// pages/category/index.js
import {request} from "../../request/index"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftdata:[],
    rightdata:[],
    currindex:0,
    scrollertop:0,
  },
  //全局变量
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cates = wx.getStorageSync('cates')
    if(!cates){
      this.getcategorydata()
    }else{
      if(Date.now()-cates.time>10000){
        this.getcategorydata()
      }else{
        //获取左侧和右侧的菜单栏数据
        this.Cates = cates.data
      let leftdata =this.Cates.map(v=>v.cat_name)
      let rightdata = this.Cates[0].children;
      this.setData({
        leftdata : leftdata,
        rightdata : rightdata
      })
      }
    }

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
  
  async getcategorydata(){
    // request({
    //   url:"/categories"
    // }).then(res=>{
    //   this.Cates = res.data.message
    //   //储存到缓存中
    //   wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
    //   //获取左侧和右侧的菜单栏数据
    //   let leftdata =this.Cates.map(v=>v.cat_name)
    //   let rightdata = this.Cates[0].children;
    //   this.setData({
    //     leftdata : leftdata,
    //     rightdata : rightdata
    //   })
    // })
    const res = await request({
      url:"/categories"
    })
    this.Cates = res.data.message
    //储存到缓存中
    wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
    //获取左侧和右侧的菜单栏数据
    let leftdata =this.Cates.map(v=>v.cat_name)
    let rightdata = this.Cates[0].children;
    this.setData({
      leftdata : leftdata,
      rightdata : rightdata
    })
  },

  caleftclick(event){
    let index = event.currentTarget.dataset.index
    let rightdata = this.Cates[index].children
    this.setData({
      currindex : index,
      rightdata : rightdata,
      scrollertop : 0
    })
  }
})
