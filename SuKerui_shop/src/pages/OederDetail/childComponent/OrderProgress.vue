<template>
  <div class="order-progress">
    <div class="order">
      <div class="title">
        <div class="order-num">订单号:{{ orderDetailList.code }}</div>
        <div class="order-date">2022-06-29 21:43</div>
      </div>
      <div class="content">
        <div class="con">
          <div class="steps">
            <a-steps :current="orderDetailList.status">
              <a-step title="待支付" />
              <a-step title="代发货" />
              <a-step title="等待收获" />
              <a-step title="已完成" />
            </a-steps>
          </div>
          <div class="operation">
            <el-button v-if="orderDetailList.status == 0" size="mini" type="danger" @click="nowPay"
              >立即支付</el-button>
              <el-button v-else-if="orderDetailList.status == 1" size="mini" type="danger" @click="nowPay"
              >申请退货</el-button>
            <span @click="delOrder()">取消订单</span>
          </div>
        </div>
      </div>
    </div>
    <div class="shop">
      <div class="title">商品清单</div>
      <div class="content">
        <div
          class="item"
          v-for="(item, index) in orderDetailList.skus"
          :key="index"
        >
          <div style="width: 10%">
            <img :src="JSON.parse(item.imgs)[0].small" alt="" />
          </div>
          <div style="width: 60%">
            <p>{{ item.title }}</p>
            <span>颜色: {{ JSON.parse(item.param)[0] }}</span
            ><br />
            <span>数量: {{ item.num }}</span>
          </div>
          <div style="width: 30%">
            <p>¥ {{ item.actual_price }}</p>
            <span class="price">¥ {{ item.price }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="address">
      <div class="content">
        <div>
          <li class="msg">收货人信息</li>
          <li>姓名：{{ orderDetailList.name }}</li>
          <li>电话：{{ orderDetailList.tel }}</li>
          <li>地址：{{ orderDetailList.address }}</li>
        </div>
        <div>
          <li class="msg">配送信息</li>
          <li>配送方式：京东送货平上门</li>
          <li>运单号：{{ orderDetailList.code }}</li>
          <li>运费：10 ￥</li>
        </div>
        <div>
          <li class="msg">付款信息</li>
          <li>商品数量：{{ total }}</li>
          <li>商品总额：{{ totalPrice }} ￥</li>
          <li>应付金额：{{ payment }} ￥</li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deteleOrder } from "@/api/Order/index";
export default {
  name: "OrderProgress",
  props: {
    orderDetailList: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    delOrder() {
      this.$confirm("此操作将永久删除该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          let id = this.$store.state.orderDetail.order_id;
          console.log(id);
          deteleOrder(id).then((data) => {
            if (data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.$router.push("/perscenter");
            } else if (data.code == 401 || data.code === 501) {
              this.$message({
                type: "danger",
                message: "删除失败!",
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
    nowPay() {
      this.$store.dispatch("setcheckslist", this.orderDetailList.skus);
      this.$router.push("/settlement");
    },
  },
  computed: {
    total() {
      let total = 0;
      if (this.orderDetailList.skus) {
        this.orderDetailList.skus.forEach((item) => {
          total += item.num;
        });
      }

      return total;
    },
    totalPrice() {
      let totalPrice = 0;
      if (this.orderDetailList.skus) {
        this.orderDetailList.skus.forEach((item) => {
          totalPrice += item.num * item.price;
        });
      }
      return totalPrice;
    },
    payment() {
      let payment = 0;
      if (this.orderDetailList.skus) {
        this.orderDetailList.skus.forEach((item) => {
          payment += item.num * item.actual_price;
        });
      }
      return payment;
    },
  },
};
</script>

<style lang='less' scoped>
.order-progress {
  width: 80%;
  margin: 0 auto;
  padding: 30px 0px 50px;
  .title {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    padding: 15px 10px;
    background: #ccc;
    border-bottom: #333;
  }
  .content {
    padding: 50px 10px;
    border: 1px solid #ccc;
    .con {
      display: flex;
      justify-content: space-between;
    }
    .steps {
      text-align: left;
      width: 80%;
    }
    .operation {
      padding: 0px 15px;
      width: 20%;
      span {
        padding: 5px;
        color: #1890ff;
      }
      // border-left: 1px solid #ccc;
    }
    .item {
      width: 100%;
      display: flex;
      text-align: left;
      justify-content: space-around;
      .price {
        text-decoration-line: line-through;
      }
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
  .address {
    margin: 20px 0px;
    .content {
      padding: 30px;
      text-align: left;
      border: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
    }
    .address {
      width: 100%;
      font-size: 15px;

      .title {
        margin-top: 4px;
        padding: 0 20px;
        height: 50px;
        font-size: 16px;
        line-height: 50px;
        background-color: #f5f5f5;
        display: flex;
        justify-content: space-between;
      }

      .orderList {
        width: 100%;
        padding: 20px;
        border: 1px solid #cccccc;
      }
    }
  }
}
</style>