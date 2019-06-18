import Vue from 'vue'
import './plugins/axios'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick';   
import 'amfe-flexible'
import Vant from 'vant';
import 'vant/lib/index.css';
import VueLazyLoad from 'vue-lazyload'
import vueWechatTitle from 'vue-wechat-title'
// import VueAMap from 'vue-amap';

//解决移动端点击300ms延迟
fastClick.attach(document.body);

//添加动态组件标题
Vue.use(vueWechatTitle)

//图片懒加载
Vue.use(VueLazyLoad,{
    error:'//g.yunbisai.com/img/cert/demo.png',
})

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
