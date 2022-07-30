import request from '@/utils/request.js'
// 获取一级目录
export function getParentName(){
    return request({
        url: '/type/getParentName',
        method: 'post',
    })
}

export function getproduct(data) {
    return request({
        url: '/type/getproduct',
        method: 'post',
        data: {
            ...data
        }
    })
}

// 获取一级目录下的子目录
/**
 * url: /type/getSecond
 * data 一级标题
 */
export async function getTypeTwo(parent_name) {
    return await request({
        url: '/wares/getSecond',
        method: 'post',
        data: {
            parent_name
        }
    })
}