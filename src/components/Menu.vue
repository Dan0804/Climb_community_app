<template>
    <div class="flex flex-col justify-between lg:w-1/7 w-30 mt-5 ml-10">

        <!-- icons -->
        <div>
        <!-- I will change this logo when I make main logo -->
        <i class="fa-brands fa-apple text-primary mb-5 ml-2 text-6xl"></i>

            <div class="flex flex-col items-start">
                <router-link :to="route.path" class="cursor-pointer hover:text-hover_primary hover:bg-BgLightBlue px-4 py-2 rounded-full" v-for="route in routes" :key="route">
                    <div v-if="route.meta.isMenu">
                        <i :class="route.icon"></i>
                        <span class="hidden lg:inline-block"> {{route.title}} </span>
                    </div>
                </router-link>
            </div>

            <!-- contents register button -->
            <div class="mr-3">
                <div class="w-full h-12">
                    <button class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-2 hover:border-hover_primary rounded-full w-12 xl:w-28 h-12 mt-3">
                        <span class="hidden xl:block font-semibold">등록</span>
                        <i class="fa-solid fa-photo-film xl:hidden"></i>
                        </button>
                </div>
            </div>
        </div>
        <!-- show profile button -->
        <div class="mr-3 mb-10" @click="showProfileDropdown = !showProfileDropdown">
            <div class="w-full h-12">
                <button class="flex items-center hover:bg-blue-50 px-2 py-1 w-full h-12 rounded-full">
                <img src="http://picsum.photos/200" class="w-10 h-10 rounded-full" />
                <div class="lg:ml-2 lg:block hidden">
                    <div class="text-sm font-bold">wheogus185</div>
                    <div class="text-gray-500 text-left text-xs">조대현</div>
                </div>
                <i class="fa-solid fa-ellipsis fa-fw hidden lg:block text-l ml-auto"></i>
                </button>
            </div>
        </div>

        <!-- profile dropdown menu -->
        <div class="absolute bottom-24 left-1 lg:left-16 shadow rounded-lg w-40 bg-white" v-if="showProfileDropdown">
            <router-link to="/profile">
                <button class="hover:bg-gray-50 border-b border-gray-200 flex p-2 w-full items-center">
                    <img src="http://picsum.photos/200" class="2-10, h-10 rounded-full" />
                    <div class="ml-1">
                        <div class="font-bold text-xs">wheogus185</div>
                        <div class="text-left text-gray-500 text-xs">@naver.com</div>
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
import {ref, onBeforeMount} from 'vue'
import router from '../router'
import { Logout } from '../firebase'
import store from '../store'

export default {
    setup() {
        const routes = ref([])
        const showProfileDropdown = ref(false)

        const onLogout = async () => {
            await Logout
            store.commit("setUser", null)
            await router.replace("/login")
        }

        onBeforeMount(() => {
            routes.value = router.options.routes
        })

        return {
            routes, showProfileDropdown, onLogout,
        }
    }
}
</script>