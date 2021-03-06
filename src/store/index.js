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

        setProfileNickName: (state, nick_name) => {
            state.user.nick_name = nick_name
        },

        setProfileMainCenter: (state, main_center) => {
            state.user.main_center = main_center
        },

        setProfileMyLevel: (state, my_level) => {
            state.user.my_level = my_level
        },

        setBufferCenter: (state, buffer_center) => {
            state.user.buffer_center = buffer_center
        },

        setBufferCenterTime: (state, buffer_center_time) => {
            state.user.buffer_center_time = buffer_center_time
        },

        setBuffer: (state, buffer) => {
            state.user.buffer.push(buffer)
        },

        resetBuffer: (state) => {
            state.user.buffer = []
        },

        setPostedBuffer: (state, posted_buffer) => {
            state.user.posted_buffer.push(posted_buffer)
        },

        resetPostedBuffer: (state) => {
            state.user.posted_buffer = []
        },

        setBufferSizeAdd: (state, buffer_size) => {
            state.user.buffer_size += buffer_size
        },

        resetBufferSize: (state) => {
            state.user.buffer_size = 0
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