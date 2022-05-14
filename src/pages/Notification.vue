<template>
    <div class="flex-1 border-r border-gray-200 flex-col overflow-y-auto">
        <!-- title -->
        <div class="p-3 font-bold text-lg text-center border-b border-gray-100">
            알림
        </div>

        <!-- Notifications -->
        <div class="cursor-pointer flex flex-col hover:bg-gray-50 border-b border-gray-200 p-3" v-for="notification in notifications" :key="notification">
            <div class="flex justify-between">
                <router-link :to="`/profile/${notification.uid}`">
                    <img class="hover:opacity-80 rounded-full w-10 h-10" :src="notification.profile_image_url">
                </router-link>
                <i class="fa-solid fa-ellipsis flex place-items-center justify-center hover:border-2 hover:border-gray-100 hover:bg-blue-300 rounded-full w-10 h-10"></i>
            </div>
            <div>
                <span class="font-bold">{{ notification.nick_name }}</span> 님의 최근 글
            </div>
            <router-link :to="`/post/${notification.id}`" class="text-gray-500">{{ notification.post_body }}</router-link>
        </div>
    </div>

</template>

<script>
import Follow from '../components/Follow.vue'
import { ref, computed, onBeforeMount } from 'vue'
import store from '../store'
import { getDocs, orderBy, where, query } from 'firebase/firestore'
import { PostCollection } from '../firebase'
import getPostInfo from '../utils/getPostInfo'

export default {
    components: { Follow },
    setup() {
        const userInfo = computed(() => store.state.user)
        const notifications = ref([])

        onBeforeMount(() => {
            userInfo.value.followings.forEach( async (following) => {
                const dateFrom = Date.now() - (3 * 60 * 60 * 24 * 1000)
                const querySnapshot = await getDocs(query(PostCollection, where("uid", "==", following), where("created_at", ">", dateFrom), orderBy("created_at", "desc")))
                querySnapshot.docs.forEach( async (doc) => {
                    let post = await getPostInfo(doc.data())
                    notifications.value.push(post)
                })
            })
        })

        return {
            userInfo,
            notifications,
        }
    }
}
</script>