import request from '@/utils/request'

export const getHomeData = () => {
   return request.get('/page/detail',{
        query:{
            pageId:0
        }
    })
}