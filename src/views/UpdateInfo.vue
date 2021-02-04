<!--
 * @Description: 
 * @version: 
 * @Author: zrz
 * @Date: 2021-01-28 21:32:40
 * @LastEditors: zrz
 * @LastEditTime: 2021-02-04 17:44:57
-->
<template>
    <div class="container-body organization-manage">
        <div class="breadcrumb-div">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>修改信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-header class="el-userHeader">
                <div style="text-align:left; font-size:24px; vertical-align:center">
                    修改信息
                </div>
            </el-header>

            <div style="text-align: center; vertical-align: middle; margin-top: 64px;">
                <el-form ref="userInfo" :model="infoForm" label-width="80px">
                    <el-form-item label="">
                        <el-input class="input_css" v-model="infoForm.name" placeholder="请输入修改之后的姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-input class="input_css" v-model="infoForm.mail" placeholder="请输入修改之后的邮箱"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onUserInfoSubmit()">修改</el-button>
                        <el-button @click = "onUserUpdateCancel()">取消</el-button>
                    </el-form-item>
                </el-form>

                <!-- Form -->
                <el-button type="text" @click="dialogFormVisible = true">修改密码点此处</el-button>

                <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
                    <el-form ref = "pwd" :model="pwdForm">
                        <el-form-item label="新密码" :label-width="formLabelWidth">
                            <el-input v-model="pwdForm.newpwd" placeholder="请输入新的密码" autocomplete="off" show-password>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="再次确认新密码" :label-width="formLabelWidth">
                            <el-input v-model="pwdForm.renewpwd" placeholder="请再次输入新的密码" autocomplete="off"
                                show-password></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="onPwdUpdateCancel">取 消</el-button>
                        <el-button type="primary" @click="onPwdUpdate()">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogTableVisible: false,
                dialogFormVisible: false,
                infoForm: {
                    name: "",
                    mail: "",
                },
                pwdForm: {
                    newpwd: '',
                    renewpwd: '',
                },
                formLabelWidth: '120px'
            }
        },
        methods:{
            onUserInfoSubmit(){
                if(this.infoForm.name == '' && this.infoForm.mail == ''){
                    console.log("error mode");
                    this.$message({
                        showClose: true,
                        message: "不能全部都为空",
                        type: 'error'
                    });
                    return;
                }
                else{
                    console.log("enter modify");
                    console.log(this.infoForm.name);
                    console.log(this.infoForm.mail);
                    var newName = this.infoForm.name;
                    var newMail = this.infoForm.mail;
                    if(newName == ''){
                        newName = "null";
                    }
                    if(newMail == ''){
                        newMail = "null";
                    }
                    console.log(newName);
                    console.log(newMail);

                    this.$refs.userInfo.validate(async valid=>{
                        if(!valid)
                            return;
                        const { data: res } = await this.$http.post("/api/update", {"newName": newName, "newMail": newMail});
                        console.log(res);

                        if(res == "success"){
                            console.log("success");
                            this.$message({
                                showClose:true,
                                message: "修改成功",
                                type: "success"
                            });
                        }else{
                            console.log("error");
                            this.$message({
                                showClose:true,
                                message: "修改失败",
                                type: "error"                                
                            });
                        }
                    })
                }
            },

            onPwdUpdate(){
                if(this.pwdForm.newpwd != "" && this.pwdForm.renewpwd != ""){
                    if(this.pwdForm.newpwd != this.pwdForm.renewpwd){
                        this.$message({
                            showClose:true,
                            message: "缺少必填项",
                            type: "error"
                        });
                    }else{
                        console.log("enter pwd");
                        console.log(this.pwdForm.newpwd);

                        this.$refs.pwd.validate(async valid=>{
                            if(!valid)
                                return;

                            const {data : res} = await this.$http.post("/api/updatepwd", {"newPwd": this.pwdForm.newpwd});
                            if(res == "success"){
                                console.log("success");
                                this.$message({
                                    showClose: true,
                                    message: "修改密码成功",
                                    type: "success"
                                });
                            }else{
                                this.$message({
                                    showClose: true,
                                    message: "修改密码失败",
                                    type: "error"
                                });
                            }
                        });
                    }
                }
            },

            onPwdUpdateCancel(){
                this.pwdForm.newpwd = "";
                this.pwdForm.renewpwd = "";
                this.dialogFormVisible = false;
            },

            onUserUpdateCancel(){
                this.infoForm.name = "";
                this.infoForm.mail = "";
            }
        }
    }
</script>

<style scoped>
    .input_css {
        text-align: center;
        vertical-align: middle;
        width: 256px;
        height: 64px;
        margin: 8px;
    }
</style>