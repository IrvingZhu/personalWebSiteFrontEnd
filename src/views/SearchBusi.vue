<!--
 * @Description: 
 * @version: 
 * @Author: zrz
 * @Date: 2021-01-26 17:24:46
 * @LastEditors: zrz
 * @LastEditTime: 2021-02-04 21:52:23
-->
<!-- 员工管理 -->
<template>
    <div class="container-body organization-manage">
        <div class="breadcrumb-div">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>业务管理</el-breadcrumb-item>
                <el-breadcrumb-item>业务查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-container" style="margin-top:16px">
            <div class="search-form-div">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
                    <el-form-item label="">
                        <el-input v-model="searchForm.name" placeholder="查询业务"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="page-container-body">
                <div class="card-div">
                    <p>{{ cardTitle }}</p>
                    <div class="card-content">
                        <el-table :data="tableData" stripe style="width: 100%" size="small">
                            <el-table-column type="index" :index="indexMethod" width="192px" align="center"
                                fixed="left">
                            </el-table-column>
                            <el-table-column prop="bid" label="业务id" width="192px" align="left"></el-table-column>
                            <el-table-column prop="btype" label="业务类型" width="192px" align="left"></el-table-column>
                            <el-table-column prop="specific_detail" label="具体描述" align="left">
                                <el-button @click="drawer = true" type="text" size="mini">
                                    业务描述
                                </el-button>
                                <el-drawer title="个人业务信息" :visible.sync="drawer" :with-header="false">
                                    <div style = "text-align: center; font-size: x-large; margin-top: 16px;">
                                        <span>${btype}</span>
                                    </div>
                                    <div style = "margin-top: 8px; font-size: large;">
                                        <span>${binfo}</span>
                                    </div>    
                                </el-drawer>
                            </el-table-column>
                            <el-table-column label="操作" align="center" width="256px" fixed="right">
                                <template slot-scope="scope">
                                    <el-button @click="toogleExpand(scope.row,'look')" type="text" size="mini">修改业务信息
                                    </el-button>
                                    <el-button @click="toogleExpand(scope.row,'look')" type="text" size="mini">删除业务信息
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="showCount"
                            layout="total, sizes, prev, pager, next, jumper" :total="totalResult" align="right">
                        </el-pagination>
                    </div>
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
                cardTitle: '查询和操作',

                searchForm: {
                    name: '',
                },
                currentPage: 1,
                showCount: 10,
                totalResult: 10,

                tableData: [{
                    index: 1,
                    bid: "1",
                    btype: "开发合作",
                }],
                drawer: false,
            };
        },

        methods: {
            
        }
    };
</script>

<style scoped></style>