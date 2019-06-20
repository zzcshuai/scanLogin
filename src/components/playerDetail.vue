<template>
  <div id="playerdetail">
    <header>
      <p><img :src="imgurl+avatar" alt="avatar" onerror="javascript:this.src='//g.yunbisai.com/img/cert/demo.png';"></p>
      <p>{{name}}</p>
    </header>
    <div id="content">
      <div class="tips">
        <p>该选手一共报了<span>{{groupCount}}</span>个小组，请选择该场次参赛的小组（灰色为不可选）</p>
      </div>
      <div class="allgroup">
        <ul>
          <li v-for="(item,index) in allGroup" :key="index" :class="(item.is_check==0)?'gray':''">
            <p>{{item.groupname}}</p>
            <p><label><input type="radio" :value='item.groupid' :disabled='(item.is_check==0)?true:false' name='groupname' 
              v-model='check'>
              <span class="radio-style"></span>
            </label></p>
          </li>
        </ul>
      </div>
    </div>
    <footer>
      <div class="model-btn">
      <div class="cancel" @click="cancel()">
        <p>取消</p>
      </div>
      <div class="confirm" @click="confirm()">
        <p>确定</p>
      </div>
    </div>
    </footer>
  </div>
</template>

<script>
export default {
  props:{
    groupCount:Number,
    allGroup:Array,
    name:String,
    avatar:String,
    check:String,
  },
  data(){
    return{
      imgurl:'//g.yunbisai.com/',
    };
  },
  created(){
    // _this.avatar
  },
  methods:{
    confirm(){
      let _this=this;
      _this.$emit('sfConfirm',false);
    },
    cancel(){
      let _this=this;
      _this.$emit('sfCancel',false)
    }
  },
};
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
  #playerdetail{
    width: 100%;
    min-height: 390px;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    font-size: 14px;
    header{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 30%;
      p{
        align-self: center;
        color: #333333;
        font-weight: bold;
        img{
          width: 75px;
          height: 105px;
          // border: 1px solid #cccccc;
        }
      }
      p:first-child{
        margin-top: 20px;
      }
      p:last-child{
        margin-top: 10px;
      }
    }
    #content{
      padding: 0 20px;
      flex: 1;
      margin-top: 30px;
      .mint-cell-wrapper{
        padding: 0 !important;
        .mint-checklist-label{
          padding: 0 !important;
        }
      }
      .tips{
        color: #0099ff;
        p{
          line-height: 16px;
        }
      }
      .allgroup::-webkit-scrollbar{
        display: none;
      }
      .allgroup{
        font-size: 16px;
        margin-top: 10px;
        // height: 145px;
        // overflow-y: auto;
        li{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 11px 0;
          align-items: center;
          border-bottom: 1px solid #e5e5e5;
          input[type="radio"] {
            opacity: 0;
            width: 0;
            height: 0;
          }
          .radio-style::before {
            content: "";
            display: inline-block;
            width: 23px;
            height: 23px;
            border-radius: 50%;
            border: 1px solid #01cd78;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            margin-top: 2px;
          }
          input[type="radio"]:checked + .radio-style::before {
            padding: 3px;
            background-color: #01cd78;
            background-clip: content-box;
            border-color: #01cd78;
          }
        }
        .gray{
          opacity: 0.3;
          color: #2c3e50;
          input[type="radio"]:checked + .radio-style::before {
            border-color:#2c3e50;
          }
        }
        .gray .radio-style::before{
          border-color:#2c3e50;
        }
      }
    }
    // footer {
    //   height: 13%;
    //   border-top: 1px solid #cccccc;
    //   // background: red;
    //   border-top: 1px solid #e5e5e5;
    //   margin: 0 20px;
    //   display: flex;
    //   flex-direction: row;
    //   justify-content: center;
    //   cursor: pointer;
    //   p{
    //     align-self: center;
    //     color: #0099ff;
    //   }
    // }
    footer {
    height: 13%;
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
  }
</style>
