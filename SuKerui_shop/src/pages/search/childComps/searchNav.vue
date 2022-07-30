<template>
<div class="searchNav">
  <nav>
    <router-link :to="'/search/product'"  :active-class="'firstActive'">产品({{productNumber}})</router-link>
    <router-link :to="'/search/activity'"  :active-class="'firstActive'">活动({{activityNumber}})</router-link>
    <router-link :to="'/search/buyershow'"  :active-class="'firstActive'">买家秀({{buyerShowNumber}})</router-link>
  </nav>
  <router-view></router-view>
</div>
</template>

<script>
export default {
    name: 'SearchNav',
    data(){
        return {
            productNumber:0,
            activityNumber:0,
            buyerShowNumber:0,
            firstActive:'',
        }
    },
    created() {
    this.getProductNumber();
  },
  methods: {
    getProductNumber() {
      this.productNumber = this.$store.state.SearchDateList.length; 
      // console.log(this.$store.state);  
    },
  },
  watch: {
      $route: function () {
          this.getProductNumber();
      }
  },
};

</script>

<style lang="less" scoped>
.firstActive {
   background-color: #333;
  color: white !important;
}
.searchNav {
  display: block;
  margin-top: 10vh;
  padding: 0 17.3vw; 
  nav {
    border: 1px solid #000;
    width: 100%;
    height: 43px;
    display: flex;
      // align-items: center;
      justify-content: center;
      white-space: nowrap;

    a{
      width: 100%;
      height: 43px;
       padding: 1.2vh 0;
      // flex: 1;
      // float: left;
      
      border-right: 1px solid #000;
      cursor: pointer;
      font-size: 1.9vh !important;
      color: #5a5a5a;
      &:last-of-type {
        border: none;
      }
    }
  }
}
</style>