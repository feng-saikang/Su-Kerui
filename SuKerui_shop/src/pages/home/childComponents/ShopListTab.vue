<template>
  <div class="shoplist-tab">
    <ul class="tab-list">
      <li
        :class="{ active: index === tabIndex }"
        v-for="(item, index) in TabList"
        :key="index"
        @click="tabshop(index)"
      >
        {{ item }}
      </li>
    </ul>
    <div class="tab-bottom">
      <a-card

        v-for="(item, index) in ShopListTab_list[tabIndex]"
        :key="index"
        hoverable
        class="card"
      >
        <template #cover>
          <img alt="example" :src="item.img" />
        </template>
        <a-card-meta :title="item.title">
          <template slot="description">
            <p class="description">www.instagram.com</p></template>
        </a-card-meta>
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopListTab",
  props: {
    TabList: {
      type: Array,
      default: () => [],
    },
    ShopListTab_list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tabIndex: 0,
     
    };
  },
  methods:{
    tabshop(index){
        this.tabIndex = index
    }
  }
};
</script>

<style lang='less' scoped>
.shoplist-tab {
  width: 100%;
  margin: 0 auto;
  .tab-list {
    width: 60%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    padding: 10px 0px;
    font-size: 20px;
    li {
      width: 80px;
      text-align: center;
      cursor: pointer;
      border-bottom: 3px solid transparent;
    }
  }
  .tab-bottom {
    display: flex;
    width: 100%;
    padding: 10px 0px;
    // justify-content: space-around;
    .card {
      width: calc((100% / 6) - 8px);
      margin: 4px;
      .img {
        width: 100%;
      }
    }
  }
}
.active {
  border-bottom: 3px solid #000 !important;
}
</style>