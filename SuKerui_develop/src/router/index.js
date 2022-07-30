import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes : 常量路由; 这个数组中存放的路由，是每一个角色都可以访问的。
 * 
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: {
        title: 'home',
        icon: 'el-icon-s-home'
      }
    }]
  },

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles;
 * 
 * asyncRoutes:异步路由;这个数组中存放的路由，需要依据用户的角色动态加载。
 * 给路由的meta属性中添加roles(角色)字段,这个字段的取值可以是一个数组，数组中会一一列举哪些角色可以访问这个路由。
 */

// 默认admin 可以显示所有的
// asyncRoutes 每个路由配置对象中，都应该需要添加 roles。
// 如果没有roles 默认，改路由为公共路由，每个人都可以访问
export const asyncRoutes = [{
    path: '/shop',
    name: "Shop",
    redirect: "/shop/shoplist",
    component: Layout,
    meta: {
      title: "shop",
      icon: 'el-icon-goods',
      roles: ['admin'],
    },
    children: [{
      //商品列表
      path: 'shoplist',
      name: 'ShopList',
      component: () => import('@/views/shopList/index'),
      meta: {
        title: 'shopList',
        icon: 'el-icon-receiving'
      }
    }, {
      //添加商品
      path: 'addShop',
      name: 'AddShop',
      component: () => import('@/views/addShop/index'),
      meta: {
        title: 'addShop',
        icon: 'el-icon-document-add'
      }
    }, {
      //商品分类
      path: 'shopClassify',
      name: 'ShopClassify',
      component: () => import('@/views/shopClassify/index'),
      meta: {
        title: 'shopClass',
        icon: 'el-icon-goods'
      }
    }, {
      //品牌管理
      path: 'brandList',
      name: 'BrandList',
      component: () => import('@/views/brandList/index'),
      meta: {
        title: 'brandList',
        icon: 'el-icon-price-tag'
      }
    }, {
      path: 'addBrand',
      name: 'AddBrand',
      component: () => import("@/views/addBrand/index"),
      meta: {
        title: '添加品牌',
        icon: 'el-icon-price-tag'
      },
      hidden: true,
    }, {
      path: 'editBrand',
      name: 'EditBrand',
      component: () => import("@/views/editBrand/index"),
      meta: {
        title: '编辑品牌',
        icon: 'el-icon-price-tag'
      },
      hidden: true,
    }]
  },
  {
    //营销
    path: '/marketing',
    name: "Marketing",
    redirect: "/marketing/couponList",
    component: Layout,
    meta: {
      title: "marketing",
      icon: 'el-icon-s-marketing',
      roles: ['admin']
    },
    children: [{
      //优惠券列表
      path: 'couponsList',
      name: 'CouponsList',
      component: () => import('@/views/couponsList/index'),
      meta: {
        title: 'couponsList',
        icon: 'el-icon-s-ticket'
      }
    }, {
      //秒杀活动列表
      path: 'spike',
      name: 'Spike',
      component: () => import('@/views/spike/index'),
      meta: {
        title: 'spike',
        icon: 'el-icon-alarm-clock'
      }
    }, {
      //添加优惠
      path: 'addCoupon',
      name: 'AddCoupon',
      component: () => import('@/views/couponsList/components/addCoupon.vue'),
      meta: {
        title: 'addCoupon'
      },
      hidden: true
    }]
  }, {
    //订单
    path: '/order',
    name: "Order",
    redirect: "/order/orderList",
    component: Layout,
    meta: {
      title: "order",
      icon: 'el-icon-s-order',
      roles: ['admin']
    },
    children: [{
        path: 'orderList',
        name: 'OrderList',
        component: () => import('@/views/orderList/index'),
        meta: {
          title: '订单列表',
          icon: "el-icon-receiving"
        }
      }, {
        path: 'returnShop',
        name: 'ReturnShop',
        component: () => import('@/views/returnShop/index'),
        meta: {
          title: '退货申请处理',
          icon: 'el-icon-takeaway-box'
        }
      },
      {
        path: 'orderDetail/:order_id/:status',
        name: 'orderDetail',
        component: () => import('@/views/orderList/orderDetail'),
        meta: {
          title: '订单详情'
        },
        props: true,
        hidden: true
      },
      {
        path: 'deliverOrderList/:order_id',
        name: 'deliverOrderList',
        component: () => import('@/views/orderList/deliverOrderList'),
        meta: {
          title: '发货列表'
        },
        hidden: true,
        props: true
      }, {
        path: 'returnApplyDetail/:id/:order_id',
        name: 'returnApplyDetail',
        component: () => import('@/views/returnShop/applyDetail'),
        meta: {
          title: '退货原因详情'
        },
        hidden: true,
        props: true
      }
    ]
  }, {
    path: '/customer',
    component: Layout,
    // redirect: '/customer',
    children: [{
      path: 'customer',
      name: 'Customer',
      component: () => import('@/views/customer/index'),
      meta: {
        title: 'customer',
        icon: 'el-icon-headset'
      }
    }]
  }, {
    path: '/store',
    component: Layout,
    // redirect: '/store',
    children: [{
      path: 'store',
      name: 'Store',
      component: () => import('@/views/store/index'),
      meta: {
        title: 'store',
        icon: 'el-icon-s-shop',
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

// 创建路由对象，路由配置只使用constantRoutes,等待用户登录成功后，获取用户的角色,
// 然后根据角色，生成基于这个角色的路由配置，通过addRoutes的方法添加到router对象上。
const router = createRouter()


// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
