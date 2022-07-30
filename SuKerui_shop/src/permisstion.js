import router from "./router";
import nprogress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style
import store from './store/index.js'
import {
    MessageBox,
    Message
} from 'element-ui';
import Vue from 'vue'
/**
 * 路由导航守卫 全局守卫
 */
router.beforeEach((to, from, next) => {
    // nprogress.start()
    if (to.path === '/shopCar') {
        if (!store.state.token) {
            MessageBox.confirm('您还未登录是否先去登录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                next('/login')
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消登录'
                });
            });
        } else {
            next()
        }
    } else {
        next();
    }
})
/**
 * 路由组件渲染玩后执行...
 */
router.afterEach(() => {
    // nprogress.done()
})