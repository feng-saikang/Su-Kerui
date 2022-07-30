<template>
    <!-- 搜索栏 -->
    <div class="seekSpike">
        <el-card shadow="never" style="" class="card">
            <i class="el-icon-search"></i>
            <span>筛选搜索</span>
            <el-button type="primary" size="small" @click="seekSpike" style="float: right;">查询搜索</el-button>

            <el-form size="small" label-width="140px">
                <el-form-item label="活动名称:">
                    <el-input v-model="activityName" placeholder="活动名称" @keyup.enter.native="seekSpike"
                        style="width: 200px;"></el-input>
                </el-form-item>
            </el-form>

            <!-- 搜索 弹出对话 -->
            <el-dialog title="查询结果" :visible.sync="seekTableVisible">
                <el-table :data="seekTableData" :header-cell-style="headStyle" :cell-style="rowStyle" border
                    style="width: 100%;">
                    <el-table-column prop="id" label="id"></el-table-column>
                    <el-table-column prop="spu_id" label="秒杀商品编号"></el-table-column>
                    <el-table-column prop="active_name" label="活动标题"></el-table-column>
                    <el-table-column prop="star_time" label="开始使用时间"></el-table-column>
                    <el-table-column prop="end_time" label="结束使用时间"></el-table-column>
                </el-table>
            </el-dialog>

        </el-card>
    </div>
</template>

<script>
import { slectSpike } from "@/api/spike";
export default {
    name: 'SeekSpike',
    data() {
        return {
            activityName: '', // 搜索
            // 查看
            seekTableVisible: false,
            seekTableData: [{
                id: '',//id
                active_name: '', // 活动名称
                spu_id: '', // 活动id
                star_time: '', // 开始
                end_time: '', // 结束
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
        seekSpike() { //搜索
            if (this.activityName) {
                slectSpike({ active_name: this.activityName }).then(data => {
                    if (data.code !== 200) return this.$message.error('未查询到，您是否输入正确')
                    this.seekTableVisible = true
                    this.seekTableData = data.res
                })
            } else {
                this.$message({
                    message: '内容不能为空，',
                    type: 'warning'
                });
            }
        },

    }
}
</script>

<style lang="scss" scoped>
.card {
    margin: 20px 20px;
    border: 1px solid #EBEEF5;

    span {
        margin: 0 10px;
    }

    .el-form {
        margin: 15px 0;

    }
}
</style>