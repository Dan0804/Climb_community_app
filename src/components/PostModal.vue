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
                        <textarea v-model="postBody" class="border-b border-gray-150 w-full font-bold focus:outline-none mb-3 resize-none" rows="3" placeholder="오늘은 어떤 재미있는 일이 있었나요?"></textarea>
                        <div class="relative mb-2">
                            <input class="bg-gray-100 focus:ring-2 focus:ring-blue-300 focus:bg-white text-xs rounded-full w-2/5 p-2 pl-8" type="text" placeholder="어느 암장이세요?" v-model="search">
                            <i class="fa-solid fa-hashtag absolute left-0 -top-0.5 mt-2 ml-3 text-sm text-light"></i>
                            <button v-if="hashTagCenter.length != 0" class="px-3 py-1 my-1 mx-1 bg-hover_primary text-white hover:bg-red-200 hover:text-black rounded-full absolute -top-1" @click="hashTagDelete">
                                <i class="fa-solid fa-xmark mr-2"></i>{{ hashTagCenter }}
                            </button>
                        </div>
                        <div class="h-24 border-b border-gray-150">
                            <button class="px-3 py-1 my-1 mx-1 bg-BgLightBlue hover:bg-hover_primary hover:text-white rounded-full" v-for="center in filter" :key="center.id" :value="center.center_name" :id="center.id" @click="hashTagAdd">
                                {{ center.center_name }}
                            </button>
                        </div>
                        <button @click="onChangeVideo" class="h-10 w-10 hover:text-gray-200 rounded-full fas fa-camera text-gray-500 text-xl"></button>
                        <input @change="previewVideo" type="file" accept="video/*" id="videoInput" class="hidden">
                        <div @click="videoPlay">
                            <video id="previewVideo" width="400" height="300"></video>
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
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import addPost from "../utils/addPost"
import store from "../store"
import { storage } from "../firebase"
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"
import { getDocs, } from 'firebase/firestore'
import { CenterCollection, } from '../firebase'

export default {
    setup(props, {emit}) {
        // postbody, video data update
        const postBody = ref('')
        const postMedia = ref(null)
        const previewVideoData = ref(null)
        const userInfo = computed(() => store.state.user)

        const onChangeVideo = () => {
            document.getElementById("videoInput").click()
        }

        const previewVideo = (event) => {
            const file = event.target.files[0]

            if (file.size > 1024*1024*200) {
                alert("100MB 이하의 동영상만 등록할 수 있습니다.\n\n" + "현재 파일 용량" + (Math.round(file.size / (1024 * 1024))) + "MB")    
            } else {
                previewVideoData.value = file
                const previewVideo = document.getElementById("previewVideo")
                const videoUrl = URL.createObjectURL(file)
                previewVideo.setAttribute("src", videoUrl)
                previewVideo.play()
            }
        }

        // center hashtag data
        const centerList = ref([])
        const search = ref('')
        let i = 0

        onBeforeMount( async () => {
            const q = await getDocs(CenterCollection)
            q.forEach( (doc) => {
                centerList.value.push(doc.data())
            })
        })

        const filter = computed(() => {
            const filteredList = ref([])
            if ( search.value.length != 0 ) {
                for (i=0 ; i < centerList.value.length ; i++) {
                    if ( centerList.value[i].center_name.toLowerCase().includes(search.value.toLowerCase()) ) {
                        filteredList.value.push(centerList.value[i])
                    }
                }
                return filteredList.value

            } else {
                return
            }
        })

        const hashTagCenter = ref('')
        const hashTagId = ref('')

        const hashTagAdd = (event) => {
            if ( hashTagCenter.value === '' ) {
                hashTagCenter.value = event.target.value
                hashTagId.value = event.target.id
            } else {
                alert("이미 암장을 선택하셨습니다.")
            }
        }

        const hashTagDelete = () => {
            hashTagCenter.value = ''
            hashTagId.value = ''
        }

        // post register
        const onAddPost = async () => {
            try {
                let createTime = Date.now()
                const videoRef = await storageRef(storage, `video/${userInfo.value.uid}/${createTime}`)
                await uploadBytes(videoRef, previewVideoData.value)
                const url = await getDownloadURL(videoRef)
                postMedia.value = url

                addPost(postBody.value, hashTagId.value, userInfo.value, postMedia.value, createTime)
                postBody.value = ''
                postMedia.value = null

                emit('close_modal')
            } catch (e) {
                console.log('on add post error on homepage:', e)
            }
        }

        const videoStatus = ref(false)

        const videoPlay = () => {
            const video = document.getElementById("previewVideo")
            if (videoStatus.value === false) {
                video.play()
                videoStatus.value = true
            } else {
                video.pause()
                videoStatus.value = false
            }
        }

        return {
            postBody,
            postMedia,
            userInfo,
            onAddPost,
            onChangeVideo,
            previewVideo,
            centerList,
            search,
            filter,
            hashTagCenter,
            hashTagId,
            hashTagAdd,
            hashTagDelete,
            videoStatus,
            videoPlay,
        }
    }

}
</script>