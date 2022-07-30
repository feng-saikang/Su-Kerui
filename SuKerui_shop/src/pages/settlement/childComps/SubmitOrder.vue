<template>
  <div class="submitOrder">
    <div class="order">
      <h1>请选择支付方式</h1>
      <div class="payImg">
        <!-- <div class="weCart" style="width:180px;height:120px"> -->
        <img
          src="../../../assets/images/order/wecart.jpeg"
          alt="微信支付"
          style="width: 50%; height: 120px"
        />
        <!-- </div>     -->
        <!-- <div class="alipay" style="width:180px;height:120px"> -->
        <img
          src="../../../assets/images/order/alipay.jpeg"
          alt="支付宝支付"
          style="width: 50%; height: 120px; border: 2px solid #999"
        />
        <!-- </div> -->
      </div>
    </div>
    <ul>
      <li class="title">商品小计</li>
      <li>
        <span>商品总价：</span> <span>￥{{ totalPrice }}</span>
      </li>
      <li>
        <span>优惠：</span> <span>￥{{ differencePrice }}</span>
      </li>
      <li><span>其他：</span><span>+￥0</span></li>
      <li class="pay">
        <div>
          <div>总计</div>
          <div class="payPrice">￥{{ nowPrice }}</div>
        </div>
        <div>
          <el-button type="danger" @click="submitOrder">提交订单</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getPayOrder, addOrder } from "@/api/Order/index.js";
import { deleteShopCar } from '@/api/shopCar/index.js'
export default {
  name: "SubmitOrder",
  data() {
    return {
      // totalPrice:0,//原价
      // nowPrice:0,//现价
      // differencePrice:0,//差值
      orderDetail: [], //订单商品
    };
  },
  created() {
    this.getTotal();
  },
  methods: {
    getTotal(str) {
      this.orderDetail = this.$store.state.ChecksList;
      console.log(this.orderDetail);
      if (!this.orderDetail.length) return;
      let res = 0;
      this.orderDetail.forEach((item) => {
        res += (item[str] - 0) * item.num;
      });
      console.log(res);
      return res;
    },
    // 分店铺提交订单
    submitOrder() {
      let store_id_list = [];
      this.orderDetail.forEach((item) => {
        store_id_list.push(item.store_id);
      });
      // 数组去重
      store_id_list = [...new Set(store_id_list)];
      let order = [];
      store_id_list.forEach((el) => {
        let type = {};
        type.store_id = el;
        type.skus = [];
        type.money = 0;
        this.orderDetail.forEach((item) => {
          if (item.store_id == el) {
            let obj = {};
            type.money += item.special_price - 0;
            obj.sku_id = item.sku_id;
            obj.price = item.price;
            obj.actual_price = item.special_price;
            obj.num = item.num;
            type.skus.push(obj);
          }
        });
        order.push(type);
      });
      let idLocal = [];
      order.forEach((item, index) => {
          let customer_id = JSON.parse(this.$store.state.user).id

        let code = customer_id +
          parseInt(Math.random() * 2000 + 500);
          console.log(customer_id);
        addOrder({
          code,
          store_id: item.store_id,
          money: this.totalPrice,
          skus: JSON.stringify(item.skus),
          customer_id : 36,
        }).then((data) => {
          if (data.code == 200) {
            idLocal.push(data.orderId);
            localStorage.setItem("idLocal", JSON.stringify(idLocal));
          }
        });
      });
      getPayOrder({
        outTradeNo:
          JSON.parse(this.$store.state.user).id +
          parseInt(Math.random() * 2000 + 500),
        totalAmount: this.nowPrice,
        subject: "hdsajfhdghju",
        body: `您将完成对${this.orderDetail.title}完成支付，支付金额为${this.nowPrice}元`,
      }).then((data) => {
        if (data.code == 200) {
          this.$message({
            message: "请稍等，正在为您转接支付",
            type: "success",
          });
          this.orderDetail.forEach(item => {
            deleteShopCar(item.id).then(data=>{
              console.log(data);
            })
          })
          setTimeout(() => location.replace(data.data), 1000)
        }
      });
    },
    // 跳转支付页面

    //提交订单
    //  submitOrder(){
    //   let data = {
    //     outTradeNo:JSON.parse(this.$store.state.user).id + parseInt(Math.random()*2000+500),
    //     totalAmount: this.nowPrice,
    //     subject: 'hdsajfhdghju',
    //     body: `您将完成对${this.orderDetail.title}完成支付，支付金额为${this.nowPrice}元`
    //   }
    //   getPayOrder(data).then(data=>{
    //     console.log(data);
    //     if(data.code !== 200){
    //       return this.$message.error('请稍等，正在为您转接支付');
    //     }
    //     window.open(data.data);
    //   })

    //  },
    //  addOrder(outTradeNo){
    //     let store_id = 1
    //     let customer_id = this.$store.state.user.id
    //     let money = this.differencePrice
    //     let code = outTradeNo

    //  }
  },
  computed: {
    totalPrice() {
      return this.getTotal("price");
    },
    nowPrice() {
      return this.getTotal("special_price");
    },
    differencePrice() {
      return this.totalPrice - this.nowPrice;
    },
  },
};
</script>

<style lang="less" scoped>
.submitOrder {
  width: 25vw;
  margin-top: 82px;
  padding: 0 20px;
  .order {
    width: 100%;
    margin: 85px auto;
    .payImg {
      display: flex;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  ul {
    width: 100%;
    border: 1px solid #cccccc;

    li {
      height: 50px;
      line-height: 50px;
      margin: 0 10px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      font-size: 13px;
    }

    .title {
      font-size: 16px;
      margin: 0;
      padding: 0 10px;
      background-color: #f6f6f6;
    }

    .pay {
      border: none;
      height: 100px;

      button {
        width: 140px;
        background-color: #ed4025;
        height: 40px;
        margin-top: 30px;
        border-radius: 0;
      }

      .payPrice {
        line-height: 0;
        font-size: 18px;
        font-weight: bolder;
        margin-top: 10px;
      }
    }
  }
}
</style>