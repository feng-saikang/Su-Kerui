<template>
  <div class="footerBar">
    <div class="foot">
      <div class="inner">
        <a href>
          <img src="@/assets/images/footer/1.png" alt />
        </a>
        <a href>
          <img src="@/assets/images/footer/1.png" alt />
        </a>
        <a href>
          <img src="@/assets/images/footer/1.png" alt />
        </a>
      </div>
      <div class="content_">
        <div class="notice">
          <a-tabs>
            <a-tab-pane key="1" tab="消息">
              <ul>
                <li>
                  <a href>· [指南](3/5罢工)</a>
                </li>
                <li>
                  <a href>· [指南] 3月1日</a>
                </li>
                <li>
                  <a href>· [信息] 客服</a>
                </li>
                <li>
                  <a href>· [concept]</a>
                </li>
                <li>
                  <a href>· [concept]</a>
                </li>
              </ul>
            </a-tab-pane>
            <a-tab-pane key="2" tab="活动公告" force-render>
              <ul>
                <li>
                  <a href>Content of Tab Pane 2</a>
                </li>
                <li>
                  <a href>Content of Tab Pane 2</a>
                </li>
                <li>
                  <a href>Content of Tab Pane 2</a>
                </li>
                <li>
                  <a href>Content of Tab Pane 2</a>
                </li>
                <li>
                  <a href>Content of Tab Pane 2</a>
                </li>
              </ul>
            </a-tab-pane>
          </a-tabs>
        </div>
        <div class="contact">
          <p>
            <span class="fuwu">服务中心</span>
            <span class="phone">1556-5027</span>
          </p>
          <p>营业时间</p>
          <p>28018010010@qq.com</p>
          <p>
            <button>常见问题</button>
            <button>1: 1查询</button>
            <span></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterBar",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.footerBar {
  width: 100%;
  padding-top: 90px;
  margin-bottom: 120px;
  .foot {
    width: 80%;
    height: 500px;
    margin: 0 auto;
    .inner {
      height: 130px;
      display: flex;
      justify-content: space-around;
      a {
        width: 33%;
        display: block;
        img {
          width: 100%;
        }
      }
    }
    .content_ {
      margin-top: 100px;
      width: 100%;
      display: flex;
      justify-content:left;
      .notice {
        width: 40%;
        text-align: left;
        margin-left: 10px;
        .ant-tabs-tab {
          font-size: 30px !important;
        }
      }
      .contact {
        text-align: left;
        margin-left: 100px;
        .fuwu {
          font-size: 22px;
        }
        .phone {
          font-size: 42px;
        }
        button {
          margin-top: 20px;
          width: 95px;
          height: 40px;
          line-height: 36px;
          color: #000;
          font-size: 14px;
          border: 1px solid black;
          border-radius: 0;
          margin-right: 10px;
          text-transform: uppercase;
          background-color:#fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>