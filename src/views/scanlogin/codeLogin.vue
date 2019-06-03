<template>
<div id="root">
  <mt-header title="检录员登录">
    <router-link to="/login" slot="left">
      <mt-button icon="back" class="back">退 出</mt-button>
    </router-link>
  </mt-header>
  <div class="content">
    <p class="title">手机验证码登录</p>
    <div>
      <div class="phone">
        <select name="" id="">
          <option value="1">+86</option>
        </select>
        <input type="tel" placeholder="请输入手机号码" maxlength="11">
      </div>
      <div class="btnsendcode">
        <mt-button type="primary" @click="toInputCode()">
          发送验证码
        </mt-button>
      </div>
      <router-link to="/login" class="rt accounts" tag="p">使用云比赛账号登录</router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'codeLogin',
  data() {
    return {

    }
  },
  methods: {
    toInputCode() {
      let _this = this;
      _this.$router.push("/inputCode")
    }
  }
}
</script>

<style lang='less'>
// #root {
//     display: flex;
//     flex-direction: column;
//     background: #ffffff;
//     height: 100%;
// }
// header {
//     height: 2.7rem;
//     background: #ffffff;
//     color: #111111;
//     display: flex;
//     flex-direction: row;
//     border-bottom: 1px solid #cccccc;
//     font-size: 1.02rem;
//     .back {
//         font-size: 0.96rem;
//     }
// }
// .content {
//     flex: 1;
//     .title {
//         margin: 4.8rem 2.5rem 0;
//         font-size: 1.44rem;
//         font-weight: bold;
//     };
//     > div {
//         margin-top: 4rem;
//         padding: 0 2.5rem;
//         font-size: 0.96rem;
//         .phone {
//             margin-top: 1.25rem;
//             border-bottom: 1px solid #cccccc;
//             padding: 0.5rem 0;
//             input {
//                 margin-left: 0.6rem;
//                 font-size: 1.12rem;
//             }
//             input::-webkit-input-placeholder {
//                 padding-left: 2.5rem;
//                 font-size: 1.12rem;
//             }
//             input:-moz-placeholder {
//                 /* Mozilla Firefox 4 to 18 */
//                 padding-left: 2.5rem;
//                 font-size: 1.12rem;
//             }
//             input::-moz-placeholder {
//                 /* Mozilla Firefox 19+ */
//                 padding-left: 2.5rem;
//                 font-size: 1.12rem;
//             }
//             :-ms-input-placeholder {
//                 /* Internet Explorer 10-11 */
//                 padding-left: 2.5rem;
//
//             }
//         }
//         select {
//             font-size: 1.12rem;
//         }
//         .btnsendcode {
//             width: 100%;
//             margin-top: 2rem;
//             > button {
//                 width: 100%;
//                 border-radius: 3rem;
//                 font-size: 1rem;
//                 background: linear-gradient(to right,#0066CC,#0099ff);
//                 box-shadow: 0.2rem 0.0.5rem #0066CC;
//             }
//         }
//         .accounts {
//             margin-top: 1rem;
//             font-size: 1.12rem;
//             cursor: default;
//         }
//     }
// }
</style>
