import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'ant-design-vue/dist/antd.css'
import 'swiper/css/swiper.css'
import './plugins/antd/index.js'
import 'assets/css/params.less'
import VueRouter from 'vue-router'
import SvgIcon from '@/components/svgIcon/index.vue'// svg组件  

Vue.component('svg-icon', SvgIcon)
import '@/icons/index.js'
import '../src/plugins/swiper/index'
import '@/plugins/swiper/index.js'
import './permisstion'

Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.config.productionTip = false

const originalPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err=>err)
}

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线
	},
}).$mount('#app')


