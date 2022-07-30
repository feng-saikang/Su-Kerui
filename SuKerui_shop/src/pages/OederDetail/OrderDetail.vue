<template>
  <div class="oeder-detail">
    <order-progress :orderDetailList="orderDetailList" />
  </div>
</template>

<script>
import OrderProgress from "./childComponent/OrderProgress.vue";
import { getOrderDetail } from "@/api/Order/index.js";
export default {
  name: "OederDetail",
  components: { OrderProgress },
  data() {
    return {
      orderDetailList: {},
    };
  },
  methods: {
    getOrderDetail() {
      let orderDetail = this.$store.state.orderDetail;
      getOrderDetail(orderDetail).then((data) => {
        if (data.code === 200) {
          this.orderDetailList = data.data;
        }
      });
    },
  },
  created() {
    this.getOrderDetail();
  },
};
</script>

<style lang='less' scoped>
.oeder-detail {
  width: 100%;
}
</style>