<template>
  <div id="marketCoupon">
    <!-- <h1>秒杀活动</h1> -->
    <SeekSpike></SeekSpike>
    <AddSpike></AddSpike>
    <ListSpike></ListSpike>
  </div>
</template>

<script>
import SeekSpike from './childComps/seekSpike.vue'
import AddSpike from './childComps/addSpike.vue'
import ListSpike from './childComps/listSpike.vue'

export default {
  name: 'Spike',
  components: {
    SeekSpike,
    AddSpike,
    ListSpike,
  },
}
</script>

<style lang="scss" scoped>
#marketCoupon {
  padding: 20px 40px;
}

.card {
  margin: 20px 20px;
  border: 1px solid #EBEEF5;

  span {
    margin: 0 10px;
  }

  .el-form {
    margin: 15px 0;

  }
}
</style>
