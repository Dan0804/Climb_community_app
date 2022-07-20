<template>
    <div v-if="userInfo" class="flex flex-col justify-between lg:w-1/7 w-30 pt-5 ml-3 border-r border-gray-200">
        <!-- icons -->
        <div>
            <button @click="showConnectModal =true" class="ml-2 mt-6 border-8 rounded-full w-11 h-11 relative">
                <i :class="`fa-solid fa-circle text-4xl -top-1.5 -left-1 ${auth.currentUser === null ? 'text-red-500' : 'text-green-400'} absolute`"></i>
            </button>
            <div class="relative flex pt-12 flex-col items-start">
                <router-link :to="route.path" :class="`cursor-pointer hover:text-hover_primary hover:bg-BgLightBlue w-14 lg:w-28 py-2 lg:px-4 my-1 rounded-full ${router.currentRoute.value.name === route.name ? 'text-hover_primary bg-BgLightBlue' : ''}`" v-for="route in routes" :key="route">
                    <div v-if="route.meta.isMenu" class="text-center lg:text-left">
                        <i :class="route.icon"></i>
                        <span class="hidden lg:inline-block"> {{route.title}} </span>
                    </div>
                </router-link>

                <button v-if="userInfo.buffer_center === ''" @click="showCenterSelectModal = true" class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-2 hover:border-hover_primary rounded-full w-14 lg:w-28 h-12 mt-3">
                    <span class="hidden lg:block font-semibold">촬영하기</span>
                    <i class="fa-solid fa-video text-xl lg:hidden"></i>
                </button>

                <router-link v-else :to="`/videoRecord`">
                    <button class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-2 hover:border-hover_primary rounded-full w-14 lg:w-28 h-12 mt-3">
                        <span class="hidden lg:block font-semibold">촬영하기</span>
                        <i class="fa-solid fa-video text-xl lg:hidden"></i>
                    </button>
                </router-link>

                <!-- post register button -->
                <button @click="showPostModal = true" class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-2 hover:border-hover_primary rounded-full w-14 lg:w-28 h-12 mt-3">
                    <span class="hidden lg:block font-semibold">등록하기</span>
                    <i class="fa-solid fa-plus text-xl lg:hidden"></i>
                </button>
            </div>

            <!-- center register button, 관리자용!! -->
            <!-- <div class="mr-3 mt-5">
                <div class="w-full h-12">
                    <button @click="showCenterRegisterModal = true" class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-2 hover:border-hover_primary rounded-full w-14 lg:w-28 h-12 mt-3">
                        <span class="hidden lg:block font-semibold">암장 등록</span>
                        <i class="fa-solid fa-location-dot text-xl lg:hidden"></i>
                    </button>
                </div>
            </div> -->

            <!-- show LogoutModal button -->
            <div class="mr-3 mt-16" @click="showLogoutModal = true">
                <div class="w-full h-12">
                    <button class="flex items-center hover:bg-BgLightBlue px-2 py-1 w-full lg:w-28 h-12 rounded-full">
                        <i class="fa-solid fa-right-from-bracket lg:ml-4 ml-3 py-2 mr-1 text-xl"></i>
                        <span class="hidden lg:block text-sm">로그아웃</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- post modal popup -->
        <post-modal v-if="showPostModal" @close_modal="showPostModal = false"></post-modal>

        <!-- connect modal popup -->
        <ConnectModal v-if="showConnectModal" @close_modal="showConnectModal = false"></ConnectModal>

        <!-- center register modal popup -->
        <CenterModal v-if="showCenterRegisterModal" @center_register_close_modal="showCenterRegisterModal = false"></CenterModal>

        <LogoutModal v-if="showLogoutModal" @logout_close_modal="showLogoutModal = false"></LogoutModal>

        <centerSelectModal v-if="showCenterSelectModal" @close_modal="showCenterSelectModal = false"></centerSelectModal>

    </div>
</template>

<script>
import {ref, onBeforeMount, computed, } from 'vue'
import { db, storage, } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { deleteObject, ref as storageRef, } from "firebase/storage"
import router from '../router'
import store from '../store'
import PostModal from './PostModal.vue'
import LogoutModal from './LogoutModal.vue'
import CenterModal from './CenterModal.vue'
import ConnectModal from './ConnectModal.vue'
import { auth } from '../firebase'
import centerSelectModal from "./centerSelectModal.vue"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/ko"
dayjs.extend(relativeTime)

export default {
    components: { PostModal, LogoutModal, CenterModal, ConnectModal, centerSelectModal, },
    setup() {
        const routes = ref([])
        const showProfileDropdown = ref(false)
        const showPostModal = ref(false)
        const showConnectModal = ref(false)
        const showCenterRegisterModal = ref(false)
        const showLogoutModal = ref(false)
        const showCenterSelectModal = ref(false)
        const userInfo = computed(() => store.state.user)

        const resetRecord = async () => {
            return new Promise((resolve, reject) => {
                let buffer = userInfo.value.buffer
                let posted_buffer = userInfo.value.posted_buffer
                for (let i=0 ; i<buffer.length ; i++) {
                    if (posted_buffer.includes(buffer[i].video_name) === false) {
                        const deleteRef = storageRef(storage, `video/${userInfo.value.uid}/${userInfo.value.buffer_center}/${buffer[i].video_name}`)
                        deleteObject(deleteRef)
                    }
                }
                resolve(true)
            })
        }

        onBeforeMount(() => {
            routes.value = router.options.routes.filter((route) => route.meta.isMenu === true)

            let stored_date = userInfo.value.buffer_center_time
            let now_date = dayjs(Date.now()).format("DD")
            
            if (stored_date != now_date) {
                resetRecord().then(() => {
                    updateDoc(doc(db, "users", userInfo.value.uid), {
                        buffer: [],
                        buffer_size: 0,
                        posted_buffer: [],
                        buffer_center: "",
                        buffer_center_time: now_date
                    })
                    store.commit("resetBuffer")
                    store.commit("resetPostedBuffer")
                    store.commit("resetBufferSize")
                    store.commit("setBufferCenter", "")
                    store.commit("setBufferCenterTime", now_date)
                })
            }
        })

        return {
            dayjs,
            routes,
            showProfileDropdown,
            showPostModal,
            showConnectModal,
            showCenterRegisterModal,
            showLogoutModal,
            showCenterSelectModal,
            userInfo,
            resetRecord,
            router,
            auth,
        }
    }
}
</script>