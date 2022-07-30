<template>
  <div class="addproduct">
    <el-form
      :model="formData"
      :rules="rules"
      label-width="180px"
      ref="ruleFrom"
    >
      <el-form-item label="产品分类: ">
        <el-input
          v-if="isActive"
          :disabled="isActive"
          v-model="specValue"
        ></el-input>
        <el-cascader
          v-else
          size="small"
          v-model="formData.spec"
          :options="options"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="产品名称:" prop="title">
        <el-input
          :disabled="isActive"
          v-model="formData.title"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="产品品牌:" prop="brand">
        <el-select
          :disabled="isActive"
          v-model="formData.brand"
          size="small"
          placeholder="请选择"
        >
          <el-option
            v-for="item in brands"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品图片:">
        <el-upload
          :disabled="isActive"
          action="http://127.0.0.1:3000/upload/upload"
          list-type="picture-card"
          :file-list="fileList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="产品介绍:">
        <el-input
          :disabled="isActive"
          type="textarea"
          size="mini"
          v-model="formData.desc"
        ></el-input>
      </el-form-item>
      <el-form-item label="产品价格:">
        <el-input
          :disabled="isActive"
          type="input"
          size="mini"
          v-model="formData.price"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleFrom')"
          >下一步,填写商品属性</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getProduct,
  addSpu,
  getSpu,
  getCatName,
  getBrandName,
} from "@/api/shopList.js";
import { getBrand } from "@/api/brand.js";
export default {
  name: "AddShop",
  data() {
    return {
      isActive: "true",
      fileList: [],
      formData: {
        title: "", // 产品名称
        spec: [], // 产品分类
        brand: "", // 产品品牌
        img: "", // 产品图片
        desc: "", //产品介绍
        price: "", // 产品价格
      },
      rules: {
        title: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
        brand: [{ required: true, message: "请输入产品品牌", trigger: "blur" }],
      },
      specValue: "",
      // 多级复选框
      options: [
        {
          value: "鞋类",
          label: "鞋类",
          children: [],
        },
        {
          value: "配件",
          label: "配件",
          children: [],
        },
        {
          value: "服饰",
          label: "服饰",
          children: [],
        },
        {
          value: "儿童专区",
          label: "儿童专区",
          children: [],
        },
        {
          value: "个护清理",
          label: "个护清理",
          children: [],
        },
      ],
      brands: [],
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    // 上传图片
    handleRemove(file, fileList) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(val) {
      console.log(val);
      this.formData.img = val.photoPath;
    },
    submitForm(ruleFrom) {
      this.$refs[ruleFrom].validate((valid) => {
        if (valid) {
          if (!this.isActive) {
            this.addSpu();
          }
          this.$emit("IsShow", false);
        } else {
          return false;
        }
      });
    },
    // 多选框变化
    handleChange(val) {
      console.log(val);
    },
    // 获取产品分类
    getProductClass() {
      let query = [];
      this.options.forEach((item) => {
        let parent_name = item.label;

        query.push(getProduct({ parent_name }));
      });
      Promise.all(query).then((res) => {
        let i = 0;
        res.forEach((item, index2) => {
          if (item.code == 200) {
            item.data.forEach((item) => {
              let arr = {
                value: item.name,
                label: item.name,
              };
              this.options[i].children.push(arr);
            });
          }
          i++;
        });
      });
    },
    // 獲取品牌分類
    getbrandClass() {
      getBrand({ store_id: 1 }).then((data) => {
        if (data.code == 200) {
          data.data.forEach((item) => {
            let value = item.name;
            let label = item.name;
            this.brands.push({ label, value });
          });
        }
      });
    },
    addSpu() {
      let { title, brand, img, price } = this.formData;
      let spec = this.formData.spec[1];
      // todo 动态获取商店id
      let store_id = 1;
      let special_price = parseInt(price) * 0.65;
      let is_special = 1;
      let verifyIndex = new Date().getTime();
      addSpu({
        title,
        brand,
        img,
        price,
        spec,
        store_id,
        special_price,
        is_special,
        verifyIndex,
      }).then((data) => {
        if (data.code == 200) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          getSpu({ verifyIndex }).then((data) => {
            console.log(data);
            if (data.code == 200) {
              let spu_id = data.data[0].id;
              let sku = {
                spu_id,
                title,
                brand,
                img,
                price,
                spec,
                store_id,
                special_price,
                is_special,
                verifyIndex,
              };
              this.$bus.$emit("sku", sku);
            }
          });
        }
      });
    },
  },
  created() {
    let editItem = this.$store.getters.edit;
    if (this.$route.query.id) {
      this.isActive = true;
      // 获取商品分类
      getCatName({ id: this.$route.query.id }).then((data) => {
        if (data.code === 200) {
          this.specValue = data.data[0].parent_name + "/" + data.data[0].name;
        }
      });
      // 获取品牌
      getBrandName({ id: this.$route.query.id }).then((data) => {
        if (data.code === 200) {
          this.formData.brand = data.data[0].name;
        }
      });
      this.formData.title = editItem.title;
      this.formData.price = editItem.price;
      let img = { name: "", url: editItem.img };
      this.fileList.push(img);
    } else {
      this.isActive = false;
      this.getProductClass();
      this.getbrandClass();
    }
  },
};
</script>

<style lang='scss' scoped>
.addproduct {
  width: 60%;
  margin: 20px auto;
  border: 1px solid #ccc;
  padding: 50px 30px;
}
</style>