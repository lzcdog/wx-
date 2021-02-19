// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currindex: 0,
    binpai: ['全部','正在热卖','即将上线'],
    collecttitle: ['商品收藏','品牌收藏','店铺收藏','浏览足迹'],
    shoucangdata: []
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
    const shoucangdata = wx.getStorageSync('shoucang')
    this.setData({
      shoucangdata
    })
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
  binpaiclick(event){
    const {index} = event.currentTarget.dataset
    this.setData({
      currindex: index
    })
  }
})