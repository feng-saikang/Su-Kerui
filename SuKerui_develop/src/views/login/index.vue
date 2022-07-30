<template>
  <div class="content">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
      <div class="contentTitle">
        <h3>Login</h3>
      </div>
      <el-form-item prop="name">
        <el-input v-model="loginForm.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-button
        type="primary"
        style="margin-top: 30px; width:100%;"
        @click.prevent="onSubmit('loginForm')"
      >登 录</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {

        name: "",
        password: ""

      },
      loginRules: {
        name: [
          {
            required: true, // 是不是必填项
            message: "用户名不能为空", // 提示信息
            trigger: "blur" // 失去焦点验证
          },
          {
            pattern: /\w/,
            message: "输入内容不合法,请输入数字字母下划线",
            trigger: "blur"
          },
          { min: 4, message: "用户名长度不能少于4位", trigger: "blur" },
          { max: 12, message: "用户名长度不能超过12位", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            pattern: /^[A-Z]/,
            message: "输入内容不合法,请输入大写字母开头的字符",
            trigger: "blur"
          },
          { min: 6, message: "密码长度不能少于6位", trigger: "blur" },
          { max: 12, message: "密码长度不能超过12位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit(str) {
      this.$refs[str].validate(valid => {
        // valid 返回验证结果
        if (valid) {
          // 表单验证通过, 发送登录请求
          this.$store.dispatch("user/login", this.loginForm).then(res => {
            if (res.code == 200) {
              this.$router.push({ path: this.redirect || "/" });
            }
          });
        } else {
          // 表单没有通过
          return false;
        }
      });
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  min-height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;
  text-align: center;
  h3 {
    font-size: 30px;
  }
  .el-form {
    width: 520px;
    margin: 200px auto;
    color: #fff;
  }
  .el-input {
    display: inline-block;
    height: 50px;
    width: 100%;
  }
}
</style>