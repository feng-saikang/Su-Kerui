import request from '@/utils/http'

//获取品牌列表
export function getBrand(data){
    return request({
        url: '/wares/getBrands',
        method: 'post',
        data:{
            ...data
        }
    })
}

//添加品牌
export function addBrand(data){
    return request({
        url: '/wares/addBrand',
        method: 'post',
        data: {
            ...data,
        }
    })
}

//上传图片
export function uploadImg(data){
    return request({
        url: '/upload/upload',
        method: 'post',
        data: {
            ...data,
        }
    })
}

//更新品牌
export function updataBrand(data){
    return request({
        url: '/shop/updataBrand',
        method: 'post',
        data: {
            ...data,
        }
    })
}