import axios from 'axios'
import {
    Loading,
    Message
} from 'element-ui';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style
import Vue from 'vue';
import {
    setLocalStorage,
} from "./localStorage.js"
import store from '../store/index.js'
import router from '../router/index.js'

let instance = axios.create({

    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 5000, // 5s 后没有响应认为失败
})

// let load = null
let loadServe = null
instance.interceptors.request.use((config) => {
    nprogress.start()

    loadServe = Loading.service({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0,0,0,0.7)'
    })
    return config //发送请求 没有return 会停止发送
})


instance.interceptors.response.use(config => {
    nprogress.done()
    if (config.data.code === 401) {
        Message({
            message: '请求错误',
            type: 'danger'
        })
        setTimeout(()=>{
              loadServe.close()      
        },1000)

        // router.replace('/login').
    } else if (config.data.code === 501) {
        // 统一提示请求失败
        // Message({
        //     message: '请求失败',
        //     type: 'danger'
        // })
        // loadServe.close()
    } else if (config.data.code === 402) {
        // Message({
        //     message: "账号或密码错误",
        //     type: 'danger'
        // })
        // router.push('/login')
    } else {
        loadServe.close()      

        return config.data //服务器响应的数据
    }

    return config.data //服务器响应的数据
}, err => {
    // 服务器超过5s没有响应或者连接问题
    return err;
})

export default instance