import Vue from 'vue';
import axios from 'axios';
import wx from 'weixin-js-sdk';
import wxGetCode from './wx-getCode';
import {setCookie} from './cookies'
import {Toast} from 'vant';

//获取openid
export function wxGetOpenID(){
  let code=wxGetCode()
  // if(code!=null&&code!=''){
  //   axios.get({
  //     url:'http://m.yunbisai.com/wechat/Openid/getUserInfo',
  //     params:{
  //       code:code
  //     }
  //   }).then(res=>{
  //     if(res.data.error==0){
  //       setCookie('openid',res.data.datArr.openid)
  //     }else{
  //       Toast.fail(res.data.msg);
  //     }
  //   }).error(()=>{
  //     Toast.fail('请在微信中打开')
  //   });
  // }

  //测试数据
  let openid='owUDMs391njonfXLNYUFxNWHIqn0';
  setCookie('openid',openid);
}
