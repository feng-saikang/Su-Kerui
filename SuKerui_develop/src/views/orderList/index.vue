 <template>
  <div class="order">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <el-table :data="orderList" :border="true">
      <el-table-column label="编号" prop="id" align="center"></el-table-column>
      <el-table-column
        label="订单编号"
        align="center"
        prop="code"
      ></el-table-column>

      <el-table-column
        label="提交时间"
        align="center"
        prop="create_time"
      ></el-table-column>
   

      <el-table-column
        label="订单金额"
        align="center"
        prop="money"
      ></el-table-column>

      <el-table-column label="支付方式" align="center" prop="payment_type">
        <template slot-scope="scope">
          <span v-show="scope.row.payment_type == 1">微信</span>
          <span v-show="scope.row.payment_type == 2">支付宝</span>
          <span v-show="scope.row.payment_type == 0">暂无</span>
        </template></el-table-column
      >

      <el-table-column label="订单状态" align="center" prop="status">
        <template slot-scope="scope">
          <span v-show="scope.row.status == 0">待支付</span>
          <span v-show="scope.row.status == 1">待发货</span>
          <span v-show="scope.row.status == 2">已发货</span>
          <span v-show="scope.row.status == 3">已完成</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="120px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleViewOrder(scope.row)"
            >查看订单</el-button
          >
          <el-button
            size="mini"
            v-show="scope.row.status == 1"
            @click="handleDeliverOrder(scope.row)"
            >订单发货</el-button
          >
          <el-button size="mini" v-show="scope.row.status == 2"
            >订单跟踪</el-button
          >
          <el-button
            size="mini"
            v-show="scope.row.status == 3"
            type="danger"
            @click="handleDeleteOrder(scope.row)"
            >删除订单</el-button
          >
        </template></el-table-column
      >
    </el-table>
  </div>
</template>

  <script>
import { getOrder, deleteOrder } from "@/api/order";
import basePagination from "@/components/basePagination";
export default {
  components: {
    basePagination,
  },
  data() {
    return {
      order: { id: 1, currentPage: 1, pageSize: 20 },
      orderList: [],
    };
  },
  created() {
    getOrder({
      store_id: this.order.id,
      page: this.order.currentPage,
      count: this.order.pageSize,
    }).then((data) => {
      // console.log(data);
      console.log(data.data);
      console.log(data.data[0]);
      this.orderList = data.data[0];
      console.log(this.orderList[0].create_time);
    });
  },
  methods: {
    handleViewOrder(row) {
      this.$router.push({
        name: "orderDetail",
        params: {
          order_id: row.id,
          status: row.status,
          payment_type: row.payment_type,
        },
      });
      // console.log(111);
      // console.log(row);
    },
    handleDeliverOrder(row) {
      this.$router.push({
        name: "deliverOrderList",
        params: { order_id: row.id },
      });
    },
    handleDeleteOrder(row) {
      this.$confirm("此操作将永久删除该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(12333, row);
          deleteOrder({ id: row.id }).then((res) => {
            console.log(134684896, res);
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              getOrder({
                store_id: this.order.id,
                page: this.order.currentPage,
                count: this.order.pageSize,
              }).then((data) => {
                this.orderList = data.data[0];
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style scoped>
.operate-container {
  margin: 20px 0;
}

.base-pagination {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
}
</style>