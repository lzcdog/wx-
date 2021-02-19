export const chooseAddress = ()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success: (result) => {
        resolve(result)
      }
    })
  })
}

export const showModel=({content})=>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      content,
      success:(res)=>{
        resolve(res)
      },
    })
  })
}

export const showToast = (data1)=>{
  return new Promise((resolve,reject)=>{
    wx.showToast({
      title: data1.title,
      icon: data1.icon,
      success:(res)=>{
        resolve(res)
      }
    })
  })
}

export const getuserinfo = ()=>{
  return new Promise((resolve,reject)=>{
    wx.getUserInfo({
      success : (res)=>{
        resolve(res)
      }
    })
  })
}

export const getlogin = ()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      success :(res)=>{
        resolve(res)
      }
    })
  })
}

export const requestPayment = (data)=>{
  return new Promise((resolve,reject)=>{
    wx.requestPayment({
      ...data,
      success:(res)=>{
        resolve(res)
      }
    })
  })
}