<template>
  <div class="swiper-and-list">
    <div class="swiper">
      <swiper ref="SwiperList" :options="SwiperList">
        <swiper-slide
          v-for="(item, index) in SwiperAndList_list.slice(23, 32)"
          :key="index"
        >
          <img :src="item.img" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        　　
        <div class="swiper-button-prev" slot="button-prev"></div>
        　　
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
    <div class="list">
      <div class="ancrad">
        <a-card
          v-for="(item, index) in SwiperAndList_list.slice(8, 16)"
          :key="index"
          hoverable
          class="card"
        >
          <template #cover>
            <img alt="example" :src="item.img" />
          </template>
          <a-card-meta :title="item.title">
            <template slot="description">
              <p class="description">www.instagram.com</p></template
            >
          </a-card-meta>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SwiperAndList",
  props: {
    SwiperAndList_list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      SwiperList: {
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //允许分页点击跳转
        },
        navigation: {
          nextEl: ".swiper .swiper-button-next",
          prevEl: ".swiper .swiper-button-prev",
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.SwiperList.$swiper;
    },
  },
  mounted() {
    this.swiper.slideTo(1, 1000, false);
  },
};
</script>

<style lang='less' scoped>
.swiper-and-list {
  width: 100%;
  display: flex;
  margin: 20px 0px;
  .swiper {
    width: 40%;
    margin: left 10px;
    .swiper-slide {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .swiper-button-prev,
    .swiper-button-next {
      --swiper-theme-color: #ccc; /* 设置Swiper风格 */
      z-index: 5;
    }
    .swiper-button-prev {
      left: 8%;
    }
    .swiper-button-next {
      right: 8%;
    }
  }
  .list {
    width: 60%;
    .ancrad {
      width: 100%;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      text-align: center;
      flex-wrap: wrap;
    }
    .card {
      width: calc((100% / 4) - 8px);
      margin: 4px;
    }
  }
}
</style>