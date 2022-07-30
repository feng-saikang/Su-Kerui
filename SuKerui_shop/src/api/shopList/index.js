import request from "../../utils/request.js";

//搜索请求
export function getSearchList(word) {
  return request({
    url: "/wares/getSpu",
    method: "post",
    data: {
      name: word,
    },
  });
}
// 获取以及分类商品
export async function getTypeOneList(parent_name) {
  return await request({
    url: "/type/getproduct",
    method: "post",
    data: {
      parent_name,
    },
  });
}

// 获取二级分类商品
export async function getTypeTwoList(name, series, page) {
  return request({
    url: "/wares/getSpu",
    method: "post",
    data: {
      name,
      series,
      page,
    },
  });
}

//获取 sku 列表
//spu_id
export function getShopSku(spu_id) {
  return request({
    url: "/store/getSku",
    method: "post",
    data: {
      spu_id,
    },
  });
}

//获取 spu 列表
//id category_id title store_id
export function getShopSpu(data) {
  return request({
    url: "/store/getSpu",
    method: "post",
    data: {
      ...data,
    },
  });
}


