import request from '@/utils/request.js'

//添加购物车
//customer_id  sku_id  num  params

export function getAddShopCar(data) {

    return request({
      url: "/shopCar/addShopCar",
      method: "post",
      data: {
        ...data
      },
    });
  }
  
  //获取购物车数据
  //customer_id
  export function getShopCar(customer_id){
      return request({
          url: '/shopCar/getShopCar',
          method: 'post',
          data: {
              customer_id,
          }
      })
  }
  
  // 删除购物车
  //id
  export function deleteShopCar(id){
      return request({
          url:'/shopCar/deleteShopCar',
          method:'post',
          data:{
              id,
          }
      })
  }

