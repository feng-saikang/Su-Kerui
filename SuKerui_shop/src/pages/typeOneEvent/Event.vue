<template>
  <div class="event">
    <Title><p>EVENT</p></Title>
    <carousel />
    <cet-nav />
    <hot-key-word />
    <tab-btn @listTma="getChild" />
    <thumnail :list="msg" />
  </div>
</template>

<script>

import Carousel from "./childComps/Carousel.vue";
import CetNav from "./childComps/CetNav.vue";
import HotKeyWord from "./childComps/HotKeyWord";
import TabBtn from "./childComps/TabBtn";
import Thumnail from "./childComps/Thumnail";
export default {
  components: {
    Carousel,
    CetNav,
    HotKeyWord,
    TabBtn,
    Thumnail,
  },
  data() {
    return {
      msg: "All", // 接收Tab子组件的值 按钮的值
    };
  },
  methods: {
    getChild(val) {
      this.msg = val;
      console.log(val);
    },
  },
};
</script>

<style lang='less' scoped>
.event {
  width: 97%;
  margin: auto;
}
</style>