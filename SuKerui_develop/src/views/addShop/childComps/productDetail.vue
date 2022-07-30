<template>
  <div class="product">
    <el-form :model="formData" label-width="180px" ref="ruleFrom">
      <el-form-item label="商品规格:" prop="param">
        <el-input v-model="formData.param" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="price" label="销售价格" width="260">
          </el-table-column>
          <el-table-column prop="stock" label="商品库存" width="260">
          </el-table-column>
          <el-table-column label="操作" width="250"> </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="success">刷新列表</el-button>
      </el-form-item>
      <el-form-item label="商品相册:" prop="brand">
        <el-upload
          action="http://127.0.0.1:3000/upload/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="规格参数:" prop="desc">
        <el-tabs type="border-card">
          <el-tab-pane label="电脑端详情">
            <div class="edit_container">
              <quill-editor
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)"
              >
              </quill-editor>
            </div>
          </el-tab-pane>
          <el-tab-pane label="移动端详情">配置管理</el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item>
        <el-button @click="backHandler">上一步,填写商品信息</el-button>
        <el-button type="primary" @click="submitForm('ruleFrom')"
          >完成,提交商品</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addSku, getSku } from "@/api/shopList.js";
export default {
  data() {
    return {
      content: ``,
      editorOption: {},
      tableData: [],
      dialogImageUrl: "",
      dialogVisible: false,
      rules: [],
      formData: {
        param: "",
      },
      skuData: {},
      imgs: [],
    };
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(val) {
      let img = { normal: photoPath };
      this.imgs.push(img);
    },
    backHandler() {
      this.$emit("IsShow", true);
    },
    submitForm(ruleFrom) {
      this.$refs[ruleFrom].validate((valid) => {
        if (valid) {
          this.addSku();
        }
      });
    },
    addSku() {
      this.skuData;
      if (!this.skuData) {
        this.$message({
          message: "请先设置商品属性",
          type: "success",
        });
        this.$emit("IsShow", true);
      }
      let sale = parseInt(Math.random() * 100 + 400);
      let imgs = JSON.stringify(this.imgs);
      let param = [];
      param.push(this.param);
      param = JSON.stringify(param);
      let stock = [500, 500, 500];
      stock = JSON.stringify(stock);
      let { title, spu_id, price, special_price } = this.skuData;
      addSku({
        title,
        spu_id,
        price,
        special_price,
        sale,
        imgs,
        param,
        stock,
      }).then((data) => {
        if (data.code == 200) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.$emit("IsShow", true);
        }
      });
    },
  },
  mounted() {
    this.$bus.$on("sku", (sku) => {
      this.skuData = sku;
      let img = { small: sku.img };
      this.imgs.push(img);
    });
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  created() {
    let editItem = this.$store.getters.edit;
    if (editItem) {
      let spu_id = this.$route.query.id;
      getSku({ spu_id }).then((data) => {
        if (data.code == 200) {
          this.tableData = data.data;
        }
      });
    }
  },
};
</script>

<style lang='scss' scoped>
.product {
  width: 60%;
  margin: 20px auto;
  border: 1px solid #ccc;
  padding: 50px 30px;
}
</style>