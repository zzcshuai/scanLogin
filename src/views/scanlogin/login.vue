<template>
<div id="root">
  <mt-header title="检录员登录">
    <router-link to="/" slot="left">
      <mt-button icon="back" class="back">退 出</mt-button>
    </router-link>
  </mt-header>
  <div class="content">
    <P class="title">云比赛账号登录</p>
    <ul class="formlogin">
      <li><label for="username">账 号</label><input type="text" placeholder="请输入云比赛账号"></li>
      <li><label for="password">密 码</label><input type="text" placeholder="请输入密码"></li>
    </ul>
    <div class="btnlogin">
      <mt-button type="primary" @click="toBeginScan()">
        登 录
      </mt-button>
    </div>
    <router-link to="/scanLogin/codeLogin" class="rt phonecode" tag="p">手机验证码登录</router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {

    }
  },
  methods: {
    toBeginScan() {
      let _this = this;
      _this.$router.push("/scanLogin/beginScan");
    }
  }
}
</script>

<style  lang="less">
#root {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    height: 100%;
}
header {
    height: 2.7rem;
    background: #ffffff;
    color: #111111;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #cccccc;
    font-size: 1.02rem;
    .back {
        font-size: 0.96rem;
    }
}
.content {
    flex: 1;
    .title {
        margin: 4.8rem 2.5rem 0;
        font-size: 1.44rem;
        font-weight: bold;
    };
    > .formlogin {
        width: 100%;
        margin-top: 4rem;
        padding: 0 2.5rem;
        font-size: 1.12rem;
        color: #333333;
        li {
            margin-top: 1.25rem;
            border-bottom: 1px solid #cccccc;
            padding: 0.5rem 0;
            input {
                margin-left: 0.6rem;
                font-size: 1.12rem;
            }
            input::-webkit-input-placeholder {
                padding-left: 2.5rem;
                font-size: 1.12rem;
            }
            input:-moz-placeholder {
                /* Mozilla Firefox 4 to 18 */
                padding-left: 2.5rem;
                font-size: 1.12rem;
            }
            input::-moz-placeholder {
                /* Mozilla Firefox 19+ */
                padding-left: 2.5rem;
                font-size: 1.12rem;
            }
            :-ms-input-placeholder {
                /* Internet Explorer 10-11 */
                padding-left: 2.5rem;
                font-size: 1.12rem;
            }
        }
    }
    .btnlogin {
        width: 100%;
        padding: 0 2.5rem;
        margin-top: 2.5rem;
        > button {
            width: 100%;
            border-radius: 3rem;
            font-size: 1.2rem;
            height: 2.6rem;
            background: linear-gradient(to right,#0066CC,#0099ff);
            box-shadow: 0.2rem 0.0.5rem #0066CC;
        }
    }
    .phonecode {
        margin: 1rem 3rem 0;
        font-size: 1.12rem;
        cursor: default;
        color: #333333;
    }

}
</style>
