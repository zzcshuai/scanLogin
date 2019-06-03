<template>
<div id="root">
  <header>
    <div class="back">
      <i class="cubeic-back"></i>
      <span class="backtip">退出</span>
    </div>
    <div class="title">
      <span>小组成员</span>
    </div>
  </header>
  <div class="content">
    <!-- <div> -->
    <ul class="member-total">
      <li>共:<span>{{memberSum}}</span>人</li>
      <li>已录入:<span>{{entered}}</span>人</li>
      <li>未录入:<span>{{noEnter}}</span>人</li>
    </ul>
    <ul class="member-list">
      <li>
        <div>
          <div>
            <img src="../../assets/img/player.png" alt="">
          </div>
          <div>
            <ul class="member-detailed">
              <li>
                <p class="member-name">戴安娜</p>
                <p>
                  <span>小组：定段一组</span>
                  <span>台号：1</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="member-status">
          <span>未录入</span>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'memberList',
  data() {
    return {
      memberSum: 100,
      entered: 91,
      noEnter: 9
    }
  },
}
</script>

<style lang='less' scoped>
#root {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
}
header {
    height: 36px;
    background: #ffffff;
    color: #111111;
    font-size: 16px;
    width: 100%;
    line-height: 36px;
    margin: 0 auto;
    border-bottom: none;
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
                    width: 50px;
                    height: 70px;
                }
            }
            .member-status {
                color: red;
                font-size: 13px;
            }
        }
    }
    .member-detailed {
        > li {
            height: 70px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 13px;
            .member-name {
                font-size: 15px;
                margin-left: 32px;
                font-weight: bold;
            }
            > p:last-child {
                display: flex;
                height: 50%;
                flex-direction: column;
                margin-left: 32px;
                justify-content: space-between;
            }
        }
    }
}
</style>
