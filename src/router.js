import Vue from "vue";
import Router from "vue-router";
import competition from "./views/competition/competition.vue";
import join from "./views/competition/join.vue";
import scanLogin from "./views/scanlogin/scanLogin.vue";
import beginScan from "./views/scanlogin/beginScan.vue";
import checkingCaller from "./views/scanlogin/checkingCaller.vue";
import memberList from "./views/scanlogin/memberList.vue";
import shareCaller from "./views/scanlogin/shareCaller.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/competition",
      name: "competition",
      component: competition,
      children: [{ path: "join", component: join, meta: { title: "报名列表" } }]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/scanLogin",
      name: "scanLogin",
      component: scanLogin,
      children: [
        {
          //验证
          path: "checkingCaller",
          component: checkingCaller,
          meta: {
            title: "检录员验证"
          }
        },
        {
          //开始扫码
          path: "beginScan",
          component: beginScan,
          meta: {
            title: "开始扫码"
          }
        },
        {
          //小组成员
          path: "memberList",
          component: memberList,
          meta: {
            title: "小组成员"
          }
        },
        {
          path: "shareCaller",
          component: shareCaller,
          meta: {
            title: "检录员邀请",
          }
        }
      ]
    },
    { path: "*", component: () => import("./views/NotFound.vue") }
  ],
});
