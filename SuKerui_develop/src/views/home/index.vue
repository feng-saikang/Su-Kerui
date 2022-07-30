<template>
  <div class="home">
    <div class="content">
      <div class="OrderTotal">
        <div class="todayTotal">
          <img :src="images.img_home_order" alt="" />
          <p>今日订单总数</p>
          <p class="num">5000</p>
        </div>
        <div class="todayTotalSales">
          <img :src="images.img_home_today_amount" alt="" />
          <p>今日销售总额</p>
          <p class="totalPrice">¥ 6850000.00</p>
        </div>
        <div class="yestodayTotalSales">
          <img :src="images.shopNum" alt="" />
          <p>昨日销售总额</p>
          <p class="totalPrice">¥ 500000.00</p>
        </div>
        <div class="products">
          <img :src="images.img_home_yesterday_amount" alt="" />
          <p>全部商品</p>
          <p class="shopTotal">255748</p>
        </div>
      </div>
      <div class="orderstati">
        <div class="title">订单统计</div>
        <el-row type="flex" justify="space-around">
          <el-col :span="4">
            <div class="month_order">
              <p class="title">本月订单总数</p>
              <p class="num">1564</p>
              <p class="com"><span>3%</span><span>同比上月</span></p>
            </div>
            <div class="week_order">
              <p class="title">本周订单总数</p>
              <p class="num">78</p>
              <p class="com"><span>5%</span><span>同比上周</span></p>
            </div>
            <div class="month_sell">
              <p class="title">本月销售总额</p>
              <p class="num">4554165</p>
              <p class="com"><span>5%</span><span>同比上月</span></p>
            </div>
            <div class="week_sell">
              <p class="title">本月销售总数</p>
              <p class="num">2656</p>
              <p class="com"><span>2%</span><span>同比上周</span></p>
            </div>
          </el-col>
          <el-col :span="20">
            <div style="padding: 20px">
              <el-date-picker
                v-model="value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                change="change"
                value="value"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </div>
            <div
              class="charts"
              ref="charts"
              id="charts"
              style="width: 100%; height: 400px"
            >
              <ve-line
                :data="charDara"
                width="100%"
                :legend-visible="false"
                :settings="chartSettings"
                :loading="loading"
                :data-empty="dataEmpty"
              ></ve-line>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import img_home_order from "@/assets/images/home_order.png";
import img_home_today_amount from "@/assets/images/home_today_amount.png";
import shopNum from "@/assets/images/shopNum.png";
import img_home_yesterday_amount from "@/assets/images/home_yesterday_amount.png";
export default {
  name: "Home",
  data() {
    return {
      images: {
        img_home_order,
        img_home_today_amount,
        shopNum,
        img_home_yesterday_amount,
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              start.setFullYear(2018);
              start.setMonth(10);
              start.setDate(1);
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一月",
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              start.setFullYear(2022);
              start.setMonth(7);
              start.setDate(1);
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 29);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      chartSettings: {
        // xAxisType: "time",
        area: true,
        axisSite: { right: ["orderAmount"] },
        labelMap: { orderCount: "订单数量", orderAmount: "订单金额" },
      },
      value1: [new Date(2022, 6, 10, 10, 10), new Date(2022, 6, 17, 10, 10)],
      value: "",
      charDara: {
        columns: ["date", "orderCount", "orderAmount"],
        rows: [],
      },
      loading: false,
      dataEmpty: false,
    };
  },
  methods: {
    chartEvents() {},
    getOrderData(value1) {
      let start = value1[0].getDate();
      let end = value1[1].getDate();
      let month = value1[0].getMonth() + 1;
      let data = this.randerData(start, end, month);
      return data;
    },
    randerData(start, end, month) {
      let res = [];
      for (let i = 0; i < 31; i++) {
        // 生成随机订单数
        let orderNum = parseInt(Math.random() * 101 + 800);
        // 生成随机订单金额
        let orderAmount = ((Math.random() * 101 + 200) * orderNum).toFixed(2);
        res.push({
          date: `${i}/${month}`,
          orderCount: orderNum,
          orderAmount: orderAmount,
        });
      }
      if (start > end) {
        res = res.slice(start);
      } else {
        res = res.slice(start, end + 1);
      }
      return res;
    },
  },
  created() {
    // this.getOrderData(this.value1);
  },
  mounted() {
    this.charDara.rows = this.getOrderData(this.value1);
  },
  watch: {
    value1(val) {
      this.charDara.rows = this.getOrderData(val);
    },
  },
};
</script>

<style lang = 'scss' scoped>
.home {
  width: 100%;
  .content {
    width: 80%;
    margin: 0 auto;
    padding: 60px 20px;
    .OrderTotal {
      margin: 30px 0px;
      display: flex;
      justify-content: space-between;
      div {
        width: calc(100% / 4 - 12px);
        padding: 10px 10px;
        border: 1px solid #ccc;
        img {
          width: 60px;
          float: left;
        }
        p {
          padding-left: 75px;
          color: #444;
        }
      }
    }
    .orderstati {
      border: 1px solid #ccc;
      & > .title {
        width: 100%;
        padding: 10px 15px;
        background: #f2f6fc;
        color: #444;
        font-weight: 600;
      }
      .el-col {
        border-left: 1px solid #ccc;
      }
      .month_order,
      .week_order,
      .month_sell,
      .week_sell {
        padding: 20px 20px;
        .title {
          font-size: 14px;
          color: rgb(144, 147, 153);
        }
        .num {
          color: rgb(96, 98, 102);
          font-size: 24px;
          padding: 10px 0px;
        }
        .com {
          color: rgb(192, 196, 204);
          font-size: 14px;
          span:nth-child(1) {
            color: #67c23a;
          }
        }
      }
    }
  }
}
</style>



