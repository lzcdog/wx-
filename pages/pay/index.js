// pages/pay/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { chooseAddress, showModel, showToast, requestPayment } from '../../lib/asyncwx/asyncwx';
import { request } from '../../request/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartdata: [],
    finindex: 0,
    finprice: 0,
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
    const address = wx.getStorageSync('address')
    let cartdata = wx.getStorageSync('cart') || []
    cartdata = cartdata.filter(v => v.select)
    this.setconfig(cartdata)
    this.setData({
      address,
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
  async addressclick() {
    const result = await chooseAddress()
    result.all = result.provinceName + result.cityName + result.countyName + result.detailInfo
    wx.setStorageSync('address', result)
    this.setData({
      address: result,
    })
  },

  setconfig(cartdata) {
    let finprice = 0
    let finindex = 0
    cartdata.forEach(v => {
      finprice = v.goods_price * v.num + finprice
      finindex = v.num + finindex
    })
    this.setData({
      cartdata,
      finprice,
      finindex,
    })
  },
  async zhifu() {
    try {
      if (this.data.address == "") {
        await showToast({ title: "请填写收货地址信息", icon: "none" })
        return
      }
      const token = wx.getStorageSync('token')
      const header = {
        Authorization: token
      }
      let goods = []
      this.data.cartdata.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }))
      const data = {
        order_price: this.data.finprice,
        consignee_addr: this.data.address.all,
        goods
      }

      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        })
      } else {
        const dd = await request({
          url: "/my/orders/create",
          header,
          method: "post",
          data
        })
        //获取支付参数
        const zfcs = await request({
          url: "/my/orders/req_unifiedorder",
          header,
          method: "post",
          data: { order_number: dd.data.message.order_number }
        })
        const pay = zfcs.data.message.pay
        const zk = await request({
          url: "/my/orders/chkOrder",
          method: "post",
          header,
          data: { order_number: dd.data.message.order_number }
        })
        await showToast({ title: "支付成功" })
        const cart = wx.getStorageSync('cart').filter(v => !v.select)
        wx.setStorageSync('cart', cart)
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/order/index?type=1',
          })
        }, 2000);

        await requestPayment(
          {
            nonceStr: pay.nonceStr,
            package: pay.package,
            paySign: pay.paySign,
            timeStamp: pay.timeStamp,
            signType: pay.signType
          })
        // const zk = await request({
        //   url:"/my/orders/chkOrder",
        //   method:"post",
        //   header,
        //   data:{order_number:dd.data.message.order_number}
        // })
        // console.log(zk);
        // await showToast({title:"支付成功"})
      }
    } catch (err) {
      await showToast({ title: "支付失败", icon: "none" })
    }
  }
})