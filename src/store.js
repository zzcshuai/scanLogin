import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const host = window.location.host
let __baseURL = '//'
if (host.includes('dev')) {
  __baseURL = '//dev-'
} else if (host.includes('test')) {
  __baseURL = '//test-'
}else if(host.includes('localhost')){
  __baseURL = '//dev-'
}else if(host.includes('192.168.2')){
  __baseURL = '//dev-'
}else if(host.includes('127.0.0.1')){
  __baseURL = '//dev-'
}

export default new Vuex.Store({
  state: {
    BASE_URI:__baseURL,
  },
  mutations: {

  },
  actions: {

  }
})
