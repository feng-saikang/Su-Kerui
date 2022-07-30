<template>
  <div class="foooter_bar">
    <div class="footer">
      <div class="footernva">
        <a-row type="flex" justify="space-around">
          <a-col v-for="(item, index) in footer_list" :key="index" @click="toDetail(item)">
            {{
            item
            }}
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="footer_detail">
      <a-row>
        <a-col>
          <p>网站名称</p>
          <p>© 2009-2021 Stride.fun 版权所有 ICP主体备案号: 苏ICP备2021007111号</p>
          <a href="#">网站备案信息</a>
          <p>
            <img src="../../assets/images/beian/beian.png" alt />
            <a
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32011402010859"
            >苏公网安备 32011402010859号</a>
          </p>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="rightCol">
          <p>消费者损害赔偿保险</p>
          <p>客户在以现金支付安全交易时可以使用Wconcept订阅的 消费者损害赔偿保险服务。</p>
          <p>赔偿对象: 不送 / 退货, 拒绝退款 / 商家破产</p>
          <a href>
            <span>检查服务订阅事实</span>
          </a>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterNav",
  data() {
    return {
      footer_list: [
        "关于我们",
        "咨询服务",
        "合租伙伴查询",
        "服务条款",
        "隐私政策",
        "服务中心",
        "招聘信息",
        "全球的"
      ],
      // routerList:["/about",'/partner',"/privacy","/terms",'/global','/offers', ]
    };
  },
  methods: {
    toDetail(item) {
      if (item == "关于我们") {
        this.$router.push("/about", item);
      } else if (item == "咨询服务") {
        this.$router.push("/advisory", item);
      }else if (item == "隐私政策") {
        this.$router.push("/privacy", item);
      } else if (item == "服务条款") {
        this.$router.push("/terms", item);
      }else if(item== "合租伙伴查询"){
        this.$router.push('/partner',item)
      }else if(item == "全球的"){
        this.$router.push('/global',item)
      }else if(item == "招聘信息"){
        this.$router.push('/offers',item)
      }
    }
  }
};
</script>

<style lang='less' scoped>
.footernva {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #848484;
  color: #fff;
  .ant-col {
    padding: 0px 20px;
    &:hover {
      background-color: #414141;
      color: #f1f1f1;
    }
  }
}
.footer_detail {
  font-size: 14px;
  color: #333;
  display: flex;
  width: 100%;
  justify-content: space-around;
  text-align: left;
  .ant-col {
    margin: 5% 5% 10%;
    width: 100%;
    p {
      margin-bottom: 0px;
    }
  }
  .rightCol {
    border-left: 1px solid #e5e5e5;
    padding-left: 30px;
  }
}
</style>