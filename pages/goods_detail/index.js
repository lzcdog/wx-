import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from '../../request/index';
import { showToast } from '../../lib/asyncwx/asyncwx';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detaildata: [],
    swiperdata: [],
    shoucang: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const goods_id = options.goods_id
    this.getdetaildata(goods_id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    let shoucang1 = wx.getStorageSync('shoucang')
    if (shoucang1 != "") {
      let goods_id = getCurrentPages()
      goods_id = goods_id[goods_id.length - 1].options.goods_id
      const index = shoucang1.findIndex(v => v.goods_id == goods_id)
      if (index != -1) {
        const shoucang = shoucang1[index].shoucang
        this.setData({
          shoucang
        })
      } else {
        return
      }
    }else{
      return
    }

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
  async getdetaildata(goods_id) {

    const res = await request({
      url: "/goods/detail",
      data: { goods_id }
    })

    this.setData({
      detaildata: {
        goods_name: res.data.message.goods_name,
        goods_price: res.data.message.goods_price,
        goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
        goods_id: res.data.message.goods_id,
        pics_mid: res.data.message.pics[0].pics_mid
      },
      swiperdata: res.data.message.pics
    })
  },

  //加入购物车
  addcarclick() {
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v => v.goods_id === this.data.detaildata.goods_id);
    console.log(index);
    if (index === -1) {
      this.data.detaildata.num = 1,
        this.data.detaildata.select = true,
        cart.push(this.data.detaildata)
    } else {
      cart[index].num++
      console.log(1);
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true,
    });
  },
  async shoucangclick() {
    let useinfo = wx.getStorageSync('userinfo')
    if (useinfo == '') {
      await showToast({ title: "请先登录再收藏", icon: "none" })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/user/index',
        })
      }, 2000);
      return
    } else {
      let shoucang = wx.getStorageSync('shoucang') || []
      let index = shoucang.findIndex(v => v.goods_id === this.data.detaildata.goods_id)
      if (index === -1) {
        this.data.detaildata.shoucang = true
        shoucang.push(this.data.detaildata)
        wx.setStorageSync('shoucang', shoucang)
        await showToast({ title: "收藏成功", mask: "true" })
      } else {
        shoucang.splice(index, 1)
        wx.setStorageSync('shoucang', shoucang)
        await showToast({ title: "取消收藏", mask: "true" })
      }
      this.setData({
        shoucang: !this.data.shoucang
      }),
        console.log();
    }
  }

})