<template>
  <el-carousel :interval="5000" arrow="always" indicator-position="outside">
    <el-carousel-item v-for="item in imgs" :key="item">
      <img :src="item" alt="" />
      <div class="txt">
        <p>10%세일</p>
        <span>JSNY</span>
        <span>21SUMMER</span>
      </div>
      <div class="cet-img" v-for="items in cetImg" :key="items">
        <ul>
          <li>
            <a href=""><img :src="cetImg[0]" alt="" /></a>
            <a href=""><img :src="cetImg[1]" alt="" /></a>
            <a href=""><img :src="items" alt="" /></a>
          </li>
        </ul>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data() {
    return {
      imgs: [
        "//image.wconcept.co.kr/images/builder/1/4/132/188/PIA1_1560x480_w.app_20210409172737.jpg",
        "//image.wconcept.co.kr/images/builder/1/4/132/188/PIA1_1560x480_2_20210415180123.jpg",
        "//image.wconcept.co.kr/images/builder/1/4/132/188/PIA1_1560x480_6_20210415180048.jpg",
        "//image.wconcept.co.kr/images/builder/1/4/132/188/PIA1_1560x480_3_20210415175853.jpg",
      ],
      cetImg: [
        "//image.wconcept.co.kr/productimg/image/img1/80/301239080.jpg",
        "//image.wconcept.co.kr/productimg/image/img1/74/301239074.jpg",
        "//image.wconcept.co.kr/productimg/image/img1/70/301239070.jpg",
      ],
    };
  },
};
</script>

<style lang='less' >
.el-carousel__item img {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  height: 480px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__item {
  height: 480px;
}
.el-carousel {
  height: 480px;
  width: 1560px;
  margin: 0 auto;
}
.el-carousel button {
  // background-color: red;
  margin-top: 110px;
}

.txt {
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 150px;
  padding: 17px 1208px 0px 0px;
  background-color: #ffffffa6;
  font-size: 12px;
  font-family: "yg740";
  p {
    font-size: 14px;
    color: #666;
  }
  span:nth-of-type(1) {
    display: block;
    margin-top: 3px;
    font-size: 40px;
    color: #000;
  }
  span:nth-of-type(2) {
    display: block;
    font-size: 22px;
  }
}
.cet-img {
  position: absolute;
  bottom: -10px;
  right: 165px;
  z-index: 1;
  padding: 10px;
  background-color: #fff;
  // width: 457px;
  height: 205px;
  ul {
    display: flex;
    justify-content: space-between;
    img {
      width: 139px;
      height: 185px;
      margin-left: 10px;
      img {
        width: 100%;
      }
    }
  }
}
</style>