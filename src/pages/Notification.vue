<template>
    <div class="flex-1 border-r border-gray-200 flex-col overflow-y-auto">
        <!-- title -->
        <div class="p-3 font-bold text-lg text-center border-b border-gray-100">
            알림
        </div>

        <!-- Notifications -->
        <div class="flex hover:bg-gray-50 border-b border-gray-200 p-3" v-for="notification in notifications" :key="notification">
            <router-link :to="`/profile/${notification.uid}`">
                <img class="hover:opacity-80 rounded-full w-10 h-10" :src="notification.profile_image_url">
            </router-link>
            <div class="flex flex-1 flex-col ml-3">
                <div class="space-x-1 -mt-0.5">
                    <span class="font-bold">{{ notification.nick_name }}</span>
                    <span class="text-gray-500 text-xs">{{ dayjs(notification.created_at).locale("ko").fromNow() }}</span>
                    <div class="text-gray-500 text-xs">{{ notification.email }}</div>
                </div>
                <div class="space-x-1 mt-2">
                    <router-link :to="`/post/${notification.id}`">
                        <span>{{ notification.center_id }}</span>
                        <span class="text-sm text-gray-500">에서 게시글을 업로드하셨습니다.</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue'
import store from '../store'
import { getDocs, orderBy, where, query } from 'firebase/firestore'
import { PostCollection } from '../firebase'
import getUserInfo from '../utils/getUserInfo.js'
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/ko"
dayjs.extend(relativeTime)

export default {
    setup() {
        const userInfo = computed(() => store.state.user)
        const notifications = ref([])

        onBeforeMount(() => {
            userInfo.value.followings.forEach( async (following) => {
                const dateFrom = Date.now() - (10 * 60 * 60 * 24 * 1000)
                const querySnapshot = await getDocs(query(PostCollection, where("uid", "==", following), where("created_at", ">", dateFrom), orderBy("created_at", "desc")))
                querySnapshot.docs.forEach( async (doc) => {
                    let post = await getUserInfo(doc.data())
                    notifications.value.push(post)
                })
            })
        })

        return {
            dayjs,
            userInfo,
            notifications,
        }
    }
}
</script>