import request from '@/utils/request.js'


//获取用户地址

export async function getUserOrder(customer_id) {
    return await request({
        url: '/order/getUserOrder',
        method: 'post',
        data: {
            customer_id
        }
    })
}


// 获取订单详情
export function getOrderDetail(data){
    return request({
        url: '/order/getOrderDetail',
        method: 'post',
        data: {
            ...data
        }
    })
}

// 取消订单
export function deteleOrder(id){
    return request({
        url: "/order/deleteOrder",
        method: 'post',
        data: {
            id
        }
        })
    }
//提交订单

export function getPayOrder(data){
    return request ({
        url: '/order/payOrder',
        method: 'post',
        data: {
            ...data,

        }
    })
}

// 添加订单
export function addOrder(data){
    return request({
        url: '/order/addOrder',
        method: 'post',
        data: {
            ...data
        }
    })
}

export function updateOrder(data){
    return request({
        url: '/order/updateOrder',
        method: 'post',
        data: {
            ...data
        }
    })
}