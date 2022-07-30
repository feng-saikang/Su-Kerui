<template>
  <div :class="{ navbar: true, fixed: isFixed }">
    <nav-bar-top />
    <nav-bar-bottom :logoShow="logoShow" :typeOne="typeOne" />
  </div>
</template>

<script>
import NavBarBottom from "./NavBarBottom.vue";
import { getParentName, getproduct, getTypeTwo } from "api/type/index.js";
import NavBarTop from "./NavBarTop.vue";
export default {
  components: { NavBarTop, NavBarBottom },
  name: "NavBar",
  data() {
    return {
      typeOne: [],
      typeTwo: [],
      isFixed: false,
      logoShow: false,
    };
  },
  methods: {
    // 获取一级分类标题
    getParentName() {
      console.log(getParentName());//获取promise
      getParentName().then((data) => {
        // console.log(data.data);
        this.typeOne = data.data;
        if (data.code === 200) {
          this.typeOne = data.data;
        }

      });
    },
    // 鼠标滚动事件处理函数
    scroll() {
      if (scrollY >= 70) {
        this.isFixed = true;
        this.logoShow = true;
      } else {
        this.isFixed = false;
        this.logoShow = false;
      }
    },
  },
  created() {
    this.getParentName();
  },
  watch: {
    typeOne() {
      let query = [];
      this.typeOne.forEach((item) => {
        query.push(getTypeTwo(item));
      });
      console.log(query);//一级标题里四个promise
      Promise.all(query).then((res) => { //四个promise全为fulfilled 执行.then
        console.log(res);//四个成功对象
        res.forEach((item) => {
          if (item.code === 200) {
            this.typeTwo.push(item.data);
          }
        });
        console.log(this.typeTwo);//获取四个相应数组（二级标题）
      });
    },
  },
  mounted() {
    this.$bus.$emit("typeTwo", this.typeTwo);//bus发送数据
    window.addEventListener("scroll", this.scroll);
  },
};
</script>

<style lang='less' scoped>
.navbar {
  width: 100%;
}

.fixed {
  position: fixed;
  top: -75px;
  z-index: 99;
}
</style>