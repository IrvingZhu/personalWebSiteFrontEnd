/*
 * @Description: 
 * @version: 
 * @Author: zrz
 * @Date: 2021-01-28 17:56:08
 * @LastEditors: zrz
 * @LastEditTime: 2021-02-07 12:43:55
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
        // meta: {
        //     requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        // },
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
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Home,
        children: [
            {
                path: '/userinfo',
                name: '用户信息',
                meta: {
                    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                },
                component: UserInfo,
            }, {
                path: '/updateinfo',
                name: '修改信息',
                meta: {
                    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                },
                component: UpdateInfo,
            }, {
                path: '/searchbusi',
                name: '业务查询',
                meta: {
                    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                },
                component: SearchBusi,
            }, {
                path: '/busihandle',
                name: '业务办理',
                meta: {
                    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                },
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
