<template>
  <div class="SwiperCarousel">
    <swiper ref="SwiperList" :options="SwiperList">
      <swiper-slide
        v-for="(item, index) in swiperCarousel_List.slice(20, 28)"
        :key="index"
      >
        <a-card hoverable class="card">
          <img
            @click="swiperClick(item.id)"
            slot="cover"
            alt="example"
            :src="item.img"
          />
          <a-card-meta :title="item.title">
            <template slot="description">
              <p class="description">www.stride.fun</p>
            </template>
          </a-card-meta>
        </a-card>
      </swiper-slide>
    </swiper>
    <div class="swiper-button-prev" slot="button-prev"></div>
    　　
    <div class="swiper-button-next" slot="button-next"></div>
  </div>
</template>

<script>
export default {
  name: "SwiperCarousel",
  data() {
    return {
      SwiperList: {
        slidesPerView: 4,
        spaceBetween: 10,

        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        },
        
        navigation: {
          nextEl: ".SwiperCarousel .swiper-button-next",
          prevEl: ".SwiperCarousel .swiper-button-prev",
        },
      },
    };
  },
  props: {
    swiperCarousel_List: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    swiper() {
      return this.$refs.SwiperList.$swiper;
    },
  },
  methods: {
    swiperClick(id) {
      this.$router.push(`/details/${id}`);
    },
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false);
  },
};
</script>

<style lang="less" scoped>
.SwiperCarousel {
  position: relative;
  width: 80%;
  margin: 0 auto;
}
.swiper-container {
  padding: 70px 0;
}
img {
  transform: scale(0.6);
}
.swiper-slide {
  width: 258px !important;
  margin: 10px !important;
}
.swiper-button-prev {
  left: -8%;
}
.swiper-button-next {
  right: -8%;
}
.swiper-button-prev,
.swiper-button-next {
  --swiper-theme-color: #ccc; /* 设置Swiper风格 */
  z-index: 1;
}
</style>