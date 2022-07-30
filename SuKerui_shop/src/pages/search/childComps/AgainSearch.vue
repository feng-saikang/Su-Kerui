<template>
  <div class="againSearch">
    <section>
      <p>
        '{{ word }}' 有<span> {{ searchNumber }} </span>个搜索结果
      </p>
    </section>
  </div>
</template>

<script>
//引入搜索请求接口
import  { getSearchList }   from '../../../api/shopList/index.js';
//引入 get 获得keyword
import { getLocalStorage } from '../../../utils/localStorage.js';


export default {
    name: 'AgainSearch',
    data:function(){
        return {
        word: '',//输入搜索框的关键字,
        searchNumber: 0, //搜索出来的产品数
        searchList: [], //存放相关搜索产品的数组
        }
    },
    created(){
      this.loadSearch()
    },
    methods:{
    // 获取用户输入搜索的字段
    loadSearch() {
      this.word = getLocalStorage("word");
      // this.word = this.$route.query.word;
      getSearchList(this.word).then((res) => {
        if (res.code == 200) {
          this.searchNumber = res.data.length;
          this.searchList = res.data;
          console.log(this.searchList);
          this.$store.dispatch("setsearchlist", this.searchList);
          if(this.$route.name != 'Product'){
            this.$router.replace({ path: "/search/product" });
          }
        } 
      });
    },
  },
};
</script>

<style lang="less" scoped>
.againSearch {
  display: block;
  width: 64vw;
  height: 17vh;
  margin: 0 auto;
  margin-top: 7.4vh;
  background-color: #fafafa;
  border-top: 1px solid #e1e1e1;
  font-size: 25px;
  color: #000000A6;
  line-height: 17vh;
  
  //设置searchNumber的样式
  span {
    color:#0ec3b2;
  }
}
</style>