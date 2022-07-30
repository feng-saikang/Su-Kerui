<template>
  <div class="loginform">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      :label-position="labelPosition"
    >
      <!-- 用户 -->
      <div class="user">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="ruleForm.username"
            type="username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model.number="ruleForm.password"
            show-password
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-checkbox v-model="remember">记住密码</el-checkbox>
          <el-checkbox v-model="agree">同意该协议</el-checkbox>
        </el-row>
      </div>
      <!-- 按钮 -->
      <el-form-item class="btn">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      let reg = /\w{4,6}/;
      if (!reg.test(value)) {
        callback(new Error("请求输入4-6位数字字母下划线"));
      } else {
        callback();
      }
    };
    var checkPsd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      }
      let reg = /^[A-Z]\w{6,16}/;
      if (!reg.test(value)) {
        callback(new Error("请求输入开头大写的6-16位数字字母下划线"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "left",
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: checkUser, trigger: "blur" }],
        password: [{ validator: checkPsd, trigger: "blur" }],
      },
      remember: false, //记住密码
      agree: false, //同意协议
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.agree) {
          this.$store
            .dispatch("setUser", this.ruleForm)
            .then((data) => {
              // 记住密码 保存
              if (this.remember) {
                window.localStorage.setItem("username", this.ruleForm.username);
                window.localStorage.setItem("password", this.ruleForm.password);
              } else {
                window.localStorage.removeItem("password");
              }
              this.$message.success("登录成功");
              this.$router.push("/home");
            })
            .catch((req) => {
              this.$message.warning("登录失败,请检查用户名或密码是否正确!!!")
            });
        } else if (!this.agree) {
          //是否勾选同意
          this.$message.warning("请先勾选协议");
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
  mounted() {
    // 记录密码
    for (var i = localStorage.length - 1; i >= 0; i--) {
      if (localStorage.key(i) == "username") {
        this.ruleForm.username = localStorage.getItem(localStorage.key(i));
      }
      if (localStorage.key(i) == "password") {
        this.ruleForm.password = localStorage.getItem(localStorage.key(i));
      }
    }
  },
};
</script>

<style lang="less" scoped>
.el-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: 14%;

  .user {
    width: 50%;
    padding-left: 10%;
  }

  .btn {
    width: 30%;

    & /deep/.el-form-item__content {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 100px;
      margin-left: 15% !important;
    }
  }

  .el-button {
    width: 50%;
    height: 50% !important;
    font-size: 16px;
  }
}
</style>