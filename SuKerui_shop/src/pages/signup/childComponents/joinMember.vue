<template>
  <div class="join-member">
    <!-- 注册步骤提示图片 -->
    <InfoTable></InfoTable>
    <!-- 注册信息录入组件 -->
    <JoinInfo></JoinInfo>
  </div>
</template>

<script>
//引入 infotable 组件
import InfoTable from '../childComponents/childrenComponents/infoTable.vue'
// 引入 JoinInfo 组件
import JoinInfo from '../childComponents/childrenComponents/joinInfo.vue'
export default {
    name: 'JoinMember',
    data(){
        return {

        }
    },
    components:{
        InfoTable,//注册   infotable组件
        JoinInfo,//注册    JoinInfo组件
    }
}
</script>

<style lang="less" scoped>
.join-member {
  margin-bottom: 260px;
}

</style>