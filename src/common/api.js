import axios from 'axios';

const OPEN = 'open.yunbisai.com';
const API = 'api.yunbisai.com';
const host = window.location.host
let baseURL = '//'
if (host.includes('dev')) {
  baseURL = '//dev-'
} else if (host.includes('test')) {
  baseURL = '//test-'
}else if(host.includes('localhost')){
  baseURL = '//dev-'
}else if(host.includes('192.168.2')){
  baseURL = '//dev-'
}else if(host.includes('127.0.0.1')){
  baseURL = '//dev-'
}
//二次封装axios
function request(method = 'get', url, data = null) {
    method = method.toLowerCase();
    if (method == 'post') {
        return axios.post(url, data)
    } else if (method == 'get') {
        return axios.get(url, { params: data })
    } else if (method == 'delete') {
        return axios.delete(url, { params: data })
    } else if (method == 'put') {
        return axios.put(url, data)
    } else {
        console.error('未知的method' + method)
        return false
    }
}

//赛事报名列表
export const signUpList = params => request('get', `${baseURL}${OPEN}/api/Join/event`, params)
//课程培训列表
export const trainingList = params => request('get', `${baseURL}${OPEN}/api/Join/training`, params)
//AI考级列表
export const ailist = params => request('post', `${baseURL}${OPEN}/AiExam/examplan/aiEventGroup`, params)
//城市列表获取
export const HotCity =  params => request('get', `${baseURL}${API}/request/hot/HotCity`, params)
//检录员提交验证
export const checkSubmit=params =>request('get',`${baseURL}${OPEN}/api/RollCall/checkClerk`,params)
//验证openid，返回最新的ssid
export const checkOpenidOut=params =>request('get',`${baseURL}${OPEN}/api/RollCall/checkInClerkPlayer`,params)
//验证ssid，返回最新的openid
export const checkSsidOut=params =>request('get',`${baseURL}${OPEN}/api/RollCall/checkLand`,params)
//获取运动员信息，进行验证
export const getPlayDetail=params =>request('get',`${baseURL}${OPEN}/api/RollCall/checkPlayer`,params)
//返回多组以后检录员选择任意小组进行检录
export const checkGroupIdPlayer=params =>request('get',`${baseURL}${OPEN}/api/RollCall/checkGroupIdPlayer`,params)
//获取小组检录信息
export const groupIDGetPlayer=params =>request('get',`${baseURL}${OPEN}/api/RollCall/getPlayerGroupList`,params)
//获取所有小组
export const getGroupList=params =>request('get',`${baseURL}${OPEN}/api/RollCall/getGroupList`,params)
