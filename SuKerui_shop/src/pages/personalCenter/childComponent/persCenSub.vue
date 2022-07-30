<template>
  <div class="sub">
    <div class="sub-title">
      <ul>
        <li v-for="(item, index) in subList" :key="index">{{ item }}</li>
      </ul>
    </div>
    <transition name="el-zoom-in-top">
      <div class="sub-content" v-show="svgShow">
        <ul v-for="(list, index) in subList_list" :key="index">
          <li v-for="(item, index) in list" :key="index">{{ item }}</li>
        </ul>
      </div>
    </transition>
    <div class="sub-fold-top" v-show="!svgShow" @click="svgShow = !svgShow">
      <svg-icon icon-class="bot-tri"></svg-icon>
    </div>
    <div class="sub-fold-bottom" v-show="svgShow" @click="svgShow = !svgShow">
      <svg-icon icon-class="top-tri"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersCenSub",
  data() {
    return {
      subList: [
        "我的❤",
        "订单管理",
        "我的活动",
        "购物团惠",
        "信息管理",
        "查询内容",
      ],
      subList_list: [
        ["我的♡物品", "我的♡品牌", "我的♡风格"],
        ["订购/配送查询", "取消/交换/退货查询", "收到的礼品盒", "签发凭证"],
        ["进货通知", "活动参与明细", "WDNA参与明细"],
        ["会员等级", "优惠券", "W POINT", "预收款", "购物券"],
        [
          "修改会员信息",
          "管理地址簿",
          "W.工资管理",
          "退款账户管理",
          "会员退出",
        ],
        ["商品Q&A", "商品评价", "1:1查询"],
      ],
      svgShow: true,
    };
  },
  methods: {},
};
</script>

<style lang='less' scoped>
.sub {
  width: 100%;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  position: relative;
  .sub-title {
    width: 100%;
    text-align: center;
    background-color: #ccc;
    ul {
      width: 1024px;
      margin: 0 auto;
      display: flex;
      li {
        width: 206px;
        height: 40px;
        line-height: 40px;
      }
    }
  }
  .sub-content {
    width: 1024px;
    margin: 0 auto;
    display: flex;
    padding: 10px 0px;
    ul {
      width: 206px;
      li {
        padding: 3px;
      }
    }
  }
  .sub-fold-bottom,
  .sub-fold-top {
    width: 30px;
    height: 16px;
    line-height: 16px;
    position: absolute;
    top: 209px;
    right: 660px;
    border: 1px solid #ccc;
    border-top: 1px solid transparent;
    background-color: #fff;
  }
  .sub-fold-top {
    top: 41px;
    background-color: #ccc;
  }
}
</style>