import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"

const store = createStore({
    state() {
        return {
            user: null,
        }
    },
    mutations: {
        setUser: (state, user) => {
            state.user = user
        },
    },
    plugins: [createPersistedState()],
})

export default store