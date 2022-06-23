<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex justify-center min-h-screen sm:pt-4 sm:px-4 sm:pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <!-- contents -->
            <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                <div class="border-b border-gray-100 m-3 items-center flex justify-between">
                    <button @click="$emit('close_modal')" class="fas fa-times text-blue-400 text-xl h-10 w-10 p-2 hover:bg-blue-50 rounded-full"></button>
                    <!-- posting button -->
                    <div class="text-right sm:hidden mr-2 mb-1">
                        <button v-if="!commentBody.length" @click="onCommentPost" class="bg-light text-sm text-white font-bold px-4 py-2 rounded-full">
                            답글 등록
                        </button>
                        <button v-else @click="onCommentPost" class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-hover_primary text-sm font-bold px-4 py-2 rounded-full">
                            답글 등록
                        </button>
                    </div>
                </div>

                <!-- original posting section -->
                <div class="flex px-3 pt-1 pb-2">
                    <div class="flex flex-col">
                        <img :src="post.profile_image_url" class="w-10 h-10 rounded-full hover:opacity-80 mb-2 flex-none">
                        <span class="ml-5 w-0.5 h-full bg-gray-300 -mb-3"></span>
                    </div>
                    <div class="flex-1 ml-3">
                        <div class="flex text-sm space-x-2 items-center">
                            <span class="font-bold">{{ post.nick_name }}</span>
                            <span class="text-gray-500 text-xs">{{ dayjs(post.created_at).locale("ko").fromNow() }}</span>
                        </div>
                        <div class="pb-5" style="white-space:pre-line">
                            {{ post.post_body }}
                        </div>
                        <div class="overflow-y-auto border-y h-80 sm:max-h-52">
                            <div v-for="comment in comments" :key="comment" class="pl-3 mb-2 mt-1 relative">
                                <router-link :to="`/profile/${comment.uid}`" class="flex">
                                    <img :src="comment.profile_image_url" class="w-10 h-10 rounded-full hover:opacity-90 cursor-pointer"/>
                                    <div class="ml-2">
                                        <div class="font-bold text-sm">{{ comment.nick_name }}</div>
                                        <div class="text-gray-500 text-xs">{{ dayjs(comment.created_at).locale("ko").fromNow() }}</div>
                                    </div>
                                </router-link>
                                <div v-if="comment.uid === userInfo.uid" @click="handleDeleteComment(comment)" class="cursor-pointer hover:bg-red-100 text-red-400 rounded-full p-2 absolute right-10 top-0">
                                    <i class="fas fa-trash px-1"></i>
                                </div>
                                <div class="ml-12 text-sm" style="white-space:pre-line">
                                    {{ comment.comment_body }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- reply section -->
                <div class="stick bottom-0">
                    <div class="flex items-baseline pb-1 pl-14">
                        <span class="text-blue-400 font-bold text-sm">{{ post.nick_name }}</span>
                        <span class="text-gray-500 text-xs pt-2">님에게 보내는 답글</span>
                    </div>
                    <div class="flex px-3 pb-3">
                        <img :src="userInfo.profile_image_url" class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer">
                        <div class="flex flex-1 flex-col ml-2">
                            <textarea v-model="commentBody" class="w-full font-bold focus:outline-none mb-3 resize-none" rows="2" :placeholder="`${userInfo.user_name}님의 생각을 들려주세요!`"></textarea>
                        </div>
                    </div>
                </div>
                
                <!-- reply button -->
                <div class="text-right hidden sm:block mr-5 mt-1 mb-5">
                    <button v-if="!commentBody.length" @click="onCommentPost" class="bg-light text-sm text-white font-bold px-4 py-2 rounded-full">
                        답글 등록
                    </button>
                    <button v-else @click="onCommentPost" class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-hover_primary text-sm font-bold px-4 py-2 rounded-full">
                        답글 등록
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import store from "../store"
import { CommentCollection, db } from '../firebase'
import { doc, getDocs, increment, orderBy, query, setDoc, updateDoc, where, deleteDoc } from "firebase/firestore"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/ko"
import { useRoute } from 'vue-router'
dayjs.extend(relativeTime)
import getCommentInfo from "../utils/getCommentInfo.js"

export default {
    props: ["post"],
    setup(props, { emit }) {
        const commentBody = ref('')
        const userInfo = computed(() => store.state.user)
        const comments = ref([])
        const route = useRoute()

        const onCommentPost = async () => {
            try {
                const docu = doc(CommentCollection)
                await setDoc(docu, {
                    id: docu.id,
                    from_post_id: props.post.id,
                    comment_body: commentBody.value,
                    nick_name: userInfo.value.nick_name,
                    uid: userInfo.value.uid,
                    created_at: Date.now(),
                    profile_image_url: userInfo.value.profile_image_url,
                })

                await updateDoc(doc(db, "posts", props.post.id), {
                    num_comments: increment(1),
                })
                emit('close_modal')
            } catch(e) {
                console.log('on comment post error : ', e)
            }
        }


        const handleDeleteComment = async (comment) => {
            if (confirm("comment를 삭제하시겠습니까?")) {
                await deleteDoc(doc(db, "comments", comment.id))
                await updateDoc(doc(db, "posts", comment.from_post_id), {
                    num_comments: increment(-1),
                })
            }
        }

        onBeforeMount( async () => {
            const querySnapshot = await getDocs(query(CommentCollection, where("from_post_id", "==", props.post.id), orderBy("created_at", "desc")))
            querySnapshot.docs.forEach( async (doc) => {
                comments.value.push(await getCommentInfo(doc.data()))
            })
        })
        
        return {
            commentBody,
            comments,
            onCommentPost,
            handleDeleteComment,
            userInfo,
            dayjs,
        }
    }
}
</script>