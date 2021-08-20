// ---------------------防抖动功能-------------------------
// 想要传递的函数，跟延迟时间
// debounce 防抖，服务器请求的数据过于频繁，如果下一次执行来的很快，那么上一次就会被取消掉
// 当第一张图片要被请求的时候，接着要请求第二张，第一张就会被取消，不会被请求，当执行到最后一张
// 只请求了一次(有时候由网速和服务器有关，请求不止一次)，就将所有的数据拿过来了，防抖就是防止请求数据的频繁
export function debounce(func,delay){
  let timer = null
  return function(...args){
    // 第一次的时间为空
    if(timer) clearTimeout(timer)
    // 当图片请求来的时间比delay快（也就是 < 200），就会被取消请求，直接跳到下一次
    // 【原理：当图片请求太快的时候下一次的清理时间函数已经来了，直接被调用，
    // 但此时timer里面还有时间，就会被清除，就开始第二张图片的请求】
    
    // 当图片请求来的时间比delay慢（也就是 > 200），就会直接发起一次请求
    // 【原理：因为如果比delay慢，倒计时就会结束，timer里面存储的时间就会被直接return出去，就会直接调用func，然后
    // 被refresh函数请求，这就是为什么，有时候请求不止一次】
    timer = setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}
// ---------------------防抖动功能-------------------------

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};