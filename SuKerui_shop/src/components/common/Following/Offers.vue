<template>
  <div class="offers">
    <div class="offer_text">
      <h2>招聘信息</h2>
    </div>
    <div class="off_pic">
      <img src="@/assets/images/following/img-recruit.jpg" alt />
    </div>
    <div class="off_text">
      <h3>招聘程序</h3>
      <p>每次筛选的成功申请者公告均单独进行。</p>
      <p>如果申请表中有任何虚假信息,入场可能会被取消。</p>
    </div>
    <div class="steps">
      <a-steps :current="1">
        <a-step title="收到文件" />
        <a-step title="面试" />
        <a-step title="第二次面试" />
        <a-step title="加入" />
      </a-steps>
    </div>
    <div class="step_head">
      <div class="step-left">
        <p>薪资条件</p>
        <p>根据公司章程-最中面试后的决定</p>
      </div>
      <div class="step-right">
        <p>工作地点</p>
        <p>首尔特别市江南区德黑兰路14街16号5楼(线馆驿三洞)</p>
      </div>
    </div>
    <div class="claim">
      <h3>应用</h3>
      <div class="claim-title">
        <h4>支援区域:</h4>
        <div class="claim-item">
          <el-radio-group v-model="gridData.radio">
            <el-radio :label="3">产品计划(w概念频道MD)</el-radio>
            <el-radio :label="6">营销</el-radio>
            <el-radio :label="9">手术</el-radio>
            <el-radio :label="12">设计</el-radio>
            <el-radio :label="16">产品开发(前排)</el-radio>
            <el-radio :label="18">其他</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="claim-title">
        <h4>申请人姓名:</h4>
        <div class="claim-item">
          <el-input v-model="gridData.inputName" size="small"></el-input>
        </div>
      </div>
      <div class="claim-title">
        <h4>出生日期:</h4>
        <div class="claim-item">
          <el-input v-model="gridData.inputDate" size="small"></el-input>
        </div>
      </div>
      <div class="claim-title">
        <h4>性别:</h4>
        <div class="claim-item">
          <el-radio-group v-model="gridData.radioSex">
            <el-radio :label="3">男</el-radio>
            <el-radio :label="6">女</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="claim-title">
        <h4>电子邮箱:</h4>
        <div class="claim-item">
          <el-input v-model="gridData.inputEmail" size="small"></el-input>
        </div>
      </div>
      <div class="claim-title">
        <h4>手机号码:</h4>
        <div class="claim-item">
          <el-input v-model="gridData.inputMob" size="small"></el-input>
        </div>
      </div>
      <div class="claim-title">
        <h4>电话号码:</h4>
        <div class="claim-item">
          <el-input v-model="gridData.inputTel" size="small"></el-input>
        </div>
      </div>
      <div class="claim-title">
        <h4>期末教育:</h4>
        <div class="claim-item">
          <el-select v-model="gridData.select" slot="prepend" placeholder="请选择学术背景" size="small">
            <el-option label="理发师" value="1"></el-option>
            <el-option label="电工" value="2"></el-option>
            <el-option label="厨师" value="3"></el-option>
          </el-select>
          <el-radio-group v-model="gridData.radioCon">
            <el-radio :label="3">已毕业</el-radio>
            <el-radio :label="6">参加</el-radio>
            <el-radio :label="9">休假</el-radio>
            <el-radio :label="12">辍学</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="claim-title">
        <h4>学校名 :</h4>
        <div class="claim-item">
          <el-input v-model="gridData.inputSch" size="small"></el-input>
        </div>
      </div>
      <div class="claim-title">
        <h4>主要的:</h4>
        <div class="claim-item">
          <el-input v-model="gridData.inputPri" size="small"></el-input>
        </div>
      </div>
      <div class="claim-title">
        <h4>附上简历:</h4>
        <div class="claim-item">
          <el-input v-model="gridData.inputBio" size="small"></el-input>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="info">选取文件</el-button>
          </el-upload>
        </div>
      </div>
      <div class="claim-last">
        <div class="checked">
          <el-checkbox v-model="gridData.checked">同意收集和使用个人信息(必填)</el-checkbox>
        </div>
        <div class="log">
          <el-button plain @click="dialogTableVisible = true">查看信息</el-button>
          <el-dialog title="个人和使用个人信息" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
              <el-table-column property="radio" label="支援区域"></el-table-column>
              <el-table-column property="inputName" label="申请人姓名" width="100"></el-table-column>
              <el-table-column property="inputDate" label="出生日期"></el-table-column>
              <el-table-column property="radioSex" label="性别"></el-table-column>
              <el-table-column property="inputEmail" label="电子邮件"></el-table-column>
              <el-table-column property="inputMob" label="手机号码"></el-table-column>
              <el-table-column property="inputTel" label="电话号码"></el-table-column>
              <el-table-column property="radioCon" label="期末教育"></el-table-column>
              <el-table-column property="inputSch" label="学校"></el-table-column>
              <el-table-column property="inputPri" label="特长"></el-table-column>
              <el-table-column property="inputBio" label="简历"></el-table-column>
            </el-table>
          </el-dialog>
        </div>
      </div>
      <div class="claim-footer">
        <div class="cancel">
          <el-button type="info">信息按钮</el-button>
        </div>
        <div class="apply">
          <el-button type="success">成功按钮</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gridData: {
        radio: "",
        inputName: "",
        inputDate: "",
        radioSex: "",
        inputEmail: "",
        inputMob: "",
        inputTel: "",
        select: "",
        radioCon: "",
        inputSch: "",
        inputPri: "",
        inputBio: "",
        checked: ""
      },

      dialogTableVisible: false
    };
  },
  methods: {
    alertInfo() {}
  }
};
</script>

<style lang="less" scoped>
.offers {
  width: 100%;
  margin: 10px auto;
  .offer_text {
    h2 {
      font-size: 44px;
      padding-top: 80px;
    }
  }
  .off_text {
    width: 1240px;
    margin: 0 auto;
    margin-top: 20px;
    text-align: left;
    h3 {
      font-size: 24px;
      font-weight: 700;
    }
  }
  .steps {
    width: 1240px;
    margin: 0 auto;
    margin-top: 30px;
    text-align: left;
  }
  .step_head {
    width: 1240px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
  }
  .claim {
    width: 1240px;
    margin: 0 auto;
    text-align: left;
    h3 {
      font-size: 24px;
      border-bottom: 2px solid #000;
    }
    .claim-title {
      border-bottom: 1px solid #d9d9d9;
      height: 60px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: left;
      h4 {
        width: 25%;
        text-align: right;
      }
      .claim-item {
        width: 70%;
        display: flex;
        justify-content: space-around;
        text-align: left;
      }
    }
    .claim-last {
      margin-top: 10px;
      background-color: #d9d9d9;
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: left;
      .checked {
        width: 25%;
        text-align: right;
      }
      .log {
        width: 70%;
        display: flex;
        justify-content: space-around;
        text-align: left;
      }
    }
    .claim-footer {
      margin: 100px 0;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: left;
      .cancel {
        margin-right: 10px;
      }
    }
  }
}
</style>