<template>
  <div class="pers-center">
    <div class="pers-title">
      <Title><p>个人中心</p></Title>
      <p><router-link to="/home">主页</router-link> > <span>个人中心</span></p>
      <span @click="setPsd">修改密码</span>
    </div>
    <div class="pers-content">
      <pers-cen-sub />
    </div>
    <div class="myOrder">
      <my-order :addressList='addressList' :orderList="orderList" />
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form
        :model="From"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="username"
            v-model="From.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="From.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import persCenSub from "./childComponent/persCenSub.vue";
import { getUserOrder } from "@/api/Order/index.js";
import MyOrder from "./childComponent/MyOrder.vue";
import { getLocalStorage } from "@/utils/localStorage.js";
import { setPassWord, getaddress } from "@/api/user/index.js";
import { removeToken } from '@/plugins/cookie/index'
export default {
  components: { persCenSub, MyOrder },
  name: "PersCenter",
  data() {
    return {
      orderList: [],
      addressList: [],
      centerDialogVisible: false,
      From: {
        username: "",
        password: "",
      },

      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            pattern: /\w{4,6}/,
            message: "请输入正确的用户名",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            pattern: /^[A-Z]\w{3,11}/,
            message: "请输入首字母大写4-12位数字字母下划线",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    setPsd() {
      this.centerDialogVisible = true;
    },
    submitForm(Form) {
      this.$refs[Form].validate((valid) => {
        if (valid) {
          console.log(this.From);
          setPassWord(this.From).then((data) => {
            if (data.code === 200) {
              this.centerDialogVisible = false;
              removeToken();
              this.$store.dispatch("SetToken", "");
              this.$router.push("/login");
              this.$message({
                message: "密码修改成功,请重新登录",
                type: "success",
              });
            }
          });
        }
      });
    },
    getOrderList() {
      let user_id = JSON.parse(getLocalStorage("user")).id;
      
      getUserOrder(user_id).then((data) => {
        if (data.code === 200) {
          // todo 订单日期获取
          this.orderList = data.data;
        }
      });
    },
    getaddress() {
     let customer_id = JSON.parse(getLocalStorage("user")).id;
      getaddress({ customer_id }).then(data=>{
        console.log(data);
        if(data.code === 200){
           this.addressList = data.data;
        console.log(this.addressList);
        this.$store.dispatch('setaddresslist',this.addressList);
        this.addressList = data.data;
        }else {
          return
        }
       
      })
    },
  },
  created() {
    this.getOrderList();
    this.getaddress();
  },
};
</script>

<style lang='less' scoped>
.pers-title {
  width: 100%;
  text-align: center;
}
.pers-content {
  padding: 20px 0px;
}
</style>