import Vue from 'vue';
import axios from 'axios';
import wx from 'weixin-js-sdk';
const url=window.location.href;
export default function wxGetCode(object){
  const url=window.location.href
  let wxdata={     //微信数据
    title:'',
    desc:'',
    img:'',
    // link:link
  }
  if(isweixin()){
    // "object" == typeof object && Object.assign(wxdata,object);
    // if(object.title ==='' || object.title == void 0 || object.title.length ===0 ){object.title='云比赛'}
    // if(object.desc ==='' || object.desc == void 0 || object.desc.length ===0 ){object.desc='云比赛-围棋比赛-象棋比赛-国际象棋比赛-五子棋比赛-比赛报名-棋谱-棋闻棋事-云比赛网'}
    // if(object.img ==='' || object.img == void 0 || object.img.length ===0 ){object.img='https://g.yunbisai.com/img/wxLogo.jpg'}
    // else if(object.img.indexOf('http')===-1){object.img="http://" + window.location.host + object.img}
  //分割url
  function queryUrl(url){
    // let url=window.location.href;
    var arr=url.split('?');
    var params=arr[1].split('&');
    var obj={};
    for(var i=0;i<params.length;i++){
      var param=params[i].split('=');
      obj[param[0]]=param[1]
    }
    return obj
  }

  let code=queryUrl(window.href).code;
  if(!code){
    
  }else{

  }

    axios.get('//m.yunbisai.com/wechat/jssdk', {//请求配置
      params: {
        url: url.split('#')[0]
      }
    }).then(res => {// 获得签名配置
      let Data = res.data;
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作
      wx.config({
        debug: false, // 开启调试模式,开发时可以开启
        appId: Data.appId,   // 必填，公众号的唯一标识   由接口返回
        timestamp: Data.timestamp, // 必填，生成签名的时间戳 由接口返回
        nonceStr: Data.nonceStr,    // 必填，生成签名的随机串 由接口返回
        signature: Data.signature,   // 必填，签名 由接口返回
        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"] // 此处填你所用到的方法
      });

    })
      }
    function isweixin() {
        const ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        } else {
            return false;
        }
      }
}

// axios.get('//m.yunbisai.com/wechat/jssdk', {//请求配置
//   params: {
//     url: url.split('#')[0]
//   }
// }).then(res => {// 获得签名配置
//   let Data = res.data;
//   // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作
//   wx.config({
//     debug: false, // 开启调试模式,开发时可以开启
//     appId: Data.appId,   // 必填，公众号的唯一标识   由接口返回
//     timestamp: Data.timestamp, // 必填，生成签名的时间戳 由接口返回
//     nonceStr: Data.nonceStr,    // 必填，生成签名的随机串 由接口返回
//     signature: Data.signature,   // 必填，签名 由接口返回
//     jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"] // 此处填你所用到的方法
//   });
//
// })
