import Vue from 'vue'
import Vuex from 'vuex'
import {
  userLogin
} from '@/api/user/index.js'
import {//Token
  getToken,
  setToken,
  removeToken
} from '@/plugins/cookie/index.js'

import {//LocalStorage
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage
} from '../utils/localStorage.js'

const getDefaultState = () => {
  return {
    token: getToken(),
  }
}
const state = getDefaultState()

Vue.use(Vuex)
let user = getLocalStorage('user') || {};
let token = getToken() || '';
// let user = get('user') || {};
let ItemList = JSON.parse(getLocalStorage('ItemList'))
let ChecksList = JSON.parse(getLocalStorage('ChecksList')) || []
let SearchDateList = getLocalStorage('SearchDateList')

let orderDetail = JSON.parse(getLocalStorage('orderDetail')) || {}
let AddressList = getLocalStorage('AddressList')
export default new Vuex.Store({
  state: {
    // 二级导航显示
    navBarShow: false,
    SearchData: [], // 
    SearchDateList: [], //搜索结果
    ClickDetailShop: {}, //存放点击商品，获取详情信息
    token: token,
    user: user,
    ItemList, //存放product.vue文件中点击商品跳转详情的商品
    ImgList: [], //存放sku图片数据
    orderDetail, // 存放订单详情数据
    ChecksList, //存放购物车页面被选择的商品
    AddressList, //存放地址
    searchShow: true
  },
  getters: {

  },
  mutations: {
    // 更改二级导航显示隐藏
    SETNAVSHOW(state, data) {
      state.navBarShow = data
    },
    CHANGESEARCHDATA(state, val) {
      state.SearchData = val;
    },
    SETSEARCHLIST(state, val) {
      state.SearchDateList = val;
      setLocalStorage('SearchDateList', val)
    },
    SETTOKEN(state, token) {
      state.token = token
    },
    SETUSER(state, user) {
      state.user = user
    },
    SETCLICKDETAILSHOP(state, val) {
      state.ClickDetailShop = val;
    },
    SETITEMLIST(state, val) {
      state.ItemList = val;
      // setLocalStorage('ItemList', JSON.stringify(val))
    },
    SETIMGLIST(state, val) {
      state.ImgList = val;
    },

    SETORDERDETAIL(state, val) {
      state.orderDetail = val
    },


    //购物车页面被选择的商品
    SETCHECKSLIST(state, val) {
      state.ChecksList = val;
    },
    SETADDRESSLIST(state, val) {
      state.AddressList = val;
    },
    SETSEARCHSHOW(state,val){
      state.searchShow = val
    }


  },
  actions: {
    // 更改二级导航显示隐藏
    setNavBarShow({
      commit
    }, data) {
      commit('SETNAVSHOW', data)
    }, // 更改搜索到数据SearchData
    commitSearchData(store, val) {
      store.commit('CHANGESEARCHDATA', val)
    },
    setsearchlist(store, val) {
      store.commit('SETSEARCHLIST', val)
    },
    setUser(store, user) {
      return userLogin(user).then((data) => {
        console.log(data);
        let usertoken = data.data.token
        store.commit('SETTOKEN', usertoken)
        store.commit('SETUSER', data.data.userInfo)
        setLocalStorage('user', JSON.stringify(data.data.userInfo))
        setToken(usertoken)
      })
    },
    setSearchShow({commit}, val){
      commit('SETSEARCHSHOW',val)
    },
    SetToken({
      commit
    }, token) {
      commit('SETUSER', token)
    },
    setclickdetailshop(store, val) {
      store.commit('SETCLICKDETAILSHOP', val)
    },
    setitemlist(store, val) {
      store.commit('SETITEMLIST', val)
    },
    setimglist(store, val) {
      store.commit('SETIMGLIST', val)
    },

    setOrderDetail({
      commit
    }, val) {
      commit('SETORDERDETAIL', val)
      setLocalStorage('orderDetail', JSON.stringify(val))
    },
    //购物车页面被选择的商品
    setcheckslist(store, val) {
      store.commit('SETCHECKSLIST', val)
      setLocalStorage('ChecksList', JSON.stringify(val))
    },
    setaddresslist(store, val) {
      store.commit('SETADDRESSLIST', val)
      setLocalStorage('AddressList', JSON.stringify(val))
    },
    logout({
      commit
    }, val) {
      commit('SETTOKEN', val)
      removeToken()
      removeLocalStorage('user')
    }
  },
  modules: {}
})