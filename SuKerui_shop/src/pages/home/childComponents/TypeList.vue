<template>
  <div class="type-list">
    <div class="type card">
      <p>{{ typeName }}</p>
      <p>MORE<svg-icon icon-class="l-tri"></svg-icon></p>
    </div>
    <a-card
      v-for="(item, index) in TypeList.slice(0, 7)"
      :key="index"
      hoverable
      class="card"
    >
      <template #cover>
        <img alt="example" :src="item.img" />
      </template>
      <a-card-meta :title="item.title">
        <template slot="description">
          <p class="description">www.instagram.com</p></template
        >
      </a-card-meta>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "TypeList",
  props: {
    typeName: String,
    TypeList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang='less' scoped>
.type-list {
  width: 100%;
  padding: 0 10px;

  display: flex;
  justify-content: space-around;
  text-align: center;
  .card {
    width: calc((100% / 8) - 8px);
    margin: 4px;
    .img {
      width: 100%;
    }
  }
  .type {
    text-align: right;
    p{
      margin: 0;
    }
    p:nth-child(1) {
      font-size: 38px;
    }
    P:nth-child(2){
      font-size: 18px;
    }
  }
}
</style>