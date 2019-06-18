<template>
<div id="model">
  <div class="header">
      <img :src="status=='success'?imgbg.bgSuccess:imgbg.bgError" alt="imgStatus" 
        :class="status=='success'?'bg-success':'bg-error'">
  </div>
  <div class="model-main">
    <p class="model-title">{{modelTitle}}</p>
    <p class="model-tips">{{modelTips}}</p>
  </div>
  <div class="footer">
    <div class="model-btn">
      <div class="cancel" @click="cancel()">
        <p>选手列表</p>
      </div>
      <div class="confirm" @click="confirm()">
        <p>继续扫码</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    modelTitle: String,
    modelTips: String,
    img_src: String,
    status: String
  },
  data() {
    return {
      imgbg:{
        bgSuccess:require('../assets/img/success.png'),
        bgError:require('../assets/img/error.png')
      }
    }
  },
  methods: {
    cancel() {
      let _this = this;
      _this.$emit("sfCancel", false)
    },
    confirm() {
      let _this = this;
      _this.$emit('sfConfirm', false)
    }
  }
}
</script>

<style lang='less' scoped>
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
#model {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
}
.header {
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 35px;
    .bg-success {
        width: 45%;
    }
    .bg-error {
        width: 30%;
    }
}
.model-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.8rem;
    .model-title {
        font-size: 16px;
        font-weight: bold;
    }
    .model-tips {
        font-size: 14px;
        margin-top: 15px;
        color: #666666;
    }
}
.footer {
    height: 15%;
    border-top: 1px solid #cccccc;
    .model-btn {
        display: flex;
        flex-direction: row;
        font-size: 14px;
        height: 100%;
        color: #666666;
        > div {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            p {
                width: 100%;
                text-align: center;
                padding: 10px 0;
            }
        };
        div:first-child p {
            border-right: 1px solid #cccccc;
        }
        div:last-child p {
            color: #0066CC;
        }
    }
}
</style>
