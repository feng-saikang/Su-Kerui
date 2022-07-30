<template>
  <div class="details">
    <div class="detail_btn">
      <a-button ghost type="link" @click="$router.go(-1)">Go back</a-button>
      <a-button ghost type="link" @click="$router.go(1)">Go forward</a-button>
    </div>
    <div class="shopdetail">
      <!-- 最左侧图片展示 -->
      <div class="imglist">
        <ul>
          <li
            v-for="(item, index) in imgs"
            :key="index"
            @click="getImgSrc(item)"
          >
            <img :src="item.small" style="width: 80px" alt="小图" />
          </li>
        </ul>
      </div>
      <!-- goodlist 大图以及放大镜以及商品详细信息 -->
      <div class="goodlist">
        <!-- goodlist左边大图以及放大镜  -->
        <div class="goodlist-left">
          <!-- <template v-for="item in "> -->
          <magnifying-glass
            :imgsrc="imgsrc"
            :width="'625px'"
          ></magnifying-glass>
          <!-- </template> -->
        </div>
        <!-- goodlist右侧商品详细信息 -->
        <div class="goodlist-right">
          <!-- 详细信息 top 商品的title price 等信息 -->
          <div class="content">
            <h3 style="fontsize: 30px" class="title">{{ skuList.title }}</h3>
            <span class="price">￥{{ skuList.special_price }}</span>
            <span style="text-decoration: line-through" class="price-through"
              >￥{{ skuList.price }}</span
            >
            <!-- 详细信息下方的促销 -->
            <div class="promotion">
              <!-- todo 这个地方有问题 -->
              <span class="sales-promotion" v-if="skuList.is_special">{{
                skuList.is_special == 1 ? "促销" : "抢购"
              }}</span>
              <span class="baoyou">官方商城全场包邮</span>
            </div>
          </div>
          <!-- 小图片列表以及尺码选择 -->
          <div class="middle">
            <ul>
              <li
                v-for="(item, index) in imgs"
                :key="index"
                :class="{ click_active: clickIndex === index }"
                @click="getImgsrc_right(item, index)"
              >
                <img :src="item.small" alt="右侧小图" style="width: 63px" />
              </li>
            </ul>
            <!-- 尺码选择以及计数器 -->
            <div class="choose">
              <label for="size">尺码：</label>
              <el-select v-model="value" placeholder="M">
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>

              <label for="count">数量：</label>
              <input
                id="count"
                type="number"
                max="10"
                min="1"
                v-model="shopNum"
              />
            </div>
          </div>
          <!-- 加入购物车以及立即购买 -->
          <div class="paychoose">
            <el-button size="medium" class="addshop" @click="addShopCar"
              >加入购物车</el-button
            >
            <el-button size="medium" class="paynow">立即购买</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- DetailSortNav -->
    <div class="detail">
      <DetailSortNav
        ref="DETAIL"
        :Index="0"
        @intoWhich="whichOne"
      ></DetailSortNav>
      <DetailShop :imgs="imgs" />
    </div>

    <div class="review">
      <DetailSortNav ref="REVIEW" :Index="1" @intoWhich="whichOne" />
      <Review />
    </div>

    <div class="Q&A">
      <DetailSortNav ref="Q_A" :Index="2" @intoWhich="whichOne" />
      <QA />
    </div>

    <div class="ReturnDelivery">
      <DetailSortNav ref="RETURN_DELIVERY" :Index="3" @intoWhich="whichOne" />
      <ReturnDelivery />
    </div>
  </div>
</template>

<script>
import MagnifyingGlass from "../details/childComps/MagnifyingGlass.vue";
import DetailShop from "./childComps/DetailShop.vue";
import DetailSortNav from "./childComps/DetailSortNav.vue";
import Review from "./childComps/Review.vue";
import QA from "./childComps/Q&A.vue";
import ReturnDelivery from "./childComps/ReturnDelivery.vue";
import {
  getShopSku,
  getShopSpu,
} from "../../api/shopList/index.js";
import { getAddShopCar } from '@/api/shopCar/index.js'
export default {
  name: "Details",
  data() {
    return {
      options: [
        {
          value: "S",
          label: "选项1",
        },
        {
          value: "M",
          label: "选项2",
        },
        {
          value: "L",
          label: "选项3",
        },
        {
          value: "XL",
          label: "选项4",
        },
        {
          value: "XXL",
          label: "选项5",
        },
      ],
      value: "", //尺码选择
      shopNum: 1, //默认选择数量
      detailShop: [],
      spuList: [],
      skuList: [],
      data: [],
      imgs: [],
      imgsrc: "", //放大镜图片的路径
      isShow: false, //判断商品样式是否选择  true 已选择   false 未选择
      clickIndex: "",
      currentStyle: "", //当前点击商品的颜色信息
      styleSize: "M", //商品尺码信息
      lastStyle: "", //最后一次的尺码信息选择
      params: [], //存放商品颜色的数组
      token: "", //token
      shopCarList: [],//加入购物车的商品
    };
  },
  components: {
    MagnifyingGlass,
    DetailSortNav,
    DetailShop,
    Review,
    QA,
    ReturnDelivery,
  },
  created() {
    this.getShopDetailInfo();
    // this.getImgSrcCreat()
  },
  methods: {
    whichOne(ref) {
      this.$refs[ref].$el.scrollIntoView(true);
      console.log(this.$refs[ref].$el);
    },

    getShopDetailInfo() {
      let { id, category_id, title, store_id } = this.$store.state.ItemList;
      getShopSpu({ id, category_id, title, store_id }).then((data) => {
        this.spuList = data;
      });
      //getShopSku
      let spu_id = id;
      console.log("spu_id", spu_id);
      getShopSku(spu_id).then((data) => {
        console.log(data.data[0]);
        this.skuList = data.data[0];
        this.params = JSON.parse(this.skuList.param);
        console.log(this.params);
        this.imgs = JSON.parse(data.data[0].imgs);
        this.imgsrc = this.imgs[0].small;
      });
    },
    getImgSrc(item) {
      console.log(item.small);
      this.imgsrc = item.small;
    },
    getImgsrc_right(item, index) {
      this.imgsrc = item.small;
      this.clickIndex = index;
      this.currentStyle = this.params[index];
      console.log(this.currentStyle);
      this.isShow = !this.isShow;
      console.log(this.isShow);
    },

    // 加入购物车之前的判断，判断是否选择商品颜色
    //token  点击 +购物车  判断是否有token
    //思路：使用v-show来展示是否选择商品颜色，如果判断isShow是true，则点击“加入购物车”,直接跳转页面  如果isShow是false，则点击“加入购物车”，会弹框提示“未选择颜色”

    //加入购物车
    addShopCar(item) {
      console.log(item);
      this.token = this.$store.state.token;
      console.log(this.token);
      //如果已经登录
      if (this.token) {
        if (!this.currentStyle) {
          this.$message({
            message: "未选择商品颜色",
            type: "danger",
          })
        } else {
          
          //todo: 购物车中有相同的款式哦,您可以前去购物车修改数量

          // if ((this.lastStyle = this.currentStyle)) {
          //   this.$message({
          //     message: "购物车中有相同的款式哦,您可以前去购物车修改数量",
          //     type: "success",
          //   });
          //   return;
          // }
          // this.lastStyle = this.currentStyle;

          let data = {
            customer_id:JSON.parse(this.$store.state.user).id,
            num:this.shopNum,
            params:[this.currentStyle,this.styleSize],
            sku_id:this.skuList.id,
          }
          getAddShopCar(data).then(data=>{
            if(data.code === 200){
              this.$message({
                message:"添加购物车成功",
                type:'success',
              })
            }else {
              this.$message({
                message:'添加购物车失败',
                type:'danger'
              })
            }
          })   
        }
      } else {
        this.$message({
          message: "尚未登录，请先登录",
          type: "info",
        });
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.details {
  width: 1240px;
  margin: 0 auto;
  //   border: 1px solid #000;
  .detail_btn {
    display: inline-block;
    margin-left: -1055px;
    .ant-btn-link {
      border: none;
      text-align: left;
      color: #1890ff;
    }
  }
  .shopdetail {
    width: 100%;
    height: 100%;
    position: relative;
    // margin-bottom: 200px;
    .imglist {
      position: relative;
      width: 7%;
      top: 32px;
      li {
        margin-bottom: 20px;
      }
    }
    .goodlist {
      text-align: left;
      width: 1104px;
      height: 746px;
      position: absolute;
      // border: 1px solid #000;
      top: 55px;
      left: 50px;
      .goodlist-left {
        width: 53%;
        // height: 625px;
        position: absolute;
        top: -99px;
        left: 53px;
      }
      .goodlist-right {
        display: inline-block;
        width: 43%;
        height: 625px;
        // border: 1px solid #000;
        position: absolute;
        top: 16px;
        left: 705px;
        .title {
          font-size: 30px;
          margin: 0 0 15px;
          color: #000000d9;
        }
        .price {
          font-size: 26px;
          font-weight: 500;
          color: #000;
        }
        .price-through {
          color: #b0b0b0;
          margin-left: 5px;
          font-size: 16px;
          text-decoration-line: line-through;
          margin: 0 0 0 5px;
        }
        .promotion {
          font-size: 14px;
          width: 470px;
          height: 65px;
          margin-top: 25px;
          background-color: #f7f7f7;
          display: flex;
          align-items: center;
          .sales-promotion {
            display: inline-block;
            width: 44px;
            height: 22px;
            margin: 0 10px 0;
            background-color: #000;
            color: #fff;
            text-align: center;
          }
        }
        .middle {
          height: 280px;
          margin-bottom: 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              margin: 0 10px;
            }
          }
          .choose {
            width: 100%;
            height: 50px;
            line-height: 50px;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            ::v-deep .el-input__inner {
              // margin-left: -30px;
              width: 210px;
              outline: none;
              border: none;
              height: 45px;
              line-height: 45px;
              text-indent: 20px;
              margin-right: 20px;
              padding: 0;
              ::v-deep .el-select-dropdown__list {
                width: 200px;
              }
            }
            #count {
              width: 30%;
              outline: none;
              border: none;
              height: 30px;
              line-height: 30px;
              text-indent: 20px;
            }
          }
        }
        .paychoose {
          display: flex;
          justify-content: space-between;
          margin-top: 94px;
          .addshop {
            width: 223px;
            height: 60px;
            background-color: #fff;
            color: #000;
            border: 1px solid #666;
            border-radius: 0;
            font-size: 20px;
          }
          .paynow {
            height: 60px;
            width: 223px;
            background-color: #000;
            color: #fff;
            border-radius: 0;
            font-size: 20px;
          }
        }
      }
    }
  }
  .click_active {
    border: 1px solid #000;
  }
}
</style>