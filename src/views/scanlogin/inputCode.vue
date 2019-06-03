<template>
<div id="root">
  <mt-header title="输入验证码">
    <router-link to="/login" slot="left">
      <mt-button icon="back" class="back">退 出</mt-button>
    </router-link>
  </mt-header>
  <div class="content">
    <P class="title">请输入验证码</p>
    <p class="tips">已发送至手机11111111 <span>重新发送</span></p>
    <div class="security-code-wrap">
      <label for="code">
        <ul class="security-code-container">
          <li class="field-wrap" v-for="(item, index) in number" :key="index">
            <i class="char-field">{{value[index]}}</i>
          </li>
        </ul>
      </label>
      <input ref="input" class="input-code" @keyup="handleInput($event)" v-model="value" id="code" name="code" type="tel" :maxlength="number" autocorrect="off" autocomplete="off" autocapitalize="off">
    </div>
    <div class="btnlogin">
      <mt-button type="primary">
        登 录
      </mt-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'inputCode',
  props: {
    number: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    hideKeyboard() {
      // 输入完成隐藏键盘
      let _this = this;
      document.activeElement.blur() // ios隐藏键盘
      _this.$refs.input.blur() // android隐藏键盘
    },
    handleSubmit() {
      let _this = this;
      _this.$emit('input', _this.value);
      console.log(_this.value)
    },
    handleInput(e) {
      let _this = this;
      _this.$refs.input.value = _this.value
      if (_this.value.length >= _this.number) {
        _this.hideKeyboard()
      }
      _this.handleSubmit()
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
//     .tips {
//         margin: 0.8rem 0 0 2.5rem;
//         font-size: 0.96rem;
//         > span {
//             font-size: 0.96rem;
//             color: #0099ff;
//             margin-left: 1.7rem;
//         }
//     };
//     .security-code-wrap {
//         overflow: hidden;
//     }
//     .security-code-container {
//         margin: 4rem 2.5rem 0;
//         display: flex;
//         justify-content: space-between;
//         .field-wrap {
//             list-style: none;
//             display: block;
//             width: 2.4rem;
//             height: 2.4rem;
//             border: 0.05rem solid #cccccc;
//             line-height: 2.4rem;
//             text-align: center;
//             font-size: 1.255rem;
//             background-color: #fff;
//             color: #000;
//             box-shadow: 0.03rem 0.03rem #cccccc;
//             .char-field {
//                 font-style: normal;
//             }
//         }
//     }
//     .input-code {
//         position: absolute;
//         left: -9999px;
//         top: -99999px;
//         width: 0;
//         height: 0;
//         opacity: 0;
//         overflow: visible;
//         z-index: -1;
//     };
//     .btnlogin {
//         width: 100%;
//         padding: 0 2.5rem;
//         margin-top: 2.5rem;
//         > button {
//             width: 100%;
//             border-radius: 3rem;
//             font-size: 1.2rem;
//             height: 2.6rem;
//             background: linear-gradient(to right,#0066CC,#0099ff);
//             box-shadow: 0.2rem 0.0.5rem #0066CC;
//         }
//     }
// }
</style>
