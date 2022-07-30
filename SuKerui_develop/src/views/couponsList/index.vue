<template>
  <div id="marketCoupon">
    <!-- 搜索栏 -->
    <searchCoupon></searchCoupon>
    <!-- 数据列表 -->
    <el-card shadow="never" class="card">
      <i class="el-icon-document"></i>
      <span>数据列表</span>
      <el-button size="mini" @click="addCou" style="float: right"
        >添加</el-button
      >
    </el-card>
    <!-- 列表 -->
    <div>
      <el-table
        :data="tableData"
        :header-cell-style="headStyle"
        :cell-style="rowStyle"
        border
        style="width: 100%"
      >
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="deno" label="优惠券面额"></el-table-column>
        <el-table-column
          prop="condition"
          label="优惠券满足条件"
        ></el-table-column>
        <el-table-column
          prop="start_time"
          label="开始使用时间"
        ></el-table-column>
        <el-table-column prop="end_time" label="结束使用时间"></el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <el-button @click="lookCoupons(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button @click="editCoupons(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button @click="deleCoupons(scope.row)" type="text" size="small"
              >移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 查看 弹出对话 -->
    <el-dialog title="查看" :visible.sync="lookTableVisible">
      <el-table
        :data="lookTableData"
        :header-cell-style="headStyle"
        :cell-style="rowStyle"
        border
        style="width: 100%"
      >
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="deno" label="优惠券面额"></el-table-column>
        <el-table-column
          prop="condition"
          label="优惠券满足条件"
        ></el-table-column>
        <el-table-column
          prop="start_time"
          label="开始使用时间"
        ></el-table-column>
        <el-table-column prop="end_time" label="结束使用时间"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="优惠券名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用条件" :label-width="formLabelWidth">
          <el-input v-model="form.condition" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="优惠券面额" :label-width="formLabelWidth">
          <el-input v-model="form.deno" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="false" label="编号" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开始使用时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              value-format="timestamp"
              v-model="form.start_time"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="结束使用时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              value-format="timestamp"
              v-model="form.end_time"
              type="datetime"
              placeholder="选择日期时间"
            >
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
import {
  getVoucher,
  deleteVoucher,
  seeVoucheer,
  editVoucheer,
} from "@/api/voucher"
import searchCoupon from "./components/searchCoupon.vue"
export default {
  name: "CouponsList",
  components: {
    searchCoupon,
  },
  data() {
    return {
      // searchName: '', // 搜索
      tableData: [
        {
          id: "", // 编号
          name: "", // 名称
          deno: "", // 面额
          condition: "", // 条件
          start_time: "", // 开始
          end_time: "", // 结束
          operation: "", // 操作
        },
      ],
      // 添加
      dialogFormVisible: false,
      form: {
        id: "", // 编号
        name: "", // 名称
        deno: "", // 面额
        condition: "", // 条件
        start_time: "", // 开始
        end_time: "", // 结束
        operation: "", // 操作
      },
      formLabelWidth: "120px",
      // 查看
      lookTableVisible: false,
      lookTableData: [
        {
          name: "", // 名称
          deno: "", // 面额
          condition: "", // 条件
          start_time: "", // 开始
          end_time: "", // 结束
          operation: "", // 操作
        },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date())
            },
          },
        ],
      },
      value1: "",
      value2: "",
    }
  },
  methods: {
    addCou() {
      this.$router.push("/marketing/addCoupon")
    },
    headStyle() {
      //表头居中
      return "text-align:center"
    },
    rowStyle() {
      //内容居中
      return "text-align:center"
    },
    lookCoupons(row) {
      //查看
      this.lookTableVisible = true
      seeVoucheer({ id: row.id }).then((data) => {
        if ((data.code = 200)) {
          this.lookTableData = data.res
        } else {
          this.$message({
            message: "查看失败",
            type: "warning",
          })
        }
      })
    },
    editCoupons(row) {
      //编辑
      let start_time = this.getTime(row.start_time)
      let end_time = this.getTime(row.end_time)
      ;(this.form.start_time = start_time), // 开始
        (this.form.end_time = end_time), // 结束
        (this.form.deno = row.deno), // 面额
        (this.form.condition = row.condition), // 条件
        (this.form.name = row.name), // 名称
        (this.form.id = row.id), // 名称
        (this.dialogFormVisible = true)
    },
    sendEdit() {
      //编辑确定发送
      var itme = {
        id: this.form.id, // 编号
        start_time: this.form.start_time, // 开始
        end_time: this.form.end_time, // 结束
        deno: this.form.deno, // 面额
        condition: this.form.condition, // 条件
        name: this.form.name, // 名称
      }
      editVoucheer(itme).then((data) => {
        this.dialogFormVisible = false
        this.getVoucher() //渲染
      })
    },
    deleCoupons(itme) {
      //移除
      // console.log(itme.id);
      this.$confirm("此操作将永久删除该优惠券, 是否继续?", "提示", {
        //是否删除商品
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送删除请求
          deleteVoucher({ id: itme.id }).then((data) => {
            // 提示成功
            this.$message({
              type: "success",
              message: "删除成功!",
            })
            // 获取列表
            this.getVoucher()
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          })
        })
    },
    getTime(str) {
      //日期转时间戳
      let time = new Date(str)
      return time.getTime()
    },
    /* open() { //添加
      this.$confirm('是否保存该添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消保存'
        });
      });
    }, */
    getVoucher() {
      //渲染数据
      getVoucher({ store_id: 1 }).then((data) => {
        this.tableData = data.data
        // console.log(new Date().getTime());
      })
    },
  },
  created() {
    this.getVoucher() //渲染
  },
}
</script>

<style lang="scss" scoped>
#marketCoupon {
  padding: 0 20px;
}

.card {
  margin: 20px 0;
  border: 1px solid #ebeef5;

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
