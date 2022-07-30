<template>
  <div class="magnifier" :style="{ width }">
    <div class="magnifier">
      <div class="middle-warp" ref="ref" @mousemove="move" @mouseover="isShow = true" @mouseleave="isShow = false">
        <img :src="imgsrc" class="middle-pic" alt="" />
        <!-- 大图容器 -->
        <div class="big" v-show="isShow">
          <img class="bigpic" :style="{
            marginLeft: bigPos.marginLeft + 'px',
            marginTop: bigPos.marginTop + 'px',
          }" :src="imgsrc" alt="" />
        </div>
        <!-- 透明块 -->
        <div class="mark" v-show="isShow" :style="{ top: markPos.top + 'px', left: markPos.left + 'px' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MagnifyingGlass",
  props: ['width', 'imgsrc'],
  data() {
    return {
      isShow: false, // 控制放大镜显示隐藏
      // 透明块样式
      markPos: {
        left: 0,
        top: 0,
      },
      // 大图片样式
      bigPos: {
        marginTop: 0,
        marginLeft: 0,
      },
    };
  },
  methods: {
    move(e) {
      // 获取可视页面距离屏幕顶部的距离
      // let st = document.body.scrollTop || document.documentElement.scrollTop;
      // 大盒子 获取鼠标移入的dom元素
      let middle = this.$refs.ref;
      // 获取大盒子到浏览器顶部距离
      let ot = middle.getBoundingClientRect().top;
      // console.log('ot=====>',ot);
      // 获取大盒子到浏览器左边距距离
      let lt = middle.getBoundingClientRect().left;
      // e.clientX 鼠标在浏览器的x坐标
      // 鼠标在大盒子的位置X，Y
      let x = e.clientX - lt;
      let y = e.clientY - ot;
      // 透明盒子一半
      x = x < 125 ? 125 : x;
      // 大盒子-透明一半
      x = x > 500 ? 500 : x;
      y = y < 125 ? 125 : y;
      y = y > 500 ? 500 : y;
      // 透明块位置
      this.markPos = {
        top: y - 125,
        left: x - 125,
      };
      // 大图片位置
      this.bigPos = {
        marginTop: -y * 1.28 + 160,
        marginLeft: -x * 1.28 + 160,
      };
      //   console.log(1);
    },
  },
};
</script>

<style lang='less' scoped>
.magnifier {
  margin: 100px auto;

  //   width: 500px;
  .middle-warp {
    width: 100%;
    position: relative;

    .middle-pic {
      width: 100%;
      // border: 1px solid #000;
    }

    .mark {
      position: absolute;
      top: 0;
      left: 0;
      width: 250px;
      height: 250px;
      background-color: rgba(0, 0, 0, 0.3);
      cursor: move ; //crosshair 加号 move 移动
    }

    .big {
      position: absolute;
      left: 630px;
      top: 0px;
      overflow: hidden;
      width: 500px;
      height: 500px;
      z-index: 1;
      border: 1px solid #e7e7e7;

      .bigpic {
        width: 1000px;
        // z-index: 999;
      }
    }
  }
}
</style>