<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex justify-center min-h-screen sm:pt-4 sm:px-4 sm:pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <!-- contents -->
            <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                <div class="border-b border-gray-150 m-3 items-center flex justify-between">
                    <button @click="$emit('close_modal')" class="fas fa-times text-blue-400 text-xl h-10 w-10 p-2 mb-1 hover:bg-blue-50 rounded-full items-center"></button>
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
                        <div class="relative mb-2">
                            <input class="bg-gray-100 focus:ring-2 focus:ring-blue-300 focus:bg-white text-xs rounded-full w-2/5 p-2 pl-7" type="text" placeholder="어느 암장이세요?" v-model="search">
                            <i class="fa-solid fa-hashtag absolute left-0 -top-0.5 mt-2 ml-3 text-sm text-light"></i>
                            <button v-if="hashTagCenter.length != 0" class="px-3 py-1 my-1 mx-1 bg-hover_primary text-white hover:bg-red-200 hover:text-black rounded-full absolute -top-1" @click="hashTagDelete">
                                <i class="fa-solid fa-xmark mr-2"></i>{{ hashTagCenter }}
                            </button>
                        </div>
                        <div class="h-32 border-b border-gray-150 overflow-y-auto">
                            <button class="px-3 py-1 my-1 mx-1 bg-BgLightBlue hover:bg-hover_primary hover:text-white rounded-full" v-for="center in filter" :key="center.id" :value="center" :id="center.id" @click="hashTagAdd">
                                {{ center }}
                            </button>
                        </div>
                        <div>
                            <input @change="previewVideo" type="file" accept="video/*" id="videoInput" class="hidden">
                            <i class="text-gray-500 fa-solid fa-arrow-down ml-3 animate-bounce"><span class="ml-2">동영상을 등록해주세요</span></i>
                            <i class="fa-solid fa-circle-exclamation text-xl text-gray-300 ml-5" title="동영상 코덱(확장자)은 mp4로 사용해야합니다."></i>
                        </div>
                        <div class="flex">
                            <div class="flex overflow-x-auto">
                                <div class="flex-none relative" v-for="(value, index) in videoList" :key="index">
                                    <video :id="`${value}`" @click="videoPlay(value)" class="object-contain h-64 p-1 bg-black rounded-xl mr-2 max-w-48" :src="`${value}`" playsinline muted autoplay></video>
                                    <i @click="deletePreview(index)" class="absolute top-0 right-4 fa-solid fa-xmark text-4xl text-white cursor-pointer"></i>
                                </div>
                                <button @click="onChangeVideo" class="flex-none bg-gray-300 h-64 w-36 rounded-xl mr-2 fas fa-camera text-3xl text-white"></button>
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
import { storage } from "../firebase"
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"
import { getDoc, doc, } from 'firebase/firestore'
import { db, } from '../firebase'

export default {
    components: { Loading },
    setup(props, {emit}) {
        // postbody, video data update
        const postBody = ref('')
        const postMedia = ref([])
        const videoData = ref([])
        const userInfo = computed(() => store.state.user)
        const DuringLoading = ref(false)
        const videoList = ref([])

        const onChangeVideo = () => {
            document.getElementById("videoInput").click()
        }

        const previewVideo = (event) => {
            const file = event.target.files[0]

            if (file.size > 1024*1024*200) {
                alert("200MB 이하의 동영상만 등록할 수 있습니다.\n\n" + "현재 파일 용량" + (Math.round(file.size / (1024 * 1024))) + "MB")
            } else if (videoData.value.length > 4) {
                alert("게시글 당 최대 동영상 등록 갯수를 채웠습니다.")
            } else if (Object.keys(videoData.value).find(key => videoData.value[key].name == file.name && videoData.value[key].lastModified == file.lastModified) != undefined) {
                alert("중복된 영상이 있습니다.")
            } else {
                videoData.value.push(file)
                videoList.value.push(URL.createObjectURL(file))
            }
        }

        const deletePreview = (index) => {
            var i = 0
            const tempVideoData = []
            const tempVideoList = []
            for (i=0 ; i < videoData.value.length ; i++) {
                if (i != index) {
                    tempVideoData.push(videoData.value[i])
                    tempVideoList.push(videoList.value[i])
                }
            }
            videoData.value = tempVideoData
            videoList.value = tempVideoList
        }

        // center hashtag data
        const centerList = ref([])
        const search = ref('')
        let i = 0

        onBeforeMount( async () => {
            const document = await getDoc(doc(db, 'centersList', 'List'))
            centerList.value = document.data().centers
        })

        const filter = computed(() => {
            const filteredList = ref([])
            if ( search.value.length != 0 ) {
                for (i=0 ; i < centerList.value.length ; i++) {
                    if ( centerList.value[i].toLowerCase().includes(search.value.toLowerCase()) ) {
                        filteredList.value.push(centerList.value[i])
                    }
                }
                return filteredList.value

            } else {
                return
            }
        })

        const hashTagCenter = ref('')

        const hashTagAdd = (event) => {
            if ( hashTagCenter.value === '' ) {
                hashTagCenter.value = event.target.value
            } else {
                alert("이미 암장을 선택하셨습니다.")
            }
        }

        const hashTagDelete = () => {
            hashTagCenter.value = ''
        }

        // post register
        const onAddPost = async () => {
            try {
                DuringLoading.value = true
                let createTime = Date.now()
                for (i=0 ; i < videoList.value.length ; i++) {
                    const video_name = Date.now()
                    const videoRef = await storageRef(storage, `video/${userInfo.value.uid}/${hashTagCenter.value}/${video_name}`)
                    await uploadBytes(videoRef, videoData.value[i])
                    const video_url = await getDownloadURL(videoRef)
                    postMedia.value.push({ video_name, video_url })
                }

                addPost(postBody.value, hashTagCenter.value, userInfo.value, postMedia.value, createTime)

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
            onChangeVideo,
            previewVideo,
            deletePreview,
            centerList,
            search,
            filter,
            hashTagCenter,
            hashTagAdd,
            hashTagDelete,
            preVideoList,
            videoPlay,
            videoList,
        }
    }
}
</script>