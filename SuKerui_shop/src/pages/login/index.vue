<template>
  <div class="login">
    <title-warp>登录</title-warp>
      <!-- 登录信息填写 -->
      <LoginWrap/>
      <!-- 第三方登录 -->
      <ThirdParty/>
      <!-- 会员注册提示 -->
      <NonMember/>
  </div>
</template>

<script>
import TitleWarp from "./childComos/TitleWarp.vue";
import LoginWrap from "./childComos/LoginWrap.vue";
import NonMember from "./childComos/NovMember.vue";
import ThirdParty from "./childComos/ThirdParty.vue";
export default {
  name: "Login",
  components: { TitleWarp,  LoginWrap, ThirdParty, NonMember, },
};
</script>


<style lang="less" scoped>
.login{
  width: 60%;
  margin: 0 auto;
   margin-bottom: 40px;
}
</style>