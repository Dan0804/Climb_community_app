<template>
    <div v-if="post" class="flex flex-1 flex-col border-r border-gray-100">
        <div class="flex items-center px-3 py-2 border-b border-gray-100">
            <button @click="router.go(-1)">
                <i class="fas fa-arrow-left text-primary text-lg ml-3 hover:bg-blue-50 p-2 h-10 w-10 rounded-full"></i>
            </button>
            <div class="flex ml-5">
                <router-link :to="`/profile/${post.uid}`">
                <img :src="post.profile_image_url" class="w-10 h-10 rounded-full hover:opacity-90 cursor-pointer" />
                </router-link>
                <div class="ml-1 -mt-0.5">
                    <div class="font-bold">{{ post.nick_name }}님의 게시글</div>
                    <div class="text-gray-500 text-xs">{{ dayjs(post.created_at).locale("ko").fromNow() }}</div>
                </div>
            </div>
        </div>

        <!-- post -->
        <div class="px-3 py-2 flex">
            
            <div class="flex-1 ml-3">
                <div class="mt-1">
                    <div class="my-2 break-words lg:w-96 w-52" style="white-space:pre-line">{{ post.post_body }}</div>
                    <div class="flex flex-1 overflow-x-auto">
                        <div class="flex-none relative" v-for="video in post.post_media" :key="video">
                            <video :src="video" :id="`${video}`" class="object-contain h-64 bg-black rounded-xl mr-2 p-1" @click="videoPlay(video)" type="video/mp4"></video>
                            <i v-if="videoStatus != video" class="absolute fa-solid fa-play top-2 left-3 text-white text-4xl"></i>
                            <i class="absolute fa-solid fa-expand bottom-2 right-4 text-white" @click="openFullscreen(`${video}`)"></i>
                        </div>
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
            <div class="cursor-pointer hover:bg-green-100 hover:text-green-400 rounded-full p-2" @click="linkCopy()">
                <i class="fa-solid fa-share-from-square px-1"></i>
            </div>
            <div v-if="post.uid === userInfo.uid" @click="handleDeletePost(post)" class="cursor-pointer hover:bg-red-100 text-red-400 rounded-full p-2">
                <i class="fas fa-trash px-1"></i>
            </div>
        </div>
        <div class="h-px w-full bg-gray-100"></div>
        
        <!-- comments -->
        <div class="overflow-y-auto">
            <div v-for="comment in comments" :key="comment" class="flex px-3 py-2 border-b border-gray-100">
                <router-link :to="`/profile/${comment.uid}`">
                    <img :src="comment.profile_image_url" class="w-10 h-10 rounded-full hover:opacity-90 cursor-pointer" />
                </router-link>
                <div class="flex-1 ml-2 space-y-1">
                    <div class="relative -mt-0.5">
                        <div class="font-bold">{{ comment.nick_name }}</div>
                        <div class="text-gray-500 text-xs">{{ dayjs(comment.created_at).locale("ko").fromNow() }}</div>
                        <button @click="handleDeleteComment(comment)" v-if="comment.uid === userInfo.uid" class="absolute right-1 top-0.5">
                            <i class="fas fa-trash text-red-400 hover:bg-red-50 m-2 rounded-full p-2"></i>
                        </button>
                    </div>
                    <div class="text-sm">{{ comment.comment_body }}</div>
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

        const linkCopy = () => {
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
                await deleteObject(storageRef(storage, `video/${post.uid}/${post.center_id}/${post.created_at}_${i}.mp4`))
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

        const videoStatus = ref(null)

        const videoPlay = (video) => {
            var preVideo = document.getElementById(`${video}`)
            var nowVideo = preVideo.getAttribute('src')
            if (videoStatus.value != nowVideo) {
                preVideo.play()
                videoStatus.value = nowVideo
                preVideo.addEventListener('ended', () => {
                    preVideo.currentTime = 0
                    videoStatus.value = null
                })
            } else {
                preVideo.pause()
                videoStatus.value = null
            }
        }

        const openFullscreen = (video) => {
            document.getElementById(`${video}`).requestFullscreen()
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
            openFullscreen,
        }
    }
}
</script>