import request from "@/utils/http";
// 获取秒杀活动
export function getspike(data){
    return request({
        url:"/spike/getspike",
        method:"post",
        data
    })
}
// 删除秒杀
export function delspike(data){
    return request({
        url:"/spike/delspike",
        method:"post",
        data
    })
}
// 添加活动
export function addspike(data){
    return request({
        url:"/spike/addspike",
        method:"post",
        data
    })
}
// 编辑活动
export function updatespike(data){
    return request({
        url:"/spike/updatespike",
        method:"post",
        data
    })
}
// 搜索活动
export function slectSpike(data){
    return request({
        url:'/spike/slectspike',
        method:'post',
        data,
    })
}