<template>
  <div class="midCard">
    <el-card>
      <el-form
        :label-position="labelPosition"
        label-width="120px"
        :model="shopList"
        ref="shopList"
        :rules="rules"
      >
        <el-form-item label="上传头像: ">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:3000/upload/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" id="avatar" />
            <i v-else class="el-icon-plus" id="avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺名称 :" prop="name">
          <el-input v-model="shopList.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址 :" prop="address">
          <el-input v-model="shopList.address"></el-input>
        </el-form-item>
        <el-form-item label="店铺介绍 :" prop="desc">
          <el-input type="textarea" v-model="shopList.desc"></el-input>
        </el-form-item>
        <el-form-item label="联系方式 :" prop="tel">
          <el-input v-model="shopList.tel"></el-input>
        </el-form-item>
        <el-form-item label="店铺所在区域 :">
          <el-input v-model="shopList.region"></el-input>
        </el-form-item>
        <el-form-item label="店主姓名 :" prop="real_name">
          <el-input v-model="shopList.real_name"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="modify('shopList')">确认修改</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getLocalStorage } from "@/utils/localStorage";
import { getInfo, updateShop } from "@/api/user";

export default {
  data() {
    return {
      imageUrl: "",
      labelPosition: "right",
      shopList: {
        avatar:'',
        name: "",
        address: "",
        desc: "",
        tel: "",
        region: "",
        real_name: ""
      },
      rules: {
        name: [
          { required: true, message: "店铺名称不能为空", trigger: "blur" }
        ],
        address: [
          { required: true, message: "店铺地址不能为空", trigger: "blur" }
        ],
        desc: [
          { required: true, message: "店铺介绍不能为空", trigger: "blur" }
        ],
        tel: [{ required: true, message: "联系方式不能为空", trigger: "blur" }],
        region: [
          { required: true, message: "店铺所在区不能为空", trigger: "blur" }
        ],
        real_name: [
          { required: true, message: "店主姓名不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.photoPath;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    reset() {
      this.shopList = {};
      this.imageUrl = '';
    },
    modify(str) {
      this.$refs[str].validate((valid) => {
        if (valid) {
          let data = this.shopList;
          console.log(data);
          if (!data.avatar) {
            this.$message({
              message: "请上传图片",
              type: "warning"
            });
            return;
          }
          updateShop({
            avatar: this.imageUrl,
            name: data.name,
            address: data.address,
            desc: data.desc,
            tel: data.tel,
            region: data.region,
            real_name: data.real_name,
            id: data.id
          }).then(res => {
            if (res.code == 200) {
              this.$message({
                message: "恭喜你,修改店铺信息成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "修改失败！",
                type: "error"
              });
            }
          });
        }
      });
    }
  },
  created() {
    // 初始化页面获取localStorage中的信息
    let storage = JSON.parse(getLocalStorage("info"));
    // 根据id 获取数据库中店铺的信息
    getInfo({ id: storage.id }).then(res => {
      // 将获取到的店铺信息添加到shopList中
      this.shopList = res.data[0];
    });
  }
};
</script>

<style lang="scss" scoped>
.midCard {
  width: 720px;
  padding: 25px 35px 15px 35px;
  margin: 20px auto;
  // background-color: aquamarine;
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100px;
    height: 100px;
  }
  #avatar {
    width: 100%;
  }
  #avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .btn {
    margin-left: 120px;
  }
}
</style>