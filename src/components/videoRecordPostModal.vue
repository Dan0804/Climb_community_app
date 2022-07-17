<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex justify-center min-h-screen sm:pt-4 sm:px-4 sm:pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <!-- contents -->
            <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                <div class="border-b border-gray-150 m-3 items-center flex justify-between">
                    <button @click="$emit('close_modal')" class="fas fa-times text-blue-400 text-xl h-10 w-10 p-2 mb-1 hover:bg-blue-50 rounded-full items-center"></button>
                    <div>
                        <span>{{ userInfo.buffer_center }}</span>에서
                    </div>
                    <!-- posting button -->
                    <div class="text-right sm:hidden mr-2 mb-1">
                        <button v-if="!postBody.length" @click="onAddPost" class="bg-light text-sm text-white font-bold px-4 py-2 rounded-full">
                            등록
                        </button>
                        <button v-else @click="onAddPost" class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-hover_primary text-sm font-bold px-4 py-2 rounded-full">
                            등록
                        </button>
                    </div>
                </div>

                <!-- posting section -->
                <div class="flex mx-3 py-3">
                    <img :src="userInfo.profile_image_url" class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer">
                    <div class="flex flex-1 flex-col ml-2">
                        <textarea v-model="postBody" class="border-b border-gray-150 w-full font-bold focus:outline-none mb-3 resize-none" rows="3" placeholder="오늘은 어떤 문제를 푸셨나요?"></textarea>
                
                        <div class="flex">
                            <div class="flex overflow-x-auto">
                                <div class="flex-none relative" v-for="(postMedia, index) in postMedia" :key="index">
                                    <video :id="`${value}`" @click="videoPlay(postMedia.video_url)" class="object-contain h-64 p-1 bg-black rounded-xl mr-2 max-w-48" :src="`${postMedia.video_url}`" playsinline muted autoplay></video>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- posting button -->
                <div class="text-right hidden sm:block border-t border-gray-150 mb-1 m-3 pt-3">
                    <button v-if="!postBody.length" class="bg-light text-sm text-white font-bold px-4 py-2 rounded-full">
                        등록
                    </button>
                    <button v-else @click="onAddPost" class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-hover_primary text-sm font-bold px-4 py-2 rounded-full">
                        등록
                    </button>
                </div>
            </div>
        </div>
    </div>

    <Loading v-if="DuringLoading"></Loading>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import addPost from "../utils/addPost"
import Loading from "./Loading.vue"
import store from "../store"
import { arrayUnion, doc, updateDoc } from '@firebase/firestore'
import { db } from '../firebase'

export default {
    components: { Loading },
    props: ["buffer"],
    setup(props, {emit}) {
        // postbody, video data update
        const postBody = ref('')
        const postMedia = props.buffer
        const videoData = ref([])
        const userInfo = computed(() => store.state.user)
        const DuringLoading = ref(false)
        const videoList = ref([])

        onBeforeMount(() => {
            if (props.buffer.length === 0) {
                alert("동영상을 선택해주세요!!")
                emit("close_modal")
            }
        })

        // post register
        const onAddPost = async () => {
            try {
                DuringLoading.value = true
                let createTime = Date.now()
                addPost(postBody.value, userInfo.value.buffer_center, userInfo.value, postMedia, createTime)

                for (let i = 0 ; i<postMedia.length ; i++) {
                    updateDoc(doc(db, "users", userInfo.value.uid), {
                        posted_buffer: arrayUnion(postMedia[i].video_name)
                    })

                    store.commit("setPostedBuffer", postMedia[i].video_name)
                }

                emit('close_modal')
            } catch (e) {
                console.log('on add post error on homepage:', e)
            } finally {
                DuringLoading.value = false
            }
        }

        const preVideoList = ref([])

        const videoPlay = (video) => {
            const preVideo = document.getElementById(`${video}`)
            if (!preVideoList.value.includes(video) && preVideo.paused) {
                preVideo.play()
                preVideoList.value.push(video)
            } else {
                preVideo.pause()
                var i = 0
                const tempPreVideoList = []
                for (i=0 ; i < preVideoList.value.length ; i++) {
                    if (preVideoList.value[i] != video) {
                        tempPreVideoList.push(preVideoList.value[i])
                    }
                }
                preVideoList.value = tempPreVideoList
            }
        }

        return {
            postBody,
            postMedia,
            videoData,
            userInfo,
            DuringLoading,
            onAddPost,
            preVideoList,
            videoPlay,
            videoList,
        }
    }
}
</script>