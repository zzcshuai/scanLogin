<template>
  <div class="sweepcode">
    <!-- <div v-model="show" class="shareclick">{{ titleInfo }}</div> -->
    <div class="img-box">
      <h1>邀请</h1>
      <div class="content">
        <div class="match-name">
          <span class="match-title">赛事名称：</span>
          <div class="match-describe">{{ eventDetail.title }}</div>
        </div>
        <div class="contractor">
          <span class="contractor-title">承办方：</span>
          <div class="contractor-name">{{ eventDetail.cname }}</div>
        </div>
        <div class="box" style="text-align:center;">
          <img :src="qrcode" style="width: 170px;margin: 0 auto;">
          <div class="wrap">
            <div>{{info}}</div>
          </div>
        </div>
      </div>
      <div class="btn">
        <button @click="share()">分享链接</button>
      </div>
    </div>
    <van-dialog
      v-model="showTips"
      title="点击右上角分享按钮进行分享"
      confirmButtonColor="#0bb20c"
      class="popups"
    ></van-dialog>
  </div>
</template>
<script>
import { getQRCode, getEventDetail } from "../../common/api.js";
import  wxShare  from "../../common/wx-share.js";
import { Toast, Dialog } from "vant";
export default {
  data() {
    return {
      info: "长按识别二维码成为检录员",
      personInfo: "",
      eventDetail: {
        title: "",
        cname: ""
      },
      show: false,
      qrcode: "",
      eventName: "",
      event_id: "",
      showTips: false
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  methods: {
    share() {
      //点击右上角分享按钮进行分享
      let _this = this;
      _this.showTips = true;
    }
  },
  created() {
    let _this = this;
    if (_this.$route.query.event_id) {
      _this.event_id = _this.$route.query.event_id;
    }
  },
  mounted() {
    let _this = this;
    let data = {
      event_id: _this.event_id
    };
    getEventDetail(data).then(res => {
      if (res.data.error == 0) {
        // console.log(res)
        _this.eventDetail.title = res.data.datArr.title;
        _this.eventDetail.cname = res.data.datArr.organization.cname;
        let datas = {
          type: "RollCall",
          event_id: _this.event_id,
          e_name: _this.eventDetail.title
        };
        getQRCode(datas).then(res => {
          if (res.data.error == 0) {
            _this.qrcode = res.data.datArr;
          } else {
            Toast.fail(res.data.msg);
          }
        });
        wxShare({
          title: "检录员邀请",
          desc: _this.eventDetail.title,
          img: "//g.yunbisai.com/img/org/logo_t.png"
        });
      } else {
        Toast.fail(res.data.msg);
      }
    });
  }
};
</script>
<style lang="less" scoped>
.sweepcode {
  background: #0099ff;
  height: 100%;
  overflow: auto;
  // margin-bottom: 10px;
  font-size: 16px;
  // font-family: serif;
  .shareclick {
    height: 25px;
    line-height: 25px;
    color: #ffffff;
  }
  .vux-header {
    background: #0099ff;
  }
  .img-box {
    width: 90%;
    margin: 0 auto;
    background: #fff;
    border-radius: 6px;
    margin-top: 21px;
    h1 {
      font-family: Microsoft YaHei;
      text-align: center;
      color: #0099ff;
      height: 42px;
      font-size: 32px;
      font-weight: 900;
      line-height: 42px;
    }
    .content {
      margin-top: 26px;
      .match-name {
        padding: 15px;
        .match-title {
          vertical-align: top;
          display: inline-block;
          width: 90px;
          // font-weight:900;
          color: #999999;
        }
        .match-describe {
          display: inline-block;
          width: 70%;
          font-weight: 600;
        }
      }
      .contractor {
        padding: 16px;
        .contractor-title {
          vertical-align: top;
          display: inline-block;
          width: 90px;
          // font-weight:900;
          color: #999999;
        }
        .contractor-name {
          display: inline-block;
          width: 70%;
          font-weight: 600;
        }
      }
    }
    .van-button__text {
      color: green;
    }
    .box {
      color: #666;
      // margin-top: 25px;
      .wrap {
        width: 100%;
        height: 36px;
        line-height: 36px;
        text-align: center;
        // border:1px solid green;
        position: relative;
        margin-top: 17px;
      }
      .wrap div:before,
      .wrap div:after {
        position: absolute;
        background: #ccc;
        content: "";
        height: 1px;
        top: 50%;
        width: 60px;
      }
      .wrap div:before {
        left: 0px;
      }
      .wrap div:after {
        right: 0px;
      }
    }
    .btn {
      margin-top: 20px;
      text-align: center;
      padding: 15px 0;
      button {
        background: #0099ff;
        border: 0;
        color: #fff;
        width: 128px;
        height: 40px;
        border-radius: 20px;
      }
    }
  }
  .popups {
    width: 300px;
    font-size: 15px;
    color: #999;
  }
}
</style>
