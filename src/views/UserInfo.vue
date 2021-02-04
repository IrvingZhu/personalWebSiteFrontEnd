<!--
 * @Description: 
 * @version: 
 * @Author: zrz
 * @Date: 2021-01-24 15:02:30
 * @LastEditors: zrz
 * @LastEditTime: 2021-02-04 01:07:01
-->
<template>
    <div class="container-body organization-manage">
        <el-container>
            <div class="breadcrumb-div">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                    <el-breadcrumb-item>用户信息</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-header class="el-userHeader">
                <div style="text-align:left; font-size:24px; vertical-align:center">
                    用户信息
                </div>
            </el-header>
            <div class="userinfo_show">
                <div class="userinfo_show">id:    {{this.id}}</div>
                <br>
                <br>
                <div class="userinfo_show">姓名:    {{this.name}}</div>
                <br>
                <br>
                <div class="userinfo_show">邮箱:    {{this.mail}}</div>
            </div>
        </el-container>
    </div>
</template>

<script>
    export default {
        created() {
            console.log("create");
            this.getUserInfo();
        },

        data() {
            return {
                id: '',
                name: '',
                mail: '',
            }
        },

        methods: {
            async getUserInfo() {
                console.log("enter getInfo");
                const { data: res } = await this.$http.post("/api/info", {}, {withCredentials: true});
                if (res) {
                    console.log(res);
                    this.id = res.id;
                    console.log(this.id)
                    this.name = res.name;
                    console.log(this.name)
                    this.mail = res.mail;
                    console.log(this.mail)
                }
                else {
                    this.$message({
                        showClose: true,
                        message: '获取资料失败',
                        type: 'error'
                    })
                }
            },
        }
    }

</script>

<style>
    .el-userHeader {
        background-color: #fff;
        color: #333;
        text-align: center;
        line-height: 64px;
    }

    .el-userMain {
        background-color: #fff;
        color: #333;
        vertical-align: middle;
        margin-top: 64px;
    }

    .userinfo_show {
        text-align: left;
        font-size: 24px;
        vertical-align: middle;
        margin-top: 32px;
        margin-left: 32px;
    }
</style>