<template>
  <div class="brandList">
    <div class="addShop">
      <div class="addShop_left">
        <i class="el-icon-tickets"></i>
        数据列表
      </div>
      <div class="addShop_right">
        <el-button size="samll" style="width: 80px; paddingbuttom: 10px"
        @click="addBrandClick"
          >添加</el-button
        >
      </div>
    </div>
    <!-- 品牌列表 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :header-cell-style="headClass"
    >
    <!-- ID -->
      <el-table-column prop="id" label="id" width="200" align="center"></el-table-column>
      <!-- LOGO -->
      <el-table-column prop="image" label="LOGO" width="250" align="center">
        <template slot-scope="scope">
          <img style="height: 80px" :src="scope.row.image" />
        </template>
      </el-table-column>
      <!-- 品牌名称 -->
      <el-table-column prop="name" label="品牌名称"  align="center" width="" >
      </el-table-column>
      <!-- 品牌首字母 -->
      <el-table-column prop="letter" label="品牌首字母"  align="center" width="200">
      </el-table-column>
     <!-- 操作 -->
      <el-table-column prop="operate" label="操作" align="center" width="300">
         <template slot-scope="scope">
            <el-button size="mini" @click="updateBrandClick(scope.row.name)">更新</el-button>
            <el-button
              size="mini"
              type="danger"
            >删除</el-button>
          </template>
           </el-table-column>
    </el-table> 
  </div>
</template>

<script>
import { getBrand } from "@/api/brand.js";
export default {
  name: "BrandList",
  data(){
    return {
      tableData: [{
        name:'',
        image:'',
        letter:''
      }],
      secondName: [],//二级分类
    }
  },
  created(){
    this.getBrand()
  },
  methods: {
     headClass() {
      return "text-align:center";
    },
    getBrand(){
      let store_id = 1;
      getBrand({store_id}).then(data=>{
        if(data.code === 200){
          this.tableData = data.data;
        }
      })
    },
    addBrandClick(){
      this.$router.push('/shop/addBrand')
    },
    updateBrandClick(name){
      console.log(name);
      this.$router.push("/shop/editBrand?name=" + name)
      console.log(name);
      this.$bus.$emit('passName',name)
    }
  }

};
</script>

<style lang="scss" scoped>
.addShop {
  border: 1px solid #eee;
  margin-top: 20px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  // line-height: 82px;
  .addShop_left {
    margin-top: 5px;
  }
}
</style>