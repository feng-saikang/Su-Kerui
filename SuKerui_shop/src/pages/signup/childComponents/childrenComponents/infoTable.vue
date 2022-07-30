<template>
<!-- 注册步骤提示图片 -->
  <div class="infoTable">
    <ul>
        <div class="content">
            <li>
            <div class="info-start">
                <div>
                    <img src="../../../../assets/images/signup/info-start.png" alt="信息输入">
                </div>
                <span>1 信息输入</span>                                                         
            </div>
        </li>
        <li class="right" :style="{ backgroundColor: successed == true ? '#000' : '#f2f2f2' }">
            <img src="../../../../assets/images/signup/info-right.png" alt="传送>" v-show="successed">
        </li>
        <li>
            <div class="info-success">
                <div>
                    <img src="../../../../assets/images/signup/info-success.png" v-show="!successed">
                </div>
                <span>2 注册完成</span>
            </div>
        </li>
        </div>
           <p class="must"><span>*</span>必填项</p>
    </ul>

  </div>
</template>

<script>
export default {
    name: "InfoTable",
    data(){
        return {

        }
    },
    props:["successed"]
}
</script>

<style lang="less" scoped>
.infoTable {
        display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 60px;
    width: 100%;
    // margin-bottom: 100px;
    // border: 1px solid #000;
    position: relative;
   ul {
    width: 1240px;
    margin: 0;
    position: relative;
    .content {
        width: 270px;
        height: 80px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        white-space: nowrap;
        line-height: 80px;
        position: relative;
    }
      li>span{
        position: absolute;
    bottom: -33px;
    left: 0;
    font-family: "yg740";
    color: #a1a1a1;
    font-size: 14px;
    text-align: center;
    vertical-align: top;
    width: 200%;
    margin-left: -50%;
    }
    .right img {
        position: absolute;
        top: 22px;
        left: 116px;
    }
    li {
        list-style: none;
        float: left;
        // display: flex;
        // justify-content: space-between;
        // white-space: nowrap;
        // margin: 0 200px;

         .info-start {
        display: inline-block;
        width:80px;
        height: 80px;
        border-radius: 50%;
        background-color: #000;
        img{
            margin-top: -3px;
        }
        span{
            position: absolute;
            top: 60px;
            left: 0;
            font-size: 14px;
            color: #a1a1a1;
        }
    }
    .info-success {
        display: inline-block;
        width:80px;
        height: 80px;
        border-radius: 50%;
        background-color: #F2F2F2; 
         img{
            margin-top: -3px;
        }
         span{
            position: absolute;
            top: 60px;
            left: 192px;
             font-size: 14px;
            color: #a1a1a1;
        }
    }
  
    }
     .must {
    margin-top: -16px;
    position: absolute;
    top: 124px;
    right: 24px;
    span {
        color: #ff1414;
    }
   }
   }
  
}

</style>