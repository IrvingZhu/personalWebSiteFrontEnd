<!--
 * @Description: 
 * @version: 
 * @Author: zrz
 * @Date: 2021-02-07 15:01:38
 * @LastEditors: zrz
 * @LastEditTime: 2021-04-07 22:24:18
-->
<template>
    <div class="container-body organization-manage">
        <div class="breadcrumb-div">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>管理系统</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-button type="text" style="text-align: top;" @click = "exitLogin()">退出</el-button>
        </div>
        <div class="page-container" style="margin-top:16px">
            <div class="search-form-div">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
                    <el-form-item label="">
                        <el-input v-model="searchForm.name" placeholder="查询业务"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSearchInfoByKey()" size="small">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="page-container-body">
                <div class="card-div">
                    <p>{{ cardTitle }}</p>
                    <div class="card-content">
                        <el-table :data="tableData" stripe style="width: 100%" size="small">
                            <el-table-column type="index" :index="indexMethod" width="96px" align="center"
                                fixed="left">
                            </el-table-column>
                            <el-table-column prop="uname" label="用户名" width="96px" align="left"></el-table-column>
                            <el-table-column prop="bid" label="业务id" width="96px" align="left"></el-table-column>
                            <el-table-column prop="btype" label="业务类型" width="96px" align="left"></el-table-column>
                            <el-table-column prop="specific_detail" label="具体描述" align="left">
                                <template slot-scope="scope">
                                    <el-button @click="onShowDetailInfo(scope.row)" type="text" size="mini">
                                        业务描述
                                    </el-button>
                                    <el-drawer title="个人业务信息" :visible.sync="drawer" :with-header="false"
                                        append-to-body>
                                        <div style="text-align: center; font-size: x-large; margin-top: 16px;">
                                            <span>业务类型: {{btype}}</span>
                                        </div>
                                        <div style="margin-top: 8px; font-size: large;">
                                            <span>业务具体信息: {{binfo}}</span>
                                        </div>
                                    </el-drawer>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center" width="192px" fixed="right">
                                <template slot-scope="scope">
                                    <el-button @click="onModifyWrap(scope.row)" type="text" size="mini">修改业务信息
                                    </el-button>

                                    <el-dialog title="业务修改" :visible.sync="dialogFormVisible" append-to-body>
                                        <el-form :model="form">
                                            <el-form-item label="业务类型" :label-width="formLabelWidth">
                                                <el-select v-model="value" placeholder="请选择">
                                                    <el-option v-for="item in options" :key="item.value"
                                                        :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="业务具体描述" :label-width="formLabelWidth">
                                                <el-input type="textarea" v-model="formData.detail_descript" rows="5">
                                                </el-input>
                                            </el-form-item>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="onModifyCancel()">取 消</el-button>
                                            <el-button type="primary" @click="onModifyBusiInfo()">修 改</el-button>
                                        </div>
                                    </el-dialog>
                                    <el-button @click="onDeleteBusiInfoWrap(scope.row)" type="text" size="mini">删除业务信息
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
        created() {
            console.log("create this page");
            this.getTableInfo();
        },

        name: 'organization-manage',
        data() {
            return {
                cardTitle: '查询和操作',

                dialogFormVisible: false,

                value: "",

                searchForm: {
                    name: '',
                },
                currentPage: 1,
                showCount: 10,
                totalResult: 10,
                // flag, the function is same to searchBusi model
                flag: 0,

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

                formData: {
                    detail_descript: '',
                },

                curBusiInfo: {
                    bid: "",
                },

                tableData: [],
                drawer: false,
            };
        },

        methods: {
            async getTotalResult(){
                const { data: res } = await this.$http.get("/api/manageSearchTotal");
                this.totalResult = res;
                console.log("--------------------------" + this.totalResult);
            },

            async exitLogin(){
                console.log("exit login");

                const { data: res } = await this.$http.post("/api/exit");

                if(res == "success"){
                    sessionStorage.removeItem("uid");
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
            },

            async getTableInfo() {
                this.tableData = [];

                console.log("enter getInfo");

                const { data: res } = await this.$http.get("/api/manageSearchAll?begin=" + (this.currentPage - 1) * this.showCount + "&num=" + this.showCount);
                this.getTotalResult();

                console.log(res);

                for (var i = 0; i < res.length; i++) {
                    console.log(res[i]);

                    res[i]['index'] = i + 1;
                    this.tableData.push(res[i]);
                }
            },

            async handleCurrentChange(val){
                console.log("handle current table page change");

                this.tableData = [];

                this.currentPage = val;

                if(this.flag == 1){
                    this.onSearchInfoByKey();
                    return;
                }

                const { data: res } = await this.$http.get("/api/manageSearchAll?begin=" + (this.currentPage - 1) * this.showCount + "&num=" + this.showCount);

                console.log(res);

                for (var i = 0; i < res.length; i++) {
                    console.log(res[i]);

                    res[i]['index'] = i + 1;
                    this.tableData.push(res[i]);
                }
            },

            async handleSizeChange(val){
                this.showCount = val;
                this.currentPage = 1;
                
                if(this.flag == 1){
                    this.onSearchInfoByKey();
                    return;
                }

                this.getTableInfo();
            },

            async onShowDetailInfo(row) {
                console.log("enter right side drawer");

                console.log(row);

                var row_bid = row["bid"];
                console.log(row_bid);

                const { data: res } = await this.$http.get("/api/busiDetail?bid=" + row_bid);

                console.log(res);

                this.btype = res["btype"];
                this.binfo = res["binfo"];

                console.log(this.btype);
                console.log(this.binfo);

                this.drawer = true;
            },

            onModifyCancel() {
                this.value = "";
                this.formData = "";
                this.dialogFormVisible = false;
            },

            async onModifyWrap(row) {
                this.curBusiInfo.bid = row["bid"];
                this.dialogFormVisible = true;
            },

            async onModifyBusiInfo() {
                console.log("enter modifyBusiInfo");

                var row_bid = this.curBusiInfo.bid;
                console.log(row_bid);

                const { data: res } = await this.$http.post("/api/manageUpd", { "bid": row_bid, "btype": this.value, "binfo": this.formData.detail_descript });

                console.log(res);

                if (res == "success") {
                    this.$message({
                        showClose: true,
                        message: "修改成功",
                        type: "success",
                    });
                    this.dialogFormVisible = false;
                }
                else {
                    this.$message({
                        showClose: false,
                        message: "修改失败",
                        type: "error",
                    });
                }
            },

            async onDeleteBusiInfoWrap(row) {
                this.$confirm('此操作将永久删除该业务, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post("/api/manageDel", { "bid": row["bid"] }).then(function (res) {
                        console.log(res);
                        if (res["data"] == "success") {
                            this.$message({
                                showClose: true,
                                message: "删除成功",
                                type: "success",
                            });
                        }
                        else {
                            this.$message({
                                showClose: false,
                                message: "删除失败",
                                type: "error",
                            });
                        }
                    }, function (res) {
                        this.$message({
                            showClose: false,
                            message: "删除失败",
                            type: "error",
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            async searchTotalKeyNum(){
                const {data : res} = await this.$http.get("/api/manageSearchTotalKeyNum?key=" + this.searchForm.name);
                this.totalResult = res;                  
            },

            async onSearchInfoByKey() {
                this.flag = 1;
                this.tableData = [];

                if(this.searchForm.name == ""){
                    this.flag = 0;
                    this.getTableInfo();
                    return;
                }

                const { data: res } = await this.$http.get("/api/manageSearchByKey?key=" + this.searchForm.name);
                this.searchTotalKeyNum();

                console.log(res);

                for (var i = 0; i < res.length; i++) {
                    console.log(res[i]);

                    res[i]['index'] = i + 1;
                    this.tableData.push(res[i]);
                }
            },
        }
    };
</script>