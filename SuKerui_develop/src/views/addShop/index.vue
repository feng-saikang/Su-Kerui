<template>

  <div class="addshop">
    <add-product @IsShow = 'showHandler' v-if='isShow' />
    <product-detail @IsShow = 'showHandler' v-else />

  </div>
</template>

<script>

import addProduct from './childComps/addProduct.vue'
import productDetail from './childComps/productDetail.vue'
export default {
  components: { addProduct,productDetail },
  data() {
    return {
      isShow: true,
    }
  },
  methods: {
    showHandler(val){
      this.isShow = val
    }
  },
  created() {
  
  },
};
</script>

<style lang='scss' scoped>

</style>