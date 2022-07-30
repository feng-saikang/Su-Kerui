// 获取图片   {parent_name:'服饰',start:16,end:18}
import request from '@/utils/request.js'

export function getImg(data){
    return request({
        url: '/type/getImg',
        method: 'post',
        data: {
            ...data
        }
    })
}