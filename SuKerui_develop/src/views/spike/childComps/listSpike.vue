<template>
    <!-- 活动列表 -->
    <div class="listSpike">
        <el-table :data="tableData" :header-cell-style="headStyle" :cell-style="rowStyle" border style="width: 100%;">
            <el-table-column type="index" label="id" width="100"></el-table-column>
            <el-table-column prop="spu_id" label="秒杀商品编号"></el-table-column>
            <el-table-column prop="active_name" label="活动标题"></el-table-column>
            <el-table-column prop="active" label="活跃状态"></el-table-column>
            <el-table-column prop="star_time" label="开始时间" width="200"></el-table-column>
            <el-table-column prop="end_time" label="结束时间" width="200"></el-table-column>
            <el-table-column prop="operation" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button @click="lookSpike(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="editSpike(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleSpike(scope.row)" type="text" size="small">移除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 查看 弹出对话 -->
        <el-dialog title="查看" :visible.sync="lookTableVisible">
            <el-table :data="lookTableData" :header-cell-style="headStyle" :cell-style="rowStyle" border
                style="width: 100%;">
                <el-table-column prop="id" label="id"></el-table-column>
                <el-table-column prop="spu_id" label="秒杀商品编号"></el-table-column>
                <el-table-column prop="active_name" label="活动标题"></el-table-column>
                <el-table-column prop="star_time" label="开始使用时间"></el-table-column>
                <el-table-column prop="end_time" label="结束使用时间"></el-table-column>
            </el-table>
        </el-dialog>
        <!-- 编辑 -->
        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="id" v-if="false" :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.active_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动的商品id" :label-width="formLabelWidth">
                    <el-input v-model="form.spu_id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动开始时间" :label-width="formLabelWidth">
                    <div class="block">
                        <el-date-picker value-format="timestamp" v-model="form.star_time" type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="活动结束时间" :label-width="formLabelWidth">
                    <div class="block">
                        <el-date-picker value-format="timestamp" v-model="form.end_time" type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendEdit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getspike, delspike, updatespike, slectSpike } from "@/api/spike";
export default {
    name: 'ListSpike',
    data() {
        return {
            tableData: [{
                id: '',
                spu_id: '', // 编号
                active_name: '', // 活动标题
                active: '', // 活跃状态
                star_time: '', // 开始
                end_time: '', // 结束
                operation: '', // 操作
            }],
            // 编辑
            dialogFormVisible: false,
            form: {
                id: '',//id
                active_name: '', // 活动名称
                spu_id: '', // 活动id
                star_time: '', // 开始
                end_time: '', // 结束
            },
            formLabelWidth: '120px',
            // 查看
            lookTableVisible: false,
            lookTableData: [{
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
        getTime(str) { //日期转时间戳
            let time = new Date(str)
            return time.getTime()
        },
        lookSpike(row) { //查看
            this.lookTableVisible = true,
                // console.log({ ...row });
                this.lookTableData[0] = { ...row }
        },
        editSpike(row) { //编辑
            let star_time = this.getTime(row.star_time)
            let end_time = this.getTime(row.end_time)
            this.form.star_time = star_time, // 开始
                this.form.end_time = end_time, // 结束
                this.form.spu_id = row.spu_id, // 
                this.form.active_name = row.active_name, // 名称
                this.form.id = row.id, // 名称
                this.dialogFormVisible = true //展示
        },
        sendEdit() {//确定编辑
            updatespike({ ...this.form }).then(data => {
                if (data.code == 200) {
                    this.dialogFormVisible = false;
                    this.getspike() //渲染
                    // 提示成功 
                    this.$message({
                        type: 'success',
                        message: '编辑成功!'
                    });
                }
            })
        },
        deleSpike(itme) { //移除
            this.$confirm('此操作将永久删除该优惠券, 是否继续?', '提示', { //是否删除商品
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 发送删除请求
                delspike({ id: itme.id }).then(data => {
                    if (data.code = 200) {
                        // 提示成功 
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        // 获取列表
                        this.getspike()
                    } else {
                        console.log("请求错误");
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        getspike() { //获取秒杀
            getspike({ id: 2 }).then(data => {
                if (data.code = 200) {
                    this.tableData = data.res
                } else {
                    console.log("请求错误");
                }
            })
        }
    },
    created() {
        this.getspike()
    },
    mounted() {
        this.$bus.$on('addNewTable', (data) => {
            this.tableData.push(data)
        })
    },
    // 销毁对应自定义事件
    beforeDestroy() {
        this.$bus.$off('addNewTable')
    }
}
</script>

<style lang="scss" scoped>
</style>