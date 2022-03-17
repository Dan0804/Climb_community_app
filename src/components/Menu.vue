<template>
    <div class="flex flex-col justify-between lg:w-1/7 w-30 mt-5 ml-10">

        <!-- icons -->
        <div>
        <!-- I will change this logo when I make main logo -->
        <i class="fa-brands fa-apple text-primary mb-5 ml-4 text-6xl"></i>

            <div class="flex flex-col items-start">
                <router-link :to="route.path" class="cursor-pointer hover:text-hover_primary hover:bg-BgLightBlue px-4 py-2 rounded-full" v-for="route in routes" :key="route">
                    <i :class="route.icon"></i>
                    <span class="hidden lg:inline-block"> {{route.title}} </span>
                </router-link>
            </div>
        </div>
        <!-- profile -->
        <div class="mr-3 mb-10">
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
    </div>
</template>

<script>
import {ref, onBeforeMount} from 'vue'
import router from '../router'
export default {
    setup() {
        const routes = ref([])

        onBeforeMount(() => {
            routes.value = router.options.routes
        })

        return {
            routes
        }
    }
}
</script>