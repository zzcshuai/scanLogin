import Vue from 'vue'
import Router from 'vue-router'
import competition from './views/competition/competition.vue'
import join from './views/competition/join.vue'
import scanLogin from './views/scanlogin/scanLogin.vue';
import beginScan from './views/scanlogin/beginScan.vue';
import checkingCaller from './views/scanlogin/checkingCaller.vue';
import inputCode from './views/scanlogin/inputCode.vue';
import login  from './views/scanlogin/login.vue';
import memberList from './views/scanlogin/memberList.vue';
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/competition',
      name: 'competition',
      component: competition,
      children: [
        { path: 'join', component: join },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path:'/scanLogin',
      name:'scanLogin',
      component:scanLogin,
      children:[
        {
          path:'checkingCaller',component:checkingCaller
        },
        {
          path:'login',component:login
        },
        {
          path:'beginScan',component:beginScan
        },
        {
          path:'memberList',component:memberList
        },
        {
          path:'inputCode',component:inputCode
        }
      ]
    },
    { path: '*', component: () => import('./views/NotFound.vue') }
  ]
})
