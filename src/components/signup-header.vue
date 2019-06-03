<template>
  <div class="signup-header">
    <header class="header">
      <div class="select">
        <!-- <cube-button icon="cubeic-pulldown" :inline="true">{{prov}}</cube-button> -->
        <button class="cube-btn btn-inline" >{{prov}}<i class="cubeic-pulldown"></i></button>
        <cube-tab-bar v-model="selectLabel"
          show-slider
          :use-transition="disabled"
          ref="tabNav"
          :data="tabLabels">
        </cube-tab-bar>
      </div>
      <i @click="back" class="back cubeic-back"></i>
    </header>
    <div class="tab-slide-container">
        <cube-slide
          ref="slide"
          :loop="loop"
          :initial-index="initialIndex"
          :auto-play="autoPlay"
          :show-dots="showDots"
          :options="slideOptions"
          @scroll="scroll"
          @change="changePage">
          <!-- 关注 -->
          <!-- <cube-slide-item :data="recommendData" :options="scrollOptions"> -->
          <cube-slide-item >
            <cube-scroll >    
              1          
            </cube-scroll>
          </cube-slide-item>
          <!-- 推荐 -->
          <cube-slide-item>
            <cube-scroll >
              2
            </cube-scroll>
          </cube-slide-item>
          <cube-slide-item>
            <cube-scroll >
              3
            </cube-scroll>
          </cube-slide-item>
        </cube-slide>
    </div>
  </div>
</template>

<script>
  import { findIndex } from '../common/util'
  export default {
    data () {
      return {
        selectLabel:this.selected,
        loop: false,
        disabled:false,        
        autoPlay: false,
        showDots: false,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          /* lock y-direction when scrolling horizontally and  vertically at the same time */
          directionLockThreshold: 0
        },
      }
    },
    props: {
      selected: {
        type: String,
        default: '',       
      },
      prov:{
        type:String,
        default:'',
      },
      tabLabels: {
        type: Array,
        default: function(){
          return []
        },
        required: true,
      },
    //   desc: {
    //     type: String,
    //     default: ''
    //   },
    //   content: {
    //     type: String,
    //     default: ''
    //   }
    },
    computed: {      
      initialIndex () {
        let index = 0
        index = findIndex(this.tabLabels, item => item.label === this.selectLabel)
        return index
      }
    },
    methods: {
      changePage (current) {
        this.selectLabel = this.tabLabels[current].label
        // console.log(current)
      },
      back() {
        this.$router.back()
      },
      scroll(pos){
        const x = Math.abs(pos.x)
        const tabItemWidth = this.$refs.tabNav.$el.clientWidth
        const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
        const deltaX = x / slideScrollerWidth * tabItemWidth
        this.$refs.tabNav.setSliderTransform(deltaX)
      }
    }
  }
</script>

<style lang="less">  
    .signup-header{
        position: relative;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-color: #fff;
        // box-shadow: 0 1px 6px #ccc;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        z-index: 5;
        .select{
            font-size: 14px;
            font-weight: 700;  
            .cube-tab-bar{
              width: 60%;
              float: right;
              .cube-tab_active{
                color:#3B8BE2;
                font-weight: bold;
              }
              .cube-tab{
                padding: 0;
              }     
              .cube-tab-bar-slider{
                background-color: #3B8BE2;
              } 
            }    
            .btn-inline{
              width: auto;
              display: inline-block;
              vertical-align: middle;
              padding: 9px 10px;
              font-size: 12px;
              background-color: #fff;
              color:#666;
                i{
                  margin-right: 2px;
                  transform: scale(1.14);
                }
            }   
        }        
        .back{            
            position: absolute;
            top: 0;
            left: 0;
            padding: 0 15px;
            padding-right: 0;
            color: #ddd;
        }
        .tab-slide-container{
          position: fixed;
          top: 74px;
          left: 0;
          right: 0;
          bottom: 0;
        }
    }          
</style>