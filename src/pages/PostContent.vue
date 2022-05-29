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
                    <router-link :to="`/profile/${post.uid}`">
                        <img :src="post.profile_image_url" class="w-10 h-10 rounded-full hover:opacity-90 cursor-pointer" />
                    </router-link>
                    <div class="flex-1 flex-col ml-3">
                        <div class="space-x-1 -mt-0.5">
                            <span class="font-bold">{{ post.nick_name }}</span>
                            <span class="text-gray-500 text-xs">{{ dayjs(post.created_at).locale("ko").fromNow() }}</span>
                            <div class="text-gray-500 text-xs">{{ post.email }}</div>
                        </div>
                        <div class="-ml-10 mt-1">
                            <span>{{ post.post_body }}</span>
                            <div class="relative">
                                <video :src="post.post_media" width="400" :id="`${post.id}`" @click="videoPlay(post.id)" type="video/mp4"></video>
                                <i v-if="videoStatus === true" class="fa-solid fa-play absolute bottom-1 left-1"> 재생 중</i>
                                <i v-else class="fa-solid fa-pause absolute bottom-1 left-1"> 멈춤</i>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="h-px w-full bg-gray-100"></div>

                <!-- buttons -->
                <div class="flex justify-between text-gray-500 mx-5">
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
                    <div class="cursor-pointer hover:bg-green-100 hover:text-green-400 rounded-full p-2" @click="linkCopy(post.id)">
                        <i class="fa-solid fa-share-from-square px-1"></i>
                    </div>
                    <div v-if="post.uid === userInfo.uid" @click="handleDeletePost(post)" class="cursor-pointer hover:bg-red-100 text-red-400 rounded-full p-2">
                        <i class="fas fa-trash px-1"></i>
                    </div>
                </div>
                <div class="h-px w-full bg-gray-100"></div>
                
                <!-- comments -->
                <div v-for="comment in comments" :key="comment" class="flex px-3 py-2 border-b border-gray-100">
                    <router-link :to="`/profile/${comment.uid}`">
                        <img :src="comment.profile_image_url" class="w-10 h-10 rounded-full hover:opacity-90 cursor-pointer" />
                    </router-link>
                    <div class="flex-1 ml-3 space-y-2">
                        <div class="space-x-1 -mt-0.5">
                            <span class="font-bold">{{ comment.nick_name }}</span>
                            <span class="text-gray text-xs">{{ dayjs(comment.created_at).locale("ko").fromNow() }}</span>
                            <div class="text-gray-500 text-xs">{{ comment.email }}</div>
                        </div>
                        <div>{{ comment.comment_body }}</div>
                    </div>
                    <button @click="handleDeleteComment(comment)" v-if="comment.uid === userInfo.uid">
                        <i class="fas fa-trash text-red-400 hover:bg-red-50 m-2 rounded-full p-2"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <comment-modal :post="post" v-if="showCommentModal" @close_modal="showCommentModal = false"></comment-modal>
</template>

<script>
import CommentModal from "../components/CommentModal.vue"
import router from "../router"
import { useRoute } from "vue-router"
import { ref, computed, onBeforeMount } from 'vue'
import store from '../store'
import { deleteDoc, doc, increment, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { CommentCollection, db } from "../firebase"
import getPostInfo from '../utils/getPostInfo'
import handleLike from "../utils/handleLike"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/ko"
dayjs.extend(relativeTime)

export default {
    components: { CommentModal, },
    setup() {
        const post = ref(null)
        const comments = ref([])
        const userInfo = computed(() => store.state.user)
        const showCommentModal = ref(false)

        const route = useRoute()

        const handleDeleteComment = async (comment) => {
            if (confirm("comment를 삭제하시겠습니까?")) {
                await deleteDoc(doc(db, "comments", comment.id))
                await updateDoc(doc(db, "posts", comment.from_post_id), {
                    num_comments: increment(-1),
                })
            }
        }

        const linkCopy = (postId) => {
            var url = ""
            var textarea = document.createElement("textarea")
            document.body.appendChild(textarea)
            url = window.document.location.href
            textarea.value = url
            textarea.select()
            document.execCommand("copy")
            document.body.removeChild(textarea)
            alert("주소 복사가 완료되었습니다.")       
        }

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

        onBeforeMount( async () => {
            await onSnapshot(doc(db, "posts", route.params.id), async (doc) => {
                const postInfo = await getPostInfo(doc.data())
                post.value = postInfo
            })

            const q = query(CommentCollection, where("from_post_id", "==", route.params.id), orderBy("created_at", "desc"))

            onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach( async (change) => {
                    let comment = await getPostInfo(change.doc.data())
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

        const videoStatus = ref(false)

        const videoPlay = (postId) => {
            var video = document.getElementById(`${postId}`)
            if (videoStatus.value === false) {
                video.play()
                videoStatus.value = true
                video.addEventListener('ended', () => {
                    video.currentTime = 0
                    videoStatus.value = false
                })
            } else {
                video.pause()
                videoStatus.value = false
            }
        }

        return {
            dayjs,
            router, 
            userInfo, 
            post, 
            comments, 
            showCommentModal,
            handleLike,
            handleDeleteComment,
            handleDeletePost,
            linkCopy,
            videoStatus,
            videoPlay,
        }
    }
}
</script>