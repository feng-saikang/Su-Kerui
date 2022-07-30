import request from '@/utils/http'


export function login(data){
  return request({
      method:"post",
      url:"/store/login",
      data:{
        ...data,
      }
  })
}

export function getInfo(data) {
  return request({
    url: '/store/getInfo',
    method: 'post',
    data:data,
  })
}

export function logout() {
  return request({
    url: '/store/login',
    method: 'post'
  })
}

// 修改店铺信息
export function updateShop(data){
  return request({
    url: '/store/infoModify',
    method: 'post',
    data:{
      ...data
    }
  })
}
