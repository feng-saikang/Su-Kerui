<template>
    <!-- 添加数据 -->
    <div class="addSpike">
        <el-card shadow="never" class="card">
            <i class="el-icon-document"></i>
            <span>数据列表</span>
            <el-button size="mini" @click="addActive" style="float: right;">添加活动</el-button>
        </el-card>
        <!-- 添加 -->
        <el-dialog title="添加" :visible.sync="dialogFormVisible">
            <el-form :model="form">
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
import { addspike } from "@/api/spike";
export default {
    name: 'AddSpike',
    data() {
        return {
            // 添加
            dialogFormVisible: false,
            form: {
                active_name: '', // 活动名称
                spu_id: '', // 活动id
                star_time: '', // 开始
                end_time: '', // 结束
            },
            formLabelWidth: '120px',
        }
    },
    methods: {
        addActive() {//添加
            this.dialogFormVisible = true
        },
        sendEdit() {//确定添加
            let star_time = dayjs(this.form.star_time).format('YYYY-MM-DD H:m:s')
            let end_time = dayjs(this.form.end_time).format('YYYY-MM-DD H:m:s')
            let item = {
                active_name: this.form.active_name,
                spu_id: this.form.spu_id,
                star_time,
                end_time
            }
            if (this.form.active_name && this.form.spu_id && this.form.star_time && this.form.end_time) {
                addspike({ ...this.form }).then(data => {
                    if (data.code = 200) {
                        // 提示成功
                        this.$message({
                            type: 'success',
                            message: '保存成功!'
                        });
                        // 展示
                        this.dialogFormVisible = false
                        this.$bus.$emit('addNewTable', item)
                    }

                })
            } else {
                this.$message({
                    message: '内容不能为空，请输入内容',
                    type: 'warning'
                });
            }
        },

    },
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