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
      <li><label for="username">姓<i class="nameLeft">名</i></label><input type="text" maxlength='6' placeholder="请输入姓名" v-model="txtUserName"></li>
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
  <!-- <cube-button @click="showToastType">Toast - type</cube-button> -->
</div>
</template>

<script>
import { Toast } from 'vant';
import {setCookie,getCookie} from '../../common/cookies';
import {wxGetOpenID} from '../../common/wx-getOpenID';
import {checkSubmit} from '../../common/api'
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
    //do something after creating vue instance
    let _this=this;
    // console.log(2)
    let eventID=_this.$route.query.event_id;
    if(eventID!=null&&eventID!=''){
      _this.event_id=eventID;
    }else{
      _this.event_id=4368
    }
  },
  beforeRouteEnter(to, from, next) {
    let openid=getCookie('openid')
    //如果没有openid，直接微信获取
    if(!openid){
      wxGetOpenID()
    }
    next()
  },
  methods: {
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
        const toast = this.$createToast({
        txt: '请输入正确手机号',
        type: 'error'
      })
      toast.show()
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
        console.log(txtUserName,txtPhone);
        let data={
          openid:openid,
          name:txtUserName,
          phone: txtPhone,
          event_id:_this.event_id
        }
        checkSubmit(data).then((res)=>{
          if(res.data.error==0){
              _this.$router.push('/scanLogin/beginScan?openid='+openid+'&event_id='+_this.event_id);
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
                    padding-left: 50px;
                    font-size: 14px;
                }
                input:-moz-placeholder {
                    /* Mozilla Firefox 4 to 18 */
                    padding-left: 50px;
                    font-size: 14px;
                }
                input::-moz-placeholder {
                    /* Mozilla Firefox 19+ */
                    padding-left: 50px;
                    font-size: 14px;
                }
                :-ms-input-placeholder {
                    /* Internet Explorer 10-11 */
                    padding-left: 50px;
                    font-size: 14px;
                }
                select {
                    font-size: 14px;
                }
            }
            li:first-child input {
                margin-left: 10px;
            }
            li:last-child input::-webkit-input-placeholder {
                // padding-left: 2.3rem;
            }
            li:last-child input {
                margin-left: 4px;
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
