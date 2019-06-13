export  function setCookie(name, value) {
  sessionStorage.setItem(name, value);
};

export function getCookie(name) {
  return sessionStorage.getItem(name);
};

export function delCookie(name) {
  sessionStorage.removeItem(name);
};

export function clearAllCookie() {
  sessionStorage.clear();
}

export function getCookietwe(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
}
export function setCookietwe(c_name,value,domain) {
  var exdate = new Date(),
    expiredays = 365;
  exdate.setDate(exdate.getDate() + expiredays);
  //判断是否需要跨域存储
  if (domain) {
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;domain=.yunbisai.com";
  } else {
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
  }
};
