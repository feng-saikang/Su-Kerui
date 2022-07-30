<template>
<div class="brandinfo">
  <Title><p>{{type_tow}}</p></Title>
  <div class="title">
    <router-link to='/home'>Home </router-link>
    <span> / </span>
    <span> SeconDary</span>
  </div>
  <div class="title-card">
    <p>{{type_tow}}专区</p>
    <p>1234567732</p>
  </div>
</div>
</template>

<script>
export default {
    name: 'BrandInfo',
    props:{
        type_tow: String,
    }
}
</script>

<style lang='less' scoped>
.brandinfo{
    width: 100%;
    margin: 0 auto;
    .title{
        text-align: center;
        font-size: 12px;
        color: #333;
        padding: 0px 0px 20px
    }
    .title-card{
        width: 80%;
        margin: 0 auto;
        padding: 50px 30px 100px;
        text-align: left;
        background-color: #5a5a5a;
        p:nth-child(1){
            font-size: 38px; 
            font-weight: 300;
            color: #fff;
            // padding-bottom: 10px;
        }
        p:nth-child(2){
            font-size: 12px;
            color: #fff;

        }
    }
}

</style>