import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import cart from '@/store/modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
    getters: {
        token(state){
            return state.user.token
        }
    },
    modules: {
        user,
        cart
    }
})
