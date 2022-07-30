<template>
    <!-- 搜索栏 -->
    <div class="searchCoupon">
        <el-card shadow="never" style="width: 760px;" class="card">
            <i class="el-icon-search"></i>
            <span>筛选搜索</span>
            <el-row>
                <el-input v-model="searchName" placeholder="优惠劵名称" @keyup.enter.native="search" style="width: 200px;">
                </el-input>
                <el-button type="primary" size="small" @click="search">查询搜索</el-button>
            </el-row>
        </el-card>
        <!-- 弹出对话 -->
        <el-dialog title="搜索结果" :visible.sync="dialogTableVisible">
            <el-table :data="tableData" :header-cell-style="headStyle" :cell-style="rowStyle" border
                style="width: 100%;">
                <el-table-column prop="id" label="编号"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="deno" label="优惠券面额"></el-table-column>
                <el-table-column prop="condition" label="优惠券满足条件"></el-table-column>
                <el-table-column prop="start_time" label="开始使用时间"></el-table-column>
                <el-table-column prop="end_time" label="结束使用时间"></el-table-column>
            </el-table>
        </el-dialog>

    </div>
</template>

<script>
import { selectVoucher } from "@/api/voucher";
export default {
    name: 'searchCoupon',
    data() {
        return {
            searchName: '', // 搜索
            gridData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            },],
            dialogTableVisible: false,
            tableData: [{
                id: '', // 编号
                name: '', // 名称
                deno: '', // 面额
                condition: '', // 条件
                start_time: '', // 开始
                end_time: '', // 结束
                operation: '', // 操作
            }],
        }
    },
    methods: {
        headStyle() {//表头居中
            return "text-align:center"
        },
        rowStyle() {//内容居中
            return "text-align:center"
        },
        search() {
            if (this.searchName) {
                selectVoucher({ name: this.searchName }).then(data => {
                    // console.log(data.code);
                    if (data.code == 200) {
                        this.dialogTableVisible = true
                        this.tableData = data.res
                    } else {
                        this.$message({
                            message: '未查询到，您是否输入正确',
                            type: 'error'
                        });
                    }
                })
            } else {
                this.$message({
                    message: '内容不能为空，',
                    type: 'warning'
                });
            }

        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    margin: 20px 0;
    border: 1px solid #EBEEF5;

    span {
        margin: 0 10px;
    }

    .el-row {
        display: flex;
        justify-content: flex-start;
        margin: 10px 0;

        .el-button {
            margin-left: 20px;
        }
    }
}
</style>