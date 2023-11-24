import request from '@/utils/request'

//请求商品详情数据
export const getDetailData = (id)=>{
    return request.get('/goods/detail',{
        params:{
            goodsId:id
        }
    })
}

//获取商品评价数据
export const getProductData = (id,limit)=>{
    return request.get('/comment/listRows',{
        params:{
            goodsId:id,
            limit
        }
    })
}