import axios from 'axios'
import { Toast } from 'vant'
import store  from '@/store';
//创建axios实例
const instance = axios.create({
    baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
    timeout: 5000,
    headers: { 'platform': 'H5' }
});

// 添加请求拦截器 
//为了不修改axios本身 我们创建一个axios实例对象 在实例对象上添加拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration:0,//值为0时 loading样式不会消失
      });
      const token = store.getters.token
      if (token) {
        config.headers['Access-Token'] = token
        config.headers.platform = 'H5'
      }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    const res = response.data
    // console.log(res);
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么(默认axios会对数据多包装一层data 在拦截器中扒掉一层)
    if (res.status !== 200) {
        Toast(res.message)
        return Promise.reject(res.message)
    }else{
        Toast.clear()
    }
    
    return res;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

//导出实例
export default instance