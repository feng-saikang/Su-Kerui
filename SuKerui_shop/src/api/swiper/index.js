import request from '@/utils/request.js';

export function getSwiperList(){
    return request({
        url: '/type/getSwiper',
        method: "post",
    })
}