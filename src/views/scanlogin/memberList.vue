<template>
  <div id="root">
    <header>
      <div class="back" onclick="javascript:history.back(-1)">
        <i class="cubeic-back"></i>
        <span class="backtip">退出</span>
      </div>
      <div class="title">
        <span>{{groupTitle}}</span>
      </div>
    </header>
    <div class="content">
      <!-- <div> -->
      <ul class="member-total">
        <li @click="noFilter()">
          共:
          <span>{{memberSum}}</span>人
        </li>
        <li @click="filterCheckIn()">
          已录入:
          <span>{{entered}}</span>人
        </li>
        <li @click="filterNoCheck()">
          未录入:
          <span>{{noEnter}}</span>人
        </li>
      </ul>
      <ul class="member-list" v-show="pDetail.length>0">
        <li v-for="(item,index) in pDetail" :key="index">
          <div>
            <div>
              <img v-lazy="item.useridcard__idcard_img" alt="avatar">
            </div>
            <div>
              <ul class="member-detailed">
                <li>
                  <p class="member-name">{{item.idcardname}}</p>
                  <p>
                    <span>小组:{{item.lswleventgroup__groupname}}</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="member-status">
            <span :class="(item.check_id=='')?'active':''">{{item.check_id==""?"未录入":"已录入"}}</span>
          </div>
        </li>
      </ul>
    </div>
    <cube-button @click="showAliasPicker()" class="selectgroup">
      <div>
        <img src="../../assets/img/filter.png" alt>
      </div>
      <div>小组筛选</div>
    </cube-button>
  </div>
</template>

<script>
import { groupIDGetPlayer, getGroupList } from "../../common/api";
import { Toast } from "vant";
export default {
  name: "memberList",
  data() {
    return {
      memberSum: "", //总量
      entered: "", //已检录
      noEnter: "", //未检录
      event_id: "", //赛事ID
      groupid: "", //进入页面直接获取的小组ID
      pDetail: [], //比赛人员信息
      allGroupName: [], //所有的小组名
      isGroupID: false, //进入页面是否能直接获取groupid
      eventIDGroupID: [], //通过event_id获取的groupid
      groupTitle: "" //显示小组标题
    };
  },
  created() {
    //do something after creating vue instance
    let _this = this;
    let event_id = "",
      group_id = "";
    if (_this.$route.query.event_id && !_this.$route.query.groupid) {
      _this.event_id = _this.$route.query.event_id;
      _this.isGroupID = false;
      _this.eventIDGetList();
    } else if (_this.$route.query.groupid && _this.$route.query.event_id) {
      _this.groupid = _this.$route.query.groupid;
      _this.event_id = _this.$route.query.event_id;
      _this.isGroupID = true;
      _this.groupIDGetList();
    }
    //获取所有小组名称
    _this.eventIDGetPlay(res => {
      if (res.error == 0) {
        _this.allGroupName = res.datArr;
        if (_this.groupid && _this.groupid != "") {
          res.datArr.map((item, index) => {
            if (item.event_group_id == _this.groupid) {
              _this.groupTitle = item.groupname;
            }
          });
        }
      } else {
        Toast.fail(res.msg);
      }
    });
  },
  methods: {
    //使用groupid获取比赛人员列表
    groupIDGetPlayers(callBack, groupid) {
      let _this = this;
      let data = {
        group_id: groupid
      };
      groupIDGetPlayer(data).then(res => {
        callBack(res.data);
      });
    },
    //使用eventid获取比赛人员列表
    eventIDGetPlay(callBack) {
      let _this = this;
      let data = {
        event_id: String(_this.event_id)
      };
      getGroupList(data).then(res => {
        callBack(res.data);
      });
    },
    eventIDGetList() {
      let _this = this;
      _this.eventIDGetPlay(res => {
        if (res.error == 0) {
          let groupid = "";
          if (res.datArr.length > 0) {
            groupid = res.datArr[0].event_group_id;
            _this.groupTitle = res.datArr[0].groupname;
            _this.eventIDGroupID = groupid;
          }
          _this.groupIDGetPlayers(res => {
            if (res.error == 0) {
              _this.memberSum = res.datArr.count;
              _this.entered = res.datArr.check_count;
              _this.noEnter = res.datArr.no_check;
              _this.pDetail = res.datArr.rows;
            } else {
              if (res.datArr == null || res.datArr == "") {
                _this.memberSum = 0;
                _this.entered = 0;
                _this.noEnter = 0;
                _this.pDetail = [];
              }
              Toast.fail(res.msg);
            }
          }, groupid);
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    groupIDGetList() {
      let _this = this;
      _this.groupIDGetPlayers(res => {
        if (res.error == 0) {
          _this.memberSum = res.datArr.count;
          _this.entered = res.datArr.check_count;
          _this.noEnter = res.datArr.no_check;
          _this.pDetail = res.datArr.rows;
        } else {
          // if(res.datArr){
          if (res.datArr == null || res.datArr == "") {
            _this.memberSum = 0;
            _this.entered = 0;
            _this.noEnter = 0;
            _this.pDetail = [];
          }
          // }
          Toast.fail(res.msg);
        }
      }, _this.groupid);
    },
    //筛选小组
    showAliasPicker() {
      let _this = this;
      if (!_this.aliasPicker) {
        _this.aliasPicker = _this.$createPicker({
          title: "小组筛选",
          data: [_this.allGroupName],
          alias: {
            value: "event_group_id",
            text: "groupname"
          },
          onSelect: _this.selectHandle,
          onCancel: _this.cancelHandle
        });
      }
      _this.aliasPicker.show();
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      let _this = this;
      _this.groupTitle = selectedText[0];
      _this.groupid = selectedVal.toString();
      if (_this.isGroupID == false) {
        _this.eventIDGroupID = _this.groupid;
      }
      _this.groupIDGetList();
    },
    cancelHandle() {
      let _this = this;
      if (_this.$createDialog()) {
        this.$createDialog().hide();
      }
    },
    filterNoCheck() {
      let _this = this;
      if (_this.isGroupID == false) {
        _this.groupid = _this.eventIDGroupID;
      }
      console.log(_this.isGroupID, _this.eventIDGroupID, _this.groupid);
      _this.groupIDGetPlayers(res => {
        if (res.error == 0) {
          _this.memberSum = res.datArr.count;
          _this.entered = res.datArr.check_count;
          _this.noEnter = res.datArr.no_check;
          _this.pDetail = res.datArr.rows.filter((item, index) => {
            return item.check_id == "";
          });
        } else {
          if (res.datArr == null || res.datArr == "") {
            _this.memberSum = 0;
            _this.entered = 0;
            _this.noEnter = 0;
            _this.pDetail = [];
          }
          Toast.fail(res.msg);
        }
      }, _this.groupid);
    },
    filterCheckIn() {
      let _this = this;
      if (_this.isGroupID == false) {
        _this.groupid = _this.eventIDGroupID;
      }
      // console.log(_this.isGroupID,_this.eventIDGroupID,_this.groupid)
      _this.groupIDGetPlayers(res => {
        if (res.error == 0) {
          _this.memberSum = res.datArr.count;
          _this.entered = res.datArr.check_count;
          _this.noEnter = res.datArr.no_check;
          _this.pDetail = res.datArr.rows.filter((item, index) => {
            return item.check_id != "";
          });
        } else {
          if (res.datArr == null || res.datArr == "") {
            _this.memberSum = 0;
            _this.entered = 0;
            _this.noEnter = 0;
            _this.pDetail = [];
          }
          Toast.fail(res.msg);
        }
      }, _this.groupid);
    },
    noFilter() {
      let _this = this;
      _this.groupIDGetList();
    }
  }
};
</script>

<style lang='less' scoped>
#root {
  width: 100%;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  header {
    height: 36px;
    background: #ffffff;
    color: #111111;
    /*border-bottom: 1px solid #e5e5e5;*/
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
      font-size: 12px;
      margin-right: 5px;
    }
  }
  .content {
    flex: 1;
     margin-top:30px;
    .member-total {
      margin: 1px -5px 0;
      padding-bottom: 10px;
      display: flex;
      flex-direction: row;
      font-size: 13px;
      border-bottom: 1px solid #cccccc;
      > li {
        margin-left: 24px;
        span {
          margin-left: 7px;
        }
      }
    }
    .member-list {
      margin: 0 10px;
      overflow-y: auto;
      max-height: 540px;
       /*解决ios上滑动不流畅*/

      -webkit-overflow-scrolling: touch;
      > li {
        margin: 10px 0;
        border-bottom: 1px solid #cccccc;
        padding-bottom: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        div {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          img {
            width: 65px;
            height: 91px;
          }
        }
        .member-status  {
          /*color: red;*/
          font-size: 13px;
          .active{
            color:red;
          }
        }
      }
    }
    .member-list::-webkit-scrollbar {
      display: none;
    }
    .member-detailed {
      > li {
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 13px;
        .member-name {
          font-size: 15px;
          margin-left: 32px;
          font-weight: bold;
        }
        > p:last-child {
          margin-left: 32px;
        }
      }
    }
  }
  .selectgroup {
    position: fixed;
    bottom: 0;
    background: #ffffff;
    border-top: 1px solid #e5e5e5;
    color: #2c3e50;
    height: 50px;
    font-size: 14px;
    padding: 0;
    img {
      width: 15px;
      height: 15px;
    }
  }
}
</style>
