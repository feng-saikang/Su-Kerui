<template>
  <div class="Conent_b">
    <Title><p>TALKING</p></Title>
    <ul>
      <li v-for="(item,index) in  swiper_list " :key="index" >
        <img
          :src="item.img"
        />
        <p class="tit">{{item.title}}</p>
        <p class="tit_">www.stride.fun</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Title from "components/common/title/Title.vue";
import {getImg} from '@/api/gitImg/getImg'

export default {
  components: { Title },
    data() {
    return {
      swiper_list:[],
    };
  },
  created() {
    this.getImg_();
  },
  methods: {
    //获取图片
    getImg_() {
      getImg({
        parent_name: "服饰",
        start: 16,
        end: 18,
      }).then(data=>{

        this.swiper_list=data
      })
    },
  },
};
</script>
<style lang="less" scoped>
.Conent_b {
  width: 100%;
  margin-bottom: 10%;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    li {
      cursor: pointer;
      width: calc(100% / 3 - 2%);
      .tit {
        text-align: center;
        margin: 40px 0 22px 0;
        font-family: "yg750";
        font-size: 20px;
        color: #333;
        line-height: normal;
        
      }
      .tit_ {
        font-family: "yg740";
        font-size: 12px;
        color: #666;
        line-height: 17px;
        text-align: center;
      }
      img {
        width: 100%;
      }
    }
  }
}
</style>