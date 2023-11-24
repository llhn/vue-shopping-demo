import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Search from '@/views/search/index.vue'
import Detail from '@/views/detail/index.vue'
import Layout from '@/views/layout/index.vue'
import Order from '@/views/order/index.vue'
import Pay from '@/views/pay/index.vue'
import SearchList from '@/views/search/list.vue'
import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'
import store from '@/store/index'

Vue.use(VueRouter)


const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/search', component: Search },
    { path: '/list', component: SearchList },
    { path: '/detail/:id', component: Detail },
    { path: '/order', component: Order },
    { path: '/pay', component: Pay }
  ]
})

//当我们进入权限页面，如购物车、支付页面，这些都需要在用户已经登录的状态下
//如果用户没登录则先跳转到登录页面

//将权限页面放进数组便于管理
const tokenRouter = ['/pay', '/order']

//设置路由前置守卫 每当跳转守卫会拦截跳转并处理一些事件
router.beforeEach((to, from, next) => {
  // console.log(to,from,next);
  if (!tokenRouter.includes(to.path)) {
    //如果不访问权限页面直接放行 
    next()
    
  } else {
    const token = store.state.user.token
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
  //当next函数没有参数表示进入到to的路由地址，并解析渲染页面
  // next()
})

export default router
