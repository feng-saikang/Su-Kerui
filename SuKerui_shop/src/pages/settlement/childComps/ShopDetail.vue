<template>
  <div class="shopDetail">
    <div class="title">商品明细（共{{ totalCount }}件）</div>
    <div class="orderList">
      <ul>
        <li v-for="(item,index) in shopDetailList" :key="index">
          <div class="imgSrc">
            <img :src="item.img" alt="商品图片" />
          </div>
          <div class="size">
            <p class="ShopName">{{item.title}}</p>
            <p class="sizeInfo">颜色：，尺码： </p>
            <p class="shopNum">数量：{{item.num}}</p>
          </div>
          <div class="price">
            <p class="newPrice">￥{{item.special_price}}</p>
            <p class="oldPrice">￥{{item.price}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { getShopCar } from '../../../api/shopCar/index.js'
export default {
  name: "ShopDetail",
  props:{

  },
  data() {
    return {
      totalCount: 0, //商品共有多少件
      shopDetailList: [],//购物车数据（选择的）
      price:0,//最初的价格
      special_price:0,//优惠之后的价格
      arr_price: [],//存放最初价格
      arr_special_price: [],//存放现在价格

    };
  },
  created(){
    this.getShopCar()
  },
  methods: {
    getShopCar(index){
      this.shopDetailList = this.$store.state.ChecksList;
      this.totalCount = this.shopDetailList.length;
      console.log(this.shopDetailList[0]);
      // this.price = this.shopDetailList[0].price + this.shopDetailList[1].price;
      // this.special_price = this.shopDetailList[0].special_price;
      // console.log(this.price,this. special_price);
    }
   
  }
};
</script>

<style lang="less" scoped>
.shopDetail {
  width: 100%;
  font-size: 15px;
  .title {
    height: 50px;
    width: 100%;
    padding-left: 20px;
    background-color: #4c4c4c;
    color: #fff;
    margin-top: 5px;
    line-height: 50px;
    text-align: left;
  }
  .orderList {
    width: 100%;
    padding: 20px;
    border: 1px solid #ccc;
    margin-bottom: 10%;
    li {
      height: 120px;
      display: flex;
      margin-bottom: 5px;
      .imgSrc {
        img {
          width: 100px;
          height: 100px;
          margin: 5px 10px;
        }
      }
      .size {
        width: 60%;
        padding: 15px 10px;
        text-align: left;
        p {
          margin-top: 5px;
          margin-bottom: 0;
        }
      }
      .price {
        width: 20%;
        padding: 30px 10px;
        text-align: right;
        .oldPrice {
          text-decoration-line: line-through;
        }
      }
    }
  }
}
</style>