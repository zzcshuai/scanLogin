<template>
<div id="root">
  <div class="overlay" v-show="isShowOverlay"></div>
  <div class="main">
    <header>
      <router-link to="/scanLogin/checkingCaller" tag='div' class="back">
        <i class="cubeic-back"></i>
        <span class="backtip">退出</span>
      </router-link>
      <div class="title">
        <span>验证</span>
      </div>
    </header>
    <div class="content">
      <ul class="userMsg">
        <li><p><i>检</i><i>录</i><i>员</i>：</p> <p class="caller">{{callerDetail.name}}</p></li>
        <li><p>赛事名称：</p><p>{{callerDetail.title}}</p></li>
        <li><p>小组名称：</p><p class="groupname" ><span v-for="(item,index) in callerGroup" :key="index" ref='groupname'>{{item.groupname}},</span></p></li>
      </ul>
    </div>
    <footer>
      <div class="beginscan">
        <button @click="beginScan()">
          开&nbsp;始&nbsp;扫&nbsp;码
        </button>
      </div>
      <div class="player" @click='toMemberList()'>
        <div>
          <p><img src="../../assets/img/player.png" alt="小组选手" /></p>
          <p>小组选手</p>
        </div>
      </div>
    </footer>
  </div>
  <sfPopups :modelTitle='entryStatus' :modelTips='entryDetailed' :status='status' @sfCancel="cancel()" @sfConfirm='confirm()' v-show="isShowPopups" class="sfpopups"></sfPopups>
  <pDetail v-show='isShowPDetail' class="pdetail" :avatar='playerDetail.avatar' :name='playerDetail.name' :groupCount='playerDetail.groupCount' :allGroup='allGroups' @sfConfirm='sfConfirm()'></pDetail>
</div>
</template>

<script>
import sfPopups from '../../components/popups.vue';
import pDetail from '../../components/playerDetail.vue';
import {wxScan} from '../../common/wx-scan';
import {setCookie,getCookie,delCookie} from '../../common/cookies';
import {checkOpenidOut,checkSsidOut,getPlayDetail,checkGroupIdPlayer} from '../../common/api';
import {Toast} from 'vant'
export default {
  name: 'beginScan',
  data() {
    return {
      entryStatus: '', //录入情况
      entryDetailed: '', //录入详细情况
      isShowPopups: false, //是否显示弹出框
      isShowOverlay: false, //是否显示蒙版
      status: '', //弹出框背景是成功success，还是失败error
      openid:'',
      eventID:'',   //赛事ID
      callerDetail:{
        name:'',
        title:''
      },  //检录员详情
      callerGroup:[],  //检录的小组信息
      isShowPDetail:false,  //是否显示
      book_no:'',   //选手证书号
      playerDetail:{  //选手信息
        avatar:'',
        name:'',
        allGroup:[],
        groupCount:0,
        selectGroupID:'',
        idcard:''
      },
      selectGroupID:''  //选择的小组ID
    }
  },
  components: {
    sfPopups,
    pDetail
  },
  created() {
    //do something after creating vue instance
    let _this=this;
    let openid='';
    let event_id='';
    if(_this.$route.query.openid){
      openid=_this.$route.query.openid
    }
    if(openid!=''&&openid!=''){
      _this.openid=openid;
    }
    if(_this.$route.query.event_id){
      event_id=_this.$route.query.event_id
    }
    if(event_id!=''&&event_id!=''){
      _this.eventID=event_id;
    }else{
      _this.eventID=4368
    }
    _this.getCallerDetail();
  },
  updated() {
    //删除小组名称最后的逗号
    let _this=this;
    if(_this.$refs.groupname){
      let groupname=_this.$refs.groupname;
      let lastGroup= groupname[groupname.length-1];
      let txtLastGroup=lastGroup.innerText;
      let lastGroups=txtLastGroup.split('');
      if(lastGroups[lastGroups.length-1]==','){
        lastGroups.length=lastGroups.length-1
      }
      lastGroups=lastGroups.join('')
      lastGroup.innerText=lastGroups;
    }
  },
  beforeRouteEnter(to, from, next) {
    let _this=this;
    next(_this=>{
      let openid='';
      let ssid='';
      //如果同时存在openid和ssid
      console.log(_this.checkOpenid(),_this.checkSsid())
      if(_this.checkOpenid()==true&&_this.checkSsid()==true){
        ssid=getCookie('ssid')
        _this.ssidGetOpenid(function(res){
          // console.log(getCookie('ssid'));
          if(res.error==0){
            setCookie('openid',res.datArr)
          }else{
            delCookie('ssid')
            window.location.reload();
          }
        },ssid)
        return;
      }
      // 如果openid和ssid都不存在
      if(_this.checkOpenid()==false&&_this.checkSsid()==false){
        _this.eventID=4368;
        _this.wxGetOpenID();
        return;
      }
      //如果openid不存在，ssid都存在
      if(_this.checkOpenid()==false&&_this.checkSsid()==true){
        openid=getCookie('openid');
        _this.openidGetSsid(function(res){
          if(res.error==0){
            setCookie('ssid',res.ssid)
          }else{
            _this.eventID=4368;
            _this.wxGetOpenID();
          }
        },openid)
        return;
      }
      //如果openid存在，ssid不存在
      if(_this.checkOpenid()==true&&_this.checkSsid()==false){
        openid=getCookie('openid')
        console.log(openid)
        _this.openidGetSsid(function(res){
          if(res.error==0){
            console.log(res.ssid)
            setCookie('ssid',res.ssid)
          }else{
            Toast.fail(res.msg)
            delCookie('ssid')
            window.location.reload();
          }
        },openid)
        return;
      }
    })
  },
  computed:{
    allGroups:function(){
      let _this=this;
      return _this.sortIsCheck(_this.playerDetail.allGroup,'is_check')
    }
  },
  methods: {
    //小组排序，可以选择的在上面
    sortIsCheck(array,key){
      return array.sort(function(a,b){
        var x = a[key];
        var y = b[key];
        return ((y<x)?-1:(x>y)?1:0)
      })
    },
    checkOpenid(isOpenid){
      let openid=getCookie('openid');
      if(openid){
        return true
      }else{
        return false
      }
      return false;
    },
    checkSsid(isSsid){
      let ssid=getCookie('ssid');
      if(ssid&&ssid!=undefined){
        return true
      }else{
        return false
      }
      return false;
    },
    //检录员审核，返回最新的ssid
    openidGetSsid(callBack,openid){
      let _this=this;
      let data={
        openid:openid,
        event_id:_this.eventID
      }
      checkOpenidOut(data).then((res)=>{
        callBack(res.data)
      })
    },
    //验证ssid，返回最新的openid
    ssidGetOpenid(callBack,ssid){
      let _this=this;
      let data={
        ssid:ssid
      }
      checkSsidOut(data).then((res)=>{
        callBack(res.data)
      })
    },
    //获得选手信息，进行验证
    checkPlayer(callBack,data){
      getPlayDetail(data).then((res)=>{
        callBack(res.data)
      })
    },
    //选择小组进行检录，判断用户是否检录成功
    checkIn(callBack,data){
      checkGroupIdPlayer(data).then((res)=>{
        callBack(res.data)
      })
    },
    wxGetCode(){
      let _this=this;
      let url='',code='';
      function queryUrl(url){
        if(url!=''||url!=null){
          var arr=url.split('?');
          var params=arr[1].split('&');
          var obj={};
          for(var i=0;i<params.length;i++){
            var param=params[i].split('=');
            obj[param[0]]=param[1]
          }
          return obj
        }
      }
        if(!code){
          // window.location.href='http://m.yunbisai.com/wechat/Openid?url=www.yunbisai.com'
          // url=location.href;
          // code=queryUrl(url).code;
          code='123';
        }else{
          console.log(code);
        }
        return code;
    },
    wxGetOpenID(){
      let _this=this;
      let code=_this.wxGetCode(),openid='';
      if(code){
        openid='owUDMs391njonfXLNYUFxNWHIqn0';
        setCookie('openid',openid)
        _this.openidGetSsid(function(res){
          console.log(res);
          setCookie('ssid',res.ssid);
        },openid)
        return;
      }
    },
    beginScan() {
      let _this = this;
      let ssid=getCookie('ssid')
      _this.isShowPDetail=true;
      _this.isShowOverlay = true;
      _this.book_no=wxScan();
      if(!_this.book_no){
        if(_this.book_no==''||_this.book_no==null){
          return;
        }
      }
      _this.checkPlayer((res)=>{
        if(res.error==0){
          // _this.playerDetail.avatar=res.test.idcard_img;
          // _this.playerDetail.avatar='../../assets/img/success.png'
          _this.playerDetail.name=res.test.idcardname;
          res.datArr.map((item,index)=>{
            // _this.playerDetail.allGroup.push(item);
            return res.datArr;
          })
          _this.playerDetail.allGroup=res.datArr;
          _this.playerDetail.groupCount=res.datArr.length;
          _this.playerDetail.idcard=res.test.idcard;
          _this.playerDetail.idcardname=res.test.idcardname
        }else{
          Toast.fail(res.msg)
        }
      },{
        book_no:_this.book_no,
        ssid:ssid,
        event_id:_this.eventID
      })
    },
    //获取检录员信息
    getCallerDetail(){
      let _this=this;
      _this.openidGetSsid(function(res){
        if(res.error==0){
          _this.callerDetail.name=res.datArr.name;
          _this.callerDetail.title=res.datArr.lswlevent__title;
          _this.callerGroup=res.test;
        }else{
          Toast.fail(res.msg)
        }
      },getCookie('openid'))
    },
    toMemberList(){
      let _this=this;
      if(_this.selectGroupID!=''&&_this.selectGroupID!=undefined){
        _this.$router.push('/scanLogin/memberList?groupid='+_this.selectGroupID)
      }else{
        let event_id=_this.eventID;
        _this.$router.push('/scanLogin/memberList?event_id='+event_id)
      }
    },
    cancel() {
      let _this = this;
      let event_id=_this.eventID;
      _this.isShowPopups = !_this.isShowPopups;
      _this.isShowOverlay = !_this.isShowOverlay;
      _this.$router.push('/scanLogin/memberList?groupid='+_this.selectGroupID+'&event_id='+event_id);
    },
    confirm() {
      let _this=this;
      _this.isShowOverlay=false;
      _this.isShowPopups=false;
    },
    sfConfirm(){
      let _this=this;
      let ssid=getCookie('ssid');
      let selectGroupID='';
      let selectGroupName='';
      var id = document.getElementsByName('groupname');
        for(var i = 0; i < id.length; i++){
        if(id[i].checked)
        selectGroupID=id[i].value;
      }
      _this.playerDetail.allGroup.map((item,index)=>{
        if(item.groupid==selectGroupID){
          selectGroupName=item.groupname
        }
      })
      _this.selectGroupID=selectGroupID;
      // console.log(selectGroupName)
      if(selectGroupID==""){
        Toast.fail("请选择小组")
        return;
      }
      _this.checkIn((res)=>{
        if(res.error==0){
          console.log(res);
          _this.isShowPDetail=false;
          _this.isShowOverlay=true;
          _this.isShowPopups = true;
          _this.entryStatus = '成功录入';
          _this.entryDetailed =res.msg;
          _this.status = 'success';
        }else{
          _this.isShowPDetail=false;
          _this.isShowOverlay=true;
          _this.isShowPopups = true;
          _this.entryStatus = '失败录入';
          _this.entryDetailed =res.msg;
          _this.status = 'error';
          window.location.reload();
        }
      },{
        ssid:ssid,
        event_id:_this.eventID,
        group_id:selectGroupID,
        idcardid:_this.book_no,
        idcard:_this.playerDetail.idcard,
        idcardname:_this.playerDetail.idcardname,
        groupname:selectGroupName
      })
    }
  }
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
    width: 100%;
    height: 100%;
    input{
      border:none;
      outline: none;
    }
    button{
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
            color: #24262A;
        }
        .title{
          display: inline-block;
          width: 75%;
          color: #24262A 100%;
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
                i{
                  margin: 3.3px;
                }
                i:first-child{
                  margin-left: 0;
                }
                i:last-child{
                  margin-right:0;
                }
                p:first-child{
                  width: 25%;
                }
                p:last-child{
                  margin-left: -12px;
                  margin-top: -3px;
                  line-height: 20px;
                }
                p{
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
                background: linear-gradient(to right,#0066CC,#0099ff);
                box-shadow: 0px 5px 10px  #0099ff;
                font-weight: bold;
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
      filter:alpha(opacity=60);
      background-color: #777;
      opacity: 0.5;
      -moz-opacity: 0.5;
  };
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
    max-height:460px;
    opacity: 1;
    z-index: 105;
  }
}
</style>
