export const request = (params) =>{
  return new Promise((resolve,reject) =>{
  wx.showLoading({
    title: "加载中",
    mask: true,
  });
  const baseurl = "https://api-hmugo-web.itheima.net/api/public/v1"
  console.log(...params);
    wx.request({
      ...params,
      url:baseurl+params.url,
      success : (result)=>{
        resolve(result)
      },
      fail : (err) =>{
        reject(err)
      },
      complete: ()=>{
        wx.hideLoading()
      }
    })
  })
}