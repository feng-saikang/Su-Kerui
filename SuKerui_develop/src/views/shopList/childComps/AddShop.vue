<template>
  <div class="addShop">
    <div class="addShop_left">
      <i class="el-icon-tickets" />
      数据列表
    </div>
    <div class="addShop_right">


      <el-button type="primary" @click="addShop" size="samll" style="width:80px;height:32px;">添加</el-button>


    </div>
  </div>
</template>

<script>
export default {

  name: "AddShop",
  methods: {
    addShop(){
      this.$router.push('/shop/addShop')
    }
  }
};

</script>

<style lang="scss" scoped>
.addShop {
  border: 1px solid #eee;
  margin-top: 20px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  // line-height: 82px;
  .addShop_left {
    margin-top: 5px;
  }
}
</style>
