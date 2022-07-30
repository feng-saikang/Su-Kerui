import request from "@/utils/http"

export function getOrder(data){
    return request({
        method:"post",
        url:"/order/getOrder",
        data,
    })
}

export const getOrderDetail=(data)=>{
    return request({
        method:"post",
        url:"/order/getOrderDetail",
        data,
    })
}
export const updateOrder=(data)=>{
    return request({
        method:"post",
        url:"/order/updateOrder",
        data,
    })
}
export const deleteOrder=(data)=>{
    return request({
        method:"post",
        url:"/order/deleteOrder",
        data
    })
}
export const getBackStock=(data)=>{
    return request({
        method:"post",
        url:"/order/getBackStock",
        data
    })
}
export const getBackStockDetail=(data)=>{
    return request({
        method:"post",
        url:"/order/getBackStockDetail",
        data
    })
}
export const updateBackStock=(data)=>{
    return request({
        method:'post',
        url:'/order/updateBackStock',
        data,
    })
}
