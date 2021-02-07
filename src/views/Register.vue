<!--
 * @Description: 
 * @version: 
 * @Author: zrz
 * @Date: 2021-01-31 20:46:00
 * @LastEditors: zrz
 * @LastEditTime: 2021-02-07 12:32:45
-->
<template>
    <div class="login-wrap">
        <el-form ref="registerRef" class="login-form" label-position="top" label-width="80px" :model="formdata">
            <h2>用户注册</h2>
            <el-form-item label="用户名">
                <el-input v-model="formdata.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="formdata.email"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formdata.password" show-password></el-input>
            </el-form-item>
            <el-button class="btn" type="primary" @click="handleRegister()">注册</el-button>
            <br>
            <br>
            <el-button class="btn" @click="handleReturn()">返回</el-button>
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
                    email: ""
                },
            };
        },
        methods: {
            handleRegister() {
                //测试版本
                if (this.formdata.username == '' || this.formdata.password == '' || this.formdata.email == '') {
                    this.$message({
                        showClose: true,
                        message: '所有均为必填项不能为空',
                        type: 'error'
                    });
                } else {
                    this.$refs.registerRef.validate(async valid => {
                        if (!valid)
                            return;
                        const { data: res } = await this.$http.post("/api/registerIn", { "username": this.formdata.username, "pwd": this.formdata.password, "email": this.formdata.email });
                        if (res == "success") {
                            this.$message({
                                showClose: true,
                                message: '注册成功',
                                type: 'success'
                            });
                        }
                        else{
                            this.$message({
                                showClose: true,
                                message: "注册失败, 可能用户名存在",
                                type: "error"
                            })
                        }
                    })
                    this.$router.push({ path: '/' })
                }
            },
            handleReturn() {
                this.$router.push({ path: '/' })
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

    .btn {
        width: 100%;
    }
</style>