//应用Vuex插件

//准备state对象——保存具体的数据
const getDefaultState = () => {
  return {
    // todo 数据持久化存储
    searchList: [], //存放搜索的商品
    editItem: {}, // 存放编辑商品的数据
  }
}

const state = getDefaultState()

//准备actions对象——响应组件中用户的动作
const actions = {
  setsearchlist(store, val) {
    store.commit('SETSEARCHLIST', val)
  },
  setEditItem({
    commit
  }, val) {
    commit('SETEDITITEM', val);
  }
}
//准备mutations对象——修改state中的数据
const mutations = {
  SETSEARCHLIST(state, val) {
    state.searchList = val;
  },
  SETEDITITEM(state, val) {
    state.editItem = val;
  }
}


//创建并暴露store
export default {
  namespaced: true,
  actions,
  mutations,
  state
}
