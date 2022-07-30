<template>
  <div class="brand-shopshow">
    <Recommend />
  
  </div>
</template>

<script>
export default {
  name: "BrandList",
  props: {
    // shopList_list: {
    //     type: Array,
    //     default: ()=>[],
    // }
  },

  data() {
    return {
      pages: [],
    };
  },
};
</script>

<style lang='less' scoped>
.brand-shopshow {
  width: 100%;
  margin: 0 auto;
  .brand-recommed {
    width: 80%;
    margin: 0 auto;
    padding: 10px 10px 5px;
    border-bottom: 3px solid #000;
    // padding: 10px;
    text-align: left;
  }
}
</style>