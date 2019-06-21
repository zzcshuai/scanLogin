import Vue from 'vue'
import './plugins/axios'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store' 
import 'amfe-flexible'
import Vant from 'vant';
import 'vant/lib/index.css';
import vueWechatTitle from 'vue-wechat-title'
// import VueAMap from 'vue-amap';


//添加动态组件标题
Vue.use(vueWechatTitle)


Vue.config.productionTip = false
// Vue.prototype.$ajax = axios
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//   key: 'a4b7b21b2da76b28d65c4126194c1e3c',
//   plugin: ['AMap.Geolocation'],
//   v: '1.4.6'
// });

new Vue({
  router,
  store,
  render(createElement) {
    return createElement(App)
  }
}).$mount('#app')
