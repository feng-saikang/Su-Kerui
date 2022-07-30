<template>
  <div class="Recommend">
    <div class="brand-recommed">
      <h3>今日推荐</h3>
    </div>
    <div class="brand-shoplist">
      <div class="sort">
        <div class="sort-left">共计{{ total }}件</div>
        <div class="sort-right">
          <el-select size="mini" v-model="pagenum">
            <el-option
              v-for="item in options[0]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select size="mini" v-model="shopSort">
            <el-option
              v-for="item in options[1]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="shopShow">
        <a-card
          hoverable
          class="card"
          v-for="(item, index) in shoplist"
          :key="index"
          @click="goToDetails(item)"
        >
          <img slot="cover" alt="example" :src="item.img" />
          <a-card-meta :title="item.title">
            <template slot="description">
              <p class="description">COST: ￥{{ item.price }}</p>
            </template>
          </a-card-meta>
        </a-card>
      </div>
      <el-pagination
        :page-size="pagesnum"
        layout="prev, pager, next"
        :total="total"
        @current-change="pageChange"
         :page-sizes="[30, 60, 90]"
         
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  props: {
    ShopList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      options: [
        [
          {
            lable: 1,
            value: "每页30",
          },
          {
            lable: 2,
            value: "每页60",
          },
          {
            lable: 3,
            value: "每页90",
          },
        ],
        [
          {
            lable: 1,
            value: "价格最高",
          },
          {
            lable: 2,
            value: "价格最低",
          },
          {
            lable: 3,
            value: "销量最高",
          },
        ],
      ],
      pagenum: "每页30", // 默认每页数
      shopSort: "默认",
      shoplist: this.ShopList.slice(0, 30),
      total: this.ShopList.length,
      pagesnum: 30, // 每页条数
      start: 0,
      end: 30,
    };
  },
  methods: {
    // 根据用户需求排序
    // todo 封装成工具函数
    rander(order) {
      // 三种排序方式
      let shoplist = [];
      if (this.shoplist.length === 0) return;
      shoplist = JSON.parse(JSON.stringify(this.shoplist));
      if (order == "销量最高") {
        this.shoplist = shoplist.sort((a, b) => {
          return b.sale - a.sale;
        });
        console.log(shoplist);
      }
      if (order == "价格最高") {
        this.shoplist = shoplist.sort((a, b) => {
          return b.price - a.price;
        });
        console.log(shoplist);
      }
      if (order == "价格最低") {
        this.shoplist = shoplist.sort((a, b) => {
          return a.price - b.price;
        });
        console.log(shoplist);
      }
    },
    pageChange(val) {
      this.shoplist = this.ShopList.slice((val - 1) * 30, val * 30);
    },
     goToDetails(item){
      //跳转页面
      console.log(item);
      this.$store.dispatch('setitemlist',item)
     this.$router.push(`/details/${item.id}`)
    },
  },
  created() {},
  watch: {
    shopSort: {
      handler(val) {
        this.rander(val);
      },
    },
    ShopList: {
      handler() {
        this.shoplist = this.ShopList.slice(0,this.pagesnum );
        this.total = this.ShopList.length;
      },
    },
    pagenum: {
      handler(val) {
        this.pagesnum = parseInt(val.slice(2))
        this.shoplist = this.ShopList.slice(0, this.pagesnum );
      }
    }
  },
};
</script>

<style lang='less'>
.Recommend {
  width: 100%;
  margin: 0 auto;
  padding-bottom: 50px;
  .brand-recommed {
    width: 80%;
    margin: 0 auto;
    padding: 10px 10px 5px;
        border-top: 1px solid #e1e1e1;
    border-bottom: 3px solid #000;
    // padding: 10px;
    text-align: left;
  }
  .brand-shoplist {
    width: 80%;
    margin: 0 auto;
    .sort {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      .sort-left {
        width: 8%;
      }
      .sort-right {
        width: 20%;
        display: flex;
      }
    }
    .shopShow {
      display: flex;
      // justify-content: space-around;
      flex-wrap: wrap;
      .card {
        width: calc((100% / 5) - 8px);
        margin: 4px;
        .img {
          width: 100%;
        }
      }
    }
  }
}
</style>