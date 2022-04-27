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

        setBackgroundImage: (state, image) => {
            state.user.background_image_url = image
        },

        setProfileImage: (state, image) => {
            state.user.profile_image_url = image
        },

        setFollow: (state, uid) => {
            state.user.followings.push(uid)
        },

        setUnFollow: (state, uid) => {
            state.user.followings = state.user.followings.filter(u => u !== uid)
        },
    },
    plugins: [createPersistedState()],
})

export default store