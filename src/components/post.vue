<template>
  <div class="flex px-3 py-3 border-b border-border_line">
        <img :src="userInfo.profile_image_url" class="hover:opacity-80 cursor-pointer w-10 h-10 rounded-full">
        <div class="flex flex-1 flex-col ml-3 space-y-1">
            <div class="text-sm space-x-2">
            <span class="font-bold">{{ post.uid }}</span>
            <span class="text-gray-500 text-sm">wheogus185@naver.com</span>
            <span class="text-gray-500 text-sm">•</span>
            <span class="text-gray-500 text-sm">{{ moment(post.created_at).fromNow() }}</span>
            </div>

            <!-- post contents -->
            <div>{{ post.post_body }}</div>

            <!-- post icon -->
            <div class="flex justify-between text-gray-500 mr-5">
                <div class="cursor-pointer hover:bg-blue-100 hover:text-blue-400 rounded-full p-2">
                    <i class="fa-regular fa-comment"></i>
                    <span class="ml-1 text-sm">{{ post.num_comments }}</span>
                </div>
                <div class="cursor-pointer hover:bg-red-100 hover:text-red-400 rounded-full p-2">
                    <i class="fa-regular fa-heart"></i>
                    <span class="ml-1 text-sm">{{ post.num_likes }}</span>
                </div>
                <div class="cursor-pointer hover:bg-green-100 hover:text-green-400 rounded-full p-2">
                    <i class="fa-solid fa-share-from-square px-1"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment"

export default {
    props: ['userInfo', 'post'],
    setup() {
        return {
            moment,
        }
    }
}
</script>

<style>

</style>