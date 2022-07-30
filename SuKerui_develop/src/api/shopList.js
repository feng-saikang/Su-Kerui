import request from '@/utils/http'

export async function getProduct(data) {
  return await request({
    url: '/wares/getSubmenu',
    method: 'post',
    data: {
      ...data
    }
  })
}


// 添加商品
// 参数: title 商品标题 brand 品牌 spec 二级类别 img 图片 store_id 店铺id price 价格 
// special_price 优惠价格 is_special 是否优惠 1，3verifyIndex 唯一值 时间戳为佳 Date.now() 
export function addSpu(data) {
  return request({
    url: '/store/addSpu',
    method: 'post',
    data: {
      ...data
    }
  })
}

//获取商品列表
export async function getShopList(data) {
  return await request({
    url: '/store/getShopList',
    method: 'post',
    data: {
      ...data
    }
  })
}

// 获取添加商品信息
export function getSpu(data) {
  return request({
    url: '/store/getSpu',
    method: 'post',
    data: {
      ...data
    }
  })
}

//搜索商品
export function getSearchList(keyword) {
  return request({
    url: '/store/search',
    method: 'post',
    data: {
      keyword,
    },
  })
}

//删除商品
export function deletShopList(id) {
  return request({
    url: '/store/deleteSpu',
    method: 'post',
    data: {
      id,
    }
  })
}

// 添加商品 sku
export function addSku(data){
    return request({

        url: '/store/addSku',
        method: 'post',
        data: {
            ...data
        }
    })
}



//获取商品分类
export function getShopClassify(data){
    return request({
        url: '/wares/getMenu',
        method: 'post',
        data: {
            ...data,
        }
    })
}

//获取一级分类
export function getParentName(){
    return request({
        url: '/type/getParentName',
        method: 'post',
        data: {
            
        }
    })
}

//通过一级分类获取品类
export function getName(data){
    return request({
        url: '/wares/getName',
        method: 'post',
        data: {
            ...data,
        }
    })
}



// 根据id 获取商品信息
export function getCatName(data){
  return request({
    url: '/store/getCatName',
    method: 'post',
    data: {
      ...data
    }
  })
}

// 根据id 获取商品信息
export function getBrandName(data){
  return request({
    url:'/store/getBrandName',
    method:'post',
    data:data
  })
}

// 根据id获取sku
export function getSku(data){
  return request({
    url: '/store/getSku',
    method: 'post',
    data:{
      ...data
    }
  })
}
