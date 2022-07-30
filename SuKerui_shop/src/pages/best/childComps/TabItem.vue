<template>
  <div id="tab_item">
    <div class="card-container">
      <el-tabs type="card" @tab-click="onTabs">
        <el-tab-pane v-for="(item, index) in tab" :key="index" :label="item" 
          >
          <ul class="sort">
            <li v-for="(items, indexs) in sort[item]" :key="indexs">
              <span
                :class="{
                  onspan: active == indexs ? true : false,
                }"
                @click="onChange(indexs)"
                >{{ items }}</span
              >
            </li>
          </ul></el-tab-pane
        >
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: ["All", "鞋类", "服饰", "配件", "儿童专区"],
      sort: {
        All: [],
        鞋类: ["ALL WOMEN", "APPAREL", "BAG", "SHOES", "ACC"],
        服饰: ["ALL MEN", "APPAREL", "BAG", "SHOES", "ACC"],
        配件: [
          "ALL LIFE",
          "LIFEWEAR",
          "HOME",
          "TRAVEL",
          "DIGITAL",
          "PET",
          "GOODS",
        ],
        儿童专区: [
          "ALL BEAUTY",
          "FACIAL BEAUTY",
          "SALON BEAUTY",
          "SCENT BEAUTY",
          "INNER BEAUTY",
          "for MEN",
        ],
      },
      active: 0,
    };
  },
  methods: {
    onChange(indexs) {
      this.active = indexs;
    },
    onTabs(index) {
      this.active = 0;
      console.log(123);
      console.log(index.index);
      this.$emit("tabItem", this.tab[index.index]);
      console.log(this.tab[index.index]);
    },
  },
  created() {},
};
</script>
<style lang="less" scoped>
#tab_item {
  width: 82%;
  margin: 0 auto;
  height: 60px;
  // border: 1px solid black;
  /deep/.el-tabs-bar {
    border: 0;
  }
  /deep/.el-tabs.el-tabs-card .el-tabs-card-bar .el-tabs-nav-container {
    height: 60px;
  }
  /deep/.el-tabs-nav-container {
    overflow: none;
  }
  /deep/.el-tabs-nav {
    width: 100%;
  }
  /deep/.el-tabs.el-tabs-card .el-tabs-card-bar .el-tabs-tab {
    border: 1px solid #ccc;
    background-color: white;
  }

  /deep/.el-tabs.el-tabs-card .el-tabs-card-bar .el-tabs-tab {
    font-family: "ProximaNova-Semibold";
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    width: calc(100% / 5);
    height: 58px;
    margin: 0;
    padding: 0 16px;
    line-height: 58px;
    // background: #fafafa;
    // border: 1px solid #e8e8e8;
    border-bottom: 2px solid black;
    border-radius: 0;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  /deep/.el-tabs.el-tabs-card .el-tabs-card-bar .el-tabs-tab-active {
    height: 59px;
    border: 2px solid #000;
    border-bottom: none;
    color: black;
  }
  /deep/.el-tabs-nav .el-tabs-tab:hover {
    color: black;
  }
}
.sort {
  width: 70%;
  height: 32px;
  margin: 10px auto;
  display: flex;
  justify-content: space-around;
  text-align: center;
  line-height: 32px;
  position: relative;
  li::before {
    display: block;
    content: "";
    width: 1px;
    height: 10px;
    background: #ccc;
    position: absolute;
    top: 12px;
  }
  li:first-child::before {
    background: #fff;
  }
  li {
    width: 100%;
    .onspan {
      border-bottom: 2px solid #000;
    }
    span:hover {
      cursor: pointer;
      border-bottom: 2px solid #000;
    }
  }
}
</style>