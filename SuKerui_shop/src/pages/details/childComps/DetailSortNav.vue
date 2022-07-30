<template>
  <div class="detailsotrnav">
    <ul class="nav">
      <li @click="$emit('intoWhich', 'DETAIL')" :class="{on:Index === 0}">DETAIL</li>
      <li @click="$emit('intoWhich', 'REVIEW')" :class="{on:Index === 1}">REVIEW(98)</li>
      <li @click="$emit('intoWhich', 'Q_A')" :class="{on:Index === 2}">Q&A(65)</li>
      <li @click="$emit('intoWhich', 'RETURN_DELIVERY')" :class="{on: Index === 3}">RETURN&DELIVERY</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DetailSortNav",
  props:{
    Index:Number,
  },
  methods: {
    //自定义点击事件
  },
};
</script>

<style lang="less" scoped>
.detailsotrnav {
   width: 1240px;
   height: 62px;
   margin-top:650px;
.nav {
  height: 62px;
  line-height: 62px;
  li {
    cursor: pointer;
    text-align: center;
    width: 310px;
    float: left;
    border: 1px solid #efefef;
    border-bottom: 2px solid #000;
     &.on {
    border: 2px solid #000;
    border-bottom: 1px solid transparent;
  }
  }
}
 }
</style>