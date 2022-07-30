<template>
  <div class="signup">
    <p class="titleWarp">注册</p>
    <!-- 使用 JoinMember 组件 -->
    <JoinMember></JoinMember>
    <!-- 使用FooterNav 组件 -->
  </div>
</template>

<script>
//引入 JoinMember 组件
import JoinMember from './childComponents/joinMember.vue'
//引入footerNav 组件
import FooterNav from '../../components/common/FooterNav.vue'
export default {
    name: 'SignUp',
    data(){
        return {

        }
    },
    components:{ 
      JoinMember,//注册
        FooterNav,//脚部Nav
      }
}
</script>

<style lang="less" scoped>
.titleWarp {
  padding: 27px 0 44px;
      font-family: "ProximaNova-Thin", "yg740";
    font-size: 44px;
    color: #000;
    text-align: center;
    text-transform: uppercase;
    margin: 0;
}
</style>