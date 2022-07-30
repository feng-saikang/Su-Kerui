<template>
  <div class="myorder">
    <div class="gohome" @click="goHome">
      <img
        src="https://image.wconcept.co.kr/images/builder/1/4/138/315/PC_mypage_1240x100_1_20210226162046.jpg"
        alt=""
      />
    </div>
    <div class="recent-order">
      <div class="order-title">最近订单</div>

      <el-table :data="orderList" style="width: 100%" @row-click="goclick">
        <el-table-column prop="order_create_time" label="订单日期" width="280">
        </el-table-column>
        <el-table-column prop="code" label="订单号" width="280">
        </el-table-column>
        <el-table-column prop="skus[0].title" label="商品信息" width="280">
        </el-table-column>
        <el-table-column prop="skus.length" label="数量" width="220">
        </el-table-column>
        <el-table-column prop="money" label="商品价格" width="180">
        </el-table-column>
        <el-table-column
          :prop="statusArr['order.status']"
          label="进度"
          width="180"
        >
        </el-table-column>
      </el-table>

      <div style="border-bottom: 1px solid #000"></div>
    </div>
    <div class="recent-order">
      <div class="order-title">
        <div>我的地址</div>
        <div @click="add">
          <svg-icon icon-class="plus-o"></svg-icon>新增收获地址
        </div>
      </div>
      <el-table :data="addressList" style="width: 100%">
        <el-table-column prop="name" label="收货人姓名" width="220">
        </el-table-column>
        <el-table-column prop="address" label="收货人地址" width="280">
        </el-table-column>
        <el-table-column width="180">
          <template  slot-scope="scope">
            <el-tag type="info" v-if="scope.row.prime">默认</el-tag>
            <el-tag @click="setDefault(scope.row.id)" v-else type="success">设为默认地址</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="tel" label="收货人电话" width="240">
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button @click="setAddress(scope.row)" size="mini"
              >修改地址</el-button
            ><el-button
              @click="deleteAddress(scope.row.id)"
              type="danger"
              size="mini"
              round
              >删除地址</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="border-bottom: 1px solid #000"></div>
    </div>
    <div>
      <address-add
        @dialogShow="dialogShow"
        :dialogVisible="dialogVisible"
      ></address-add>
    </div>
    <set-address :address="address" :dialogVisible="setAddShow" />
  </div>
</template>

<script>
import { deleteAddress, setDefault } from "@/api/user/index.js";
import AddressAdd from "@/components/common/AddRess/AddressAdd.vue";
import SetAddress from "./setAddress.vue";
export default {
  name: "MyOrder",
  components: { AddressAdd, SetAddress },
  data() {
    return {
      statusArr: ["待支付", "待发货", "等待收货", "已完成"],
      dialogVisible: false, // 控制新增地址显示隐藏
      setAddShow: false, // 控制修改地址显示隐藏
      address: {
        name: "",
        tel: "",
      }, // 存放当前地址信息
    };
  },
  props: {
    orderList: {
      type: Array,
      default: () => [],
    },
    addressList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    // 回到首页
    goHome() {
      this.$router.push("/home");
    },
    // 添加地址
    add() {
      this.dialogVisible = !this.dialogVisible;
    },
    // 
    dialogShow(val) {
      this.dialogVisible = val;
    },
    // 修改地址
    setAddress(val) {
      this.setAddShow = !this.setAddShow;
      this.address.name = val.name;
      this.address.tel = val.tel;
    },
    // 删除地址
    deleteAddress(id) {
      deleteAddress(id).then((data) => {
        if (data.code === 200) {
          this.$message({
            message: "地址删除成功",
            type: "success",
          });
        }
      });
    },
    // 跳转订单详情页
    goclick(row) {
      let order_id = row.id;
      let sku_id = row.skus[0].id;
      let order_status = row.status;
      this.$store.dispatch("setOrderDetail", {
        order_id,
        sku_id,
        order_status,
      });
      this.$router.push("/orderdetail");
    },
    // 设为默认地址
    setDefault(id) {
      let prime = 1
      setDefault({id, prime}).then(data => {
        if(data.code == 200){
          this.$message({
            message: '修改默认地址成功',
            type: 'success',
          })
        }
      })
    }
  },
  created() {},
  mounted() {},
};
</script>

<style lang='less' scoped>
.myorder {
  width: 100%;
  margin: 0 auto;
  .gohome {
    padding: 100px 0px;
  }
  .recent-order {
    width: 60%;
    margin: 0 auto;
    padding: 0px 0px 100px;
    .order-title {
      width: 100%;
      text-align: left;
      border-bottom: 1px solid #000;
      padding: 10px 20px;
      font-size: 24px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>