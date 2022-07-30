<template>
  <div class="qa">
    <div class="shopTalk">
      <el-button>商品咨询</el-button>
    </div>
    <div class="rate">
      <ul>
        <li v-for="(item,index) in 6" :key="index">
          <span class="answer">完整回答</span>
          <span class="question"> {{index}} <i></i></span>
          <span class="username">haey***</span>
          <span class="time">2021. 04. 1{{index}}</span>
        </li>
      </ul>
    </div>
    <div class="page">
      <el-pagination
  background
  layout="prev, pager, next"
  :total="20">
</el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "QA",
};
</script>

<style lang="less" scoped>
.qa {
  width: 1240px;
  margin-top: 60px;
  margin-bottom: 90px;
  .shopTalk {
    width: 100%;
    height: 50px;
    margin: 0 0 15px;
   ::v-deep .el-button {
    float: right;
    width: 180px;
    height: 50px;
    background-color: #000;
    color: #fff;
  } 
  }
  
  .rate {
    width: 1240px;
    height: 410px;
    border-bottom: 2px solid #000;
    border-top: 2px solid #000;
    ul {
      li {
        width: 100%;
        height: 68px;
        line-height: 68px;
        border-bottom: 1px solid #d9d9d9;
        span {
          display: inline-block;
          height: 25px;
          line-height: 25px;
        }
         .answer {
            margin-left: 20px;
            width: 55px;
            color: #fff;
            background-color: #000;
            font-size: 12px;
            text-align: center;
            border: 1px solid #000;
          }
          .question {
            width: 854px;
            padding-left: 20px;
            text-align: start;
          }
          .username {
            width: 155px;
            text-align: start;
          }
          .time {
            width: 155px;
            text-align: end;
          }
      }
    }
  }
  .page {
       width: 100%;
    height: 50px;
    margin-top: 50px;
    position: relative;
   ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active{
    color: #1890ff;
    background-color: #fff;
    border: 1px solid #1890ff;
    border-radius: 5px;
   }
  }
  
}
</style>