import {
  login,
  getInfo,
  logout
} from "@/api/user";

import {
  getToken,
  setToken,
  removeToken
} from "@/utils/auth";

import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage
} from "@/utils/localStorage";

import {
  resetRouter
} from '@/router/index'

let token = getToken()
let storeInfo = getLocalStorage('info')

const getDefaultState = () => {
  return {
    token: token,
    storeInfo: storeInfo || {},
    name: '',
    avatar: '',
    roles: [],
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  STORE_INFO(state, info) {
    state.storeInfo = info
    state.storeInfo.roles = info.name
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 发送登录请求
  login(store, data) {
    let info = {
      name: data.name,
      password: data.password
    }
    return new Promise((resolve, reject) => {
      login(info).then((res) => {
        // 请求成功
        if (res.code == 200) {
          store.commit('SET_TOKEN', info)
          store.commit('STORE_INFO', res.data.storeInfo)
          // token 存储到cookies中
          setToken(res.data.token)
          // 将
          setLocalStorage('info', JSON.stringify(res.data.storeInfo))
          resolve(res)
          return
        }
        reject()
      }).catch((err) => {
        reject(err)

      })
    })
  },
  // 获取商铺信息
  getInfo({
    commit,
    state
  }) {
    // 返回 promise
    return new Promise((resolve, reject) => {

      let storeInfo = JSON.parse(getLocalStorage('info'))
      const {
        roles,
        name,
        avatar
      } = {
        roles: `${storeInfo.roles}`,
        name: `${storeInfo.name}`,
        avatar: `${storeInfo.avatar}`
      }
      //更新store;将角色、用户名、头像保存到store中
      commit('SET_ROLES', roles)
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      // 修改异步任务的状态为resolved;保存任务的结果数据；
      resolve({
        roles: `${storeInfo.roles}`,
        name: `${storeInfo.name}`,
        avatar: `${storeInfo.avatar}`
      })
      // }).catch(error => {
      //    // 修改异步任务的状态为rejected;保存任务的失败原因；
      //   reject(error)
      // })

    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        removeLocalStorage()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
// export default {
//   namespaced: true,
//   state: {
//     token: token || {},
//     storeInfo: storeInfo || {},
//     name: '',
//     avatar: '',
//     roles: [],
//   },
//   mutations: {
//     RESET_STATE (state) {
//       Object.assign(state)
//     },
//     SET_TOKEN(state, token) {
//       state.token = token;
//     },
//     STORE_INFO(state, info) {
//       state.storeInfo = info
//       state.storeInfo.roles = info.name
//     },
//     SET_NAME: (state, name) => {
//       state.name = name
//     },
//     SET_AVATAR: (state, avatar) => {
//       state.avatar = avatar
//     },
//     SET_ROLES: (state, roles) => {
//       state.roles = roles
//       console.log(token, storeInfo)
//     }
//   },
//   actions: {
//     // 发送登录请求
//     login(store, data) {
//       let info = {
//         name: data.name,
//         password: data.password
//       }
//       return new Promise((resolve, reject) => {
//         login(info).then((res) => {
//           // 请求成功
//           if (res.code == 200) {
//             store.commit('SET_TOKEN', info)
//             store.commit('STORE_INFO', res.data.storeInfo)
//             // token 存储到cookies中
//             setToken(res.data.token)
//             // 将
//             setLocalStorage('info', JSON.stringify(res.data.storeInfo))
//             resolve(res)
//             return
//           }
//           reject()
//         }).catch((err) => {
//           reject(err)
//         })
//       })
//     },
//     getInfo({
//       commit,
//       state
//     }) {
//       // 返回 promise
//       return new Promise((resolve, reject) => {
//         let storeInfo = JSON.parse(getLocalStorage('info'))
//         console.log(storeInfo);
//         const {
//           roles,
//           name,
//           avatar
//         } = {
//           roles: `${storeInfo.roles}`,
//           name: `${storeInfo.name}`,
//           avatar: `${storeInfo.avatar}`
//         }
//         console.log(
//           roles,
//           name,
//           avatar);
//         //更新store;将角色、用户名、头像保存到store中
//         commit('SET_ROLES', roles)
//         commit('SET_NAME', name)
//         commit('SET_AVATAR', avatar)
//         // 修改异步任务的状态为resolved;保存任务的结果数据；
//         resolve({
//           roles: `${storeInfo.roles}`,
//           name: `${storeInfo.name}`,
//           avatar: `${storeInfo.avatar}`
//         })
//         // }).catch(error => {
//         //    // 修改异步任务的状态为rejected;保存任务的失败原因；
//         //   reject(error)
//         // })
//       })
//     },
//     // user 退出
//       // user logout
//   logout({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       logout(state.token).then(() => {
//         removeToken() // must remove  token  first
//         resetRouter()
//         commit('RESET_STATE')
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // remove token
//   resetToken({ commit }) {
//     return new Promise(resolve => {
//       removeToken() // must remove  token  first
//       commit('RESET_STATE')
//       resolve()
//     })
//   }
//   },
// }
