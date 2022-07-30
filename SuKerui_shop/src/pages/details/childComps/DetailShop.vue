<template>
  <div class="detail">
    <ul>
      <li v-for="(item,index) in imgs" :key="index">
        <img :src="item.normal" />
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "DetailShop",
  props:{
    imgs:{
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      
    };
  },
  created() {
    this.getImgs();
  },
  methods: {
    getImgs() {   
    },
  },
};
</script>

<style scoped lang="less" >
.detail {
  width: 1240px;
  margin: 100px auto;
}
ul {
  width: 960px;
  margin: 0 auto;
  li {
    width: 100%;
    margin: 60px 0;
    img {
      width: 960px;
    }
  }
}
</style>
