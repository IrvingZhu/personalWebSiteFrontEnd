<!--
 * @Description: 
 * @version: 
 * @Author: zrz
 * @Date: 2021-01-28 20:54:53
 * @LastEditors: zrz
 * @LastEditTime: 2021-02-13 22:21:00
-->
<template>
    <div class="login-wrap">
        <el-form ref="loginRef" class="login-form" label-position="top" label-width="80px" :model="formdata">
            <h2>用户登录</h2>
            <el-form-item label="用户名">
                <el-input v-model="formdata.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formdata.password" show-password></el-input>
            </el-form-item>
            <el-button class="login-btn" type="primary" @click="handleLogin()">登录</el-button>
            <br>
            <br>
            <el-button class="login-btn" @click="handleRegisterPage()">注册</el-button>
            <br>
            <br>
            <div>
                <a href = "http://localhost:8088">返回首页</a>
            </div>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: "Login",
        data() {
            return {
                formdata: {
                    username: "",
                    password: "",
                },
            };
        },
        methods: {
            handleLogin() {
                //测试版本
                if (this.formdata.username !== '' && this.formdata.password !== '') {
                    console.log("enter handleLogin")
                    this.$refs.loginRef.validate(async valid => {
                        if (!valid) return;

                        var isAdmin = this.formdata.username;

                        const { data: res } = await this.$http.post("/api/loginIn", {"username": this.formdata.username, "pwd": this.formdata.password});
                        console.log(res);         
                        if (res == "success") {
                            if(isAdmin == "admin"){
                                sessionStorage.setItem("uid", "admin");
                                this.$router.push({path: '/managepage'});
                            } 
                            else{
                                sessionStorage.setItem("uid", this.formdata.username);
                                this.$router.push({ path: '/home' });
                            }

                            //  2.提示成功
                            this.$message({
                                showClose: true,
                                message: '登录成功',
                                type: 'success'
                            });
                        } else {
                            this.$message({
                                showClose: true,
                                message: '登录错误，检查用户名或者密码',
                                type: 'error'
                            });
                        }
                    })

                } else {
                    this.$message({
                        showClose: true,
                        message: '用户名和密码不能为空',
                        type: 'error'
                    });
                }
            },
            handleRegisterPage() {
                this.$router.push({ path: '/register' })
            }
        }
    };

</script>
<style scoped>
    .login-wrap {
        height: 100%;
        background: #324152;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-form {
        width: 400px;
        background: #fff;
        border-radius: 5px;
        padding: 30px;
        text-align: center;
        margin: 64px;
    }

    .login-btn {
        width: 100%;
    }
</style>