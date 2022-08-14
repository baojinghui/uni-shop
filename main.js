
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {showMessage} from '@/utils/showMessage.js'
import {$http} from '@escook/request-miniprogram' //http请求包
import store from '@/store/store.js'//导入仓库
uni.$http=$http//挂载自己封装的http请求
uni.$showTip=showMessage //挂载自己封装的失败的提示消息
$http.baseUrl="http://api-ugo-web.itheima.net"
//请求拦截器
$http.beforeRequest=function(options){
  uni.showLoading({
    title:"数据请求中..."
  })
  //之后只要请求有权限的接口(接口中包含'my'),就会对请求头中添加一个字段,用于身份验证
  if(options.url.indexOf('/my/')!==-1){
    options.header={
      Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo ",//store.state.m_user.token
    }
  }
}
//响应拦截器
$http.afterRequest=function(){
  //隐藏loading效果
  uni.hideLoading()
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif