import request from '../../utils/request.js'

// 注册请求
export function userSignUp(data){
    return request({
      url:'/user/register',
      method:'post',
      data:{
        ...data,
      }
    })
  }

  //发送验证码请求
  export function getMessage(data){
    return request({
        url: '/user/getMessage',
        method:'post',
        data: {
           ...data,
        }
    })
  }
  
  // 登录请求
export async function userLogin(options) {
  return await request({
      method: 'post',
      url: '/user/login',
      data:options
  })
}

// 修改密码
export function setPassWord(data){
    return request({
      method: "post",
      url: "/user/changePassword",
      data:{
        ...data
      }
    })
}

// 新增收获地址
export function addAddress(data){
  return request({
    url: '/user/addAddress',
    method: 'post',
    data:{
      ...data
    }
  })
}
// 获取收获地址
export function getaddress(data){
  return request({
    url: "/user/getAddress",
    method: 'post',
    data:{
      ...data
    }
  })
}

// 设置默认地址
export function defaultAddress(data){
  return request({
    url: '/user/defaultAddress',
    method: "post",
    data: {
      ...data
    }
  })
}

// 删除收货地址
export function deleteAddress(id){
  return request({
    url: '/user/deleteAddress',
    method: 'post',
    data:{
      id
    }
  })
}

// 修改收获地址
export function updataAddress(data){
  return request({
    url: "/user/updateAddress",
    method: 'post',
    data:{
      ...data
    }
  })
}
// 设为默认地址
export function setDefault(data){
  return request({
    url: '/user/defaultAddress',
    method: 'post',
    data: {
      ...data
    }
  })
}
