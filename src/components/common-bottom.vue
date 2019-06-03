<template>
  <div id="common-bottom">
    <cube-tab-bar class="bottom-bar" v-model="myLabel" :data="tabs" @change="changeFun"></cube-tab-bar>
  </div>
</template>

<script>
  export default {
    name:'common-bottom',
    data () {
      return {
        activeLabel:'',
        tabs: [{
          label: '首页',
          icon: 'iconfont icon-home'
        }, {
          label: '报名',
          icon: 'iconfont icon-signup'
        }, {
          label: '我的',
          icon: 'iconfont icon-my'
        }]
      }
    },
    // props: {
    //   activeLabel: {
    //     type: String,
    //     default: '',       
    //   },
    // },
    computed: {
      myLabel:{
        get(){
          let url=window.location
          switch(true){
            case url.pathname=='/':this.activeLabel='首页';break;
            case url.href.includes('/competition/join'):this.activeLabel='报名';break;
            case url.href.includes('/myyunbisai'):this.activeLabel='我的';break;
          }
          return this.activeLabel
        },
        set(){
          return this.activeLabel
        }        
      }
    },
    methods: {
      changeFun (cur) {
        switch(cur){
          case '首页':window.location.href="/";break;
          case '报名':window.location.href="/competition/join";break;
          case '我的':window.location.href="/myyunbisai";break;
          default:window.location.href="/"
        }
      },
    }
  }
</script>

<style lang="less">  
  #common-bottom{        
    border-top: 1px solid #ddd;
    background: #fff;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute; 
    .bottom-bar{
      background: #fff;         
      font-size: 14px;
      .cube-tab{
        // height: 40px;
        // line-height: 40px;
        color:#CCCCCC;
        padding: 5px 0;      
        i{
          font-size: 20px;
        }
        div{
          margin-top: 5px;
          line-height: auto;
          height: auto;
        }
      }
      .cube-tab_active{
        color:#0066CC;
      }
    }
  }      
</style>