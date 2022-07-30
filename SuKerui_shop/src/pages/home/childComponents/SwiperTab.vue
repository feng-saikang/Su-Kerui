<template>
  <div class="swiper-tab">
    <ul class="tab-list">
      <li
        :class="{ active: index === tabIndex }"
        @click="TabImg(index)"
        v-for="(item, index) in TabList"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
    <div class="tab-bottom clear-fix">
      <ul class="tab-img" :style="{ left: left + 'px' }">
        <li :style="{opacity: index == tabIndex ? 1 : 0.5}" v-for="(item, index) in TabImgList" :key="index">
          <img :src="item.img" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SwiperTab",
  props: {
    TabList: {
      type: Array,
      data: () => [],
    },
    TabImgList: {
      type: Array,
      data: () => [],
    },
  },
  data() {
    return {
      tabIndex: 1,
      leftList: [500, -105, -675, -1250],
      left: -105,
    };
  },
  methods: {
    TabImg(Index) {
      let oldleft = this.leftList[this.tabIndex];
      let newleft = this.leftList[Index];
      if (oldleft > newleft) {
        let timer = setInterval(() => {
          this.left -= 50;
          if (this.left <= newleft) {
            this.left = newleft;
            this.tabIndex = Index;
            clearInterval(timer);
          }
        }, 16.7);
      }
      if (oldleft < newleft) {
        let timer = setInterval(() => {
          this.left += 50;
          if (this.left >= newleft) {
            this.left = newleft;
            this.tabIndex = Index;
            clearInterval(timer);
          }
        }, 16.7);
      }
    },
  },
};
</script>

<style lang='less' scoped>
.swiper-tab {
  width: 100%;
  margin: 0 auto;
  .tab-list {
    width: 60%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    padding: 10px 0px;
    font-size: 20px;
    li {
      width: 60px;
      text-align: center;
      cursor: pointer;
      border-bottom: 3px solid transparent;
    }
  }
  .tab-bottom {
    width: 100%;
    position: relative;
    margin: 0 auto;
    padding: 3% 0 28%;
    overflow: hidden;
    .tab-img {
      // display: flex;
      width: 160%;
      position: absolute;

      //   left: -105px;
      top: 0px;
      li {
        // width: 40% !important;
        width: calc((95% / 4) - 8px);
        overflow: hidden;
        margin-right: 10px;
        display: flex;
        align-items: center;
        // opacity: 0.5;
        img {
          width: 100%;
        }
        float: left;
      }
    }
  }
}

.active {
  border-bottom: 3px solid #000 !important;
}

</style>