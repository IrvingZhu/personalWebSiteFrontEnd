/*
 * @Description: 
 * @version: 
 * @Author: zrz
 * @Date: 2021-01-28 17:56:08
 * @LastEditors: zrz
 * @LastEditTime: 2021-02-03 21:32:54
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource';
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from '../node_modules/axios'
import baseUrl from './config/baseUrl'


axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueResource);
Vue.prototype.$api = baseUrl.comurl

// // 设置后端请求地址
// axios.defaults.baseURL = 'http://localhost:8088/'

Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})