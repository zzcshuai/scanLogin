import Vue from 'vue';
import axios from 'axios';
import wx from 'weixin-js-sdk';
import { Toast } from 'vant';

//获取code
export default function wxGetCode(object){
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
    // let url=location.href,appId='';
      // axios.get('//m.yunbisai.com/wechat/jssdk', {//请求配置
      //   params: {
      //     url: url.split('#')[0]
      //   }
      // }).then(res => {// 获得签名配置
      //   let Data = res.data;
      //   appId=Data.appId
      //   // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作
      //     wx.config({
      //       debug: false, // 开启调试模式,开发时可以开启
      //       appId: Data.appId,   // 必填，公众号的唯一标识   由接口返回
      //       timestamp: Data.timestamp, // 必填，生成签名的时间戳 由接口返回
      //       nonceStr: Data.nonceStr,    // 必填，生成签名的随机串 由接口返回
      //       signature: Data.signature,   // 必填，签名 由接口返回
      //       jsApiList: [] // 此处填你所用到的方法
      //   });
      
      // })
      // console.log(appId)

      function getUrlKey(name){//获取url 参数
        return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
      }

      function getCodeApi(state){//获取code   
        // let urlNow=encodeURIComponent(window.location.href);
        let urlNow='https://m.yunbisai.com'
        // console.log(urlNow)
        let scope='snsapi_base';    //snsapi_userinfo   //静默授权 用户无感知
        let appid='wx363581f7f1feb067';
        let url="http://m.yunbisai.com/wechat/Openid?url="+urlNow;
        // window.location.replace(url);
      }

  //分割url
    // let code='';
    // function queryUrl(url){
    //   if(url!=''||url!=null){
    //     var arr=url.split('?');
    //     var params=arr[1].split('&');
    //     var obj={};
    //     for(var i=0;i<params.length;i++){
    //       var param=params[i].split('=');
    //       obj[param[0]]=param[1]
    //     }
    //     return obj
    //   }
    // }
     // console.log(getUrlKey("code"))
     // let code=getUrlKey("code")
     // let url='',code="";
      if(!code){
        // window.location.href='http://m.yunbisai.com/wechat/Openid?url=www.yunbisai.com'
        // url=location.href;
        code=queryUrl(url).code;
        getCodeApi('wx')
        // code='123';
      }
      return code;
      //跳转之后得到的结果  https://m.yunbisai.com/?code=081OfzZb2aj03N0J01Zb2NnEZb2OfzZK&state=w
    }else{
      Toast.fail('请在微信中打开');
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
