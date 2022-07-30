<template>
  <div class="home">
    <!-- 头部轮播 -->
    <swiper-hander
      :imgHeight="'600px'"
      :imgWidth="'1920px'"
      :swiperList="swiperHanderList"
    />
    <Title><p>BASKETBALL SHOES</p></Title>
    <an-card :cardList="AnCardList" />
    <!-- stickBanner -->
    <Title><p>SKATE SHOES</p></Title>
    <swiper-list :SwiperList_list="SwiperList_List" />
    <Title><p>Running SHOES</p></Title>
    <swiper-carousel
      :swiperCarousel_List="swiperCarousel_List"
    ></swiper-carousel>
    <!-- 带有渐变色的轮播 -->
    <Title><p>CASUAL SHOES</p></Title>
    <swiper-color :SwiperColor_List="List_list"></swiper-color>
    <!-- 休闲鞋 -->
    <List :width="'225px'" :List_list="List_list"></List>
    <Title><p>Recommend+</p></Title>
    <swiper-and-list :SwiperAndList_list="SwiperAndList_list"></swiper-and-list>
    <swiper-hander
      :imgHeight="'600px'"
      :imgWidth="'1920px'"
      :swiperList="swiperHanderList"
    />
    <type-list
      v-for="(item, index) in TypeList_list"
      :key="index"
      :TypeList="item"
      :typeName="TypeList[index]"
    ></type-list>
    <Title><p>kanapsack</p></Title>
    <swiper-tab :TabList="tabList" :TabImgList="tabImgList"></swiper-tab>
    <Title><p>wdna style</p></Title>
    <shop-list-tab :ShopListTab_list="ShopListTab_list" :TabList="typeTwoList"></shop-list-tab>
    <FooterBar></FooterBar>
  </div>
</template>

<script>
import SwiperHander from "./childComponents/SwiperHander.vue";
import { getSwiperList } from "@/api/swiper/index.js";
import AnCard from "./childComponents/AnCard.vue";
import { getTypeTwoList, getTypeOneList } from "@/api/shopList/index";
import SwiperList from "./childComponents/SwiperList.vue";
import SwiperCarousel from "./childComponents/SwiperCarousel.vue";
import SwiperColor from "./childComponents/SwiperColor.vue";
import List from "./childComponents/List.vue";
import SwiperAndList from "./childComponents/SwiperAndList.vue";
import TypeList from "./childComponents/TypeList.vue";
import SwiperTab from "./childComponents/SwiperTab.vue";
import ShopListTab from './childComponents/ShopListTab.vue';
import FooterBar from "@/components/common/FooterBar.vue";
export default {
  components: {
    SwiperHander,
    AnCard,
    SwiperList,
    SwiperCarousel,
    SwiperColor,
    List,
    SwiperAndList,
    TypeList,
    SwiperTab,
    ShopListTab,
    FooterBar
},
  name: "Home",
  data() {
    return {
      // 轮播图数据
      swiperHanderList: [],
      shopNameList: ["篮球鞋", "板鞋", "跑鞋", "休闲鞋"], // 首页展示所有的商品分类名
      shopList: [], // 首页所有的商品分类数据
      AnCardList: [],
      SwiperList_List: [],
      swiperCarousel_List: [],
      List_list: [],
      SwiperAndList_list: [],
      TypeList_list: [],
      TypeList: [],
      tabList: ["富强", "民主", "和谐", "平等"],
      tabImgList: [],
      typeTwoList: [],
      ShopListTab_list: [],
    };
  },
  methods: {
    // 获取轮播图数据
    getSwiperList() {
      getSwiperList().then((data) => {
        this.swiperHanderList = data.res;
        console.log(data);
      });
    },
    getTypeTwoList() {
      let query = [];
      // 获取首页所有商品分类数据
      this.shopNameList.forEach((item) => {
        query.push(getTypeTwoList(item));
      });
      Promise.all(query).then((res) => {
        res.forEach((item) => {
          if (item.code === 200) {
            this.shopList.push(item.data);
          }
        });
        this.AnCardList = this.shopList[0];
        this.SwiperAndList_list = this.shopList[0];
        this.SwiperList_List = this.shopList[1];
        this.swiperCarousel_List = this.shopList[2];
        this.List_list = this.shopList[3];
      });
    },
    getTypeList_init() {
      let TypeList = ["服饰", "鞋类", "配件", "儿童专区"];
      this.TypeList = TypeList;
      let query = [];
      TypeList.forEach((item) => {
        query.push(getTypeOneList(item));
      });
      Promise.all(query).then((res) => {
        res.forEach((item, index) => {
          if (index === 2) {
            this.tabImgList = item.res.slice(8, 12);
          }
          if (item.code === 200) {
            this.TypeList_list.push(item.res.slice(0, 7));
          }
        });
      });
    },
    getShoplist_init() {
      let typeTwoList = [
        "连帽卫衣",
        "单茄克",
        "单风衣",
        "针织短裤",
        "运动背心",
      ];
      this.typeTwoList = typeTwoList;
      let query = [];
      this.typeTwoList.forEach((item) => {
        query.push(getTypeTwoList(item));
      });
      Promise.all(query).then((res) => {
        res.forEach((item) => {
          if (item.code === 200) {
            this.ShopListTab_list.push(item.data.slice(0, 6));
          }
        });
      });
    },
  },
  created() {
    // 初始化获取轮播图数据
    this.getSwiperList();
    this.getTypeTwoList();
    // 初始化获取type分类数据
    this.getTypeList_init();
    this.getShoplist_init();
  },
  mounted() {},
};
</script>

<style lang='less' scoped>
.home {
  width: 100%;
  margin: 0 auto;
}
.card {
  &:hover {
    transform: translateY(0.3);
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  }
}
</style>