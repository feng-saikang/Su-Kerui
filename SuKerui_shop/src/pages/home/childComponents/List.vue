<template>
  <div class="an-card">
    <a-card
      v-for="(item, index) in List_list.slice(0, 8)"
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
  name: "List",
  props: {
    List_list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang='less' scoped>
.an-card {
  width: 100%;
  padding: 0 10px;
  display: flex;
  text-align: center;
  margin-top: 20px;
  overflow: hidden;
  // justify-content: space-around;
  text-align: center;
  .card {
    width: calc((100% / 8) - 8px);
    margin: 4px;
    .img {
      width: 100%;
    }
  }
  .description {
    color: #666;
    font-family: "yg740";
    font-size: 12px;
    line-height: 1.5;
    word-break: keep-all;
  }
}
/deep/ .ant-card-meta-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333;
  font-family: "ProximaNova-Bold";
  font-size: 20px;
}
</style>