<template>
  <div class="naveng" @mouseover="mouseover" @mouseleave="mouseleave">
    <div class="content">
      <ul class="clear-fix title">
        <li class="left" @click="linkSeconDary(item)" v-for="(item, index) in typeTwo[typeOneIndex]" :key="index">
          {{ item }}</li>
      </ul>
      <ul class="img">
        <li @click="linkDetailsId(item)" v-for="(item, index) in typeTwoImg[typeOneIndex]" :key="index">
          <div><img :src="item.img" alt=""></div>
          <p>{{ item.title }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: "NavEng",
  props: {
    // 当前显示二级导航的索引
    typeOneIndex: {
      type: Number,
      default: 0,
    },
    // 每个二级导航 显示的四张图片
    typeTwoImg: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      typeTwo: {},
    };
  },
  methods: {
    mouseover() {
      this.$store.dispatch('setNavBarShow', true)
    },
    mouseleave() {
      this.$store.dispatch('setNavBarShow', false)
    },
    linkSeconDary(item) {
      this.$router.push(`/secondary?type_tow=${item}`)
    },
    linkDetailsId(item) {
      this.$router.push(`/details/${item.id}`)
    }
  },
  mounted() {
    this.$bus.$on("typeTwo", (data) => { //bus接收
      this.typeTwo = data;
    });
    console.log(this.typeTwoImg);
  },
};
</script>

<style lang='less' scoped>
li {
  cursor: pointer;
}

.naveng {
  position: absolute;
  top: 65px;
  left: 0px;
  width: 100%;
  z-index: 99;
  padding: 30px 20px 20px 50px;
  background-color: #fff;

  .content {
    width: 1200px;
    margin: 0 auto;
    display: flex;

    .title {
      width: 600px;

      li {
        padding: 5px 10px;
        width: 25%;
        text-align: left;
        font-size: 12px;
        color: #4e4d4d;
      }
    }

    .img {
      padding: 0px 20px;
      display: flex;
      justify-content: space-between;

      li {
        img {
          width: 140px;
          height: 173px;
        }

        p {
          width: 140px;
          padding: 15px 0px;
          color: #333;
          font-size: 12px;
          white-space: nowrap; // 文本不换行
          overflow: hidden; // 超出部分隐藏
          text-overflow: ellipsis; // 超出部分显示成...
        }
      }
    }
  }
}
</style>