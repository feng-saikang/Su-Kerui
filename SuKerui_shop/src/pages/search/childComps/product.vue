<template>
  <div class="product">
    <ul>
      <li v-for="item in searchList" :key="item.id" @click="goToDetails(item)">
        <a-card hoverable style="width: 240px">
          <img slot="cover" alt="example" :src="item.img" />
          <a-card-meta :title="item.title">
            <template slot="description">
              <p class="activity">目前没有活动</p>
              <div class="price">
                <p>
                  <span class="original">￥{{ item.special_price }}</span
                  ><span class="discount">￥{{ item.price }}</span>
                </p>
              </div>
            </template>
          </a-card-meta>
        </a-card>
      </li>
      <!-- 透明盒子解决弹性布局最后一行问题 -->
      <aside v-for="i in 6" :key="i"></aside>
    </ul>
  </div>
</template>

<script>
import { getSearchList } from "../../../api/shopList/index.js";
//引入bus

export default {
  name: "Product",
  data() {
    return {
      searchList: [], //存放搜索出来商品的数组
     
    };
  },
  created() {
    this.getSearchDateList();
  },
  methods: {
    //todo: 数据要持久化存储，刷新页面数据会不见    
    //todo: 搜索页面刷新产品数据不见，但vuex中仍存有数据
    getSearchDateList(){
        this.searchList = this.$store.state.SearchDateList;
    },

     //跳转详情页
    goToDetails(item){
      //跳转页面
      console.log(item);
      this.$store.dispatch('setitemlist',item)
     this.$router.push(`/details/${item.id}`)
    }
  },
  watch: {
  $route: {
    handler: function(val, oldVal){
      console.log(val);
    },
    // 深度观察监听
    deep: true
  }
},
};
</script>

<style lang="less" scoped>
.product {
  display: flex;
  flex-direction: column;
  align-items: center;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 5vh 0;
    margin-top: 7vh;
    li {
      margin-bottom: 3vh;
    }
    aside {
      width: 12vw;
      height: 0;
    }
  }
}
/deep/ .ant-card {
  width: 12vw !important;
  margin-top: 1vh;
  // border: none ;
  .ant-card-body {
    padding: 0;
    margin: 1vh 0;
    padding-left: 0.3vw;
    .activity {
      color: #ccc;
    }
    .price {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 1vh;
      p {
        display: flex;
        align-items: center;
        .original {
          color: #000000d9;
          font-weight: bolder;
        }
        .discount {
          font-size: 1.2vh;
          margin-left: 1vw;
          text-decoration: line-through;
        }
      }
      .percentage {
        color: red;
        margin-right: 1vw;
      }
    }
  }
}
</style>