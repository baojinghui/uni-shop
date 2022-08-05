
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {showMessage} from '@/utils/showMessage.js'
import {$http} from '@escook/request-miniprogram' //http请求包
uni.$http=$http//挂载自己封装的http请求
uni.$showTip=showMessage //挂载自己封装的失败的提示消息
$http.baseUrl="http://api-ugo-web.itheima.net"
//请求拦截器
$http.beforeRequest=function(options){
  uni.showLoading({
    title:"数据请求中..."
  })
}
//响应拦截器
$http.afterRequest=function(){
  //隐藏loading效果
  uni.hideLoading()
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
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