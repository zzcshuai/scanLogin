<template>
  <div id="join">
    <header class="header">
      <div class="select">
        <!-- <cube-button icon="cubeic-pulldown" :inline="true">{{prov}}</cube-button> -->
        <button class="cube-btn btn-inline" @click="locateSelect">
          {{province}}
          <i class="cubeic-pulldown"></i>
        </button>
        <cube-tab-bar
          v-model="selectLabel"
          :use-transition="disabled"
          ref="tabNav"
          :data="tabLabel"
        ></cube-tab-bar>
      </div>
      <i @click="back" class="back cubeic-back"></i>
    </header>
    <div class="filter-time" v-if="activeTabName=='event'">
      <button
        :disabled="disabledFunPrev"
        class="cube-btn btn-inline btn-first"
        @click="monthChange('prev')"
      >
        <i class="cubeic-back"></i>
        上一月
      </button>
      <span class="center-filter" @click="showDatePicker">
        <button class="cube-btn btn-inline">{{filterTime}}</button> |
        <i class="cubeic-calendar"></i> |
        <button class="cube-btn btn-inline btn-bold">{{total}}场</button>
      </span>
      <button
        :disabled="disabledFunNext"
        class="cube-btn btn-inline btn-last"
        @click="monthChange('next')"
      >
        下一月
        <i class="cubeic-arrow"></i>
      </button>
    </div>
    <!--ai的头  -->
        <div class="filter-time" v-if="activeTabName=='AI'">
      <button
        class="cube-btn btn-inline btn-first"
        @click="daychange('prev')"
      >
        <i class="cubeic-back"></i>
        前一天
      </button>
      <span class="center-filter" @click="showDatePicker">
        <button class="cube-btn btn-inline">{{daydateTime}}</button> |
        <i class="cubeic-calendar"></i> 
      </span>
      <button
        class="cube-btn btn-inline btn-last"
        @click="daychange('next')"
      >
        后一天
        <i class="cubeic-arrow"></i>
      </button>
    </div>
    <div class="event-value-filter" v-if="activeTabName!='AI'">
      <cube-scroll-nav-bar :current="currentEV" :labels="event_value" @change="eventTypeHandler"/>
    </div>
    <div
      class="tab-slide-container"
      :class="{'tab-slide-container-sp':activeTabName=='training','tab-slide-container-AI':activeTabName=='AI'}"
    >
      <cube-slide 
        ref="slide"
        :loop="loop"
        :initial-index="initialIndex"
        :auto-play="autoPlay"
        :show-dots="showDots"
        :options="slideOptions"
        @scroll="scroll"
        @change="changePage"
      >
        <!-- 赛事 -->
        <cube-slide-item>
          <cube-scroll :data="list">
            <ul class="list-wrapper">
              <li
                v-for="(item, index) in list"
                class="list-item"
                @click="eventLink(item.event_id)"
                :key="index"
              >
                <!-- <li  class="list-item clearfix" > -->
                <img
                  v-if="item.eventlogo"
                  :src="item.eventlogo"
                  onerror="javascript:this.src='//g.yunbisai.com/img/ad/detailAd_01.jpg';"
                  class="event-logo"
                  alt="avatar"
                >
                <div class="top">
                  <span class="title is-black">{{item.title}}</span>
                </div>
                <div class="middle is-bold line-height">
                  <div>比赛时间 {{item.min_time}}</div>
                  <div @click.stop="popValue">
                    <span v-if="item.is_refund==1" class="tag-box is-warning">7</span>
                    <span v-if="item.is_ms" class="tag-box">证</span>
                    <span v-if="item.free_see_form==1" class="tag-box is-danger">VIP</span>
                    <span v-if="item.is_photograph==1" class="tag-box is-success">拍</span>
                    <span v-if="item.ai_state==1" class="tag-box">裁</span>
                    <span v-if="item.policy_state==2" class="tag-box is-success">保</span>
                    <span v-for="(i,k) in item.event_text" :key="k" class="location is-pale">{{i}}</span>
                  </div>
                  <div class="fee-part">
                    <span class="fee">
                      ￥
                      <span>{{item.cost}}</span>
                    </span>
                    <span class="is-pale p-num">已报：{{item.num}}人</span>
                  </div>
                </div>
                <div class="bottom">
                  <div class="front">
                    <img
                      :src="item.logoimg"
                      onerror="javascript:this.src='//g.yunbisai.com/img/org/logo_t.png';"
                      alt="logo"
                      class="avatar"
                    >
                    <span class="orgname is-black">{{item.cname}}</span>
                  </div>
                  <div class="is-light">{{item.city_name}}</div>
                </div>
              </li>
            </ul>
            <!-- <div class="no-more" v-if="!list.length">暂无更多</div> -->
            <cube-loading v-if="!loadingFlag" class="loading-part" :size="40"></cube-loading>
          </cube-scroll>
        </cube-slide-item>
        <!-- 课程培训 -->
        <cube-slide-item>
          <cube-scroll
            ref="trainScroll"
            :data="trainList"
            :options="scrollOptions"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp"
          >
            <ul class="list-wrapper">
              <li
                v-for="(item, index) in trainList"
                class="list-item "
                @click="trainLink(item.train_id,item.guid)"
                :key="index"
              >
                <!-- <li  class="list-item clearfix" > -->
                <img
                  v-if="item.eventlogo"
                  :src="item.eventlogo"
                  onerror="javascript:this.src='//g.yunbisai.com/img/ad/detailAd_01.jpg';"
                  class="event-logo"
                  alt="avatar"
                >
                <div class="top">
                  <span class="title is-black">{{item.title}}</span>
                </div>
                <div class="middle is-bold line-height">
                  <div class="one-line">培训时间 {{item.min_time}}</div>
                  <div class="one-line">培训地点 {{item.province}}</div>
                  <div class="fee-part">
                    <span class="fee">
                      ￥
                      <span>{{item.cost}}</span>
                    </span>
                    <span class="is-pale p-num">已报：{{item.num}}人</span>
                  </div>
                </div>
                <div class="bottom">
                  <div class="front">
                    <img
                      :src="item.logoimg"
                      onerror="javascript:this.src='//g.yunbisai.com/img/org/logo_t.png';"
                      alt="logo"
                      class="avatar"
                    >
                    <span class="orgname is-black">{{item.cname}}</span>
                  </div>
                  <div v-for="(i,k) in item.event_text" :key="k" class="is-light">{{i}}</div>
                </div>
              </li>
            </ul>
            <cube-loading v-if="!loadingFlag" class="loading-part" :size="40"></cube-loading>
            <!-- <div class="no-more" v-if="!trainList.length">暂无更多</div> -->
          </cube-scroll>
        </cube-slide-item>
        <cube-slide-item>
          <cube-scroll
           ref="trainScroll"
            :data="listAI"
            :options="scrollOptions"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp">
               <ul class="list-wrapper">
                <li class="list-item liAI" v-for="item in listAI" :key="item.id" >
                    <div class="listAI">
                        <div class="body">
                            <div class="time">
                               <div>{{item.groupname}}</div>
                               <div>{{item.address}}</div>
                            </div>
                            <div class="cost">
                               ￥{{item.money}}
                            </div>
                        </div>
                        <div class="bottom">
                            <div>剩余可报名：{{item.prop}}人</div>
                            <div @click="eventLink(item.eventid,item)" v-if="!signoff">报名</div>
                        </div>
                    </div>
                </li>
               </ul>
                <ul class="list-wrapper" v-if="listAI.length<1">
                  <li class="list-no">没有考级场次</li>
                </ul>
             <cube-loading v-if="!loadingFlag" class="loading-part" :size="40"></cube-loading>    
          </cube-scroll>
        </cube-slide-item>
      </cube-slide>
      <!-- <cube-drawer
          ref="drawer"
          title="请选择"
          :data="area"
          :selected-index="selectedIndex"
          @change="changeHandler"
          @select="selectHandler"
      @cancel="cancelHandler"></cube-drawer>-->
    </div>
    <!-- <cube-toolbar :actions="actions" @click="eventTypeFun"></cube-toolbar> -->
    <!-- <cube-tab-bar class="bottom-bar" v-model="activeLabel" :data="tabs" @change="changeFun"></cube-tab-bar> -->
    <common-bottom></common-bottom>
    <!-- <cube-drawer
      ref="drawer"
      title="请选择"
      :data="area"
      :selected-index="selectedIndex"
      @change="changeHandler"
      @select="selectHandler"
    >
    </cube-drawer>-->
    <!-- <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center"></el-amap> -->
    <div id="amap" class="amap-demo"></div>
  </div>
</template>
<script>
import CommonBottom from "@/components/common-bottom.vue";

import { findIndex } from "../../common/util";
import { signUpList, trainingList,ailist,HotCity } from "../../common/api";
import wxShare from "../../common/wx-share";
import MapLoader  from '../../common/amap'
import { provinceList, cityList, areaList } from "../../common/area";

export default {
  name: "join",
  data() {
    const _$that = this;
    return {
      selectLabel: "赛事报名",
      key: {
        eventType: "",
        province: "",
        city: "",
        area:"",
        date: "",       //2019-06
        daydate:"",    //2019-06-05
      },
      pageSize: 20,
      currentPage: 1,
      loop: false,
      disabled: false,
      autoPlay: false,
      showDots: false,
      slideOptions: {
        listenScroll: true,
        probeType: 2,
        /* lock y-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0,
        threshold: 1
      },
      scrollOptions: {
        /* lock x-direction when scrolling horizontally and  vertically at the same time */
        // directionLockThreshold: 0
        pullDownRefresh: {
          txt: "刷新成功"
        },
        pullUpLoad: {
          txt: { more: "暂无更多" }
        }
      },
      tabLabel: [
        { label: "赛事报名" },
        { label: "培训报名" },
         { label: "AI考级" }
      ],
      province: "全国",
      // big
      areaFront: [{ text: "国内", value: "01" }, { text: "海外", value: "02" }],
      // area: [
      //   [{ text: "国内", value: "01" }, { text: "海外", value: "02" }],
      //   provinceList,
      //   []
      // ],
      selectedIndex: [],
      actions: [
        { text: '<i class="cubeic-tag"></i>  全部类型', action: "eventTypeFun" }
      ],
      eventType: [
        { value: "", text: "全部" },
        { value: 1, text: "象棋" },
        { value: 2, text: "围棋" },
        { value: 4, text: "国际象棋" },
        { value: 8, text: "国际跳棋" },
        { value: 16, text: "五子棋" },
        { value: 32, text: "扑克" }
      ],
      event_value: [
        "全部",
        "象棋",
        "围棋",
        "国际象棋",
        "国际跳棋",
        "五子棋",
        "扑克"
      ],
      total: 0,
      list: [],
      trainList: [],
      activeTabName: "event",
      totalPage: 0,
      center: [121.59996, 31.197646],
      plugin: [
        {
          pName: "Geolocation",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  _$that
                    .axios({
                      url: "//restapi.amap.com/v3/geocode/regeo",
                      methods: "get",
                      params: {
                        key: "a4b7b21b2da76b28d65c4126194c1e3c",
                        location:
                          result.position.lng + "," + result.position.lat
                      }
                    })
                    .then(res => {
                      const _data = res.data;
                      if (_data.status == 1) {
                        _$that.province=_data.regeocode.addressComponent.province;
                        _$that.key.province=_data.regeocode.addressComponent.province;                        
                      }
                      console.log( _$that.key.province) 
                      _$that.getList(true)                      
                    });
                  // this.$nextTick();
                } else {
                  _$that.getList(true) 
                  switch (result.info) {
                    case "NOT_SUPPORTED":
                      alert("定位失败,当前浏览器不支持定位功能");
                      break;
                    case "FAILED":
                      switch (result.message) {
                        case "Get ipLocation failed.":
                          alert("IP精确定位失败");
                          break;
                        case "Get geolocation failed.Get ipLocation failed.":
                          alert("IP精确定位失败");
                          break;
                        case "Browser not Support html5 geolocation.":
                          alert("定位失败,浏览器版本较低");
                          break;
                        case "Geolocation permission denied.":
                          alert("定位失败,用户禁用了定位权限");
                          break;
                        case "Get geolocation time out.":
                          alert("定位失败,请求超时");
                          break;
                      }
                      break;
                  }
                }
              });
            }
          }
        }
      ],
      loading: true,
      loadingFlag:false,
      calcNum: 1,
      currentEV: "全部",
      addressData:[],    //省的数组
      addressall:[],     //省市区
      listAI:[],
      currentEV: "全部",
      map:null,
    };
  },
  components: {
    CommonBottom
  },
  computed: {
    signoff(){
      let date=new Date(this.key.daydate)
      let newdate=new Date()
      if(date.getMonth()==newdate.getMonth() && date.getDate()==newdate.getDate()){
     
        return true
      }else{
      
        return false
      }
    },
    initialIndex() {
      let index = 0;
      index = findIndex(this.tabLabel, item => item.label === this.selectLabel);
      return index;
    },
    filterTime() {
      let arr = this.key.date.split("-");
      return this.key.date ? `${arr[0]}年${parseInt(arr[1])}月` : "";
    },
    daydateTime(){
      let arr = this.key.daydate.split("-");
      return this.key.daydate ? `${arr[0]}年${parseInt(arr[1])}月${parseInt(arr[2])}日` : "";
    },
    disabledFunPrev() {
      let time = new Date(this.key.date);
      let now = new Date();
      return (
        new Date(time.getFullYear(), time.getMonth()) <=
          new Date(now.getFullYear(), now.getMonth()) && this.loading
      );
    },
    disabledFunNext() {
      let time = new Date(this.key.date);
      let max = new Date(this.max);
      return (
        new Date(time.getFullYear(), time.getMonth()) >=
          new Date(max.getFullYear(), max.getMonth()) && this.loading
      );
    }
  },
  watch:{
    activeTabName:function(){
       console.log(this.addressall,this.addressData)
      if(this.activeTabName=="AI"){
         this.addressPicker.setData(this.addressall)
      }else{
        this.addressPicker.setData(this.addressData)
      }
     
    }
  },
  methods: {
    changePage(current) {
      switch (parseInt(current)) {
        case 0:
          this.activeTabName = "event";
          this.reset(true);
          break;
        case 1:
          this.activeTabName = "training";
          this.reset(true);
          break;
        case 2:
          this.activeTabName = "AI";
          this.reset(true);
          break;
      }
      this.selectLabel = this.tabLabel[current].label;
    },
    back() {
      this.$router.back();
    },
    scroll(pos) {
      const x = Math.abs(pos.x);
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth;
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth;
      const deltaX = (x / slideScrollerWidth) * tabItemWidth;
      this.$refs.tabNav.setSliderTransform(deltaX);
    },
    eventTypeHandler(cur) {
      this.eventType.forEach((e, i) => {
        e.text == cur ? (this.key.eventType = e.value) : 0;
      });
      this.currentPage = 1;
      this.getList();
      
    },
    formatData() {
      // const addressall = this.areaFront
      // addressall.forEach(province => {
      //   province.children = cityList[province.value]
      //   province.children.forEach(city => {
      //     city.children = areaList[city.value]
      //   })
      // })
      // this.addressall=addressall
      // const addressData = provinceList;
      let addressData = [];
      // HotCity()
      // this.axios({
      //   url: `${
      //     this.$store.state.BASE_URI
      //   }api.yunbisai.com/request/hot/HotCity`,
      //   // url: `/apis/request/hot/HotCity`,
      //   methods: "get"
      // })
      HotCity().then(res => {
        let data = res.data;
        if (data.error == 0) {
          data.datArr.forEach((e, i) => {
            if (
              e.area_num != "81" &&
              e.area_num != "71" &&
              e.area_num != "82"
            ) {
              addressData.push({
                value: e.area_num,
                text: e.province_name
              });
            }
          });
          this.addressData=addressData
        }
        addressData.unshift({ text: "全国", value: "86" });
          this.addressPicker = this.$createCascadePicker({
            title: "位置选择",
            data: addressData,
            onSelect: this.locationFun
          });
        this.formatDataALL()
      });
      // addressData.unshift({ text: "全国", value: "86" });
      // cityList["86"] = [
      //   { province: "全国", text: "全国", value: "+86" }
      // ];
      // addressData.forEach(province => {
      //   province.children = cityList[province.value];
      // });
    },
    formatDataALL(){
        var addressDataday = provinceList
              addressDataday.forEach(province => {
                province.children = cityList[province.value]
                province.children.forEach(city => {
                  city.children = areaList[city.value]
                })
          })
           this.addressall=addressDataday
           
    },
    locateSelect() {
      // this.$refs.drawer.show();  //抽屉
      this.addressPicker.show();
    },
    locationFun(selectedVal, selectedIndex, selectedText) {
      // console.log(selectedVal,selectedIndex,selectedText)
      if( this.activeTabName=="AI"){
        this.province =`${selectedText[1]}`
        this.key.city=`${selectedText[1]}`
        this.key.area=`${selectedText[2]}`
      }else{
        this.province =`${selectedText[0]}`;
      }
      this.key.province = `${selectedText[0]}`;
      //this.key.city = selectedVal[0]!='86'?areaList[selectedVal[1]][0].city:''; //selectedText[2]
      this.currentPage = 1;
      this.$refs.trainScroll.scrollTo(0, 0, 200);
      this.$refs.trainScroll.forceUpdate();
      this.getList();
      
    },
    changeHandler(index, item, selectedVal, selectedIndex, selectedText) {
      // fake request
      // console.log({index,selectedVal,selectedIndex,selectedText})
      // setTimeout(() => {
      let data;
      if (index === 0) {
        // procince change, get city data
        data = item.value == "01" ? provinceList : [];
      } else {
        // city change, get area data
        data = cityList[item.value];
      }
      // refill panel(index + 1) data
      // if(index===1 && selectedText[1]=='全国'){
      //   this.area.pop();
      // }
      this.$refs.drawer.refill(index + 1, data);

      // this.$refs.drawer.refill(1, data);
      // }, 200);
    },
    selectHandler(selectedVal, selectedIndex, selectedText) {
      this.province = `${selectedText[1]}`;
      // this.$createDialog({
      //   type: "warn",
      //   content: `Selected Item: <br/> - value: ${selectedVal.join(
      //     ", "
      //   )} <br/> - index: ${selectedIndex.join(
      //     ", "
      //   )} <br/> - text: ${selectedText.join(" ")}`,
      //   icon: "cubeic-alert"
      // }).show();
      // console.log(selectedVal,selectedIndex,selectedText)
      // console.log(areaList[selectedVal[2]][0].city)
      this.key.province = this.province;
      this.key.city = areaList[selectedVal[2]][0].city; //selectedText[2]
      this.currentPage = 1;
      this.getList();
    },
    showDatePicker() {
      this.datePicker="";
      let date=new Date()
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: "选择日期",
          min: date,
          max: this.max?new Date(this.max):new Date(`${date.getFullYear()+1}-${date.getMonth()+1}-${date.getDate()}`),
          value: date,
          columnCount: this.activeTabName=="AI"?3:2,
          onSelect: this.selectDate
        });
      }
      this.datePicker.show();
    },
    selectDate(date, selectedVal, selectedText) {
    
      if(this.activeTabName=='AI'){
        this.key.daydate=`${selectedVal[0]}-${this.addZero(selectedVal[1])}-${this.addZero(selectedVal[2])}`
      }else{
        this.key.date = `${selectedVal[0]}-${this.addZero(selectedVal[1])}`;
      }
      this.getList();
    },
    eventTypeFun(item) {
      //console.log(item)
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: "棋类选择",
          data: [this.eventType],
          onSelect: this.selectEventType
          // onCancel: this.cancelHandle
        });
      }
      this.picker.show();
    },
    selectEventType(selectedVal, selectedIndex, selectedText) {
      this.key.eventType = selectedVal[0];
      this.actions[0].text = `<i class="cubeic-tag"></i>  ${selectedText}`;
      // console.log(this.key)
      this.currentPage = 1;
      this.$refs.trainScroll.scrollTo(0, 0, 200);
      this.$refs.trainScroll.forceUpdate();
      this.getList();
    },
    eventLink(event_id,obj) {
       console.log(event_id,obj)
       if(this.activeTabName=='AI'){
        sessionStorage.setItem('groupai',obj.groupname);
         sessionStorage.setItem('event_groupai',obj.event_group_id);
      }
      window.open("/signUp?eventid=" + event_id);
     
       
    },
    trainLink(train_id, guid) {
      window.open(`/signUp/course?trainid=${train_id}&guid=${guid}`);
    },
    reset(flag) {
      // this.key = {
      //   eventType: "",
      //   province: "",
      //   city: "",
      //   date: this.nowYearMonth(),
      //   daydate:this.nowYearMonthday()
      // };
      this.key.date=this.nowYearMonth();
      this.key.daydate=this.nowYearMonthday()
      this.calcNum = 1;
      this.actions[0].text = `<i class="cubeic-tag"></i>  全部类型`;
      // this.province = "全国";
      this.getList(flag);
      
    },
    getList(flag) {
      this.loadingFlag=false;
      let params={
        province_name: this.key.province == "全国" ? "" : this.key.province,
        city_name: this.key.city,
        event_value: this.key.eventType,
        date: this.key.date,
        pagesize: this.activeTabName == "training" ? this.pageSize : "",
        page: this.activeTabName == "training" ? this.currentPage : ""
      }
      if(this.activeTabName=="event"){
        signUpList(params).then(res=>{
          let data = res.data;
            this.list = [];
            if (data.error == 0 && data.datArr.rows) {
              data.datArr.rows.forEach((e, i) => {
                this.list.push({
                  cname: e.lswlorganization__cname
                    ? e.lswlorganization__cname
                    : "",
                  title: e.title ? e.title : "",
                  city_name: e.city_name ? e.city_name : "",
                  provincename: e.provincename ? e.provincename : "",
                  eventlogo: e.eventlogo ? e.eventlogo : "",
                  logoimg: e.lswlorganization__logoimg
                    ? e.lswlorganization__logoimg
                    : "",
                  is_ms: parseInt(e.is_ms),
                  event_id: e.event_id,
                  cost: parseFloat(e.min_sumcost)
                    ? Math.floor(parseFloat(e.min_sumcost))
                    : 0,
                  min_time: this.timeFor(e.min_time, e.max_time),
                  event_text: this.eventTxt(e.event_value),
                  is_refund: parseInt(e.is_refund),
                  is_photograph: parseInt(e.is_photograph),
                  free_see_form: parseInt(e.free_see_form),
                  policy_state: parseInt(e.policy_state),
                  ai_state: parseInt(e.ai_state),
                  num: e.pay_num ? e.pay_num : 0
                });
                this.max = data.datArr.max;  
              });
              this.total = data.datArr.total;
              this.totalPage = data.datArr.totalpage;
            } else if (
              data.error == 0 &&
              data.datArr.total === 0 &&
              flag &&
              this.calcNum < 4
            ) {
              this.calcNum++;
              this.max = data.datArr.max;  
              this.monthChange("next", true);
            } else {
              this.$refs.trainScroll.forceUpdate();
              this.total = 0;
            }
            this.$nextTick(() => {
              this.loading = true;
              this.loadingFlag=true;
            });
        },res=>{
          this.loading = true;
          this.loadingFlag=true;
        })
      }else if(this.activeTabName=='training'){
         trainingList(params).then(res=>{
            let data = res.data;
            this.currentPage == 1 ? (this.trainList = []) : 0;
            if (data.error == 0 && data.datArr.rows) {
              data.datArr.rows.forEach((e, i) => {              
                this.trainList.push({
                  cname: e.cname ? e.cname : "",
                  city: "",
                  eventlogo: e.logo ? e.logo : "",
                  logoimg: e.logoimg ? e.logoimg : "",
                  cost: parseFloat(e.training_cost)
                    ? Math.floor(parseFloat(e.training_cost))
                    : 0,
                  event_text: this.eventTxt(e.training_type),
                  title: e.training_name ? e.training_name : "",
                  min_time: e.training_datetime ? e.training_datetime : "",
                  province: e.training_address ? e.training_address : "",
                  train_id: e.training_id,
                  guid: e.training_guid,
                  num: e.pnum ? e.pnum : 0
                });              
              });

              this.total = data.datArr.total;
              this.totalPage = data.datArr.totalpage;
            } else if (
              data.error == 0 &&
              data.datArr.total === 0 &&
              flag &&
              this.calcNum < 4
            ) {
              this.calcNum++;
              this.monthChange("next", true);
            } else {
              this.$refs.trainScroll.forceUpdate();
              this.total = 0;
            }
            this.$nextTick(() => {
              this.loading = true;
              this.loadingFlag=true;
            });
        },res => {
            this.loading = true;
            this.loadingFlag=true;
        })
      }else if(this.activeTabName=='AI'){
        this.loadingFlag=false;
          let data={
            // province_id:"",
            province_id: this.key.province == '全国' ? '' : this.key.province,
            city_id: this.key.city,
            county_id: this.key.area,
            date: this.key.daydate,
            limit: this.pageSize,
            page: this.currentPage,
          }
          ailist(data).then(res=>{
             let data = res.data;
                this.currentPage == 1 ? (this.listAI = []) : 0;
                if (data.errcode == 0) {
                   var obj={},arr=[]
                   for(var item of data.data){
                      obj={
                        money:item.cost!=".00"?Math.floor(parseFloat(item.cost)):0,
                        timeq:item.begintime.slice(11,16),
                        timeh:item.endtime.slice(11,16),
                        name:item.org_name,
                        address:item.province_name+item.city_name+item.county_name+item.address,
                        prop:item.cvalue-item.num,
                        eventid:item.event_id,
                        is_ms:item.is_ms,  
                        groupname:item.groupname,
                        event_group_id:item.event_group_id,
                      }
                      arr.push(obj)
                   }
                    this.listAI=arr
                   
                }else{

                }
                 this.$nextTick(() => {
                  this.loading = true;
                  this.loadingFlag=true;
            });
            },res => {
            this.loading = true;
            this.loadingFlag=true;
            }
          )
          
      }           
    },
    timeFor(btime, etime) {
      let time = "";
      if (btime && etime) {
        switch (true) {
          case btime.slice(0, 4) != etime.slice(0, 4):
            time =
              this.timeBe(btime.slice(0, 10)) +
              "-" +
              this.timeBe(etime.slice(0, 10));
            break;
          case btime.slice(5, 7) != etime.slice(5, 7):
            time =
              this.timeBe(btime.slice(0, 10)) +
              "-" +
              etime.slice(5, 10).replace(/-/, "月") +
              "日";
            break;
          case btime.slice(8, 10) != etime.slice(8, 10):
            time =
              this.timeBe(btime.slice(0, 10)) + "-" + etime.slice(8, 10) + "日";
            break;
          default:
            time = this.timeBe(btime.slice(0, 10));
        }
      }
      return time;
    },
    timeBe(str) {
      return str.replace(/-/, "年").replace(/-/, "月") + "日";
    },
    eventTxt(val) {
      let arr = [
        { value: 1, label: "象棋" },
        { value: 2, label: "围棋" },
        { value: 4, label: "国际象棋" },
        { value: 8, label: "国际跳棋" },
        { value: 16, label: "五子棋" },
        { value: 32, label: "扑克" }
      ];
      let str = [];
      arr.forEach((e, i) => {
        if (val & e.value) {
          str.push(e.label);
        }
      });
      return str;
    },
    nowYearMonth() {
      let now = new Date();
      let arr = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ];
      return now.getFullYear() + "-" + arr[now.getMonth()];
    },
    nowYearMonthday() {
      let now = new Date();
      let arr = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ];
      let day=now.getDate()
      if(day<10)day="0"+day
      return now.getFullYear() + "-" + arr[now.getMonth()]+"-"+day;
    },
    addZero(num) {
      return num.toString().length == 1 ? "0" + num : num;
    },
    monthChange(type, flag) {
      let arr = this.key.date.split("-");
      if (!this.loading) {
        return;
      }
      switch (type) {
        case "prev":
          this.key.date =
            parseInt(arr[1]) == 1
              ? `${+arr[0] - 1}-12`
              : `${arr[0]}-${this.addZero(+arr[1] - 1)}`;
          break;
        case "next":
          this.key.date =
            parseInt(arr[1]) == 12
              ? `${+arr[0] + 1}-01`
              : `${arr[0]}-${this.addZero(+arr[1] + 1)}`;
          break;
      }
      this.loading = false;
      this.getList(flag);
    },
    
    daychange(type, flag){
      if (!this.loading) {
        return;
      }
      var date=new Date(this.key.daydate)
      
      switch (type) {
        case "prev":
           date.setDate(date.getDate() - 1)
          break;
        case "next":
           date.setDate(date.getDate() + 1)
          break;
      }
      if(date<=new Date())return
      this.key.daydate=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
      this.getList()
    },
    onPullingDown() {
      this.currentPage = 1;
      this.getList();
    },
    onPullingUp() {
      if (this.totalPage > this.currentPage) {
        this.currentPage++;
        this.getList();
      } else {
        this.$refs.trainScroll.forceUpdate();
      }
    },
    locationOfAmap() {
      MapLoader().then(
        AMap => {
          console.log("地图加载成功");
          this.map = new AMap.Map("amap", {
            resizeEnable: true
          });
          this.map.plugin("AMap.Geolocation", ()=> {            
            let geolocation = new AMap.Geolocation();
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, "complete", result => {
              // console.log(result)
              this.axios({
                url: "//restapi.amap.com/v3/geocode/regeo",
                methods: "get",
                params: {
                  key: "a4b7b21b2da76b28d65c4126194c1e3c",
                  location: result.position.lng + "," + result.position.lat
                }
              }).then(res => {
                const _data = res.data;
                if(_data.status==1){                  
                  this.province=_data.regeocode.addressComponent.province;
                  this.key.province=_data.regeocode.addressComponent.province;
                }
                this.getList(true)
              });
            });
            AMap.event.addListener(geolocation, "error", error => {
              this.getList(true)
              switch (error.info) {
                case "NOT_SUPPORTED":
                  alert("定位失败,当前浏览器不支持定位功能");
                  break;
                case "FAILED":
                  switch (error.message) {
                    case "Get ipLocation failed.":
                      alert("IP精确定位失败");
                      break;
                    case "Get geolocation failed.Get ipLocation failed.":
                      alert("IP精确定位失败");
                      break;
                    case "Browser not Support html5 geolocation.":
                      alert("定位失败,浏览器版本较低");
                      break;
                    case "Geolocation permission denied.":
                      alert("定位失败,用户禁用了定位权限");
                      break;
                    case "Get geolocation time out.":
                      alert("定位失败,请求超时");
                      break;
                  }
                  break;
              }
            });
          });
        },e => {
          this.getList(true)
          console.log("地图加载失败", e);
        }
      );
    },
    popValue() {
      this.$createDialog(
        {
          type: "alert",
          confirmBtn: {
            text: "我知道了",
            active: true
          }
        },
        createElement => {
          return [
            // createElement('div', {
            //   'class': {
            //     'my-title': true
            //   },
            //   slot: 'title'
            // }, [
            //   createElement('div', {
            //     'class': {
            //       'my-title-img': true
            //     }
            //   }),
            //   createElement('p', '附近车少,优选出租车将来接您')
            // ]),
            createElement(
              "div",
              {
                class: {
                  "my-content": true
                },
                slot: "content"
              },
              [
                createElement("p", [
                  createElement(
                    "span",
                    {
                      class: { "tag-box": true, "is-warning": true }
                    },
                    "7"
                  ),
                  createElement(
                    "span",
                    {
                      class: { "my-content-text": true }
                    },
                    "七天退费"
                  )
                ]),
                createElement("p", [
                  createElement(
                    "span",
                    {
                      class: { "tag-box": true }
                    },
                    "证"
                  ),
                  createElement(
                    "span",
                    {
                      class: { "my-content-text": true }
                    },
                    " 棋协赛事"
                  )
                ]),
                createElement("p", [
                  createElement(
                    "span",
                    {
                      class: { "tag-box": true, "is-danger": true }
                    },
                    "VIP"
                  ),
                  createElement(
                    "span",
                    {
                      class: { "my-content-text": true }
                    },
                    " 对阵表查询免费"
                  )
                ]),
                createElement("p", [
                  createElement(
                    "span",
                    {
                      class: { "tag-box": true, "is-success": true }
                    },
                    "拍"
                  ),
                  createElement(
                    "span",
                    {
                      class: { "my-content-text": true }
                    },
                    " 赛场拍照"
                  )
                ]),
                createElement("p", [
                  createElement(
                    "span",
                    {
                      class: { "tag-box": true }
                    },
                    "裁"
                  ),
                  createElement(
                    "span",
                    {
                      class: { "my-content-text": true }
                    },
                    " 智能赛场裁判"
                  )
                ]),
                createElement("p", [
                  createElement(
                    "span",
                    {
                      class: { "tag-box": true, "is-success": true }
                    },
                    "保"
                  ),
                  createElement(
                    "span",
                    {
                      class: { "my-content-text": true }
                    },
                    " 互联网保险"
                  )
                ])
              ]
            )
          ];
        }
      ).show();
    }
  },
  mounted() {
    wxShare({
      title: "报名入口",
      desc: "线上报名 一键搞定",
      img: ""
    });
    // this.locationOfAmap()
    this.formatData();
    this.key.date = this.nowYearMonth();
    this.locationOfAmap();
    // this.getList(true);

  }
};
</script>
<style lang="less">
#join {
  height: 100%;
  position: relative;
  background: #eaf2f5;
  .clearfix:after,
  .clearfix:before {
    clear: both;
    display: table;
    content: " ";
  }
  .amap-demo {
    display: none;
    height: 0;
    opacity: 0;
  }
  .header {
    position: relative;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #fff;
    // box-shadow: 0 1px 6px #ccc;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 5;
  }
  .event-value-filter {
    height: 40px;
    line-height: 40px;
    .cube-scroll-content {
      border-bottom: 1px solid #ddd;
    }
    .cube-scroll-nav-bar-item {
      padding: 0px 15px;
    }
  }
  .filter-time {
    height: 40px;
    line-height: 40px;
    display: flex;
    background: #fff;
    justify-content: space-between;
    align-items: center;
    .center-filter {
      font-size: 14px;
      background-color: #eee;
      color: #666;
      height: 24px;
      line-height: 24px;
      padding: 0px 10px;
      .btn-inline {
        background-color: transparent;
        color: #333;
        padding: 0;
        height: 100%;
      }
      .btn-bold {
        font-weight: bold;
      }
    }
    .btn-inline {
      width: auto;
      display: inline-block;
      vertical-align: middle;
      padding: 9px 10px;
      font-size: 14px;
      background-color: #fff;
      color: #666;
      i {
        margin-right: 2px;
        transform: scale(1.14);
      }
    }
    .btn-first {
      padding-left: 16px;
    }
    .btn-last {
      padding-right: 15px;
    }
  }
  .select {
    font-size: 14px;
    font-weight: 700;
    .cube-tab-bar {
      width: 70%;
      float: right;
      .cube-tab_active {
        color: #3b8be2;
        font-weight: bold;
      }
      .cube-tab {
        padding: 0;
      }
      .cube-tab-bar-slider {
        background-color: #3b8be2;
      }
    }
    .btn-inline {
      width: auto;
      display: inline-block;
      vertical-align: middle;
      padding: 9px 10px;
      font-size: 12px;
      background-color: #fff;
      color: #666;
      i {
        margin-right: 2px;
        transform: scale(1.14);
      }
    }
  }
  .back {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 15px;
    padding-right: 0;
    color: #ddd;
    font-size: 14px;
  }
  .tab-slide-container {
    position: fixed;
    top: 130px;
    left: 0;
    right: 0;
    bottom: 45px;
    .no-more {
      text-align: center;
      font-size: 16px;
      margin-top: 20px;
      color: #666;
    }
    .loading-part{
      position: absolute;
      top:150px;
      left: 0;
      right: 0;
      span{
        margin: 0 auto;
      }
    }
    .list-wrapper {
      overflow: hidden;
      .list-no{
        text-align: center;
        font-size: 20px;

      }
      li:first-child {
        margin-top: 10px;
      }
      .liAI{
        margin-top: 10px;
      }
      li {
        padding: 0px 10px;
        padding-top: 5px;
        margin-top: 20px;
        text-align: left;
        background-color: white;
        font-size: 14px;
        color: #666;
        white-space: normal;
        .avatar {
          width: 15px;
          height: 15px;
          margin-right: 2px;
          border-radius: 100%;
        }
        .event-logo {
          width: 100%;
          height: 110px;
        }
        .is-black {
          color: black;
        }
        .time {
          flex: 1;
        }
        .top {
          display: flex;
          .title {
            font-weight: bold;
            font-size: 16px;
            padding: 10px 0;
          }
        }
        .middle {
          .one-line {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          div {
            margin-top: 5px;
          }
          .tag-box {
            background-color: rgba(64, 158, 255, 0.1);
            padding: 1px 6px;
            height: 32px;
            line-height: 30px;
            font-size: 12px;
            color: #409eff;
            border-radius: 4px;
            box-sizing: border-box;
            border: 1px solid rgba(64, 158, 255, 0.2);
            white-space: nowrap;
            margin-right: 5px;
          }
          .is-warning {
            background-color: rgba(230, 162, 60, 0.1);
            border-color: rgba(230, 162, 60, 0.2);
            color: #e6a23c;
          }
          .is-success {
            background-color: rgba(103, 194, 58, 0.1);
            border-color: rgba(103, 194, 58, 0.2);
            color: #67c23a;
          }
          .is-danger {
            background-color: rgba(245, 108, 108, 0.1);
            border-color: rgba(245, 108, 108, 0.2);
            color: #f56c6c;
          }
          .location {
            float: right;
            line-height: 30px;
            padding-left: 5px;
          }
          .is-pale {
            color: #bbb;
          }
          .fee {
            color: #fc5e5e;
            span {
              font-size: 20px;
              font-weight: bold;
            }
          }
          .p-num {
            padding-left: 10px;
          }
          .fee-part {
            margin-top: 10px;
          }
        }
        .bottom {
          display: flex;
          padding: 15px 0;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          // border-bottom: 1px solid #ddd;
          .front {
            display: flex;
            align-items: center;
          }
          .orgname {
            margin-left: 10px;
          }
          .is-light {
            color: #888;
          }
        }
      }
      .listAI{
        height: 100px;
        padding-bottom: 10px;
        .body{
          margin:0 10px;
          padding: 10px;
          display: flex;
          font-size: 20px;
          border-bottom: 1px solid #ccc;
          color: #333;
          justify-content: space-between;
          .time>div:nth-child(2){
            margin-top:5px; 
            font-size: 15px;
          }
        }
        .bottom{
          padding: 0 10px;
          div:nth-child(1){
               margin: 5px;
               padding: 5px 20px;
          }
          div:nth-child(2){
            margin: 5px;
            font-size: 15px;
            padding: 5px 20px;
            border:1px solid #ccc;
            border-radius: 5px;
            background: #06c;
            color: #fff;
          }
        }
      }
    }
  }
  .tab-slide-container-sp {
    top: 90px;
  }
  .tab-slide-container-AI {
    top: 95px;
  }
  .cube-toolbar {
    bottom: 0;
    left: 0;
    right: 0;
    .cube-toolbar-item {
      background-color: #666;
      .cube-btn {
        color: #fff;
      }
    }
  }
}
.my-content {
  padding: 10px;
  font-size: 14px;
  p {
    padding: 5px;
  }
  .my-content-text {
    display: inline-block;
    // width: 200px;
    // text-align: center;
    margin-left: 30px;
  }
  .tag-box {
    background-color: rgba(64, 158, 255, 0.1);
    padding: 1px 6px;
    height: 25px;
    text-align: center;
    width: 30px;
    display: inline-block;
    line-height: 25px;
    font-size: 12px;
    color: #409eff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(64, 158, 255, 0.2);
    white-space: nowrap;
    margin-right: 5px;
  }
  .is-warning {
    background-color: rgba(230, 162, 60, 0.1);
    border-color: rgba(230, 162, 60, 0.2);
    color: #e6a23c;
  }
  .is-success {
    background-color: rgba(103, 194, 58, 0.1);
    border-color: rgba(103, 194, 58, 0.2);
    color: #67c23a;
  }
  .is-danger {
    background-color: rgba(245, 108, 108, 0.1);
    border-color: rgba(245, 108, 108, 0.2);
    color: #f56c6c;
  }
}
</style>
