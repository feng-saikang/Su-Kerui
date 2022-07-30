<template>
    <div class="advisory">
        <div class="adv">
            <h2>咨询服务</h2>
        </div>
        <div class="fromStep">
            <ul>
                <li>
                    <span class="step">步骤01</span>
                    <i>
                        <i class="el-icon-document"></i>
                    </i>
                    <strong>
                        <span>填写合作伙伴/进入申请</span>
                    </strong>
                    <p>请申请隶属关系/进入</p>
                </li>
                <li>
                    <span class="step">步骤02</span>
                    <i>
                        <i class="el-icon-document"></i>
                    </i>
                    <strong>
                        <span>查看并与负责人联系</span>
                    </strong>
                    <p>在每个领域的负责人审核之后，如果商店合适，我们将通过电话或电子邮件与您联系</p>
                </li>
                <li>
                    <span class="step">步骤03</span>
                    <i>
                        <i class="el-icon-document"></i>
                    </i>
                    <strong>
                        <span>条件咨询及合同签订</span>
                    </strong>
                    <p>在讨论合伙的细节和条件后，订立合同</p>
                </li>

            </ul>
        </div>
        <div class="note">
            <h3>※申请店铺咨询时的注意事项</h3>
            <p> 1.如果您申请商店咨询，我们将在内部审查后通知您进入商店的可能性和合同程序。 </p>
            <p> 2.办理入住手续可能需要一段时间，因此请避免注册重复，并避免与MD联络以及通过客户中心查询可用性。 </p>
            <p> 3. W. Concept基于真正的处理方式，只有设计和生产自己的品牌公司才可以进入商店。（不允许进入商店买卖品牌或处理假货） </p>
            <p> 4.必须指定负责人以促进产品管理（MD）和订单管理（交货/ CS处理），如果不能这样做，则可能会拒绝接纳。 </p>
        </div>
        <!-- 表单 -->
        <div>
            <div class="fromMain">
                <el-form ref="form" :model="form" label-width="25%" label-position="left">
                    <el-form-item label="查询分类：">
                        <el-select v-model="form.region" placeholder="选择查询类型">
                            <el-option label="Zone one" value="Zone one"></el-option>
                            <el-option label="Zone two" value="Zone two"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="类别分类：">
                        <el-select v-model="form.region" placeholder="选择查询类型">
                            <el-option label="Zone one" value="Zone one"></el-option>
                            <el-option label="Zone two" value="Zone two"></el-option>
                        </el-select>
                        <el-select v-model="form.region" placeholder="选择查询类型">
                            <el-option label="Zone one" value="Zone one"></el-option>
                            <el-option label="Zone two" value="Zone two"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="公司名称：">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌：">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人：">
                        <el-input v-model="form.name" style="width:50%"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码：">
                        <el-select v-model="form.region" placeholder="02" class="select_sort">
                            <el-option label="Zone one" value="08"></el-option>
                        </el-select>
                        <el-input v-model="form.name" class="select_sort"></el-input>
                        <el-input v-model="form.name" class="select_sort"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人手机号码：">
                        <el-select v-model="form.region" placeholder="02" class="select_sort">
                            <el-option label="Zone one" value="08"></el-option>
                        </el-select>
                        <el-input v-model="form.name" class="select_sort"></el-input>
                        <el-input v-model="form.name" class="select_sort"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电子邮件">
                        <el-input v-model="form.name" class="select_sort"></el-input>@
                        <el-input v-model="form.name" class="select_sort"></el-input>
                        <el-select v-model="form.region" placeholder="02" class="select_sort">
                            <el-option label="Zone one" value="直接输入"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="网站地址">
                        http://<el-input v-model="form.name" style="width:50%"></el-input>
                    </el-form-item>
                    <el-form-item label="公司地址">
                        <el-input v-model="form.name" style="width:50%"></el-input>
                        <el-button>查找邮政编码</el-button>
                        <el-input v-model="form.name" style="width:40%"></el-input>
                        <el-input v-model="form.name" style="width:40%"></el-input>
                    </el-form-item>
                    <el-form-item label="关于我们">
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="name">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="产品类别" prop="resource">
                        <el-radio-group v-model="ruleForm.resource">
                            <el-radio label=" 国内产品经销 "></el-radio>
                            <el-radio label=" 收入 "></el-radio>
                            <el-radio label=" 自我生产 "></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="销售方式" prop="resource">
                        <el-radio-group v-model="ruleForm.resource">
                            <el-radio label=" 寄售 "></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="产品介绍">
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="name">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="领带店进入状态">
                        <el-input v-model="form.name" style="width:100%"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌介绍">
                        <el-input v-model="form.name" style="width:70%"></el-input>
                        <el-button>文件选择</el-button>
                    </el-form-item>
                    <el-form-item label="防止自动注册">
                    </el-form-item>
                </el-form>
            </div>
            <!-- 同意 -->
            <div class="viewContent">
                <el-checkbox v-model="checked">同意收集和使用个人信息(必填)</el-checkbox>
                <button>查看内容</button>
            </div>
            <!-- 申请 -->
            <div class="application">
                <el-row>
                    <el-button>取消</el-button>
                    <el-button class="button-apply">申请</el-button>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name:'',
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            checked: false
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
}


</script>

<style lang="less" scoped>
.advisory {
    width: 100%;

    .adv {
        width: 100%;
        height: 200px;
        padding-top: 81px;
        text-align: center;

        h2 {
            font-size: 44px;
        }
    }

    .fromStep {
        width: 80%;
        height: 184px;
        text-align: center;
        margin: 0 auto 20px;

        ul {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            li {
                position: relative;
                height: 100%;
                flex: 1;
                border: 1px solid #d9d9d9;
                padding: 0 20px;

                .step {
                    position: absolute;
                    top: 5%;
                    left: 5%;
                    color: #a5a5a5;
                    font-size: 14px;
                }

                i {
                    position: absolute;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-style: normal;
                    font-size: 36px;
                }

                strong {
                    display: inline-block;
                    margin: 90px 0 6px;
                    font-size: 16px;
                    color: #000000A6;
                }

                p {
                    font-size: 14px;
                    color: #666;
                }
            }

            &:before {
                position: absolute;
                top: 50%;
                left: 32.2%;
                display: inline-block;
                content: ">";
                width: 30px;
                height: 30px;
                line-height: 1;
                text-align: center;
                border: 1px solid #d9d9d9;
                background-color: #fff;
                border-radius: 50%;
                font-size: 24px;
                color: #d9d9d9;
                z-index: 2;
            }

            &:after {
                position: absolute;
                top: 50%;
                left: 65.32%;
                display: inline-block;
                content: ">";
                width: 30px;
                height: 30px;
                line-height: 1;
                text-align: center;
                border: 1px solid #d9d9d9;
                background-color: #fff;
                border-radius: 50%;
                font-size: 24px;
                color: #d9d9d9;
                z-index: 2;
            }
        }
    }

    .note {
        width: 80%;
        padding: 40px 42px;
        margin: 0 auto 70px;
        background-color: #eee;
        font-size: 14px;
        line-height: 24px;
        text-align: left;

        h3 {
            padding-bottom: 15px;
            margin-bottom: 0;
        }

        p {
            font-size: 14px;
            line-height: 24px;
            margin-bottom: 0;
            color: #000000A6;
        }
    }

    .fromMain {
        width: 80%;
        margin: 0 auto 20px;
        border-top: 2px solid #000;
        padding: 20px 30px;

        form>div {
            width: 100%;
            margin: 0 auto;
            line-height: 68px;
            padding: 14px 60px;
            border-bottom: 1px solid #ccc;
        }

        button {
            height: 32px;
            line-height: 32px;
            border: 0;
            padding: 0 30px;
            background-color: #7d7d7d;
            color: #fff;
        }
       
        // 号码邮件
        .select_sort {
            width: 15%;
            margin: 0 5px;
        }
    }

    // 同意
    .viewContent {
        width: 75%;
        height: 50px;
        margin: 0 auto;
        line-height: 2;
        padding: 13px 40px 0;
        background-color: #f2f2f2;
        display: flex;
        justify-content: space-between;

        button {
            min-width: 60px;
            padding: 0 8px;
            height: 20px;
            line-height: 18px;
            background-color: #fff;
        }
    }

    // 申请
    .application {
        width: 100%;
        height: 50px;
        margin-top: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 90px;

        button {
            min-width: 180px;
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            text-align: center;
            padding: 0 20px;
            border: 1px solid #000;
            border-radius: 0;
            color: #000;
        }

        .button-apply {
            background-color: #000;
            color: #fff;
        }
    }

}
</style>