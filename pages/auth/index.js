// pages/auth/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { chooseAddress, showModel,showToast,getuserinfo,getlogin } from '../../lib/asyncwx/asyncwx';
import { request } from '../../request/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  async getuserinfo(){
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    wx.setStorageSync('token', token)
    wx.navigateBack({
      delta: 1
    })
  }
  // async getuserinfo(){
  //   const res = await getuserinfo()
  //   const code = await getlogin()
  //   const params1 = [{
  //     encryptedData: res.encryptedData,
  //     rawData: res.rawData,
  //     iv: res.iv,
  //     signature: res.signature,
  //     code: code.code
  //   }]

  //   const token = await request({
  //     url:"/users/wxlogin",
  //     mothed:'post',
  //     data:params1
  //   })
  //   console.log(token);
  // }
})