<template>
  <div class="apply">
    <div class="table-container">
      <el-table :data="backStockList" style="width: 100%" border>
        <el-table-column label="服务单号" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="申请时间" align="center">
          <template slot-scope="scope">{{
            scope.row.create_time | formatTime
          }}</template>
        </el-table-column>
        <el-table-column label="退款金额" align="center">
          <template slot-scope="scope">￥{{ scope.row.money }}</template>
        </el-table-column>
        <el-table-column label="申请状态" align="center">
          <template slot-scope="scope">{{
            scope.row.status | formatStatus
          }}</template>
        </el-table-column>
        <el-table-column label="处理时间" align="center">
          <template slot-scope="scope">{{
            scope.row.update_time | formatTime
          }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleViewDetail(scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getBackStock } from "@/api/order";
import { formatDate } from "@/utils/data.js";
export default {
  data() {
    return {
      order: { id: 1, currentPage: 1, pageSize: 20 },
      backStockList: [],
    };
  },
  methods: {
    handleViewDetail(row) {
      this.$router.push({
        name: "returnApplyDetail",
        params: { id: row.id, order_id: row.order_id },
      });
    },
  },
  created() {
    console.log(this.order.id);
    getBackStock({ store_id: this.order.id }).then((data) => {
      console.log(data);
      this.backStockList=data.data
    });
    /*  getBackStock({ store_id: this.order.id }).then((data) => {
      console.log(data);
    }); */
  },
  filters: {
    formatTime(time) {
      if (time == null || time === "") {
        return "";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatStatus(value) {
      if (value == 1) {
        return "待处理";
      } else if (value == 2) {
        return "处理中";
      } else if (value == 3) {
        return "已完成";
      }
    },
  },
};
</script>

<style scoped>
.table-container {
  margin-top: 20px;
}
</style>
