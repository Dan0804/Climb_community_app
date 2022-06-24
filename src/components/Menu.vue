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
            </div>

            <!-- post register button -->
            <div class="mr-3">
                <div class="w-full h-12">
                    <button @click="showPostModal = true" class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-2 hover:border-hover_primary rounded-full w-14 lg:w-28 h-12 mt-3">
                        <span class="hidden lg:block font-semibold">등록하기</span>
                        <i class="fa-solid fa-video text-xl lg:hidden"></i>
                    </button>
                </div>
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
    </div>
</template>

<script>
import {ref, onBeforeMount, computed, } from 'vue'
import router from '../router'
import store from '../store'
import PostModal from './PostModal.vue'
import LogoutModal from './LogoutModal.vue'
import CenterModal from './CenterModal.vue'
import ConnectModal from './ConnectModal.vue'
import { auth } from '../firebase'

export default {
    components: { PostModal, LogoutModal, CenterModal, ConnectModal, },
    setup() {
        const routes = ref([])
        const showProfileDropdown = ref(false)
        const showPostModal = ref(false)
        const showConnectModal = ref(false)
        const showCenterRegisterModal = ref(false)
        const showLogoutModal = ref(false)
        const userInfo = computed(() => store.state.user)

        onBeforeMount(() => {
            routes.value = router.options.routes.filter((route) => route.meta.isMenu === true)
        })

        return {
            routes,
            showProfileDropdown,
            showPostModal,
            showConnectModal,
            showCenterRegisterModal,
            showLogoutModal,
            userInfo,
            router,
            auth,
        }
    }
}
</script>