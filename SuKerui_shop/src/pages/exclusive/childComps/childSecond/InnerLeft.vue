<template>
  <div class="inner_left">
    <div
      class="inner_le"
      v-for="(item,index) in  swiper_list " :key="index"
    >
      <img :src="item.img" />
    </div>
  </div>
</template>

<script>
import { getImg } from "@/api/gitImg/getImg";
export default {
  data() {
    return {
      swiper_list: [],
    };
  },
  methods: {
    // handleClick(index){
    //     // console.log(this.$store.state.getImgs.getImgListaId[index]);
    //     this.$router.push(`/details/${this.$store.state.getImgs.getImgListaId[index]}`)
    // }
      getImg_() {
      getImg({
        parent_name: "服饰",
        start: 10,
        end: 13,
      }).then(data=>{
        this.swiper_list = data
      })
    },
  },
  created() {
    this.getImg_();
  },
};
</script>

<style lang="less" scoped>
.inner_left {
  width: 100%;
  display: flex;
  // flex-direction: column;
  justify-content: space-between;
  div {
    padding: 0 10px;
    cursor: pointer;
  }
  img {
    width: 100%;
  }
}
</style>