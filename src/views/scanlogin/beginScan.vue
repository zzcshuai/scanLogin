<template>
  <div id="root">
    <div class="overlay" v-show="isShowOverlay"></div>
    <div class="main">
      <header>
        <router-link to="/scanLogin/checkingCaller" tag="div" class="back">
          <i class="cubeic-back"></i>
          <span class="backtip">退出</span>
        </router-link>
        <div class="title">
          <span>扫码录入</span>
        </div>
      </header>
      <div class="content">
        <ul class="userMsg">
          <li>
            <p>
              <i>检</i>
              <i>录</i>
              <i>员</i>：
            </p>
            <p class="caller">{{callerDetail.name}}</p>
          </li>
          <li>
            <p>赛事名称：</p>
            <p>{{callerDetail.title}}</p>
          </li>
          <li>
            <p>小组名称：</p>
            <p class="groupname">
              <span
                v-for="(item,index) in callerGroup"
                :key="index"
                ref="groupname"
              >{{item.groupname}},</span>
            </p>
          </li>
        </ul>
      </div>
      <footer>
        <div class="beginscan">
          <button @click="beginScan()" :class='noScan==true?"":"noscan"'>开&nbsp;始&nbsp;扫&nbsp;码</button>
        </div>
        <div class="player" @click="toMemberList()">
          <div>
            <p>
              <img src="../../assets/img/player.png" alt="小组选手">
            </p>
            <p>小组选手</p>
          </div>
        </div>
      </footer>
    </div>
    <sfPopups
      :modelTitle="entryStatus"
      :modelTips="entryDetailed"
      :status="status"
      @sfCancel="cancel()"
      @sfConfirm="confirm()"
      v-show="isShowPopups"
      class="sfpopups"
    ></sfPopups>
    <pDetail
      v-show="isShowPDetail"
      class="pdetail"
      :avatar="playerDetail.avatar"
      :name="playerDetail.name"
      :groupCount="playerDetail.groupCount"
      :allGroup="allGroups"
      :check='check'
      @sfConfirm="sfConfirm()"
      @sfCancel="sfCancel()"
    ></pDetail>
  </div>
</template>

<script>
import sfPopups from "../../components/popups.vue";
import pDetail from "../../components/playerDetail.vue";
import wx from "weixin-js-sdk";
import { setCookie, getCookie, delCookie } from "../../common/cookies";
import {
  checkOpenidOut,
  checkSsidOut,
  getPlayDetail,
  checkGroupIdPlayer,
  getWXconfig,
  codeGetOpenid
} from "../../common/api";
import { Toast } from "vant";
export default {
  name: "beginScan",
  data() {
    return {
      entryStatus: "", //录入情况
      entryDetailed: "", //录入详细情况
      isShowPopups: false, //是否显示弹出框
      isShowOverlay: false, //是否显示蒙版
      status: "", //弹出框背景是成功success，还是失败error
      openid: "",
      eventID: "", //赛事ID
      callerDetail: {
        name: "",
        title: ""
      }, //检录员详情
      callerGroup: [], //检录的小组信息
      isShowPDetail: false, //是否显示
      book_no: "", //选手证书号
      playerDetail: {
        //选手信息
        avatar: "",
        name: "",
        allGroup: [],
        groupCount: 0,
        selectGroupID: "",
        idcard: "",
        idcardid:'',
        allgroup:[]
      },
      check:'false',  //是否选中
      selectGroupID: "", //选择的小组ID
      noScan:true  //是否不能点击扫码按钮
    };
  },
  components: {
    sfPopups,
    pDetail
  },
  created() {
    //do something after creating vue instance
    let _this = this;
    let event_id = "";
    if (getCookie("openid")) {
      _this.openid = getCookie("openid");
    }
    if (_this.$route.query.event_id) {
      event_id = _this.$route.query.event_id;
    }
    if (event_id != "" && event_id != "") {
      _this.eventID = event_id;
    } 
    _this.checkOpenIDStatus()
  },
  updated() {
    //删除小组名称最后的逗号
    let _this = this;
    if (_this.$refs.groupname) {
      let groupname = _this.$refs.groupname;
      let lastGroup = groupname[groupname.length - 1];
      let txtLastGroup = lastGroup.innerText;
      let lastGroups = txtLastGroup.split("");
      if (lastGroups[lastGroups.length - 1] == ",") {
        lastGroups.length = lastGroups.length - 1;
      }
      lastGroups = lastGroups.join("");
      lastGroup.innerText = lastGroups;
    }
  },
  computed: {
    allGroups: function() {
      let _this = this;
      return _this.sortIsCheck(_this.playerDetail.allGroup, "is_check");
    }
  },
  methods: {
    checkOpenIDStatus (){
    let _this = this;
      let openid = "";
      let ssid = "";

       //如果同时存在openid和ssid
      if (_this.checkOpenid() == true) {
        openid = getCookie("openid");
        _this.openidGetSsid(function(res) {
          // console.log(getCookie('ssid'));
          if (res.error == 0) {
            _this.callerDetail.name = res.datArr.name;
            _this.callerDetail.title = res.datArr.lswlevent__title;
            _this.callerGroup = res.test;
            _this.noScan=true;
            setCookie("ssid", res.ssid);
          } else{
            _this.noScan=false;
            Toast.fail(res.msg)
          }
        }, openid);
      }
      //  // 如果openid和ssid都不存在
      else if (_this.checkOpenid() == false && _this.checkSsid() == false) {
        _this.getOpenID();
      }
      // 如果openid不存在，ssid都存在
      else if (_this.checkOpenid() == false && _this.checkSsid() == true) {
        ssid = getCookie("ssid");
        _this.ssidGetOpenid(function(res) {
          if (res.error == 0) {
            setCookie("ssid", res.datArr);
            _this.getCallerDetail();
          } else if(res.error==2){
            _this.getOpenID();
          }else if(res.error==3){
            Toast.fail(res.msg)
            _this.noScan=false;
          }
        }, ssid);
      }

  },
    //获取url参数
    getUrlKey(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    },
    //获取code
    getCodeApi(state) {
      let data={
        url:location.href
      }
      getWXconfig(data).then(res => {
        let Data = res.data;
        let appId = Data.appId;
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作
        wx.config({
          debug: false, // 开启调试模式,开发时可以开启
          appId: Data.appId, // 必填，公众号的唯一标识   由接口返回
          timestamp: Data.timestamp, // 必填，生成签名的时间戳 由接口返回
          nonceStr: Data.nonceStr, // 必填，生成签名的随机串 由接口返回
          signature: Data.signature, // 必填，签名 由接口返回
          jsApiList: [] // 此处填你所用到的方法
        });
        let urlNow = encodeURIComponent(window.location.href);
        let scope = "snsapi_base"; //snsapi_userinfo   //静默授权 用户无感知
        let url = "http://m.yunbisai.com/wechat/Openid?url=" + urlNow;
        window.location.replace(url);
      });
    },
    //获取openid
    getOpenID() {
      let _this = this;
      if (_this.isWeixin) {
        let code = _this.getUrlKey("code");
        if (code) {
          let data = {
            code: code
          };
          codeGetOpenid(data).then(res => {
            if (res.data.error == 0) {
              let openid = res.data.datArr.openid;
              setCookie("openid", openid);
              _this.openidGetSsid(function(res) {
                if(res.error==0){
                  _this.callerDetail.name = res.datArr.name;
                  _this.callerDetail.title = res.datArr.lswlevent__title;
                  _this.callerGroup = res.test;
                  setCookie("ssid", res.ssid);
                  _this.noScan=true;
                }else if(res.error==2){
                  _this.noScan=false;
                  Toast.fail(res.msg)
                }else if(res.error==1){
                  _this.noScan=false;
                }
              }, openid);
              window.location.replace(
                "/scanLogin/beginscan?event_id=" + _this.eventID
              ); 
            } else {
              // Toast.fail(res.data.msg);
              window.location.replace(
                "/scanLogin/beginscan?event_id=" + _this.eventID
              );
            }
          });
        } else {
          _this.getCodeApi("wx");
        }
      } else {
        Toast.fail("请在微信客户端打开");
      }
    },
    isWeixin() {
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    //小组排序，可以选择的在上面
    sortIsCheck(array, key) {
      return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return y > x ? -1 : x < y ? 1 : 0;
      });
    },
    checkOpenid(isOpenid) {
      let openid = getCookie("openid");
      if (openid&&openid!=undefined) {
        return true;
      } else {
        return false;
      }
      return false;
    },
    checkSsid(isSsid) {
      let ssid = getCookie("ssid");
      if (ssid && ssid != undefined) {
        return true;
      } else {
        return false;
      }
      return false;
    },
    //检录员审核，返回最新的ssid
    openidGetSsid(callBack, openid) {
      let _this = this;
      let data = {
        openid: openid,
        event_id: _this.eventID
      };
      checkOpenidOut(data).then(res => {
        callBack(res.data);
      });
    },
    //验证ssid，返回最新的openid
    ssidGetOpenid(callBack, ssid) {
      let _this = this;
      let data = {
        ssid: ssid
      };
      checkSsidOut(data).then(res => {
        callBack(res.data);
      });
    },
    //获得选手信息，进行验证
    checkPlayer(callBack, data) {
      getPlayDetail(data).then(res => {
        callBack(res.data);
      });
    },
    //选择小组进行检录，判断用户是否检录成功
    checkIn(callBack, data) {
      checkGroupIdPlayer(data).then(res => {
        callBack(res.data);
      });
    },
    beginScan() {
      let _this = this;
      if(_this.noScan==false){
        return false;
      }
      let data={
        url:location.href
      }
      _this.check=''
      getWXconfig(data).then(res => {
        let Data = res.data;
        wx.config({
          debug: false, // 开启调试模式,开发时可以开启
          appId: Data.appId, // 必填，公众号的唯一标识   由接口返回
          timestamp: Data.timestamp, // 必填，生成签名的时间戳 由接口返回
          nonceStr: Data.nonceStr, // 必填，生成签名的随机串 由接口返回
          signature: Data.signature, // 必填，签名 由接口返回
          jsApiList: ["checkJsApi", "scanQRCode"] // 此处填你所用到的方法
        });
      });
      wx.error(function(res) {
        Toast.fail("配置验证失败" + res.errMsg);
      });
      wx.ready(function() {
        wx.checkJsApi({
          jsApiList: ["scanQRCode"],
          success: function(res) {
            // 点击按钮扫描二维码
            if (res.checkResult.scanQRCode === true) {
              wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function(res) {
                    let url = res.resultStr;
                    // document.querySelector('.scan').onclick=function(){
                    if (url != null && url != "") {
                      let cutUrl = url.split("/");
                      _this.book_no = cutUrl[cutUrl.length - 1];
                    }
                    //验证选手信息
                    _this.getMemberDetail();
                }
              });
            } else {
              Toast.fail("抱歉，当前客户端版本不支持扫一扫");
            }
          }
        });
      });
    },
    //获取检录员信息
    getCallerDetail() {
      let _this = this;
      _this.openidGetSsid(function(res) {
        if(res.error==0){
            _this.callerDetail.name = res.datArr.name;
            _this.callerDetail.title = res.datArr.lswlevent__title;
            _this.callerGroup = res.test;
            setCookie("ssid", res.ssid);
            _this.noScan=true;
          }else if(res.error==2){
            Toast.fail(res.msg)
            _this.noScan=false;
          }else if(res.error==1){
            _this.noScan=false;
          }
      }, getCookie("openid"));
    },
    toMemberList() {
      let _this = this;
      if (_this.selectGroupID != "" && _this.selectGroupID != undefined) {
        _this.$router.push(
          "/scanLogin/memberList?event_id="+_this.eventID+"&groupid=" + _this.selectGroupID
        );
      } else {
        let event_id = _this.eventID;
        _this.$router.push("/scanLogin/memberList?event_id=" + event_id);
      }
    },
    //返回检录的选手信息
    getMemberDetail(){
      let _this=this;
      _this.checkPlayer(
        res => {
          console.log(res)
          if (res.error == 0) {
            _this.isShowPDetail = true;
            _this.isShowOverlay = true;
            _this.playerDetail.avatar=res.test.idcard_img;
            _this.playerDetail.name = res.test.idcardname;
            _this.playerDetail.allGroup=res.datArr;
            _this.playerDetail.groupCount = res.datArr.length;
            _this.playerDetail.idcard = res.test.idcard;
            _this.playerDetail.idcardname = res.test.idcardname;
            _this.playerDetail.idcardid=res.test.useridcardid
          } else {
            Toast.fail(res.msg);
          }
        },
        {
          book_no: _this.book_no,
          ssid: getCookie('ssid'),
          event_id: _this.eventID
        }
      );
    },
    //去选手列表
    cancel() {
      let _this = this;
      let event_id = _this.eventID;
      _this.isShowPopups = !_this.isShowPopups;
      _this.isShowOverlay = !_this.isShowOverlay;
      _this.$router.push(
        "/scanLogin/memberList?groupid=" +
          _this.selectGroupID +
          "&event_id=" +
          event_id
      );
    },
    //继续扫码
    confirm() {
      let _this = this;
      _this.isShowOverlay = false;
      _this.isShowPopups = false;
      _this.check=''
      _this.beginscan();
    },
    sfConfirm() {
      let _this = this;
      let ssid = getCookie("ssid");
      let selectGroupID = "";
      let selectGroupName = "";
      // _this.beginscan=null;
      _this.check=''
      var id = document.getElementsByName("groupname");
      for (var i = 0; i < id.length; i++) {
        if (id[i].checked){ 
          selectGroupID = id[i].value;
        }
      }
      _this.playerDetail.allGroup.map((item, index) => {
        if (item.groupid == selectGroupID) {
          selectGroupName = item.groupname;
        }
      });
      _this.selectGroupID = selectGroupID;
      console.log(selectGroupName,selectGroupID)
      if (selectGroupID == "") {
        Toast("请选择小组");
        return;
      }
      _this.checkIn(
        res => {
          if (res.error == 0) {
            console.log(res);
            _this.isShowPDetail = false;
            _this.isShowOverlay = true;
            _this.isShowPopups = true;
            _this.entryStatus = "成功录入";
            _this.entryDetailed = res.msg;
            _this.status = "success";
          } else {
            _this.isShowPDetail = false;
            _this.isShowOverlay = true;
            _this.isShowPopups = true;
            _this.entryStatus = "失败录入";
            _this.entryDetailed = res.msg;
            _this.status = "error";
            // window.location.reload();
          }
        },
        {
          ssid: ssid,
          event_id: _this.eventID,
          group_id: selectGroupID,
          idcardid: _this.playerDetail.idcardid,
          idcard: _this.playerDetail.idcard,
          idcardname: _this.playerDetail.idcardname,
          groupname: selectGroupName
        }
      );
    },
    sfCancel() {
      let _this = this;
      _this.isShowPDetail = false;
      _this.isShowOverlay = false;
      _this.check='';
    }
  }
};
</script>

<style lang="less" scoped>
body,
div,
span,
header,
footer,
nav,
section,
aside,
article,
ul,
dl,
dt,
dd,
li,
a,
p,
h1,
h2,
h3,
h4,
h5,
h6,
i,
b,
textarea,
button,
input,
select,
figure,
figcaption {
  padding: 0;
  margin: 0;
  list-style: none;
  text-decoration: none;
  border: none;
  font-style: normal;
  /* box-sizing: border-box; */
  outline: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
}
input {
  border: none;
  outline: none;
}
button {
  cursor: pointer;
}
#root {
  width: 100%;
  height: 100%;
  input {
    border: none;
    outline: none;
  }
  button {
    cursor: pointer;
    outline: none;
  }
  .main {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    height: 100%;
  }
  header {
    height: 36px;
    background: #ffffff;
    color: #111111;
    border-bottom: 1px solid #e5e5e5;
    font-size: 16px;
    width: 100%;
    line-height: 36px;
    display: flex;
    flex-direction: row;
    .back {
      font-size: 14px;
      color: #24262a;
    }
    .title {
      display: inline-block;
      width: 75%;
      color: #24262a 100%;
      text-align: center;
    }
    .cubeic-back::before {
      content: "\E608";
      margin-left: 2px;
      font-size: 14px;
      margin-right: 5px;
    }
  }
  .content {
    flex: 1;
    background: #ffffff;
    .userMsg {
      font-size: 14px;
      margin: 20px 15px 0 15px;
      li {
        margin-top: 10px;
        color: #333333;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        i {
          margin: 3.3px;
        }
        i:first-child {
          margin-left: 0;
        }
        i:last-child {
          margin-right: 0;
        }
        p:first-child {
          width: 25%;
        }
        p:last-child {
          margin-left: -12px;
          margin-top: -3px;
          line-height: 20px;
        }
        p {
          display: inline-block;
          width: 80%;
        }
        .caller {
          color: #333333;
          font-weight: bold;
        }
      }
    }
  }
  footer {
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .beginscan {
      display: flex;
      flex-direction: row;
      justify-content: center;
      > button {
        color: #ffffff;
        font-size: 15px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: linear-gradient(to right, #0066cc, #0099ff);
        box-shadow: 0px 5px 10px #0099ff;
        font-weight: bold;
      }
      .noscan{
        background:gray;
        box-shadow:none;
      }
    }
    .player {
      height: 50px;
      border-top: 1px solid #e5e5e5;
      display: flex;
      flex-direction: column;
      align-items: center;
      > div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
        align-items: center;
        font-size: 14px;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  // 蒙版
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 101;
    filter: alpha(opacity=60);
    background-color: #777;
    opacity: 0.5;
    -moz-opacity: 0.5;
  }
  .sfpopups {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    top: -56px;
    margin: auto;
    width: 278px;
    max-height: 460px;
    opacity: 1;
    z-index: 105;
  }
  .pdetail {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    top: -56px;
    margin: auto;
    width: 278px;
    max-height: 460px;
    opacity: 1;
    z-index: 105;
  }
}
</style>
