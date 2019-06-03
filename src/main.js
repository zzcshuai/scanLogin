import Vue from 'vue'
import './plugins/axios'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'amfe-flexible'
import VueAMap from 'vue-amap';
import wxGetCode from '@/common/wx-getCode';
wxGetCode();
// window.open('http://m.yunbisai.com/wechat/Openid?url=localhost:3000/scanLogin/checkingCaller')

Vue.config.productionTip = false

// Vue.prototype.$ajax = axios
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'a4b7b21b2da76b28d65c4126194c1e3c',
  plugin: ['AMap.Geolocation'],
  v: '1.4.6'
});

new Vue({
  router,
  store,
  render(createElement) {
    return createElement(App)
  }
}).$mount('#app')
