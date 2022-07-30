<template>
  <div class="navBottom">
    <div class="content">
      <!-- 一级目录 -->
      <a-row type="flex" justify="center">
        <a-col @mouseover="mouseover(index)" @mouseleave="mouseleave" @click="getTypeOne(item)"
          v-for="(item, index) in typeOne" :key="index">{{ item }}</a-col>
      </a-row>
      <a-row type="flex" justify="space-around">
        <a-col @click="link(index)" v-for="(item, index) in navRight" :key="index">
          {{ item }}
        </a-col>
      </a-row>
      <transition name="navshow">
        <!-- 二级 -->
        <nav-eng v-show="$store.state.navBarShow" :typeOneIndex="typeOneIndex" :typeTwoImg="typeTwoImg" />
      </transition>
    </div>
    <!-- 左边logo-->
    <div v-show="logoShow" class="logo">
      <img src="../../../assets/images/logo/log1.png" alt />
    </div>
    <!-- 右边登录购物车，隐藏显示 -->
    <div v-show="logoShow" class="utility icons">
      <div>
        <div v-if="!$store.state.token" class="icon" @click="register">
          <a-icon type="user-add" />
          <p>加入</p>
        </div>
        <div v-else class="icon" @click="logout">
          <a-icon type="logout" />
          <p>LOGPUT</p>
        </div>
      </div>
      <div>
        <div v-if="!$store.state.token" class="icon" @click="login">
          <a-icon type="login" />
          <p>登录</p>
        </div>
        <div v-else class="icon" @click="linkMy">
          <a-icon type="user" />
          <p>MY</p>
        </div>
      </div>

      <div class="icon" @click="shopCar">
        <a-icon type="shopping-cart" />
        <p>{{ carList.length }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import NavEng from "./NavEng.vue";
import { getImg } from "@/api/gitImg/getImg";
import { getShopCar } from "@/api/shopCar/index.js";
export default {
  name: "NavBarBottom",
  components: { NavEng },
  props: {
    // 一级标题
    typeOne: {
      type: Array,
      default: () => [],//默认
    },
    logoShow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      navRight: ["POP", "EXCLUSIVE", "EVENT", "BEST"],
      isShow: true,
      typeOneIndex: 0, // 一级导航索引
      typeTwoImg: [], // 二级导航图片展示
      carList: [],//购物车
    };
  },
  methods: {
    mouseover(index) {
      this.typeOneIndex = index;
      this.$store.dispatch("setNavBarShow", true);
    },
    mouseleave() {
      this.$store.dispatch("setNavBarShow", false);
    },
    getTypeOne(name) {
      console.log(name);
      this.$router.push("/primary?typeName=" + name);
    },
    register() {
      this.$router.push("/signup");
    },
    logout() {
      this.$store.dispatch('logout','')
      this.$router.push('/home')
    },
    link(index) {
      let routeLink = ['/wdna', '/exclusive', '/event', '/best']
      this.$router.push(`${routeLink[index]}`);
    },
    login() {
      this.$router.push("/login");
    },
    linkMy() {
      this.$router.push("/perscenter");
    },
    shopCar() {
      this.$router.push("/shopCar");
    },
    // 更新首页购物车的数量
    getShopCar() {
      let customer_id = JSON.stringify(this.$store.state.user).id;//parse()
      getShopCar(customer_id).then(data => {
        if (data.code == 200) {
          this.carList = data.data;
          //todo: 商品信息
          if (this.carList.params == null) {
            return;
          } else {
            this.params = JSON.stringify(this.carList.params);//parse()
          }
        }
      });
    }
  },
  created() {
    this.getShopCar();
  },
  watch: {
    typeOne() {
      let query = [];
      this.typeOne.forEach((item) => {
        query.push(getImg({ parent_name: item, start: 16, end: 19 }));
      });
      // console.log(query);
      Promise.all(query).then((res) => {
        console.log(res);
        this.typeTwoImg = res;
      });

    }
  },
  mounted() {
    /* let data = { parent_name: '服饰', start: 16, end: 18 }
    this.typeTwoImg = getImg(data)
    console.log(this.typeTwoImg); */

  },
};
</script>

<style lang="less" scoped>
.navBottom {
  position: relative;
  height: 65px;
  display: flex;
  justify-content: space-between;
  color: #fff;
  padding: 0 5% 0 2%;
  background-color: black;

  .content {
    display: flex;
    justify-content: space-around;
    width: 100%;

    .right {
      display: flex;

      li {
        display: block;
        float: left;
        margin-right: 50px;
        line-height: 65px;
      }
    }

    .ant-col {
      line-height: 65px;
      padding: 0px 30px;

      &:hover {
        color: #04bd9e;
        cursor: pointer;
      }
    }
  }

  .logo {
    width: 172px;
    position: absolute;
    left: 0px;
    top: 0px;
  }
}

.navshow-enter-active,
.navshow-leave-active {
  transition: opacity 0.5s;
}

.navshow-enter,
.navshow-leave-to {
  opacity: 0;
}

.icons {
  width: 14%;

  .icon {
    float: left;
    width: 33%;

    i {
      margin-top: 20%;

      font-size: 20px;
    }

    p {
      font-size: 14px;
      // margin-top: 10%;
    }
  }
}
</style>