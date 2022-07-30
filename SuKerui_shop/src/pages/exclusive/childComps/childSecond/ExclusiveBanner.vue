<template>
  <!-- 1 -->
  <div class="exclusive_banner">
    <div calss="slide_wraps" :style="{ width: '65%', float: 'left' }">
      <my-swiper
      :imgs="swiper_list"
        :Mystyle="{ width: '100%', height: '100%' }"
      ></my-swiper>
    </div>
    <div class="thumbnail">
      <ul>
          <a-card
          hoverable
          :style="{ width: '46%', margin: '0 2% 2%' }"
          v-for="(item, index) in swiper_list"
          :key="index"
        >
          <img slot="cover" alt="example" :src="item.img" />
          <a-card-meta :title="item.title">
            <template slot="description"> www.stride.fun </template>
          </a-card-meta>
        </a-card>
      </ul>
    </div>
  </div>
</template>

<script>
import MySwiper from "@/components/common/myswiper/MySwiper.vue";
import {getImg} from '@/api/gitImg/getImg'
export default {
  components: { MySwiper },
  name: "ExclusiveBanner",
  data() {
    return {
      swiper_list:[],
    };
  },
  created() {
    this.getImg_();
  },
  methods: {
    //获取图片
    getImg_() {
      getImg({
        parent_name: "服饰",
        start: 10,
        end: 15,
      }).then(data=>{
        this.swiper_list=data
      })
    },
  },
  computed: {},
};
</script>

<style lang="less" scoped>
.exclusive_banner {
  position: relative;
  overflow: hidden;
  width: 100%;

  .thumbnail {
    float: right;
    width: 33.5%;
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      //  height: 700px;
    }
  }
}
</style>0