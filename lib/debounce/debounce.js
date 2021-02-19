export function debounce  (fn,interval){
  let timer;
  let delay = interval || 1000;
  return function(){
    let that = this;
    let args = arguments; // 保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    if (timer) {
      clearTimeout(timer);
    } 
    timer = setTimeout(function () {
      fn.apply(that, args);  // 用apply指向调用debounce的对象，相当于this.fn(args);
    }, delay);
  };
}