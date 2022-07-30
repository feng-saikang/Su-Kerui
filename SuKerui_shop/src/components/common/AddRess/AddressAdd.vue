<template>
  <div class="address">
    <el-dialog
      title="收获地址"
      :visible.sync="dialogShow"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="收货人" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="ruleForm.tel"></el-input>
        </el-form-item>
        <el-form-item prop="areaCode" label="所在地区">
          <el-cascader
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="detAdd">
          <el-input v-model="ruleForm.detAdd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked"
            >设为默认地址</el-checkbox
          ></el-form-item
        >
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >保存地址</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
import { getLocalStorage } from "@/utils/localStorage";
import { addAddress } from '@/api/user/index'

export default {
  name: "AddressAdd",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ruleForm: {
        name: "",
        tel: "",
        detAdd: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入收件人名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        tel: [
          { required: true, message: "请输入电话", trigger: "blur" },
          {
            pattent:
              /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
            message: "请输入正确的电话号码",
            trigger: "blur",
          },
        ],
        detAdd: [
          { required: true, message: "详细地址不能为空", trigger: "blur" },
        ],
      },
      openId: "",
      options: regionData, // 地址
      selectedOptions: [],
      provinceName: "",
      cityName: "",
      countyName: "",
      checked: false, //是否是默认地址
      dialogShow: this.dialogVisible
    };
  },
  methods: {
    handleChange(value) {
      //将区域码转为汉字
      this.provinceName = CodeToText[value[0]];
      this.cityName = CodeToText[value[1]];
      this.countyName = CodeToText[value[2]];
    },
    handleClose(done) {
      this.$confirm("您的地址还未保存，确认关闭？")
        .then((_) => {
          done();
          
        })
        .catch((_) => {});
    },
    addAddress() {
      let customer_id = JSON.parse(getLocalStorage("user")).id;
      let { name, tel } = this.ruleForm;
      let address = `${this.provinceName}-${this.cityName}-${this.countyName}-${this.ruleForm.detAdd}`;
      let prime = this.checked;
      this.data = {customer_id, name, tel, address, prime};
      addAddress(this.data).then((data) => {
        if (data.code == 200) {
          this.$message({
            message: "地址添加成功",
            type: "success",
          });
          this.$emit('derlogShow',false)
        }else if(data.code == 501){
          this.$message({
            message: "添加失败",
            type: 'danger'
          })
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addAddress();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

     resetForm(formName) {
        this.$refs[formName].resetFields();
      },


  },
  watch: {
    dialogVisible(val){
      this.dialogShow = val
    }
  },
  mounted() {
    
  },
};
</script>

<style>
</style>