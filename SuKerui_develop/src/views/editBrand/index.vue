<template>
  <div class="editBrand">
     <el-form
      label-width="80px"
      :model="formLabelAlign"
      ref="formLabelAlign"
      :rules="rules"
    >
      <el-form-item label="品牌名称" prop="name" >
        <el-input v-model="formLabelAlign.name" width="458" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="品牌首字母" prop="letter">
        <el-input v-model="formLabelAlign.letter"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" prop="image">
        <template>
          <el-upload
            class="upload-demo"
            action="http://127.0.0.1:3000/upload/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :data="formLabelAlign"
            :on-change="handleChange"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formLabelAlign')"
          >提交</el-button
        >
        <el-button @click="resetForm('formLabelAlign')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updataBrand } from "@/api/brand.js";
export default {
  name: "EditBrand",
  data() {
    return {
      //   labelPosition: "right",
      formLabelAlign: {
        name: "",
        image: "",
        letter: "",
      },
      options: [
        {
          value: "选项1",
          label: "服饰",
        },
        {
          value: "选项2",
          label: "数码家电",
        },
        {
          value: "选项3",
          label: "居家生活",
        },
        {
          value: "选项4",
          label: "美食",
        },
        {
          value: "选项5",
          label: "首饰珠宝",
        },
      ],
      value: "",
      //   fileList: [],
      rules: {
        //品牌名称
        name: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur",
          },
        ],
        //品牌首字母
        letter: [
          { required: true, message: "请输入品牌首字母", trigger: "blur" },
        ],
        //品牌LOGO
        image: [{ required: true, message: "请输入品牌logo", trigger: "blur" }],
      },
    };
  },
  mounted(){
    
  },
  created() {
    this.formLabelAlign.name = this.$route.query.name
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addBrand();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleChange(file, fileList) {
      this.formLabelAlign.image = URL.createObjectURL(file.raw);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    updataBrand(){
        let { name,letter,image} = {...formLabelAlign}
        updataBrand({ name,letter,image}).then(data=>{
            if(data.code === 200){
                this.$message({
                    message: '更新成功',
                    type: 'success'
                })
            }
        }).catch(()=>{
            this.$message({
                message: '更新失败',
                type: 'danger'
            })
        })
    }
    
  },
};
</script>

<style lang="scss" scoped>
.editBrand {
  position: absolute;
  left: 0;
  right: 0;
  width: 720px;
  padding: 35px 35px 15px 35px;
  margin: 20px auto;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  .el-form {
    padding: 20px;
    position: relative;
    ::v-deep .el-form-item__label {
      padding: 0 0px 0 0;
      position: absolute;
      left: 0;
      // margin-right: 10px;
    }
  }
}
</style>