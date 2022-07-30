<template>
  <div class="shopList">
    <Search></Search>
    <AddShop></AddShop>
    <GoodShopList></GoodShopList>
  </div>
</template>

<script>
import Search from './childComps/Search.vue'
import AddShop from './childComps/AddShop.vue'
import GoodShopList from './childComps/GoodShopList.vue'
export default {
    name: 'ShopList',
    components:{
      Search,
      AddShop,
      GoodShopList,
    }
}
</script>

<style lang="scss" scoped>

</style>