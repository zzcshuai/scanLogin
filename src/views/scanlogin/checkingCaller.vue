<template>
<div id="root">
  <header>
    <div class="back" onClick="javascript :history.back(-1);">
      <i class="cubeic-back"></i>
      <span class="backtip">退出</span>
    </div>
    <div class="title">
      <span>验证</span>
    </div>
  </header>
  <div class="content">
    <P class="title">检录员验证</p>
    <p class="tips">请确认填写信息与机构方所添加检录员信息一致</p>
    <ul class="formcheck">
      <li><label for="username">姓<i class="nameLeft">名</i></label><input type="text"  placeholder="请输入姓名" v-model="txtUserName"></li>
      <li>
        <select name="" id="">
          <option value="1">+86</option>
        </select>
        <input type="tel" placeholder="请输入手机号码" maxlength="11" v-model='txtPhone'></li>
    </ul>
    <div class="btnlogin">
        <button  @click='checkCaller()' :class="(txtPhone.length==11&&txtUserName.length>0)?'btnactive':'btndefault'">
        验 证
      </button>
    </div>
  </div>
</div>
</template>

<script>
import { Toast } from 'vant';
import {setCookie,getCookie} from '../../common/cookies';
import {checkSubmit,getWXconfig,codeGetOpenid} from '../../common/api'
import wx from 'weixin-js-sdk';
export default {
  name: 'checkingCaller',
  data() {
    return {
      event_id:'',
      txtUserName:'',
      txtPhone:'',
      canSunmit:false,
      ToastMsg:''
    }
  },
  created() {
    let _this=this;
    let eventID=_this.$route.query.event_id;
    if(eventID!=null&&eventID!=''){
      _this.event_id=eventID;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(_this=>{
      let openid=getCookie('openid')
      //如果没有openid，直接微信获取
      if(!openid){
      //获取code
        if(_this.isWeixin){
          let code=_this.getUrlKey('code');
          if(code){
            let data={
              code:code
            }
            codeGetOpenid(data).then((res)=>{
              if(res.data.error==0){
                openid=res.data.datArr.openid;
                setCookie('openid',openid)
                window.location.replace('/scanLogin/checkingCaller?event_id='+_this.event_id)
              }else{
                Toast.fail(res.data.msg);
                window.location.replace('/scanLogin/checkingCaller?event_id='+_this.event_id)
              }
            })
          }else{
            _this.getCodeApi('wx')
          }
        }else{
          Toast.fail('请在微信客户端打开')
        } 
      }
    })
  },
  methods: {
    //获取url参数
    getUrlKey(name){   
       return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
    },
    
    getCodeApi(state){
      let data={
        url:location.href
      }
      getWXconfig(data).then((res)=>{
        let Data = res.data;
        let appId=Data.appId
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作
          wx.config({
            debug: false, // 开启调试模式,开发时可以开启
            appId: Data.appId,   // 必填，公众号的唯一标识   由接口返回
            timestamp: Data.timestamp, // 必填，生成签名的时间戳 由接口返回
            nonceStr: Data.nonceStr,    // 必填，生成签名的随机串 由接口返回
            signature: Data.signature,   // 必填，签名 由接口返回
            jsApiList: [] // 此处填你所用到的方法
        });
        let urlNow=encodeURIComponent(window.location.href);
        let scope='snsapi_base';    //snsapi_userinfo   //静默授权 用户无感知
        let url="http://m.yunbisai.com/wechat/Openid?url="+urlNow;
        window.location.replace(url);
      })    
    },
    isWeixin(){
      const ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
      } else {
        return false;
      }
    },
    checkName(isName){
      let _this=this;
      if(_this.txtUserName!=''){
        return true;
      }else{
        return false;
      }
      if(isName){

      }
      return false;
    },
    checkPhone(isPhone){
      let _this=this;
      let txtPhone=_this.txtPhone
      let regPhone =/1[34578]\d{9}/;
      if(txtPhone.length<11){
        return false;
      }
      if(txtPhone&&regPhone.test(txtPhone)){
        return true
      }
      if(isPhone){
          Toast.fail('手机格式有误')
      }
      return false;
    },
    checkSubmit(isSubmit){
      let _this=this;
      if(_this.checkName(true)&&_this.checkPhone(true)){
        _this.canSunmit=true
        return true;
      }else{
        _this.canSunmit=false;
        return false;
      }
    },
    checkCaller() {
      let _this = this;
      let txtUserName=_this.txtUserName;
      let txtPhone=Number(_this.txtPhone);
      let openid=getCookie('openid')
      if(txtUserName.length==0||txtPhone.length<11){
        return;
      }
      if(_this.checkSubmit(true)){
        // console.log(txtUserName,txtPhone);
        let data={
          openid:openid,
          name:txtUserName,
          phone: txtPhone,
          event_id:_this.event_id
        }
        checkSubmit(data).then((res)=>{
          if(res.data.error==0){
              _this.$router.push('/scanLogin/beginScan?event_id='+_this.event_id);
              setCookie('ssid',res.data.test)
            }else{
              Toast.fail(res.data.msg)
            }
        })
      }
    }
  },

}
</script>

<style lang="less" scoped>
body, div, span, header, footer, nav, section, aside, article, ul, dl, dt, dd, li, a, p, h1, h2, h3, h4,h5, h6, i, b, textarea, button, input, select, figure, figcaption {
      padding: 0;
      margin: 0;
      list-style: none;
      text-decoration: none;
      border: none;
      font-style: normal;
      /* box-sizing: border-box; */
      outline: none;
      -webkit-tap-highlight-color:transparent;
      -webkit-font-smoothing: antialiased;
  }
  input{
    border:none;
    outline: none;
  }
  button{
    cursor: pointer;
  }
#root {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    height: 100%;
    header {
        height: 40px;
        background: #ffffff;
        color: #111111;
        border-bottom: 1px solid #cccccc;
        font-size: 16px;
        width: 100%;
        line-height: 36px;
        display: flex;
        flex-direction: row;
        .back {
            font-size: 14px;
        }
        .title{
          width: 75%;
          text-align: center;
        }
        .cubeic-back::before{
          content: "\E608";
          margin-left: 2px;
          font-size: 14px;
          margin-right: 5px;
        }
    }
    .content {
        flex: 1;
        .title {
            margin: 80px 40px 0;
            font-size: 18px;
            font-weight: bold;
            color: #333333;
        };
        .tips {
            margin: 20px 0 0 40px;
            font-size: 12px;
        };
        > .formcheck {
            // width: 100%;
            margin-top: 80px;
            padding: 0 40px;
            font-size: 14px;
            color: #333333;
            li {
              margin-top: 15px;
              border-bottom: 1px solid #cccccc;
              padding: 8px 0;
              .nameLeft{
                margin-left: 9px;
              }
              input {
                margin-left: 0;
                font-size: 14px;
              }
              input::-webkit-input-placeholder {
                padding-left: 40px;
                font-size: 14px;
              }
              input:-moz-placeholder {
                /* Mozilla Firefox 4 to 18 */
                padding-left: 40px;
                font-size: 14px;
              }
              input::-moz-placeholder {
                /* Mozilla Firefox 19+ */
                padding-left: 40px;
                font-size: 14px;
              }
              :-ms-input-placeholder {
                /* Internet Explorer 10-11 */
                padding-left: 40px;
                font-size: 14px;
              }
              select {
                font-size: 14px;
                -webkit-appearance:none;
                background-color:transparent; 
                border-color:transparent;
              }
            }
            li select{
              margin-left:10px;
            }
            li:first-child input {
              margin-left: 10px;
            }
            li:last-child input::-webkit-input-placeholder {
              padding-left: 45px;
            }
            li:last-child input {
              margin-left: 8px;
            }
        }
        .btnlogin {
            width: 300px;
            margin:  40px 40px  0;
            padding: 0;
            color: #ffffff;
            .btndefault {
                width: 100%;
                border-radius: 20px;
                font-size: 18px;
                color: #ffffff;
                height: 40px;
                font-weight: bold;
                background: #cccccc;
                -webkit-box-shadow:none;
                cursor: default;
            }
            .btnactive{
              width: 100%;
              border-radius: 20px;
              font-size: 18px;
              color: #ffffff;
              height: 40px;
              font-weight: bold;
              background: linear-gradient(to right,#0066CC,#0099ff);
              box-shadow: 1px 1px 1px #0066CC;
              cursor: pointer;
            }
        }
    }
}

</style>
