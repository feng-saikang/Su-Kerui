<template>
  <!-- 导航栏 -->
  <div class="navTop">
    <!-- logo 点击跳转 -->
    <div class="navs" @click="handleHome">
      <img v-show="true" src="../../../assets/images/logo/log.png" alt />
    </div>
    <div v-show="$store.state.searchShow" class="ipt">
      <span class="inpt">
        <input
          placeholder="潮流, 从搜索开始"
          style="width: 90%"
          @search="onSearch"
          class="ant-input"
          v-model="word"
        />
        <span>
          <a-icon type="search" @click="onSearch" />
        </span>
      </span>
    </div>
    <div class="icons">
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
        <p>{{carList.length}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { setLocalStorage } from "../../../utils/localStorage.js";
import { removeToken } from "@/plugins/cookie/index.js";
import { getShopCar } from "@/api/shopCar/index.js";
export default {
  name: "NavBarTop",
  data() {
    return {
      word: "",
      carList: []
    };
  },
  methods: {
    handleHome() {
      this.$router.push("/");
    },
    onSearch(val) {
      if (val.length != 0) {
        setLocalStorage("word", this.word);
        this.$router.push("/search?word=" + this.word);
      }
    },
    register() {
      this.$router.push("/signup");
    },
    login() {
      this.$router.push("/login");
    },
    shopCar() {
      this.$router.push("/shopCar");
    },
    logout() {
      this.$store.dispatch('logout','')
      this.$router.push('/home')
    },
    linkMy() {
      this.$router.push("/perscenter");
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
  }
};
</script>

<style lang="less" scoped>
.navTop {
  // height: 65px;
  display: flex;
  justify-content: space-between;
  padding: 0 5% 0 2%;
  overflow: hidden;
  & > navs {
    cursor: pointer;
    .img {
      width: 172px;
    }
  }
  & .ipt {
    width: 25%;
    margin: 20px 0px 0px 0px;
    display: flex;
    align-items: baseline;
    .inpt {
      display: inline-block;
      width: 100%;
      border-bottom: 2px solid #000;
      .ant-input {
        border: 0;
        box-shadow: none;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-variant: tabular-nums;
        list-style: none;
        font-feature-settings: "tnum";
        position: relative;
        display: inline-block;
        width: 100%;
        height: 32px;
        padding: 4px 11px;
        outline: none;
        border-width: 0;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        line-height: 1.5;
        background-color: #fff;
        background-image: none;
        // border: 1px solid #d9d9d9;
        border-radius: 4px;
        transition: all 0.3s;
      }
    }
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
}
</style>