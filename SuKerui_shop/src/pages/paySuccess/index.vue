<template>
  <div class="pay">
    <div class="pay-item">
      <h2>支付成功,还有{{ countDown }}秒即将跳转转首页</h2>
      <el-row>
        <el-col>
          <el-result
            icon="success"
            title="支付成功"
            subTitle="请根据提示进行操作"
          >
            <template slot="extra">
              <el-button size="medium" @click="goOrder" id="backOrder"
                >查看订单</el-button
              >
              <el-button
                type="primary"
                size="medium"
                @click="goHome"
                id="backHome"
                >返回首页</el-button
              >
            </template>
          </el-result>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { updateOrder } from '@/api/Order/index.js'
export default {
  name: "PaySuccess",
  data() {
    return {
      timers: null,
      countDown: null,
    };
  },
  methods: {
    // 查看订单
    goOrder() {
      clearInterval(this.timers);
    },
    // 回首页
    goHome() {
      clearInterval(this.timers);
      this.$router.push("/home");
    },
    // 倒计时
    count() {
      const count = 5;
      this.countDown = count;
      this.timers = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--;
        } else {
          clearInterval(this.timers);
          this.$router.push("/home");
        }
      }, 1000);
    },
  },
  created() {
    // this.count();
    let orderIds = JSON.parse(localStorage.getItem("idLocal"));
    orderIds.forEach((element) => {
      console.log(element);
      updateOrder({
        id: element,
        status: 1,
      }).then((res) => {
        if (res.code == 200) {
          localStorage.removeItem("idLocal");
        }
      });
    });
  },
};
</script>

<style lang="less" scoped>
.pay {
  width: 100%;
  .pay-item {
    width: 900px;
    margin: 50px auto;
    #backHome {
      background-color: black;
      color: white;
      height: 50px;
      width: 150px;
      font-size: 20px;
    }
    #backOrder {
      height: 50px;
      width: 150px;
      font-size: 20px;
      margin-right: 20px;
    }
  }
}
</style>