<template>
  <div class="moveAddress">
    <!-- 点击更多，编辑跳出的弹框 -->
    <div class="more_edit_work">
      <el-dialog :visible.sync="dialogFormVisible">
        <div class="more_content">
          <div class="title">
            <div class="title_left">选择您的收货地址</div>
            <div class="title_right">
              <!-- <i class="el-icon-circle-close"></i> -->
            </div>
          </div>
          <li>
            <div class="checked_more">
              <input type="radio" name="address" id="" />
            </div>
            <div class="address_content">
              <p>收货人：</p>
              <p>地址：</p>
            </div>
            <div class="more_right">
              <div>编辑</div>
              <div>设置默认地址</div>
            </div>
          </li>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getaddress } from "@/api/user/index.js";
import bus from '../../../main.js'
export default {
  name: "MoreAddress",
  data() {
    return {
      moreAddressList: [], //存放收货信息
      data: [],
    };
  },
  created() {
    bus.$on("getInfo", (data) => {
      this.data = data;
    });
  },
  methods: {
    getaddress() {
      let data = {
        customer_id: this.data.customer_id,
        name: this.data.name,
        tel: this.data.tel,
        prime: this.data.prime,
        address: this.data.address,
        id: this.data.id,
      };
      getaddress(data).then((data) => {
        if(data.code === 200){
            this.moreAddressList = data.data;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.more_content {
  .title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 2px solid #e6e6e6;
    font-size: 21px;
    color: #000000d9;
  }
  .checked_more {
    line-height: 100px;
  }
  li {
    border-bottom: 2px solid #e6e6e6;
    display: flex;

    .address_content {
      padding: 20px 25px;
      width: 80%;
      height: 100px;
      text-align: left;
    }
  }
  .more_right {
    height: 100px;
    padding-top: 30px;
    text-align: left;
    padding-right: 20px;
    div {
      margin-bottom: 1px;
    }
  }
}
</style>