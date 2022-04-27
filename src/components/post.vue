<template>
  <div v-if="userInfo" class="flex px-3 py-3 border-b border-border_line">
        <router-link :to="`/profile/${post.uid}`">
            <img :src="post.profile_image_url" class="hover:opacity-80 cursor-pointer w-10 h-10 rounded-full">
        </router-link>
        <div class="flex flex-1 flex-col ml-3 space-y-1">
            <div class="text-sm space-x-2 my-2 relative">
                <span class="font-bold">{{ post.user_name }}</span>
                <span class="text-gray-500 text-sm">{{ post.email }}</span>
                <span class="text-gray-500 text-sm">•</span>
                <span class="text-gray-500 text-sm">{{ dayjs(post.created_at).locale("ko").fromNow() }}</span>
            </div>

            <!-- post contents -->
            <router-link :to="`/post/${ post.id }`">
                {{ post.post_body }}
                <video :src="post.post_media" width="400" height="300" controls></video>
            </router-link>

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
                <div @click="handleDeletePost(post)" class="cursor-pointer hover:bg-red-100 text-red-400 rounded-full p-2">
                    <i class="fas fa-trash px-1"></i>
                </div>
            </div>
        </div>
    </div>
    <comment-modal :post="post" v-if="showCommentModal" @close_modal="showCommentModal = false"></comment-modal>
</template>

<script>
import { ref, computed } from "vue"
import CommentModal from "./CommentModal.vue"
import { db, LikeCollection, CommentCollection, storage } from '../firebase'
import { deleteDoc, doc, increment, query, updateDoc, where, getDocs } from 'firebase/firestore'
import { deleteObject, ref as storageRef } from 'firebase/storage'
import handleLike from "../utils/handleLike"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/ko"
import store from '../store'
dayjs.extend(relativeTime)

export default {
    components: { CommentModal },
    props: ['userInfo', 'post'],
    setup() {
        const showCommentModal = ref(false)
        const userInfo = computed(() => store.state.user)

        const handleDeletePost = async (post) => {
            if (confirm("정말로 해당 게시글을 삭제하겠습니까?")) {
                await updateDoc(doc(db, "users", post.uid), {
                    num_posts: increment(-1),
                })
                await deleteObject(storageRef(storage, `video/${post.uid}/${post.created_at}`))
                await deleteDoc(doc(db, "posts", post.id))

                const commentSnapshot = await getDocs(query(CommentCollection, where("from_post_id", "==", post.id)))
                commentSnapshot.docs.forEach( async (doc) => await deleteDoc(doc.ref))

                const likeSnapshot = await getDocs(query(LikeCollection, where("from_like_id", "==", post.id)))
                likeSnapshot.docs.forEach( async (doc) => await deleteDoc(doc.ref))
            }
        }
        
        return {
            dayjs,
            showCommentModal,
            userInfo,
            handleLike,
            handleDeletePost,
        }
    }
}
</script>

<style>

</style>