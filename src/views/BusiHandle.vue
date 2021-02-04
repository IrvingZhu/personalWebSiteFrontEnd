<!--
 * @Description: 
 * @version: 
 * @Author: zrz
 * @Date: 2021-01-26 17:24:46
 * @LastEditors: zrz
 * @LastEditTime: 2021-02-04 21:17:34
-->
<!-- 组织管理 -->
<template>
    <div class="container-body organization-manage">
        <div class="breadcrumb-div">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>业务管理</el-breadcrumb-item>
                <el-breadcrumb-item>业务办理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-container">
            <div class="card-div">
                <p>{{ cardTitle }}</p>
                <div class="card-content">
                    <el-form :model="formData" :rules="rules" ref="formDataRef" label-width="150px"
                        class="demo-ruleForm" size="small">
                        <div style="text-align: center; margin:32px">

                            <!-- v-model is important -->
                            <el-select v-model="value" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <el-form-item label="业务具体描述:" prop="desc">
                            <el-input type="textarea" v-model="formData.detail_descript" rows="5"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onPushFormTable()" size="small">保存</el-button>
                            <el-button type="primary" @click="onPushFormTableCancel()" size="small">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'organization-manage',
        data() {
            return {
                value: '',

                cardTitle: '操作面板',
                busi_type: '业务类型',

                formData: {
                    detail_descript: '',
                    value: '',
                },

                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                },

                options: [{
                    value: '开发合作',
                    label: '开发合作'
                }, {
                    value: '广告合作',
                    label: '广告合作'
                }, {
                    value: '经营合作',
                    label: '经营合作'
                }, {
                    value: '提点建议',
                    label: '提点建议'
                }, {
                    value: '其它合作',
                    label: '其它合作'
                }],
            };
        },

        methods: {
            onPushFormTable() {
                console.log(this.value);
                console.log(this.formData.detail_descript);

                if (this.value && this.formData.detail_descript) {
                    this.$refs.formDataRef.validate(async valid => {
                        if (!valid)
                            return;

                        const { data: res } = await this.$http.post("/api/addBusi", { "btype": this.value, "binfo": this.formData.detail_descript });

                        if (res == "success") {
                            this.$message({
                                showClose: true,
                                message: "保存并上传成功",
                                type: "success"
                            });
                        } else {
                            this.$message({
                                showClose: true,
                                message: "保存并上传失败",
                                type: "error"
                            });
                        }
                    })
                } else {
                    this.$message({
                        showClose: true,
                        message: "任何一项均不能为空",
                        type: "error",
                    })
                }

                this.formData.detail_descript = "";
                this.value = "";                
            },

            onPushFormTableCancel(){
                this.formData.detail_descript = "";
                this.value = "";
            }
        }
    };
</script>

<style scoped></style>