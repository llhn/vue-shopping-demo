import { getInfo, setInfo } from "@/api/storage.js";

export default {
    namespaced: true,
    state() {
        return getInfo()

    },

    mutations: {
        setUserInfo(state, content) {
            state.userInfo = content
            setInfo(content)
        }
    },
    actions: {},
    getters: {}
}