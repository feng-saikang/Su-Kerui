// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs");
const SmsClient = tencentcloud.sms.v20190711.Client;

const clientConfig = {
    credential: {
        secretId: "AKIDgLp9HD0ayA9xXv67tTp00nkU9791jDam",
        secretKey: "20nBTwX1NZZcXJzbBdtx4HTZ1Piv1zrf",
    },
    region: "",
    profile: {
        httpProfile: {
            reqMethod: "POST", // 请求方法
            reqTimeout: 30, // 请求超时时间，默认60s
            endpoint: "sms.tencentcloudapi.com",
        },
    },
};

function RndNum(n) {
    let rnd = "";
    for (var i = 0; i < n; i++)
        rnd += Math.floor(Math.random() * 10);
    return rnd;
}

const client = new SmsClient(clientConfig);
const sendMessage = (phoneNum, VerificationCode) => {
    phoneNum = '+86' + phoneNum
    const params = {
        "PhoneNumberSet": [
            phoneNum
        ],
        "TemplateID": "928353",
        "Sign": "崔耀的个人博客",
        "TemplateParamSet": [
            VerificationCode,
            '60'
        ],
        "SmsSdkAppid": "1400703808"
    };
    return client.SendSms(params).then(
        (data) => {
            console.log('-----------', data);
            return VerificationCode
        },
        (err) => {
            console.log(err);
        }
    )
}
// 倒计时 没有写
// sendMessage("1111111111", "123123")
module.exports = {
    sendMessage,
    RndNum
}