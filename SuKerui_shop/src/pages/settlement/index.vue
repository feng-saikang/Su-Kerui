<template>
  <div class="settlement">
    <div class="settlement_left">
      <MyAddress></MyAddress> 
      <ShopDetail></ShopDetail> 
    </div>
    <div class="settlement_right">
        <SubmitOrder></SubmitOrder>
    </div>
    
  </div>
</template>

<script>
import MyAddress from './childComps/MyAddress.vue'
import ShopDetail from './childComps/ShopDetail.vue'
import SubmitOrder from './childComps/SubmitOrder.vue'
export default {
    name: 'Settlement',
    components:{
        MyAddress,
        ShopDetail,
        SubmitOrder,
    }
}
</script>

<style lang="less" scoped>
.settlement {
    display: flex;
    justify-content: space-between;
    width: 75vw;
    margin: 0 auto;
}
</style>