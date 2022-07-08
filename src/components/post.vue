<template>
  <div v-if="userInfo" class="px-3 py-2 border-b border-border_line">
        <router-link :to="`/profile/${post.uid}`" class="flex">
            <img :src="post.profile_image_url" class="hover:opacity-80 cursor-pointer w-10 h-10 rounded-full object-cover">
            <div class="ml-2 -mt-0.5">
                <div class="font-bold">{{ post.nick_name }}</div>
                <div class="text-gray-500 text-xs">{{ dayjs(post.created_at).locale("ko").fromNow() }}</div>
            </div>
        </router-link>
        <div class="ml-3 mt-1">
        <!-- post contents -->
            <div v-if="post.post_body.includes('\n') || len > 32">
                <div :class="`break-words w-56 ${textextend === false ? 'h-6 overflow-hidden' : 'h-auto'}`" :id="`${post.id}`" style="white-space:pre-line">
                    {{ post.post_body }}
                </div>
                <i v-if="textextend === true" class="fa-solid fa-arrow-up font-bold" @click="textextend = false"></i>
                <i v-else class="fa-solid fa-ellipsis mb-2" @click="textextend = true"></i>
            </div>
            <div v-else>
                <div class="break-words w-56 h-6 overflow-hidden" :id="`${post.id}`">
                    {{ post.post_body }}
                </div>
            </div>
            <div class="flex flex-1 overflow-x-auto w-48 xl:w-96">
                <div class="flex-none relative" v-for="(video, index) in post.post_media" :key="video">
                    <video playsinline autoplay muted :src="`${video}`" :id="`${video}`" class="object-contain h-64 w-44 bg-black rounded-xl mr-2 p-0.5" @click="videoPlay(video)" type="video/mp4"></video>
                    <i v-if="videoStatus != video" class="absolute fa-solid fa-play top-2 left-3 text-white text-4xl"></i>
                    <i v-if="videoStatus != video" class="fa-solid fa-expand absolute bottom-1 right-5 text-lg text-white" @click="showVideoFocusModal = true, videoFocusIndex = index"></i>
                </div>
            </div>
                    

            <!-- post icon -->
            <div class="flex justify-between text-gray-500 xl:mr-80 mr-1 mt-1">
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
        </div>
    </div>
    
    <comment-modal :post="post" v-if="showCommentModal" @close_modal="showCommentModal = false"></comment-modal>

    <video-focus-modal :post="post" :index="videoFocusIndex" v-if="showVideoFocusModal" @close_modal="showVideoFocusModal = false"></video-focus-modal>

</template>

<script>
import { ref, computed, onBeforeMount, onMounted, } from "vue"
import CommentModal from "./CommentModal.vue"
import VideoFocusModal from "./VideoFocusModal.vue"
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
    components: { CommentModal, VideoFocusModal, },
    props: ['userInfo', 'post'],
    setup(props) {
        const showCommentModal = ref(false)
        const showVideoFocusModal = ref(false)
        const videoFocusIndex = ref(null)
        const userInfo = computed(() => store.state.user)
        const len = ref(null)
        const textextend = ref(false)

        onBeforeMount(() => {
            if( props.post.post_body == "" ) {
                len.value = 0
            }

            for (var i = 0 ; i < props.post.post_body.length ; i++) {
                len.value += (props.post.post_body.charCodeAt(i) > 128) ? 2 : 1
            }
        })

        const handleDeletePost = async (post) => {
            if (confirm("정말로 해당 게시글을 삭제하겠습니까?")) {
                await updateDoc(doc(db, "users", post.uid), {
                    num_posts: increment(-1),
                })
                for (var i=0 ; i < post.post_media.length ; i++) {
                    await deleteObject(storageRef(storage, `video/${post.uid}/${post.center_id}/${post.created_at}_${i}.mp4`))
                }
                await deleteDoc(doc(db, "posts", post.id))

                const commentSnapshot = await getDocs(query(CommentCollection, where("from_post_id", "==", post.id)))
                commentSnapshot.docs.forEach( async (doc) => await deleteDoc(doc.ref))

                const likeSnapshot = await getDocs(query(LikeCollection, where("from_like_id", "==", post.id)))
                likeSnapshot.docs.forEach( async (doc) => await deleteDoc(doc.ref))
            }
        }

        const linkCopy = (postId) => {
            var url = ""
            var textarea = document.createElement("textarea")
            document.body.appendChild(textarea)
            url = window.document.location.href + `post/${postId}`
            textarea.value = url
            textarea.select()
            document.execCommand("copy")
            document.body.removeChild(textarea)
            alert("주소 복사가 완료되었습니다.")
        }

        onMounted(() => {
            var i = 0
            for (i = 0 ; i < props.post.post_media.length ; i++) {
                const initialVideo = document.getElementById(props.post.post_media[i])
                if (initialVideo.currentTime = 0.01) {
                    initialVideo.pause()
                }

                initialVideo.addEventListener('ended', (event) => {
                    initialVideo.currentTime = 0.01
                    videoStatus.value = null
                })
            }
        })

        const videoStatus = ref(null)
        const previousVideo = ref(null)

        const videoPlay = (video) => {
            const preVideo = document.getElementById(`${video}`)
            const nowVideo = preVideo.getAttribute('src')

            if (previousVideo.value === null) {
                previousVideo.value = preVideo
            }
            if (videoStatus.value != nowVideo) {
                if (previousVideo.value != preVideo) {
                    previousVideo.value.pause()
                    previousVideo.value = preVideo
                }
                preVideo.play()
                videoStatus.value = nowVideo
            } else {
                preVideo.pause()
                videoStatus.value = null
            }
        }

        return {
            dayjs,
            showCommentModal,
            showVideoFocusModal,
            videoFocusIndex,
            len,
            textextend,
            userInfo,
            handleLike,
            handleDeletePost,
            linkCopy,
            videoStatus,
            previousVideo,
            videoPlay,
        }
    }
}
</script>