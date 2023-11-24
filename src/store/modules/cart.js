import { getCartList, updateCartCount, delCartGoods } from "@/api/cart";
export default {
    namespaced: true,
    state() {
        return {
            cartList: []
        }
    },
    mutations: {
        //设置购物车列表
        setCartList(state, newList) {
            state.cartList = newList
            console.log(newList);
        },
        //改变商品选中状态
        changeChecked(state, id) {
            const goods = state.cartList.find(item => item.goods_id === id)
            // console.log(goods);
            goods.isChecked = !goods.isChecked
        },
        // 重置全选状态
        changeAllChecked(state, check) {
            state.cartList.forEach(item => {
                item.isChecked = check
            })
        },
        //修改商品数量
        changeCount(state, obj) {
            const { id, num } = obj
            const goods = state.cartList.find(item => {
                return item.goods_id === id
            })
            goods.goods_num = num
        },
    },
    actions: {
        //获取购物车列表数据
        async getList(context) {
            const { data } = await getCartList()
            data.list.forEach(item => {
                item.isChecked = false
            })
            context.commit('setCartList', data.list)
        },
        //更新购物车商品数量
        async updateCart(context, obj) {
            const { num, id, sku_id } = obj
            await updateCartCount(num, id, sku_id)
            // 接口没有返回数据 服了 自己修改s
            context.commit('changeCount', { id, num })
        },
        //删除购物车商品
        async delGoods(context) {
            const arr = context.getters.selCartList.map(item => item.id)
            await delCartGoods(arr)
            context.dispatch('getList')
        }

    },
    getters: {
        // 商品共计件数
        cartTotal(state) {
            return state.cartList.reduce((sum, item) => {
                return sum += item.goods_num
            }, 0)
        },
        // 选中的商品 
        selCartList(state) {
            return state.cartList.filter(item => item.isChecked)
        },
        // 选中的商品数量
        selCount(state, getters) {
            return getters.selCartList.reduce((sum, item) => {
                return sum += item.goods_num
            }, 0)
        },
        // 统计总价
        selPrice(state, getters) {
            return getters.selCartList.reduce((sum, item) => {
                return sum += item.goods_num * item.goods.goods_price_min
            }, 0).toFixed(2)
        },
        //当所有商品都选中，全选状态为true
        isAllChecked(state) {
            return state.cartList.every(item => item.isChecked === true)
        }
    }
}