<template>
  <div v-if="userInfo" class="flex px-3 py-3 border-b border-border_line">
        <img :src="userInfo.profile_image_url" class="hover:opacity-80 cursor-pointer w-10 h-10 rounded-full">
        <div class="flex flex-1 flex-col ml-3 space-y-1">
            <div class="text-sm space-x-2">
            <span class="font-bold">{{ post.user_name }}</span>
            <span class="text-gray-500 text-sm">{{ post.email }}</span>
            <span class="text-gray-500 text-sm">•</span>
            <span class="text-gray-500 text-sm">{{ dayjs(post.created_at).locale("ko").fromNow() }}</span>
            </div>

            <!-- post contents -->
            <router-link :to="`/post/${ post.id }`">{{ post.post_body }}</router-link>

            <!-- post icon -->
            <div class="flex justify-between text-gray-500 mr-5">
                <div @click="showCommentModal = true" class="cursor-pointer hover:bg-blue-100 hover:text-blue-400 rounded-full p-2">
                    <i class="fa-regular fa-comment"></i>
                    <span class="ml-1 text-sm">{{ post.num_comments }}</span>
                </div>
                <div v-if="!post.isLiked" @click="handleLike(post)" class="cursor-pointer hover:bg-red-100 hover:text-red-400 rounded-full p-2">
                    <i class="fa-regular fa-heart"></i>
                    <span class="ml-1 text-sm">{{ post.num_likes }}</span>
                </div>
                <div v-else @click="handleLike(post)" class="cursor-pointer bg-red-50 text-red-300 rounded-full p-2">
                    <i class="fa-solid fa-heart"></i>
                    <span class="ml-1 text-sm">{{ post.num_likes }}</span>
                </div>
                <div class="cursor-pointer hover:bg-green-100 hover:text-green-400 rounded-full p-2">
                    <i class="fa-solid fa-share-from-square px-1"></i>
                </div>
            </div>
        </div>
    </div>
    <comment-modal :post="post" v-if="showCommentModal" @close_modal="showCommentModal = false"></comment-modal>
</template>

<script>
import { ref } from "vue"
import CommentModal from "./CommentModal.vue"
import handleLike from "../utils/handleLike"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/ko"
dayjs.extend(relativeTime)

export default {
    components: { CommentModal },
    props: ['userInfo', 'post'],
    setup() {
        const showCommentModal = ref(false)
        
        return {
            dayjs,
            showCommentModal,
            handleLike, 
        }
    }
}
</script>

<style>

</style>