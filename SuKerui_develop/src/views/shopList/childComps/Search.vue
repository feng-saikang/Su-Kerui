<template>
  <div class="search">
<div class="search_top">
    <span>
      <i class="
el-icon-search"></i>   
    </span>
   
<span>
 筛选搜索   
</span>
</div>
<div class="search_bottom">
    <div style="margin-left:58px">
       <span>输入搜索：</span>
    <!-- <input type="text" name="" id="" placeholder="商品名称" v-model="word">   -->
    <el-input v-model="word" placeholder="商品名称"></el-input>
    </div>
   
    <div>
     <el-button size="small" @click="resetWord">重置</el-button>
  <el-button type="primary" size="small" @click="searchWord">查询结果</el-button>   
    </div>
    
</div>
  </div>
</template>

<script>
import { getSearchList } from '@/api/shopList.js'
import Bus from '@/utils/Bus.js'

export default {
    name: 'search',
    data(){
        return {
            word: "",
            searchList: [],
        }
    },

    methods: {
        searchWord(){
            let keyword = this.word;
            getSearchList(keyword).then(data=>{
                if(data.code === 200){
                    this.$message({
                        message:"获取搜索商品成功",
                        type: "success",
                    })
                    this.searchList = data.data;
                    let searchList = this.searchList
                    // console.log(this.searchList);
                     Bus.$emit('getSearchList',searchList)
                    // this.$store.dispatch('setsearchlist',this.searchList);
                }
            })
        },
        resetWord(){
            this.word = '';
        }
    }
}
</script>

<style lang="scss" scoped>
.search {
    border: 1px solid #eee;
    margin-top: 20px;
    padding: 20px;
    .search_top {
        font-size: 16px;
        color: #303133;
    }
    .search_bottom {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        position: relative;
        div {
            display: inline-block;
        }
        span{
            padding: 0 12px 0 0;
            font-size: 14px;
            color: #606266;
            font-weight: 900;
           
        }
        ::v-deep .el-input__inner {
                height: 32px;
                line-height: 32px;
                color: #999;
                border: 1px solid #DCDFE6;
                font-size: 12px;
                position: absolute;
                top: -39px;
                left: 72px;
                width: 200px;
                
            }
    }
}
</style>