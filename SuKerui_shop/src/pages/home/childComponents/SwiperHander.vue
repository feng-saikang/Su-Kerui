<template>
  <div class="skrbanner" :style="width">
    <el-carousel :height='height' indicator-position="outside">
      <el-carousel-item :height='height' v-for="(item, index) in swiperList" :key="index">
        <img :src="item.swiperImg" :style="{width:imgWidth, height:imgHeight}" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "SwiperHander",
  props: {
    // 设置轮播图宽度
    width: {
      type: String,
      default: "1920px",
    },
    // 轮播图数据
    swiperList: {
      type: Array,
      required: true,
    },
    height: {
      type: String,
      default: '600px'
    },
    imgWidth: {
      type: String,
      required: true,
    },
    imgHeight: {
      type: String,
      required: true,
    }
  },
};
</script>

<style lang='less' scoped>

</style>