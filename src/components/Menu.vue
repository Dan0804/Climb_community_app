<template>
    <div class="flex flex-col justify-between lg:w-1/7 w-30 pt-5 ml-10 border-r border-gray-200">
        <!-- icons -->
        <div>
        <!-- I will change this logo when I make main logo -->
        <i class="fa-brands fa-apple text-primary mb-5 ml-2 text-6xl"></i>

            <div class="flex flex-col items-start">
                <router-link :to="route.path" :class="`cursor-pointer hover:text-hover_primary hover:bg-BgLightBlue px-4 py-2 rounded-full ${router.currentRoute.value.name === route.name ? 'text-hover_primary' : ''}`" v-for="route in routes" :key="route">
                    <div v-if="route.meta.isMenu">
                        <i :class="route.icon"></i>
                        <span class="hidden lg:inline-block"> {{route.title}} </span>
                    </div>
                </router-link>
            </div>

            <!-- post register button -->
            <div class="mr-3">
                <div class="w-full h-12">
                    <button @click="showPostModal = true" class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-2 hover:border-hover_primary rounded-full w-12 xl:w-28 h-12 mt-3">
                        <span class="hidden xl:block font-semibold">등록하기</span>
                        <i class="fa-solid fa-plus xl:hidden"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- post modal popup -->
        <post-modal v-if="showPostModal" @close_modal="showPostModal = false"></post-modal>

        <!-- show profile button -->
        <div class="mr-3 mb-10" @click="showProfileDropdown = !showProfileDropdown">
            <div class="w-full h-12">
                <button class="flex items-center hover:bg-blue-50 px-2 py-1 w-full h-12 rounded-full">
                <img :src="userInfo.profile_image_url" class="w-10 h-10 rounded-full" />
                <div class="lg:ml-2 lg:block hidden">
                    <div class="text-sm text-left font-bold">{{ userInfo.user_name }}</div>
                    <div class="text-gray-500 text-left text-xs">{{ userInfo.email }}</div>
                </div>
                <i class="fa-solid fa-ellipsis fa-fw hidden lg:block text-l ml-auto"></i>
                </button>
            </div>
        </div>

        <!-- profile dropdown menu -->
        <div class="absolute bottom-24 left-1 lg:left-16 shadow rounded-lg w-40 bg-white" v-if="showProfileDropdown">
            <router-link to="/profile">
                <button class="hover:bg-gray-50 border-b border-gray-200 flex p-2 w-full items-center">
                    <img :src="userInfo.profile_image_url" class="w-10, h-10 rounded-full" />
                    <div class="ml-4">
                        <span class="font-bold">프로필</span>
                    </div>
                    <div class="ml-auto hover:bg-white">
                        <i class="fa-solid fa-user text-hover_primary ml-auto"></i>
                    </div>
                </button>
            </router-link>
            <button class="hover:bg-gray-50 w-full text-xs p-2 text-left" @click="onLogout">
                계정에서 로그아웃
            </button>
        </div>
    </div>
</template>

<script>
import {ref, onBeforeMount, computed} from 'vue'
import router from '../router'
import { Logout } from '../firebase'
import store from '../store'
import PostModal from './PostModal.vue'

export default {
    components: { PostModal },
    setup() {
        const routes = ref([])
        const showProfileDropdown = ref(false)
        const showPostModal = ref(false)
        const userInfo = computed(() => store.state.user)

        const onLogout = async () => {
            await Logout
            store.commit("setUser", null)
            await router.replace("/login")
        }

        onBeforeMount(() => {
            routes.value = router.options.routes.filter((route) => route.meta.isMenu === true)

            console.log(router.currentRoute.value)
        })

        return {
            routes, showProfileDropdown, showPostModal, onLogout, userInfo, router
        }
    }
}
</script>