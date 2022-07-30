<template>
  <div class="swiper mySwiper">
    <div
      class="swiper-wrapper"  
    >
      <div class="swiper-slide"  :style="{
          'background-image': `linear-gradient(to right,#fff 55%,${colorarr[0]} 100%)`,
        }" >
        <img
          src="https://img.fishfay.com/shopgoods/4/112048880A/zt-112048880A/7a726455cd3a2d453038750bed851976.jpg"
        />
        <p :style="{ color: colorarr[0] }">{{ text[0] }}</p>
        <span  class="tip"
          >右划查看下一款<a-icon type="caret-right"
        /></span>
      </div>
      <div class="swiper-slide"  :style="{
          'background-image': `linear-gradient(to right,#fff 55%,${colorarr[1]} 100%)`,
        }" >
        <img
          src="https://img.fishfay.com/shopgoods/4/112048818A/zt-112048818A/5f1fa3a0005d843b3c5ab2fa6edc385e.jpg"
        />
        <p :style="{ color: colorarr[1] }">{{ text[1] }}</p>
        <span  class="tip"
          >右划查看下一款<a-icon type="caret-right"
        /></span>
      </div>
      <div class="swiper-slide"  :style="{
          'background-image': `linear-gradient(to right,#fff 55%,${colorarr[2]} 100%)`,
        }" >
        <img
          src="https://img.fishfay.com/shopgoods/4/112048868A/zt-112048868A/bcc29939853f61837599cc2e19a0baca.jpg"
        />
        <p :style="{ color: colorarr[2] }">{{ text[2] }}</p>
        <span  class="tip"
          >右划查看下一款<a-icon type="caret-right"
        /></span>
      </div>
      <div class="swiper-slide"  :style="{
          'background-image': `linear-gradient(to right,#fff 55%,${colorarr[3]} 100%)`,
        }" >
        <img
          src="https://img.fishfay.com/shopgoods/4/112048860/zt-112048860/8bf4c7a730ba14e10f625de6e302f369.jpg"
        />
        <p :style="{ color: colorarr[3] }">{{ text[3] }}</p>
        <span  class="tip"
          >右划查看下一款<a-icon type="caret-right"
        /></span>
      </div>
      <div class="swiper-slide"  :style="{
          'background-image': `linear-gradient(to right,#fff 55%,${colorarr[4]} 100%)`,
        }" >
        <img
          src="https://img.fishfay.com/shopgoods/1/112118812/zt-112118812/435ef501389428f8e3bc509c1d96bf73.jpg"
        />
        <p :style="{ color: colorarr[4] }">{{ text[4] }}</p>
        <span  class="tip"
          >右划查看下一款<a-icon type="caret-right"
        /></span>
      </div>
      <div class="swiper-slide"  :style="{
          'background-image': `linear-gradient(to right,#fff 55%,${colorarr[5]} 100%)`,
        }" >
        <img
          src="https://img.fishfay.com/shopgoods/4/112118845/zt-112118845/367d18b2084ddcc818d3585d794fc401.jpg"
        />
        <p :style="{ color: colorarr[5] }">{{ text[5] }}</p>
        <span  class="tip"
          >右划查看下一款<a-icon type="caret-right"
        /></span>
      </div>
    </div>
    <!-- <div class="swiper-pagination"></div> -->
  </div>
</template>

<script>
import "@/components/common/myswiper/swiper-bundle.min.css";
import Swiper from "@/components/common/myswiper/swiper-bundle.min.js";
export default {
  data() {
    return {
      list_list:[
        0,2,3,4,5,6,7,9
      ],
      colorarr: [
        "rgba(44, 58, 71, .4)",
        "rgba(41, 128, 185, .4)",
        "rgba(253, 114, 114, .4)",
        "rgba(202, 211, 200, .4)",
        "rgba(61, 61, 61,.4)",
        "rgba(241, 144, 102,.4)",
        "rgba(225, 95, 65,.4)",
        "rgba(248, 165, 194,.4)",
        "rgba(61, 193, 211.4)",
      ],
      text: ["拒绝平庸", "千刃", "游心", "星流", "教父", "裂变", "无极"],
    };
  },
  mounted() {
    new Swiper(".mySwiper", {
      effect: "cube",
      grabCursor: true,
      cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });
  },
};
</script>

<style lang="less" scoped>
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  /* margin: 0; */
  /* padding: 0; */
}

.swiper {
  overflow:hidden;
  width: 100%;
  position:relative;
  /* left: 50%; */
  top: 9%;
  margin-left: 0px;
  margin-top: 0px;
  margin-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
}

.swiper-slide img {
  display: block;
  border-radius: 5px;
  width: 50%;
}
p {
  position: absolute;
  text-align: center;
  width: 70%;
  text-align: right;
  left: 20%;
  top: 50%;
  font-size: 33px;
  opacity: 0.4;
  font-weight: 700;
  opacity: 1;
  letter-spacing: 30px;
  // background-color: red;
}
.tip{
  position: absolute;
  letter-spacing: 10px;
  font-size: 20px;
  top: 58%;
  left:78%
}
</style>