import request from '@/utils/request'

//请求分类页静态数据
export const getCategoryData = () => {
    return request.get('/category/list')
}