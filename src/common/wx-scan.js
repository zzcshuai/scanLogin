import axios from 'axios';
import { Toast } from 'vant';
import wx from 'weixin-js-sdk';
export function wxScan(){
  //测试数据
  // let url='http://m.yunbisai/zzc/5710001136';
  // let cutUrl=url.split('/');
  // let book_no=cutUrl[cutUrl.length-1];
  // return book_no;
  //线上数据
  axios({
    method:'get',
    url:'http//m.yunbisai.com/wechat/jssdk',
    params:{
      url:window.location.href.split('#')[0]
    }
  }).then(Data=>{
    wx.config({
      debug: false, // 开启调试模式,开发时可以开启
      appId: Data.appId,   // 必填，公众号的唯一标识   由接口返回
      timestamp: Data.timestamp, // 必填，生成签名的时间戳 由接口返回
      nonceStr: Data.nonceStr,    // 必填，生成签名的随机串 由接口返回
      signature: Data.signature,   // 必填，签名 由接口返回
      jsApiList:  [ 'checkJsApi', 'scanQRCode' ] // 此处填你所用到的方法
    });
  })
  wx.error(function(res) {
    // Toast({
    //   message: "出错了，"+res.errMsg,  ////这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
    //   position: 'top',
    //   duration: 2000
    // })
  });
  wx.ready(function() {
            wx.checkJsApi({
                jsApiList : ['scanQRCode'],
                success : function(res) {
  
                }
            });
            // 点击按钮扫描二维码
                wx.scanQRCode({
                    needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType : [ "qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success : function(res) {
                      if(res.data.error==0){
                        let url=res.resultStr;
                        document.querySelector('.scan').onclick=function(){
                          if(url!=null&&url!=''){
                            let cutUrl=url.split('/');
                            book_no=cutUrl[cutUrl.length-1]
                          }
                          return book_no;
                        }
                      }else{
                        Toast.fail(res.data.msg)
                      }
  
                    }
                });
            });

}
