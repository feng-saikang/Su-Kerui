<template>
  <!-- 购物车列表 -->
  <div class="shopCar">
    <div class="heng"></div>
    <h3 class="car-tltle">
      <span>我的购物车</span>
      <p>共{{ carList.length }}件</p>
    </h3>
    <div class="list">
      <div class="carHeader">
        <span class="all">
          <input type="checkbox" v-model="isAll" @change="changeAll" /> 全选
        </span>
        <span class="title">商品详情</span>
        <span class="pri">单价 / 元</span>
        <span class="number">数量 / 个</span>
        <span class="parmams">型号</span>
        <span class="handle">操作</span>
      </div>

      <div class="carMain">
        <!-- <template v-for="(item,index) in carList"> -->
        <div class="mainItem" v-for="(item, index) in carList" :key="index">
          <!-- 多选框 -->
          <input
            class="done"
            :value="item"
            v-model="checkeds"
            type="checkbox"
          />
          <!--  -->
          <img :src="item.img" alt="商品图片" />
          <span class="title">{{ item.title }}</span>
          <span class="pri">{{ item.price }}</span>
          <div class="num">
            <button @click="reduce(index)">-</button>
            <span>{{ item.num }}</span>
            <button @click="add(item)">+</button>
          </div>
          <span class="params">{{ params }}</span>
          <el-button type="info" round class="dele" @click="deleteShopCar(item)"
            >删除</el-button
          >
        </div>
        <!-- </template> -->
      </div>
      <h1 v-show="carList.length == 0">未添加商品</h1>
      <div class="carFooter" v-show="carList.length !== 0">
        <span class="add">总价格：¥{{ totalPrice }}</span>
        <el-button type="danger" round class="dele" @click="Settlement"
          >结算</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import {
  getShopCar,
  deleteShopCar,
  getAddShopCar,
} from "@/api/shopCar/index.js";

export default {
  name: "ShopCar",
  data() {
    return {
      isAll: false, // 是否全选
      totalPrice: 0, // 初始化总价格0
      checkeds: [], // 存放多选的列表
      carList: [], // 购物车列表
      params: [], //商品加入购物车时的颜色信息
      count: 1, //购物车默认数量
    };
  },
  methods: {
    // 全选按钮
    changeAll() {
      console.log("全选");
      if (this.isAll) {
        this.checkeds = this.carList;
        console.log(this.checkeds[0]);
      } else {
        this.checkeds = [];
      }
    },
    add(){},
    // 增加商品数量
    // add(item) {
    //   console.log(item.num);
    //   let data = {
    //     customer_id:JSON.parse(this.$store.state.user).id,
    //     num: item.num,
    //     params: item.params,
    //     sku_id:item.sku_id,
    //   }
    //   //先加
    //   getAddShopCar(data).then(data=>{
    //     console.log(data);
    //     data.num = this.num + 1;
    //   })
    //   //再删

    //   //再加
    //   getAddShopCar(data).then(data=>{
    //     console.log(data);
    //     data.num += 1 ;
    //   })

    // },
    // 减少商品数量
    reduce(Id) {
      if (this.carList[Id].count < 2) {
        return;
      } else {
        this.carList[Id].count--;
      }
    },

    // 获取购物车
    getShopCar() {
      // 获取购物车列表需要的参数
      let customer_id = JSON.parse(this.$store.state.user || {}).id;
      console.log(customer_id);
      getShopCar(customer_id).then((data) => {
        if (data.code == 200) {
          console.log(data);
          this.carList = data.data;
          console.log(this.carList);
          //todo: 商品信息
          if (this.carList.params == null) {
            return;
          } else {
            this.params = JSON.parse(this.carList.params).join();
            console.log(this.params);
          }
        } else if (data.code === 402) {
              this.carList = []
            } 
      });
    },
    // 删除购物车商品
    deleteShopCar(item) {
      this.$confirm("是否删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let id = item.id;

          deleteShopCar(id).then((data) => {
            if (data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getShopCar();
            }else {
              this.$message({
                type: "success",
                message: "删除失败!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //跳转结算页面
    Settlement() {
      this.$store.dispatch("setcheckslist", this.checkeds);
      console.log(this.checkeds);
      this.$router.push("/settlement");
    },
  },
  created() {
    // 初始化加载获取购物车

    this.getShopCar();
  },
  // 监听是否选中以及全选
  watch: {
    checkeds: {
      deep: true,
      handler(val) {
        console.log(val);
        console.log(val.length);
        let res = 0;
        val.forEach((item) => {
          res += item.num * item.price;
        });
        this.totalPrice = res;
        // 根据用户勾选列表,判断是否全选
        if (val.length === this.carList.length) {
          this.isAll = true;
        } else {
          this.isAll = false;
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.shopCar {
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
  .heng {
    width: 100px;
    border-bottom: 3px solid #000;
  }
  .car-tltle {
    padding-top: 20px;
    text-align-last: left;
    padding-left: 20px;
    span {
      font-size: 24px;
      font-weight: 700;
    }
  }
  .carHeader {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #000;
  }
  .carMain {
    background-color: #f5f5f5;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 50px;
    width: 100%;
    text-align: left;
    // height: 100px;
    // line-height: 100px;
    img {
      width: 8%;
      height: 8%;
      vertical-align: middle;
      margin-left: 5%;
    }
    .dele {
      width: 80px;
      height: 50px;
      margin-left: 8%;
    }
    .mainItem {
      width: 100%;
      margin: 10px 0;
      // height: 120px;
      // line-height: 120px;
      .done {
        margin-left: 5%;
      }
      .pri {
        display: inline-block;
        width: 100px;
        margin-left: 9%;
        text-align: center;
      }
      .title {
        width: 10%;
        margin-left: 1%;
        display: inline-block;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .num {
        display: inline-block;
        margin-left: 10%;
        button {
          width: 30px;
          height: 30px;
          line-height: 50%;
        }
        input {
          text-align: center;
          width: 30px;
          height: 30px;
        }
      }
      .params {
        display: inline-block;
        width: 100px;
        margin-left: 8%;
        text-align: center;
      }
    }
  }
  .list {
    margin-bottom: 10px;
  }
  .carFooter {
    background-color: antiquewhite;
    padding: 20px 30px 20px 30px;
    text-align: right;
    border-radius: 15px;
    .add {
      margin-right: 30px;
    }
  }
}
</style>