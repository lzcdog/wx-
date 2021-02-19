// pages/cart/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { chooseAddress, showModel,showToast } from '../../lib/asyncwx/asyncwx';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartdata: [],
    allselect: true,
    finindex: 0,
    finprice: 0,
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const cartdata = wx.getStorageSync('cart') || []
    this.setconfig(cartdata)
  },

  async addressclick() {
    const result = await chooseAddress()
    result.all = result.provinceName + result.cityName + result.countyName + result.detailInfo
    wx.setStorageSync('address', result)
    this.setData({
      address: result,
    })
  },

  danselect(event) {
    const index = event.currentTarget.dataset.index
    let { cartdata } = this.data
    cartdata[index].select = !cartdata[index].select
    this.setconfig(cartdata)
  },

  setconfig(cartdata) {
    let finprice = 0
    let finindex = 0
    let allselect = true
    cartdata.forEach(v => {
      if (v.select) {
        finprice = v.goods_price * v.num + finprice
        finindex = v.num + finindex
      } else {
        allselect = false
      }
    })
    this.setData({
      cartdata,
      finprice,
      finindex,
      allselect: cartdata.length == 0 ? false : allselect
    })
    wx.setStorageSync('cart', cartdata)
  },

  allselectclick() {
    let { cartdata, allselect } = this.data
    cartdata.forEach(v => {
      v.select = !allselect
    })
    this.setconfig(cartdata)
  },

  async suanfa(event) {
    const index = event.currentTarget.dataset.index
    let suanfa = event.currentTarget.dataset.suanfa
    let { cartdata } = this.data
    if (suanfa == "-1") {
      if (cartdata[index].num == 1) {
        const res = await showModel({ content: "是否要删除该商品" })
        if (res.confirm) {
          cartdata.splice(index, 1)
          this.setconfig(cartdata)
        }
      }else{
        cartdata[index].num -= 1
      }
    } else {
      console.log(1);
      cartdata[index].num += 1
    }
    this.setconfig(cartdata)
  },

  async  jiesuan(){
    let {finindex} = this.data
    if(finindex==0){
      await showToast({title:'请选择购买商品',icon:'none'})
      return
      }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }
})