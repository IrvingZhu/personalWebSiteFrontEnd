/*
 * @Description: 
 * @version: 
 * @Author: zrz
 * @Date: 2021-01-28 17:56:08
 * @LastEditors: zrz
 * @LastEditTime: 2021-01-31 21:10:42
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')

const UserInfo = () => import('../views/UserInfo.vue')
const UpdateInfo = () => import('../views/UpdateInfo.vue')
const SearchBusi = () => import('../views/SearchBusi.vue')
const BusiHandle = () => import('../views/BusiHandle.vue')
const Register = () => import('../views/Register.vue')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: '注册',
        component: Register
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/userinfo',
                name: '用户信息',
                component: UserInfo,
            }, {
                path: '/updateinfo',
                name: '修改信息',
                component: UpdateInfo,
            }, {
                path: '/searchbusi',
                name: '业务查询',
                component: SearchBusi,
            }, {
                path: '/busihandle',
                name: '业务办理',
                component: BusiHandle,
            },]
    },
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
