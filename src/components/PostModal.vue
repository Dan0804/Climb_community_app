<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex justify-center min-h-screen sm:pt-4 sm:px-4 sm:pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <!-- contents -->
            <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                <div class="border-b border-gray-100 m-3 items-center flex justify-between">
                    <button @click="$emit('close_modal')" class="fas fa-times text-blue-400 text-xl h-10 w-10 p-2 mb-1 hover:bg-blue-50 rounded-full"></button>
                    <!-- posting button -->
                    <div class="text-right sm:hidden mr-2 mb-1">
                        <buttonv v-if="!postBody.length" @click="onAddPost" class="bg-light text-sm text-white font-bold px-4 py-2 rounded-full">
                            등록
                        </buttonv>
                        <button v-else @click="onAddPost" class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-hover_primary text-sm font-bold px-4 py-2 rounded-full">
                            등록
                        </button>
                    </div>
                </div>

                <!-- posting section -->
                <div class="flex mx-3 py-3">
                    <img src="http://picsum.photos/100" class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer">
                    <div class="flex flex-1 flex-col ml-2">
                        <textarea v-model="postBody" class="border-b border-gray-100 w-full font-bold focus:outline-none mb-3 resize-none" rows="3" placeholder="오늘은 어떤 재미있는 일이 있었나요?"></textarea>
                        <button @click="onChangeVideo" class="h-10 w-10 hover:text-gray-200 rounded-full fas fa-camera text-gray-500 text-xl"></button>
                        <input @change="previewVideo" type="file" accept="video/*" id="videoInput" class="hidden">
                        <video controls ref="videoData" src="splashVideo"></video>
                    </div>
                </div>

                <!-- posting button -->
                <div class="text-right hidden sm:block border-t border-gray-100 mx-2 mt-3">
                    <buttonv v-if="!postBody.length" class="bg-light text-sm text-white font-bold px-4 py-2 rounded-full">
                        등록
                    </buttonv>
                    <button v-else @click="onAddPost" class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-hover_primary text-sm font-bold px-4 py-2 rounded-full">
                        등록
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from "vue"
import addPost from "../utils/addPost"
import store from "../store"

export default {
    setup(props, {emit}) {
        const postBody = ref('')
        const previewVideoData = ref(null)
        const videoData = ref(null)
        const userInfo = computed(() => store.state.user)
        const onAddPost = async () => {
            try {
                addPost(postBody.value, userInfo.value)
                postBody.value = ''
                emit('close_modal')
            } catch (e) {
                console.log('on add post error on homepage:', e)
            }
        }

        const onChangeVideo = () => {
            document.getElementById("videoInput").click()
        }

        const previewVideo = (event) => {
            const file = event.target.files[0]
            previewVideoData.value = file
            let reader = new FileReader()
            reader.onload = function (event) {
                videoData.value.src = event.target.result
                videoData.play()
            }
            reader.readAsDataURL(file)
        }

        return {
            postBody,
            userInfo,
            onAddPost,
            onChangeVideo,
            previewVideoData,
            previewVideo,
            videoData,
        }
    }

}
</script>