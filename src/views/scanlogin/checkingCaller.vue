<template>
<div id="root">
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
    <P class="title">检录员验证</p>
    <p class="tips">请确认填写信息与机构方所添加检录员信息一致</p>
    <ul class="formcheck">
      <li><label for="username">姓 名</label><input type="text" maxlength='6' placeholder="请输入姓名"></li>
      <li>
        <select name="" id="">
          <option value="1">+86</option>
        </select>
        <input type="tel" placeholder="请输入手机号码" maxlength="11"></li>
    </ul>
    <div class="btnlogin">
        <button type="primary" @click='checkCaller()'>
        验 证
      </button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'checkingCaller',
  data() {
    return {

    }
  },
  methods: {
    checkCaller() {
      let _this = this;


    }
  }

}
</script>

<style lang="less" scoped>
#root {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    height: 100%;
}
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
            input {
                margin-left: 9px;
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
            margin-left: 14px;
        }
        li:last-child input::-webkit-input-placeholder {
            // padding-left: 2.3rem;
        }
        li:last-child input {
            margin-left: -2px;
        }
    }
    .btnlogin {
        width: 300px;
        margin:  40px 40px  0;
        padding: 0;
        color: #ffffff;
        > button {
            width: 100%;
            border-radius: 20px;
            font-size: 18px;
            color: #ffffff;
            height: 40px;
            font-weight: bold;
            background: linear-gradient(to right,#0066CC,#0099ff);
            box-shadow: 1px 1px 1px #0066CC;
        }
    }
}
</style>
