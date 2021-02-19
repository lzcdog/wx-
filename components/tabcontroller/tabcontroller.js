// components/tabcontroller/tabcontroller.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type : Array,
      value : []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currindex : 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabclick(event){
      const index = event.currentTarget.dataset.index
      this.setData({
        currindex : index
      })
      this.triggerEvent("pushindex",{index})
    },
    dongtaiindex(type){
      this.setData({
        currindex:type-1
      })
    }
  }
})
