<!--
 * @Description: 
 * @version: 
 * @Author: zrz
 * @Date: 2021-01-28 21:24:49
 * @LastEditors: zrz
 * @LastEditTime: 2021-02-04 21:39:58
-->
<template>
    <el-container class="container">
        <el-header class="header" height = "80px">
            <div style="font-size:32px">zrz业务管理系统</div>
            <div style = "text-align:right;">用户:{{user}}
                <el-button type="text" style="text-align: top;" @click = "exitLogin()">退出</el-button></div>
        </el-header>
        <el-container>
            <el-aside class="aside">
                <!-- 侧边栏导航  -->
                <!-- unique-opened只展开一个 -->
                <!-- router开启路由模式 -->
                <el-menu :unique-opened="true" :router="true" class="menu" background-color=" #3A3A3A" text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu :index="' '+item1.order" v-for="(item1,index) in menuData" :key="item1.path">
                        <!--表示可以展开的一组 -->
                        <template slot="title" @click="clickTitle">
                            <!--图标 -->
                            <i class="el-icon-location"></i>
                            <!--文字 -->
                            <span>{{item1.name}}</span>
                        </template>
                        <el-menu-item class="menuItem" @click="clickMenuItem" v-for="(item2,index) in item1.children"
                            :key="item2.path" :index="item2.path">
                            <i class="el-icon-location"></i>
                            <!--图标 -->
                            <span>{{item2.name}}</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Home",

        create(){
            var name = window.sessionStorage.getItem("uname");
            console.log(name);
            this.user = name;
        },

        data() {
            return {
                user: "",

                style: {
                    display: "block",
                },
                menuData: [
                    {
                        name: "用户管理",
                        order: "1",
                        path: 'studentmanage',
                        children: [
                            {
                                path: "userinfo",
                                name: "用户信息",
                            }, {
                                path: "updateinfo",
                                name: "修改信息",
                            },
                        ],
                    },
                    {
                        path: "mealcardmanage",
                        name: "业务管理",
                        order: "2",
                        children: [
                            {
                                path: "searchbusi",
                                name: "业务查询",
                            },
                            {
                                path: "busihandle",
                                name: "业务办理",
                            },
                        ],
                    },
                ],
            };
        },

        methods:{
            async exitLogin(){
                console.log("exit login");

                const {data: res} = await this.$http.post("/api/exit");

                if(res == "success"){
                    this.$message({
                        showClose:true,
                        message: "退出成功",
                        type: "success",
                    })
                    this.$router.push({ path: '/' });
                }
                else{
                    this.$message({
                        showClose: true,
                        message: "退出失败",
                        type: "error",
                    })
                }
            }
        }
    };
</script>
<style scoped>
    .container {
        height: 100vh;
        font-size: 15px;
    }

    .header {
        background: #212121;
        color: #fff;
    }

    .aside {
        background: #3a3a3a;
        color: #fff;
        /* height: 100%; */
    }

    .main {
        /* height: 100%; */
        color: #212121;
    }
</style>