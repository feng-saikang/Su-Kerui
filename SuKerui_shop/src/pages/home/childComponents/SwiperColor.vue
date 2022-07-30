<template>
  <div class="swiper-color">
    <swiper ref="SwiperList" :options="SwiperList">
      <swiper-slide
        v-for="(item, index) in SwiperColor_List.slice(23, 28)"
        :key="index"
      >
        <a-card
          @mouseover="markShowIndex = index"
          @mouseleave="markShowIndex = null"
          hoverable
          class="card"
        >
          <transition name="mark">
            <div
              v-show="markShowIndex == index"
              :style="{ backgroundColor: colorList[index] }"
              class="mark"
            >
              <p>{{ item.title }}</p>
            </div>
          </transition>

          <img slot="cover" :src="item.img" alt="example" />
          <a-card-meta :title="item.title">
            <template>
              <p class="description">www.stride.fun</p>
            </template>
          </a-card-meta>
        </a-card>
      </swiper-slide>
    </swiper>
    <div class="swiper-button-prev" slot="button-prev" @click="prev"></div>
    　　
    <div class="swiper-button-next" slot="button-next" @click="next"></div>
  </div>
</template>

<script>
export default {
  name: "SwiperColor",
  props: {
    SwiperColor_List: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      colorList: ["purple", "orange", "red", "blue", "yellowgreen"], // 存放悬浮颜色

      SwiperList: {
        direction: "horizontal", //滑动方向，可设置水平(horizontal)或垂直(vertical)。
        slidesPerView: "auto", // 设置slider容器能够同时显示的slides数量(carousel模式)。类型：number or auto
        centeredSlides: true, // 设定为true时，active slide会居中，而不是默认状态下的居左。
        spaceBetween: 80, // 在slide之间设置距离（单位px）。
        loopAdditionaSlider: 0, // loop模式下会在slides前后复制若干个slide,，前后复制的个数不会大于原总个数。
        centeredSlides: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        navigation: {
          nextEl: ".swiper-color .swiper-button-next",
          prevEl: ".swiper-color .swiper-button-prev",
        },
      },
      markShowIndex: null, //mark显示隐藏
    };
  },
  computed: {
    swiper() {
      return this.$refs.SwiperList.$swiper;
    },
  },
  methods: {
    prev(){

    },
    next(){
      
    }
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false);
    // this.swiper.autoplay.stop()
  },
};
</script>

<style lang='less' scoped>
.swiper-color {
  width: 100%;
  position: relative;
  margin: 0 auto;
}
.swiper-container {
  width: 100%;
  height: 80%;
  padding: 80px 0;
}
img {
  transform: scale(0.6);
}
.swiper-slide {
  width: 540px;
  opacity: 0.5;
}
.swiper-slide-active {
  transform: scale(1.2) !important;
  opacity: 1;
}

.swiper-button-prev,
.swiper-button-next {
  --swiper-theme-color: #000; /* 设置Swiper风格 */
  z-index: 1;
}
.card {
  position: relative;
  .mark {
    width: 100%;
    height: 100%;
    opacity: 0.7;
    // background: purple;
    position: absolute;
    top: 0px;
    left: 0px;
    // line-height: 100%;
    p {
      color: #fff;
      font-size: 34px;
      font-weight: 900;
      text-align: center;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
@keyframes opaticy {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.7;
  }
}
.mark-enter-active {
  animation: opaticy 0.5s linear;
}
.mark-leave-active {
  animation: opaticy 0.5s reverse;
}
</style>