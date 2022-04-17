<template>
    <div v-if="post" class="flex flex-1">
        <div class="flex-1 border-r border-gray-100">
            <div class="flex flex-col">
                <div class="flex items-center px-3 py-2 border-b border-gray-100">
                    <button @click="router.go(-1)">
                        <i class="fas fa-arrow-left text-primary text-lg ml-3 hover:bg-blue-50 p-2 h-10 w-10 rounded-full"></i>
                    </button>
                    <span class="font-bold text-lg ml-6">게시글</span>
                </div>

                <!-- post -->
                <div class="px-3 py-2 flex">
                    <img :src="post.profile_image_url" class="w-10 h-10 rounded-full hover:opacity-90 cursor-pointer" />
                    <div class="ml-3">
                        <div class="font-bold">{{ post.user_name }}</div>
                        <div class="text-gray-500 text-xs">{{ post.email }}</div>
                    </div>
                </div>
                <div class="p-3">{{ post.post_body }}</div>
                <div class="p-3">{{ moment(post.created_at).fromNow() }}</div>
                <div class="h-px w-full bg-gray-100"></div>
                <div class="flex items-baseline space-x-1 pl-3 py-2">
                    <span class="font-bold text-sm pl-5">{{ post.num_likes }}</span>
                    <span class="text-gray text-xs">마음에 들어요</span>
                </div>
                <div class="h-px w-full bg-gray-100"></div>

                <!-- buttons -->
                <div class="flex justify-around">
                    <button @click="showCommentModal = true">
                        <i class="far fa-comment text-gray-400 text-xl hover:bg-blue-100 hover:text-blue-400 rounded-full m-2 p-1 w-10"></i>
                    </button>
                    <button>
                        <i class="fa-solid fa-retweet text-gray-400 text-xl hover:bg-green-100 hover:text-green-400 rounded-full m-2 p-1 w-10"></i>
                    </button>
                    <button v-if="!post.isLiked" @click="handleLike(post)">
                        <i class="fa-regular fa-heart text-gray-400 text-xl hover:bg-red-100 hover:text-red-400 rounded-full m-2 p-1 w-10"></i>
                    </button>
                    <button v-else @click="handleLike(post)">
                        <i class="fa-solid fa-heart text-xl bg-red-100 text-red-400 rounded-full m-2 p-1 w-10"></i>
                    </button>
                </div>
                <div class="h-px w-full bg-gray-100"></div>
                
                <!-- comments -->
                <div v-for="comment in comments" :key="comment" class="flex px-3 py-2 border-b border-gray-100">
                    <img :src="comment.profile_image_url" class="w-10 h-10 rounded-full hover:opacity-90 cursor-pointer" />
                    <div class="flex-1 ml-3 space-y-2">
                        <div class="flex items-baseline space-x-1">
                            <span class="font-bold">{{ comment.user_name }}</span>
                            <span class="text-gray text-xs">{{ comment.email }}</span>
                            <span class="text-gray text-xs">{{ moment(comment.created_at).fromNow() }}</span>
                        </div>
                        <div>{{ comment.comment_body }}</div>
                    </div>
                    <button @click="handleDeleteComment(comment)" v-if="comment.uid === userInfo.uid">
                        <i class="fas fa-trash text-red-400 hover:bg-red-50 m-2 rounded-full p-2"></i>
                    </button>
                </div>
            </div>
        </div>
        <follow></follow>
    </div>
    <comment-modal :post="post" v-if="showCommentModal" @close_modal="showCommentModal = false"></comment-modal>
</template>

<script>
import moment from "moment"
import Follow from "../components/Follow.vue"
import CommentModal from "../components/CommentModal.vue"
import router from "../router"
import { useRoute } from "vue-router"
import { ref, computed, onBeforeMount } from 'vue'
import store from '../store'
import { deleteDoc, doc, increment, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { CommentCollection, db } from "../firebase"
import getPostInfo from '../utils/getPostInfo'
import handleLike from "../utils/handleLike"

export default {
    components: { Follow, CommentModal },
    setup() {
        const post = ref(null)
        const comments = ref([])
        const userInfo = computed(() => store.state.user)
        const showCommentModal = ref(false)
        const q = query(CommentCollection, where("from_post_id", "==", post.value.id), orderBy("created_at", "desc"))

        const route = useRoute()

        const handleDeleteComment = async (comment) => {
            if (confirm("comment를 삭제하시겠습니까?")) {
                await deleteDoc(doc(db, "comments", comment.id))
                await updateDoc(doc(db, "posts", comment.from_post_id), {
                    num_comments: increment(-1),
                })
            }
        }

        onBeforeMount( async () => {
            await onSnapshot(doc(db, "posts", route.params.id), async (doc) => {
                const postInfo = await getPostInfo(doc.data(), userInfo.value)
                post.value = postInfo
            })

            onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach( async (change) => {
                    let comment = await getPostInfo(change.doc.data(), userInfo.value)
                    if (change.type === "added") {
                        comments.value.splice(change.newIndex, 0, comment)
                    } else if (change.type === 'modified') {
                        comments.value.splice(change.oldIndex, 1, comment)
                    } else if (change.type === 'removed') {
                        comments.value.splice(change.oldIndex, 1)
                    }
                })
            })
        })

        return {
            router, 
            userInfo, 
            post, 
            comments, 
            showCommentModal,
            moment, 
            handleLike,
            handleDeleteComment, 
        }
    }
}
</script>