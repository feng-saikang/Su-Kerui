<template>
  <div class="primary">
    <div class="title">
      <h1>{{data.parent_name}}</h1>
    </div>
    <div class="tag">
      <div class="tagItem">
        <div class="hotTag">
          <p>热门标签</p>
        </div>
        <div class="hotTagItem">
          <el-button round v-for="(item,index) in title" :key="index" @click="toSearch(item)">
            <span># {{item}}</span>
          </el-button>
        </div>
      </div>
      <div class="tagSearch">
        <div class="ipt">
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
      </div>
    </div>
    <div class="breadTitle">
      <p>
        <span>
          <a href="#/Home">Home</a>
        </span>
        <span>/</span>
        <span>Primary</span>
      </p>
    </div>
    <div class="primaryItem">
      <div class="titleList">
        <div class="mask">
          <p>{{data.parent_name}}</p>
          <span>stride.fun</span>
        </div>
        <div class="header">
          <p>热销</p>
        </div>
        <div class="typeList">
          <ul>
            <li v-for="(item,index) in shopList.slice(0,10)" :key="index" @click="goToDetails(item)">
              <div class="typeItem">
                <h4>
                  <a href="::JavaScript">{{item.title}}</a>
                </h4>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="primaryList">
        <Recommend :ShopList="shopList"></Recommend>
      </div>
    </div>
  </div>
</template>

<script>
import { getproduct, getTypeTwo } from "@/api/type/index.js";
import RecommendVue from "@/components/common/Recommend/index";
import { setLocalStorage } from "@/utils/localStorage";
export default {
  name: "Primary",
  data() {
    return {
      title: [],
      shopList: [],
      data: {},
      word: ""
    };
  },
  methods: {
    // 以及分类下搜索跳转搜索页
    onSearch() {
      if (this.word.length != 0) {
        setLocalStorage("word", this.word);
        this.$router.push("/search?word=" + this.word);
      }
    },
    goToDetails(item) {
      //跳转详情页面
      this.$store.dispatch("setitemlist", item);
      this.$router.push(`/details/${item.id}`);
    },
    toSearch(word) {
      // 按钮标签跳转搜索页
      if (word.length != 0) {
        setLocalStorage("word", word);
        this.$router.push("/search?word=" + word);
      }
    },
    // 获取一级分类下的商品
    getTypeOne(name) {
      getproduct(name).then(result => {
        this.shopList = result.res;
      });
    },
    // 获取二级分类下的商品
    getTypeTwo(name) {
      getTypeTwo(name.parent_name).then(res => {
        let arr = res.data;
        for (let i = 0; i < arr.length; i++) {
          let index = Math.floor(Math.random() * arr.length);
          // 二级分类标签只有六个的判断条件
          if (this.title.indexOf(arr[index]) === -1 && this.title.length < 6) {
            this.title.push(arr[index]);
          }
        }
      });
    }
  },
  created() {
    let name = this.$route.query.typeName;
    this.data = { parent_name: name };
    this.getTypeOne(this.data);
    this.getTypeTwo(this.data);
    this.title = [];
  },
  watch: {
    // 监听路由变化
    $route(to, from) {
      this.name = this.$route.query.typeName;
      this.data = { parent_name: this.name };
      this.getTypeOne(this.data);
      this.getTypeTwo(this.data);
      this.title = [];
    }
  }
};
</script>

<style lang="less" scoped>
.primary {
  width: 100%;
  margin-top: 30px;
  .title {
    text-align: center;
    h1 {
      font-size: 48px;
    }
  }
  .tag {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    .tagItem {
      width: 60%;
      display: flex;
      text-align: center;
      justify-content: left;
      font-size: 14px;
      .hotTag {
        width: 30%;
      }
      .hotTagItem {
        width: 60%;
        text-align: left;
        button {
          margin-bottom: 10px;
          margin-right: 10px;
        }
      }
    }
    .tagSearch {
      width: 20%;
      text-align: left;
      .ipt {
        display: inline-block;
        width: 100%;
        border-bottom: 2px solid #000;
        .inpt {
          .ant-input {
            border: 0;
            box-shadow: none;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-variant: tabular-nums;
            list-style: none;
          }
        }
      }
    }
  }
  .breadTitle {
    width: 100%;
    padding: 1% 0;
    p {
      display: block;
      width: 55%;
      margin: 0 auto;
      text-align: left;
      span {
        margin-right: 10px;
      }
    }
  }
  .primaryItem {
    width: 100%;
    padding: 0 2%;
    display: flex;
    justify-content: left;
    .titleList {
      width: 16%;
      text-align: left;
      padding: 5px;
      .mask {
        height: 155px;
        padding: 30px 0 30px 30px;
        background-color: #5a5a5a;
        font-size: 30px;
        p {
          color: #fff;
          font-weight: 100;
        }
        span {
          font-size: 26px;
          color: #fff;
        }
      }
      .header {
        height: 53px;
        background-color: #f2f2f2;
        font-family: "yg740";
        font-size: 18px;
        color: #333;
        padding: 16px 0 16px 30px;
        margin-bottom: 20px;
      }
      .typeList {
        height: 300px;
        li {
          border-bottom: 1px solid #e8e8e8;
          text-align: left;
          color: #666;
          text-align: left;
          padding: 10px 5px 0px;
          width: 80%;
          font-size: 12px;
          a {
            width: 60%;
          }
        }
      }
    }
  }
  .primaryList {
    width: 100%;
  }
}
</style>