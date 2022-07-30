<template>

  <div class="rightNav">
    <div id="mune">
      <div class="mune-top">
        <a-button @click="showDrawer" id="button">
          <a-icon type="unordered-list" />
        </a-button>
        <a-drawer :visible="visible" class="custom-class" style="color: black" title="购物车" placement="right"
          @close="onClose" @after-visible-change="afterVisibleChange">
          <div class="title clear-fix" id="titleTop">
            <div class="titleLeft left">一共{{ carList.length }}件宝贝</div>
            <div class="titleRight right">
              <!-- <button @click="manage">管理</button> -->
              <el-button @click="manage" size="mini">管理</el-button>
            </div>
          </div>
          <h3 v-if="this.carList.length == 0">购物车已经空了!!!</h3>
          <div class="shop-item">
            <div class="shops clear-fix" v-for="item in carList" :key="item.id" maginTop="10px">
              <div class="pic left">
                <img :src="item.img" alt="商品图片" width="70px" />
              </div>
              <div class="detail right">
                <p id="title">{{ item.title }}</p>
                <p>{{ item.price }} 元 {{ params[1] }}</p>
              </div>
            </div>
          </div>
        </a-drawer>
      </div>
      <div class="mune-bom">
        <a-icon type="clock-circle" @click="openChar" />
        <div class="char" v-show="isShow">
          <div class="charTit">
            <div class="titLeft">SKR线上</div>
            <div class="titRight">
              <button @click="CloseChar">×</button>
            </div>
          </div>
          <div class="contorl">
            <el-button type="warning" id="goLogin" @click="goLogin" v-show="isGoLogin">去登录</el-button>
          </div>
          <div class="charFoot" v-show="isShowFoot">
            <el-input type="textarea" :rows="2" placeholder="请输入内容!" v-model="textarea"></el-input>
            <el-button size="mini" @click="send">发送</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="scroll">
      <div class="scroll-top" v-show="showTop" @click="goTop">∧</div>
      <div class="scroll-bom" v-show="showBom" @click="goEnd">∨</div>
    </div>
  </div>
</template>
<script>
import { getEventListeners } from "events";
import { getShopCar } from "@/api/shopCar/index.js";

export default {
  name: "RightNav",
  data() {
    return {
      visible: false,
      showTop: false, // 控制向上显示隐藏
      showBom: true, // 控制向下的箭头显示隐藏
      GetWindowHeight: {
        height: ""
      },
      isTobom: false, // 判断是否到底
      carList: [], // 购物车列表
      params: [], //商品加入购物车时的颜色信息
      isShow: false,
      textarea: "",
      isShowFoot: false,
      isGoLogin: true
    };
    isTobom: false // 判断是否到底
  },
  methods: {
    afterVisibleChange(val) { },
    showDrawer() {
      this.visible = true;
      // 获取购物车列表需要的参数
      let customer_id = JSON.parse(this.$store.state.user).id;
      getShopCar(customer_id).then(data => {
        if (data.code == 200) {
          this.carList = data.data;
          //todo: 商品信息
          if (this.carList.params == null) {
            return;
          } else {
            this.params = JSON.parse(this.carList.params);
          }
        }
      });
    },
    onClose() {
      this.visible = false;
    },
    goEnd() {
      window.scrollTo({
        // y方向坐标800px（代码中不需要写明单位）
        top: this.GetWindowHeight.height,
        // 滚动方式是平滑滚动 默认是auto 即instant 直接跳到目标位置  不常用
        behavior: "smooth"
      });
    },
    goTop() {
      window.scrollTo({
        // 滑轮滚动位置
        top: 0,
        // 滚动方式是平滑滚动
        behavior: "smooth"
      });
    },
    // 获取滑轮滚动的高度
    scrollHandle() {
      let top = Math.floor(
        document.body.scrollTop ||
        document.documentElement.scrollTop ||
        window.pageYOffset
      );
      // H 获取试图窗口加导航栏的高度
      let H = document.documentElement.clientHeight + 140;
      // 判断条件,滑轮滚动的距离超过导航栏的高度.隐藏显示向上的按钮
      if (top >= 65) {
        this.showTop = true;
      } else {
        this.showTop = false;
      }
      // h就是页面的高度减去窗口的高度
      let h = this.GetWindowHeight.height - H;
      // 判断条件, 当滑轮滚动的高度大于等于页面内容的高度减去窗口的高度,说明滑轮到底了, 向下箭头显示隐藏
      if (top >= h) {
        this.showBom = false;
      } else {
        this.showBom = true;
      }
    },
    getHeight() {
      // 获取正文高度
      this.GetWindowHeight.height = document.body.scrollHeight;
    },
    // 点击管理跳转购物车
    manage() {
      if (this.$store.state.token !== undefined) {
        this.$router.push("shopCar");
      } else {
        this.$router.push("login");
      }
    },
    // 打开聊天窗口
    openChar() {
      this.isShow = true;
      if (this.$store.state.token) {
        this.isShowFoot = true;
        this.isGoLogin = false;
      } else {
        this.isShowFoot = false;
        this.isGoLogin = true;
      }
    },
    // 关闭聊天窗口
    CloseChar() {
      this.isShow = false;
    },
    send() { },
    goLogin() {
      this.$router.push('/login')
    }
  },
  created() {
    window.addEventListener("scroll", this.scrollHandle, true);
    window.addEventListener("resize", this.getHeight); // 注册监听器
    this.getHeight(); // 页面创建时先调用一次
  },
  mounted() {
    window.removeEventListener("resize", this.getHeight);
  },
  updated() {
    window.addEventListener("resize", this.getHeight); // 注册监听器
    this.getHeight(); // 页面创建时先调用一次
  }
};
</script>

<style lang="less" scoped>
.rightNav {
  position: fixed;
  right: 0;
  bottom: 30px;
  width: 55px;
  text-align: center;
  font-size: 14px;
  background-color: black;
  z-index: 99;
  color: #ffff;
  box-sizing: border-box;

  .mune-top {
    padding: 14px 0;

    .title {
      height: 10%;
      display: flex;
      justify-content: space-around;
      background-color: rgb(72, 55, 31);
    }
  }

  .mune-bom {
    padding: 14px 0;
    color: #ffff;

    .char {
      width: 256px;
      height: 500px;
      position: fixed;
      background-color: blanchedalmond;
      bottom: 0px;
      right: 0;
      z-index: 99;

      .charTit {
        width: 100%;
        height: 64px;
        line-height: 64px;
        display: flex;
        justify-content: space-between;
        background-color: black;
        color: #ffff;

        .titLeft {
          margin-left: 60px;
          font-size: 24px;
        }

        button {
          height: 60px;
          width: 60px;
          margin-right: 20px;
          background-color: black;
          font-size: 24px;
          cursor: pointer;
        }

        .titLeft {
          text-align: center;
        }
      }

      .contorl {
        height: 500px;
      }

      .charFoot {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;
      }
    }
  }

  .scroll-top {
    padding: 14px 0;
    color: #ffff;
    font-size: 25px;
  }

  .scroll-bom {
    padding: 14px 0;
    color: #ffff;
    font-size: 25px;
  }
}

#title {
  width: 120px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#goLogin {
  margin-top: 50%;
}

#button {
  background-color: black;
  color: white;
  border-color: black;
}

#titleTop {
  padding: 5px 10px;
  margin-bottom: 10px;
}
</style>