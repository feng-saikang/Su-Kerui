<template>
  <div>
    <brand-info :type_tow="type_tow" />
    <!-- <brand-list />
     -->
    <Recommend :ShopList="shopList" />
  </div>
</template>

<script>
import { getTypeTwoList } from "@/api/shopList/index.js";
import BrandInfo from "./childComponents/BrandInfo.vue";
import BrandList from "./childComponents/BrandList.vue";
export default {
  components: { BrandInfo, BrandList },
  name: "SeconDary",
  data() {
    return {
      // 二级分类字段
      type_tow: "",
      shopList: [], //商品列表
    };
  },
  methods: {
    getTypeTwoList() {
      let type_tow = this.$route.query.type_tow;
      this.type_tow = type_tow;
      console.log(type_tow);
      getTypeTwoList(type_tow).then((data) => {
        if (data.code === 200) {
          this.shopList = data.data;
        }
      });
    },
  },
  created() {
    this.getTypeTwoList();
  },
  watch: {
    $route: {
      deep: true,
      handler(val) {
        this.getTypeTwoList();
      },
    },
  },
};
</script>

<style>
</style>