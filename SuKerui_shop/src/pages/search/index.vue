<template>
  <div class="search">
    <!-- 使用  AgainSearch 组件 -->
    <AgainSearch></AgainSearch>
    <!-- 使用 searchNav 组件 -->
    <SearchNav></SearchNav>
  </div>
</template>

<script>
import AgainSearch from '../search/childComps/AgainSearch.vue'
import SearchNav from '../search/childComps/searchNav.vue'
export default {
    name: 'Search',
  
    components:{
       AgainSearch, 
       SearchNav,
    },
    created(){
      this.$store.dispatch('setSearchShow', false);
    },
    beforeDestroy() {
      this.$store.dispatch('setSearchShow', true);
    },
}
</script>

<style lang="less" scoped>

</style>