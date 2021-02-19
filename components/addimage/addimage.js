// components/addimage/addimage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imagedata:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    deleteimage(event){
      const index = event.currentTarget.dataset.index
      this.properties.imagedata.splice(index,1)
      this.setData({
        imagedata: this.properties.imagedata
      })
    }
  }
})
