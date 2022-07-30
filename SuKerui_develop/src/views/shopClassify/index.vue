<template>
  <div class="shopClassify">
    <div class="addShop">
      <div class="addShop_left">
        <i class="el-icon-tickets"></i>
        数据列表
      </div>
      <div class="addShop_right">
        <el-button size="samll" style="width: 80px; paddingbuttom: 10px"
        @click="dialogShow"
          >添加</el-button
        >
      </div>
    </div>
    <!-- 商品分类列表 -->
     <el-table
      :data="tableData"
      border
      style="width: 100%"
      :header-cell-style="headClass"
    >
    <!-- 编号 -->
      <el-table-column prop="id" label="编号" width="" align="center"></el-table-column>
      <!-- 分类名称 -->
      <el-table-column prop="name" label="分类名称"  align="center" width="">
      </el-table-column>
     <!-- 设置 -->
      <el-table-column prop="set" label="设置" width="" align="center" >
         <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              
            ></el-button>
          </template>
      </el-table-column>
     <!-- 操作 -->
      <el-table-column prop="operate" label="操作" align="center" width="">
         <template slot-scope="scope">
            <el-button size="mini" @click="editClassify">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
            >删除</el-button>
          </template>
           </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <div>
      <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
 <!-- select下拉框 -->
 <el-select v-model="value" placeholder="请选择一级分类">
    <el-option
      v-for="(item,index) in options"
      :key="index"
      :value="item">
    </el-option>
  </el-select>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="getClassifyList">确 定</el-button>
  </span>
</el-dialog>

    </div>
  </div>
</template>

<script>
import { getParentName,getName } from '@/api/shopList.js'
export default {
  name: "ShopClassify",
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      options: [],
        value: '',
        
    };
  },
  created(){
    
  },
  methods: {
     headClass() {
      return "text-align:center";
    },
    dialogShow(){
      this.dialogVisible = true;
      getParentName().then(data=>{
        console.log(data);
        if(data.code === 200){
          this.options = data.data; 
        }
      })
    },
    getClassifyList(){
      this.dialogVisible = false;
      let parent_name = this.value;
      getName({parent_name}).then(data=>{
        console.log(data);
        this.tableData = data.data;
        // this.$store.dispatch('setshopclassifylist',this.tableData)
      })
    },
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      editClassify(){
        this.$store.dispatch('setEditItem',this.$event)
        console.log(this.$event);
      }
    }
  }
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