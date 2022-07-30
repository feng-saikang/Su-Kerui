import request from "@/utils/http";
// 获取优惠券
export function getVoucher(data){
    return request({
        url:"/voucher/getVoucher",
        method:"post",
        data
    })
}
// 删除优惠券
export function deleteVoucher(data){
    return request({
        url:"/voucher/deleteVoucher",
        method:"post",
        data
    })
}
// 查看优惠券
export function seeVoucheer(data){
    return request({
        url:"/voucher/seeVoucheer",
        method:"post",
        data
    })
}
// 搜索优惠券
export function selectVoucher(data){
    return request({
        url:"/voucher/selectVoucher",
        method:"post",
        data
    })
}

// 添加优惠券
export function addVoucher(data){
    return request({
        url: '/voucher/addVoucher',
        method: 'post',
        data
    })
}

// 编辑优惠券
export function editVoucheer(data){
    return request({
        url:"/voucher/editVoucheer",
        method:"post",
        data
    })
}

