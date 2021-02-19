// pages/feedback/index.js
import { showToast } from '../../lib/asyncwx/asyncwx';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: ['体验问题', '商品、商家投诉'],
    topcontent: ['功能建议', '购买遇到问题', '性能问题', '其他'],
    currindex: NaN,
    imagedata: [],
    value: ""
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
  click(event) {
    const index = event.currentTarget.dataset.index
    this.setData({
      currindex: index
    })
  },
  addimgclick() {
    wx.chooseImage({
      count: 9,
      success: (res) => {
        this.setData({
          imagedata: res.tempFilePaths
        })
      }
    })
  },
  bindinput(event) {
    const value = event.detail.value
    this.setData({
      value
    })
  },
  tijiaoclick() {
    const text = this.data.value
    if (!text.trim()) {
      showToast({ title: "输入的东西不合法", icon: "none", mask: true })
      return
    } else {
      wx.showLoading({
        title: '上传中',
      })
      if (this.data.imagedata == "") {
        this.setData({
          value: "",
          imagedata: []
        })
        wx.navigateBack({
          delta: 1
        })
      } else {
        this.data.imagedata.forEach((v, i) => {
          wx.uploadFile({
            filePath: v,
            name: 'file',
            url: 'http://tuchuang.org/',
            success: (res) => {
              wx.hideLoading()
              this.setData({
                value: "",
                imagedata: []
              })
              wx.navigateBack({
                delta: 1
              })
            }
          })
        })
      }


    }
  }
})