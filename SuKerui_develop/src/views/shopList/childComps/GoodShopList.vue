<template>
  <div class="goodShopList">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :header-cell-style="headClass"
    >
      <el-table-column type="selection" width="60" align="center"></el-table-column>
      <el-table-column prop="id" label="编号" width="90" align="center"></el-table-column>
      <el-table-column  label="商品图片" width="180" align="center">
         <template slot-scope="scope">
            <img style="height: 80px" :src="scope.row.img" />
          </template>
      </el-table-column>
      <el-table-column prop="title" label="商品名称"  align="center">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="120" align="center"> </el-table-column>
      <el-table-column prop="SKU" label="SKU库存" width="120" align="center" >
         <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="skuShow"
            ></el-button>
          </template>
      </el-table-column>
      <el-table-column prop="sales" label="销量" width="120" align="center"><template>1200</template></el-table-column>
      <el-table-column prop="operate" label="操作" align="center" width="250">
         <template slot-scope="scope">
            <el-button @click="edit(scope.row)" size="mini" >编辑</el-button>
            <el-button @click="addcoupon(scope.row.id)" size="mini">添加优惠券</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deletShopList(scope.row.id)"
            >删除</el-button>
          </template>
           </el-table-column>
    </el-table>
    <!-- 分页 -->
   <div class="page">
      <el-pagination :page-count="page"	@current-change="pageChange"  background layout="prev, pager, next" :total="345" :current-page="page" :page-size="30">
      </el-pagination>
    </div>
    <div class="sku_dialog">
      <el-dialog
  title="产品信息"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose" align="left">
   <el-table style="width: 100%;margin-top: 10px" border>
        <el-table-column label="销售价格" width="150" align="center">
          <template >
            <el-input disabled></el-input>
          </template>
        </el-table-column>
        <el-table-column label="商品库存" width="150" align="center">
          <template>
            <el-input disabled></el-input>
          </template>
        </el-table-column>
      </el-table>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</div>
  </div>
</template>

<script>
import { getShopList, deletShopList } from "@/api/shopList.js";

import Bus from '@/utils/Bus.js'
export default {
  name: "SpuShopList",
  data() {
    return {
      tableData: [],//商品
      page:1,//页码
      total:0,//商品总数
       dialogVisible: false,
       word: '',
    }
  },
  created() {
    this.getShopList();
  },
  mounted() {
     Bus.$on("getSearchList",((searchList)=>{
        this.tableData = searchList;
        console.log(this.tableData);
      }))  
  },
  methods: {
    edit(item){
      console.log(item);
      this.$store.dispatch('shopList/setEditItem', item);
      this.$router.push('/shop/addShop?id='+item.id);
    },
    addcoupon(id){
      this.$router.push('/marketing/addCoupon?id='+id)
    },
    headClass() {
      return "text-align:center";
    },
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      skuShow(){
        this.dialogVisible = !this.dialogVisible;
      },
      
    //todo: 分页
    getShopList() {
      let store_id = 1;
      let page = this.page;
      getShopList({ store_id,page }).then((data) => {
        console.log(data);
        console.log(data.data);
        if (data.code === 200) {
          this.$message({
            message: "获取商品成功",
            type: "success",
          });
          this.tableData = data.data;
        }
      });
    },
     pageChange(data){
      console.log(data); // 第几页数据
      this.page = data;
      this.getShopList(this.page)
    },
    deletShopList(id){
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
           deletShopList(id).then(data=>{
        this.$message({
            type: 'success',
            message: '删除成功!'
          });
        this.getShopList()
      }) 
        })
    .catch(()=>{
        this.$message({
            type: 'info',
            message: '已取消删除'
          });  
      })
    }

  },
};
</script>

<style lang="scss" scoped>
.goodShopList {
  text-align: center;
}
</style>