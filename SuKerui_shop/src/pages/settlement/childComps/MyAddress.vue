<template>
  <div class="myAddress">
    <h1>结算</h1>
    <div class="harvest_address">
      <div>
        <span>收货地址</span>
      </div>
      <div v-if="!this.addressList.length" @click="addAddress">
        <i class="el-icon-circle-plus-outline"></i>
        新增收货地址
      </div>
    </div>
    <div
      class="content"
      v-for="(item, index) in defultAddressList"
      :key="index"
    >
      <div class="defultAddress">
        <p>
          <span>收货人：{{ item.name }}-{{ item.tel }}</span>
        </p>
        <p>
          <span>地址：{{ item.address }}</span>
        </p>
      </div>
      <div class="content_right">
        <div class="d_address">默认地址</div>
        <div class="content_right_operate">
          <span class="more" @click="moreEditWork">更多</span>
          <span>/</span>
          <span class="edit" @click="moreEditWork">编辑</span>
        </div>
      </div>
    </div>
    <address-add :dialogVisible="addressShow" />

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
          <div
            class="addressList"
            v-for="(item, index) in moreAddressList"
            :key="index"
          >
            <div class="addressItem">
              <div class="checked_more" @click="getRodioList">
                <input type="radio" name="address" id="" :checked="isChecked" />
              </div>
              <div class="address_content">
                <p>
                  收货人：{{ item.name }}-{{ item.tel
                  }}<span id="more_defultAddress" v-show="item.prime === 1"
                    >默认地址</span
                  >
                </p>
                <p>地址：{{ item.address }}</p>
              </div>
              <div class="more_right">
                <div>编辑</div>
                <div v-show="item.prime !== 1" @click="setDefAddress">
                  设置默认地址
                </div>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer" id="dialog-footer">
          <span class="more_add" @click="clickAdd">
            <i class="el-icon-circle-plus-outline"></i>
            新增收货地址
          </span>
          <el-button
            type="primary"
            @click="dialogFormVisible = false"
            id="primary_btn"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import AddressAdd from "@/components/common/AddRess/AddressAdd.vue";
import { getaddress, defaultAddress } from "@/api/user/index.js";
import { getUserOrder } from "@/api/Order/index.js";
import { getLocalStorage } from "@/utils/localStorage.js";

export default {
  components: { AddressAdd },
  name: "MyAddress",
  data() {
    return {
      addressShow: false,
      // isAddressShow: false, //新增地址是否展示
      addressList: [],
      defultAddressList: [], //收货地址区域渲染的默认地址的数组
      dialogFormVisible: false,
      isMoreEditShow: false, //点击更多、编辑弹出弹框
      moreAddressList: [], //点击更多跳出来的弹框中渲染的数据
      isChecked: false, //判断单选框是否被选择
      isSetDefult: true, //设置默认地址是否出现
      isBlackShow: false, //判断黑色块的默认地址是否出现
      rodioList: [], //存放单选框选择的地址
    };
  },
  created() {
    // this.getAddress();
    this.getaddress();
  },
  methods: {
    addAddress() {
      this.addressShow = !this.addressShow;
      // this.isAddressShow = true;
    },
    getaddress() {
      let customer_id = JSON.parse(getLocalStorage("user")).id;
      // console.log(customer_id);
      getaddress({ customer_id }).then((data) => {
        // console.log(data);
        if (data.code === 200) {
          this.addressList = data.data;
          //伪数组转化为数组
          let addAddress = [].slice.call(this.addressList);
          this.$store.dispatch("setaddresslist", this.addressList);
          this.defultAddressList = this.addressList.filter((item) => {
            return item.prime === 1;
          });
        } else {
          return;
        }

        // console.log(this.addressList[0]);
      });
    },
    moreEditWork() {
      this.dialogFormVisible = true;
      let more_addressList = [].slice.call(this.addressList);
      console.log(more_addressList);
      let data = {
        id: more_addressList[0].id,
        customer_id: more_addressList[0].customer_id,
        name: more_addressList[0].name,
        tel: more_addressList[0].tel,
        prime: more_addressList[0].prime,
        address: more_addressList[0].address,
      };
      console.log(data);
      getaddress(data).then((data) => {
        console.log(data.data);
        if (data.code === 200) {
          this.$message({
            message: "请求成功",
            type: "success",
          });
          data.data.forEach((item) => {
            console.log(item);
            if (item.prime === 1) {
              this.isChecked = true;
            }
          });
          this.moreAddressList = data.data;
        } else {
          return;
        }
      });
    },
    clickAdd() {
      this.addressShow = !this.addressShow;
    },
    setDefAddress() {
      let more_addressList = [].slice.call(this.addressList);
      console.log(more_addressList);
      let data = {
        id: more_addressList[0].id,
        customer_id: more_addressList[0].customer_id,
        prime: more_addressList[0].prime,
      };
      defaultAddress(data).then((data) => {
        console.log(data);
        if (data.code === 200) {
          this.$message({
            message: "设置默认地址成功",
            type: "success",
          });
          data.prime = 1;
          this.moreEditWork();
        }
      });
    },
    getRodioList() {
      let more_addressList = [].slice.call(this.addressList);
      more_addressList.forEach((item) => {
        if (item.isChecked) {
          this.defultAddressList = item;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.myAddress {
  width: 50vw;
  position: relative;
  h1 {
    padding: 20px;
    text-align: left;
  }
  .harvest_address {
    color: #ffffff;
    font-size: 16px;
    width: 100%;
    background-color: #4c4c4c;
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  .content {
    border: 1px solid #cccccc;
    display: flex;
    justify-content: space-between;
    text-align: left;
    .defultAddress {
      padding: 20px 25px;
      width: 80%;
      height: 100px;
    }
    .content_right {
      height: 100%;
      padding-top: 30px;
      padding-right: 32px;
      .d_address {
        background-color: #000;
        color: #ffffff;
        font-size: 12px;
        width: 55px;
        padding: 2px;
        border-radius: 2px;
      }
      .content_right_operate {
        display: flex;
        font-size: 15px;
        color: #999999;
        span {
          margin: 0 5px;
        }
      }
    }
  }
  .more_content {
    .title {
      display: flex;
      justify-content: space-between;
      width: 100%;
      border-bottom: 2px solid #e6e6e6;
      font-size: 21px;
      color: #000000d9;
    }

    .addressList {
      width: 100%;
      border-bottom: 2px solid #e6e6e6;

      .addressItem {
        display: flex;
        justify-content: space-around;
        .checked_more {
          width: 30%;
          display: flex;
          justify-content: space-between;
        }
        .address_content {
          padding: 20px 25px;
          width: 80%;
          height: 100px;
          text-align: left;
          #more_defultAddress {
            background-color: #000;
            color: #ffffff;
            font-size: 12px;
            width: 55px;
            padding: 2px;
            border-radius: 2px;
            margin-left: 5px;
          }
        }
        .more_right {
          width: 20%;
          padding-top: 30px;
          text-align: left;
          padding-right: 20px;
        }
      }
    }
  }
  #dialog-footer {
    height: 50px;
    width: 100%;
    line-height: 50px;
    text-align: end;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;

    ::v-deep .el-button--primary {
      background-color: #4c4c4c;
      color: #ffffff;
      width: 20%;
    }
  }
}
</style>