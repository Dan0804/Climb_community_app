<template>
    <div v-if="userInfo" class="flex flex-col justify-between lg:w-1/7 w-30 pt-5 ml-10 border-r border-gray-200">
        <!-- icons -->
        <div>
        <!-- I will change this logo when I make main logo -->
        <i class="fa-brands fa-apple text-primary mb-5 ml-2 text-6xl"></i>

            <div class="flex flex-col items-start">
                <router-link :to="route.path" :class="`cursor-pointer hover:text-hover_primary hover:bg-BgLightBlue w-14 xl:w-28 text-center xl:text-left py-2 xl:px-4 rounded-full ${router.currentRoute.value.name === route.name ? 'text-hover_primary bg-BgLightBlue' : ''}`" v-for="route in routes" :key="route">
                    <div v-if="route.meta.isMenu">
                        <i :class="route.icon"></i>
                        <span class="hidden lg:inline-block"> {{route.title}} </span>
                    </div>
                </router-link>
            </div>

            <!-- post register button -->
            <div class="mr-3">
                <div class="w-full h-12">
                    <button @click="showPostModal = true" class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-2 hover:border-hover_primary rounded-full w-14 xl:w-28 h-12 mt-3">
                        <span class="hidden xl:block font-semibold">등록하기</span>
                        <i class="fa-solid fa-plus xl:hidden"></i>
                    </button>
                </div>
            </div>

            <!-- center register button, 관리자용!! -->
            <div class="mr-3 mt-5">
                <div class="w-full h-12">
                    <button @click="showCenterRegisterModal = true" class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-2 hover:border-hover_primary rounded-full w-14 xl:w-28 h-12 mt-3">
                        <span class="hidden xl:block font-semibold">암장 등록</span>
                        <i class="fa-solid fa-location-dot xl:hidden"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- post modal popup -->
        <post-modal v-if="showPostModal" @close_modal="showPostModal = false"></post-modal>

        <!-- center register modal popup -->
        <CenterModal v-if="showCenterRegisterModal" @center_register_close_modal="showCenterRegisterModal = false"></CenterModal>

        <!-- show LogoutModal button -->
        <div class="mr-3 mb-10" @click="showLogoutModal = true">
            <div class="w-full h-12">
                <button class="flex items-center hover:bg-BgLightBlue px-2 py-1 w-full h-12 rounded-full">
                <img :src="userInfo.profile_image_url" class="w-10 h-10 rounded-full hidden lg:block" />
                <div class="lg:ml-2 lg:block hidden">
                    <div class="text-sm text-left font-bold">{{ userInfo.user_name }}</div>
                </div>
                <i class="fa-solid fa-right-from-bracket ml-auto p-2 mr-1"></i>
                </button>
            </div>
        </div>

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

export default {
    components: { PostModal, LogoutModal, CenterModal, },
    setup() {
        const routes = ref([])
        const showProfileDropdown = ref(false)
        const showPostModal = ref(false)
        const showCenterRegisterModal = ref(false)
        const showLogoutModal = ref(false)
        const userInfo = computed(() => store.state.user)

        onBeforeMount(() => {
            routes.value = router.options.routes.filter((route) => route.meta.isMenu === true)

            // console.log(router.currentRoute.value)
        })

        return {
            routes,
            showProfileDropdown,
            showPostModal,
            showCenterRegisterModal,
            showLogoutModal,
            userInfo,
            router
        }
    }
}
</script>