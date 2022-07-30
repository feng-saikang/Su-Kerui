import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 处理404 
  {
    path: '*',
    comments: () => import('@/components/common/404/Error.vue'),
  },
  {
    // 重定向首页
    path: '/',
    redirect: '/home',
  }, {
    // 首页
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/home/index.vue'),
    meta: {
      title: 's.kr',
    },
    children: [{
      path: 'service',
      component: () => import('@/components/common/adside/Service')
    }, ]
  }, {
    //注册
    path: '/signup',
    name: 'SignUp',
    component: () => import('../pages/signup/index.vue')
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/login/index.vue'),
  }, { //支付成功
    path: '/paySuccess',
    name: 'PaySuccess',
    component: () => import('@/pages/paySuccess/index.vue'),
    meta: {
      title: '支付成功-skr'
    }
  }, {
    //搜索
    path: '/search',
    name: 'Search',
    component: () => import('../pages/search/index.vue'),
    children: [{
      path: '/search/product',
      name: 'Product',
      component: () => import('../pages/search/childComps/product.vue')
    }, {
      path: '/search/activity',
      name: 'Activity',
      component: () => import('../pages/search/childComps/activity.vue')
    }, {
      path: '/search/buyerShow',
      name: 'BuyerShow',
      component: () => import('../pages/search/childComps/buyershow.vue')
    }]
  }, {

    // 购物车
    path: '/shopCar',
    name: 'ShopCar',
    component: () => import('@/pages/shopcar/index.vue')
  }, {
    // 二级商品分类页
    path: '/secondary',
    name: 'SeconDary',
    component: () => import('../pages/seconDary/index.vue')

    //详情页
  }, {
    path: '/details/:id',
    name: 'Details',
    component: () => import('@/pages/details/index.vue')


  }, {
    // 一级分类页
    path: '/primary',
    name: 'Primary',
    component: () => import('@/pages/Primary/index.vue')

  }, {
    // 个人中心
    path: "/perscenter",
    name: "PersCenter",
    component: () => import('@/pages/personalCenter/index.vue')

  }, {
    //结算页面
    path: '/settlement',
    name: 'Settlement',
    component: () => import('@/pages/settlement/index.vue')



  }, {
    // 底部about
    path: '/about',
    name: 'About',
    component: () => import('@/components/common/Following/About.vue')
  }, {
    // 底部咨询服务
    path: '/advisory',
    name: 'Advisory',
    component: () => import('@/components/common/Following/Advisory.vue')
  }, {
    // 底部服务条款
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/components/common/Following/Privacy.vue')
  }, {
    // 底部隐私政策
    path: '/terms',
    name: 'Terms',
    component: () => import('@/components/common/Following/Terms.vue')
  }, {
    // 底部合作伙伴
    path: '/partner',
    name: 'Partner',
    component: () => import('@/components/common/Following/Partner.vue')
  }, {
    // 底部全球化
    path: '/global',
    name: 'Global',
    component: () => import('@/components/common/Following/Global.vue')
  }, {
    // 底部招聘信息
    path: '/offers',
    name: 'Offers',
    component: () => import('@/components/common/Following/Offers.vue')

  }, {
    // WDNA
    path: '/wdna',
    name: 'Wdna',
    component: () => import("@/pages/wdna/Wdna.vue"),
    meta: {
      title: 'WDNA-skr'
    }
  },
  // 独家的
  {
    path: '/exclusive',
    name: 'Exclusive',
    component: () => import("@/pages/exclusive/Exclusive.vue"),
    meta: {
      title: 'EXCLUSIVE-skr'
    }
  }, // Event
  {
    path: '/event',
    name: "Event",
    component: () => import('@/pages/typeOneEvent/Event.vue'),
    meta: {
      title: 'EVENT-skr'
    }
  },
  {
    path: '/best',
    name: "Best",
    component: () => import("@/pages/best/Best.vue"),
    meta: {
      title: 'BEST-skr'
    }
  }, { // 订单详情页 
    path: '/orderdetail',
    name: 'OrderDetail',
    component: () => import("@/pages/OederDetail/OrderDetail.vue")
  },
]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router