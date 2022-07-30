<template>
  <div class="review">
    <h4>产品满意度</h4>
     <div class="appraise">
      <div class="appraise-left">
        <p>这是购买者对产品的评价。</p>
        <a-rate :default-value="rate" allow-half disabled class="star"/>
        <span class="score"> {{rate}} </span>
        <span class="score totalRate">/ 5</span>
      </div>
      <div class="right">
      </div>
    </div>
    <div class="imgList"></div>
  </div>
</template>

<script>
export default {
    name: 'Review',
    computed:{
      rate(){
         return parseInt(Math.floor(Math.random()*40+10)/10)
      }
    }
}
</script>

<style lang="less" scoped>
.review {
  text-align: left;
  margin-top: 55px;
  width: 1240px;
  h4{
    font-size: 18px;
    margin: 0 0 8px;
  }
  .appraise {
    height: 365px;
    .appraise-left{
      p {
        font-size: 14px;
        margin: 0 0 38px;
      }
      .score {
        margin-left: 10px;
        font-size: 32px;
      }
      .totalRate {
        color: #dfdfdf;
      }
    }
    /deep/ .star{
      color: #000
    }
  }
}
</style>