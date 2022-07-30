<template>
  <div class="addcoupon">
    <el-form
      label-width="180px"
      :model="formCoupon"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item label="优惠券面额" prop="deno">
        <el-input v-model="formCoupon.deno"></el-input>
      </el-form-item>
      <el-form-item label="使用条件" prop="condition">
        <el-input v-model="formCoupon.condition"></el-input>
      </el-form-item>
      <el-form-item label="产品id" prop="spu_id">
        <el-input v-model="formCoupon.spu_id"></el-input>
      </el-form-item>
      <el-form-item label="优惠券名称" prop="name">
        <el-input v-model="formCoupon.name"></el-input>
      </el-form-item>
      <el-form-item label="开始时间-结束时间">
        <el-date-picker
          v-model="time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addVoucher } from "@/api/voucher.js"
export default {
  name: "AddCoupon",
  data() {
    return {
      formCoupon: {
        deno: "",
        condition: "",
        spu_id: "",
        name: "",
      },
      time: [],
      rules: {
        deno: [
          { required: true, message: "请输入优惠券面额", trigger: "blur" },
        ],
        condition: [
          { required: true, message: "请输入使用条件", trigger: "blur" },
        ],
        spu_id: [{ required: true, message: "请输入产品id", trigger: "blur" }],
        name: [
          { required: true, message: "请输入优惠券名称", trigger: "blur" },
        ],
        time: [
          { required: true, message: "请输入开始结束时间", trigger: "blur" },
        ],
      },
    }
  },
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.addCopons()
        } else {
          console.log("error submit!!")
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    addCopons() {
      let store_id = JSON.parse(this.$store.getters.storeInfo).id
      let start_time = this.time[0]
      let end_time = this.time[1]
      let { deno, condition, spu_id, name } = this.formCoupon
      addVoucher({
        store_id,
        start_time,
        end_time,
        deno,
        condition,
        spu_id,
        name,
      }).then((data) => {
        if(data.code === 200){
          this.$message({
            message: '优惠券添加成功',
            type: 'success'
          })
        }
      })
    },
  },
  created() {
    if(this.$route.query.id){
      this.formCoupon.spu_id = this.$route.query.id
    }
  },
}
</script>

<style lang='scss' scoped>
.addcoupon {
  width: 40%;
  margin: 30px auto;
  border: 1px solid #ccc;
  padding: 20px 30px 20px 20px;
}
</style>