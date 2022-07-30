<template>
<!-- 注册页面信息录入组件 -->
  <div class="joinInfo">
    <!-- 如果您注册成为会员，您将获得10%的折扣券，可以立即使用。 -->
        <div class="title">
            <span class="left">如果您注册成为会员，您将获得10%的折扣券，可以立即使用。</span>
            <span class="right">(每个完成自我认证账户只能使用一次)</span>
        </div>
        <!-- 录入信息 -->
        <div class="form">
        <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户" prop="username" :rules="userRules">
    <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="请输入用户名" ></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password" :rules="passwordRules">
    <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email" :rules="emailRules">
    <el-input v-model.number="ruleForm.email" placeholder="请输入邮箱"></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="tel" :rules="telRules">
    <el-input v-model.number="ruleForm.tel" placeholder="请输入手机号" class="Tel"></el-input>
    <el-button size="small" class="get-code" :disabled="isDisabled" @click="getCode">获取验证码</el-button>
  </el-form-item>
  <el-form-item label="验证码" prop="codeTel" :rules="codeRules">
    <el-input v-model.number="ruleForm.codeTel" placeholder="请输入验证码"></el-input>
  </el-form-item>
  <el-form-item>
  <!-- 取消  or  确认 -->
    <el-button @click="resetForm('ruleForm')">取消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')" >确认</el-button>
  </el-form-item>
</el-form>
</div>
  </div>
</template>

<script>
import { getMessage,userSignUp } from '../../../../api/user/index.js'
 export default {
  name: 'JoinInfo',
    data() {
      //邮箱验证规则
      var checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
              callback();
          }
        }, 1000);
      };
      //密码验证规则
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      //用户名验证规则
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };

      //手机号验证规则
      var checkTel = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        let reg_tel = /^[1][3,4,5,7,8][0-9]{9}$/;
        setTimeout(()=>{
          if(!reg_tel.test(value)){
          console.log("test  手机号验证",reg_tel.test(value));
          callback(new Error('输入手机号不合法'));
        }else{
          callback()
        }
        },1000)   
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
              callback();
          }
        }, 1000);
      };
      //验证码验证规则
      var checkCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }else{
          callback()
        }
      };
      return {
        ruleForm: {
          username: '',
          password: '',
          email: '',
          tel: '',
          codeTel: '',
          },
          flag:true,//获取验证码按钮防抖 
          //验证规则
          userRules: [
            { validator: validateUser,required:true, trigger: 'blur' }
          ],
          passwordRules: [
            { validator: validatePass,required:true, trigger: 'blur' }
          ],
          emailRules: [
            { validator: checkEmail,required:true, trigger: 'blur' }
          ],
          telRules: [
            { validator: checkTel,required:true, trigger: 'blur' }
          ],
          codeRules: [
            { validator: checkCode,required:true, trigger: 'blur' }
          ],
          isDisabled:false,//获取验证码按钮禁用状态与否  true为禁用 false为不禁用
      };
      
      
    },
    methods: {
      //element-ui 默认提交按钮方法 提交--->确认
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.userSignUp();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
 //注册请求
            userSignUp(){
              let data = {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              email: this.ruleForm.email,
              VerificationCode:this.ruleForm.codeTel,
            }
              userSignUp(data).then((data)=>{
                console.log(data);
                if(data.data.code === 200){
                  this.$message({
                    message: '注册成功',
                    type: 'success'
                  })
                   //跳转注册页面
                this.$router.push('/home')
                }
              }) 
            },
      //element-ui 默认重置按钮方法 重置-->取消
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //获取验证码
       getCode(item) {
        this.isDisabled = true,//禁用状态开启
        this.flag=true;
        const btn = document.querySelector('.get-code');
      // 此处正则先通过才能获取验证码 不然不倒计时
      let phoneNum = this.ruleForm.tel;
      getMessage({phoneNum}).then(data=>{
        // console.log(data);
        this.codeTel = data.data;
        let codeTelNum = this.codeTel.data.Code;
        console.log(codeTelNum);
        // let reg_tel = /^[1][3,4,5,7,8][0-9]{9}$/;
      // if (reg_tel.test(this.tel)) {
        console.log('test',this);
        let timer = 60;
        let stttimer = setInterval(() => {
          timer--;
          btn.innerText = `${timer}s后重新获取`;
          if (timer <= 0) {
            // this.flag = true;
            clearInterval(stttimer);
            btn.innerText = `获取验证码`;
          }
        }, 1000);
      })  
    },
    }
  }
</script>

<style lang="less" scoped>
//
.joinInfo {
    display: block;
    width: 1240px;
    height: 505px;
    margin: 0px auto;
       .title {
         border-top: 1px solid #000000;
         height: 51px;
         background-color: #ff6160;
         .left {
            font-size: 20px;
            color: #fff;
            line-height: 50px;
            float: none;
         }
         .right {
            font-size: 14px;
            color: #fff;
            line-height: 50px;
            float: none;
         }
    }  
}
.form ::v-deep .el-input__inner {
  height: 80px;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  font-size: 20px;
  position: relative;
}
.form ::v-deep .el-form-item__label {
  font-size: 20px;
  margin-top: 20px;
}
.form ::v-deep .el-form-item__error {
  font-size: 16px;
}
.form ::v-deep .el-button {
  width: 180px;
  height: 50px;
  background-color: #000;
}
.form ::v-deep .el-button--default{
  background-color: #fff;
  border: 1px solid #333;
  color: #333;
}
.form ::v-deep .el-button--small {
  position: absolute;
  top: 22px;
  left: 720px;
}

</style>