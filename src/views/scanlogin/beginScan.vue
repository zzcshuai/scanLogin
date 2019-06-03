<template>
<div id="root">
  <div class="overlay" v-show="isShowOverlay"></div>
  <div class="main">
    <header>
      <div class="back">
        <i class="cubeic-back"></i>
        <span class="backtip">退出</span>
      </div>
      <div class="title">
        <span>验证</span>
      </div>
    </header>
    <div class="content">
      <ul class="userMsg">
        <li>检 录 员: <span class="caller">戴安娜</span></li>
        <li>赛事名称：<span>定段赛</span></li>
        <li>小组名称：<span>定段一组</span></li>
      </ul>
    </div>
    <footer>
      <div class="beginscan">
        <button @click="beginScan()">
          开&nbsp;始&nbsp;扫&nbsp;码
        </button>
      </div>
      <div class="player">
        <div>
          <p><img src="../../assets/img/player.png" alt="小组选手" /></p>
          <p>小组选手</p>
        </div>
      </div>
    </footer>
  </div>
  <sfPopups :modelTitle='entryStatus' :modelTips='entryDetailed' :status='status' @sfCancel="cancel()" @sfConfirm='confirm()' v-show="isShowPopups" class="sfpopups"></sfPopups>
</div>
</template>

<script>
import sfPopups from '../../components/popups.vue';
export default {
  name: 'beginScan',
  data() {
    return {
      entryStatus: '', //录入情况
      entryDetailed: '', //录入详细情况
      isShowPopups: false, //是否显示弹出框
      isShowOverlay: false, //是否显示蒙版
      status: '' //弹出框背景是成功success，还是失败error
    }
  },
  components: {
    sfPopups,
  },
  methods: {
    beginScan() {
      let _this = this;
      _this.isShowPopups = true;
      _this.entryStatus = '成功录入';
      _this.entryDetailed = '戴安娜已录入定段一组';
      _this.status = 'success';
      _this.isShowOverlay = true;
    },
    cancel() {
      let _this = this;
      _this.isShowPopups = !_this.isShowPopups;
      _this.isShowOverlay = !_this.isShowOverlay;
      _this.$router.push('/scanLogin/memberList');
    },
    confirm() {

    }
  }
}
</script>

<style lang="less">
@import url('../../style/base.css');
#root {
    width: 100%;
    height: 100%;
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
    border-bottom: 1px solid #cccccc;
    font-size: 16px;
    width: 100%;
    line-height: 36px;
    margin: 0 auto;
    .back {
        font-size: 12px;
    }
    .title{
      width: 75%;
      text-align: center;
    }
    .cubeic-back::before{
      content: "\E608";
      margin-left: 2px;
      font-size: 12px;
      margin-right: 5px;
    }
}
.content {
    flex: 1;
    background: #ffffff;
    .userMsg {
        font-size: 14px;
        margin: 20px 0 0 15px;
        li {
            margin-top: 7px;
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
            font-size: 18px;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: linear-gradient(to right,#0066CC,#0099ff);
            box-shadow: 1px 1px 1.5px #0066CC;
            font-weight: bold;
        }
    }
    .player {
        height: 50px;
        border-top: 1px solid #cccccc;
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
.sfpopups {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    width: 80px;
    height: 4rem;
    opacity: 1;
    z-index: 105;
}
</style>
