<template>
    <div class="w-full flex-col flex">
        <div class="border-b-2 mb-2 h-36 flex">
            <div class="mx-auto">
                <input type="file" accept="video/*" id="videoRecord" class="hidden" capture="camera" @change="storeRecordVideo">
                <button @click="recordVideo" class="h-16 w-48 mt-10 bg-primary text-white rounded text-center">
                    <span v-if="userInfo.buffer.length != 0" class="text-2xl font-bold">도 전 !!</span>
                    <span v-else class="text-2xl font-bold">시작해볼까요?</span>
                </button>
            </div>
        </div>

        <div class="text-xs px-2 flex">
            <i class="fa-solid fa-circle-exclamation pr-1 mt-0.5"></i>
            <div>“날짜”기준으로 게시글에 등록 안한 영상들이 삭제되며, 영상들은 개인기기로 다운로드가 불가합니다.</div>
        </div>

        <div class="pt-1.5 pl-5">
            <span class="font-bold text-lg">{{ userInfo.buffer_center }}</span>에서
        </div>

        <div class="h-14 pt-1.5 pl-5">
            <button class=" bg-primary text-white text-xl font-bold px-4 py-1.5 rounded-full" @click="showPostModal = true">게시글 등록<i class="ml-2 fa-solid fa-arrow-right"></i></button>
        </div>
        <div class="ml-5 pb-2">
            사용량 : <span :class="`${userInfo.buffer_size > 1600 ? 'text-red-600 font-bold' : ''}`">{{ userInfo.buffer_size }} MB</span> / 2048MB(2GB)
        </div>
        <div class="flex-1 overflow-y-auto">
            <div v-for="(video, index) in userInfo.buffer" :key="video">
                <div class="relative mx-5 px-3 bg-BgLightBlue py-2 my-1.5 rounded-xl w-64 text-left flex">
                    <div v-if="findVideo(video) != video" class="border-2 border-gray-400 w-8 h-8 rounded-full top-1.5 right-2 bg-white" @click="selectVideo(video)"></div>
                    <div v-else class="border-2 border-gray-400 w-8 h-8 rounded-full top-1.5 right-2 bg-primary text-center"><i class="fa-solid fa-check text-white my-auto text-xl" @click="deleteSelectVideo(video)"></i></div>
                    <button class="text-xl ml-2 my-auto" @click="showVideoRecordFocusModal = true, videoRecordIndex = video.video_url, videoRecord = video">{{ index+1 }}번째 시도 영상</button>
                </div>
            </div>
        </div>
    </div>

    <video-focus-modal :index="videoRecordIndex" v-if="showVideoRecordFocusModal" @close_modal="showVideoRecordFocusModal = false"></video-focus-modal>

    <video-record-post-modal :buffer="bufferVideoList" v-if="showPostModal" @close_modal="showPostModal = false"></video-record-post-modal>
</template>

<script>
import { ref, computed, onBeforeMount, } from 'vue'
import store from "../store"
import { db, storage, } from '../firebase'
import { getDownloadURL, ref as storageRef, uploadBytes, } from "firebase/storage"
import { arrayUnion, doc, increment, updateDoc } from 'firebase/firestore'
import VideoFocusModal from "../components/VideoFocusModal.vue"
import centerSelectModal from "../components/centerSelectModal.vue"
import videoRecordPostModal from "../components/videoRecordPostModal.vue"
import router from '../router'
import { auth } from '../firebase'
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/ko"
dayjs.extend(relativeTime)

export default {
    components: { VideoFocusModal, centerSelectModal, videoRecordPostModal },
    setup() {
        const userInfo = computed(() => store.state.user)
        const showVideoRecordFocusModal = ref(false)
        const showPostModal = ref(false)
        const videoRecordIndex = ref(null)
        const videoRecord = ref(null)
        const bufferVideoList = ref([])

        const recordVideo = () => {
            document.getElementById("videoRecord").click()
        }

        const selectVideo = (event) => {
            bufferVideoList.value.push(event)
        }
        const deleteSelectVideo = (event) => {
            var i = 0
            const tempVideoList = []
            for (i=0 ; i < bufferVideoList.value.length ; i++) {
                if (bufferVideoList.value[i] != event) {
                    tempVideoList.push(bufferVideoList.value[i])
                }
            }
            bufferVideoList.value = tempVideoList
        }
        const findVideo = (event) => {
            return bufferVideoList.value.find(value => value === event)
        }

        const storeRecordVideo = async (event) => {
            const file = event.target.files[0]
            const video_name = Date.now()
            const fileSize = Math.ceil(file.size / (1024 * 1024))
            const calSize = userInfo.value.buffer_size + fileSize

            if (calSize > 2048) {
                alert("죄송합니다.. 오늘 사용량을 초과하셨어요 ㅠㅠ")
            } else {
                const videoRef = await storageRef(storage, `video/${userInfo.value.uid}/${userInfo.value.buffer_center}/${video_name}`)
                await uploadBytes(videoRef, file)
                const video_url = await getDownloadURL(videoRef)
                await updateDoc(doc(db, "users", userInfo.value.uid), {
                    buffer: arrayUnion({video_name, video_url}),
                    buffer_size: increment(fileSize)
                })
                store.commit("setBuffer", {video_name, video_url})
                store.commit("setBufferSizeAdd", fileSize)
            }
        }

        onBeforeMount(() => {
            if (auth.currentUser === null) {
                alert("리셋을 위해서 재로그인 부탁드립니다!!")
                router.go(-1)
            }
        })

        return {
            dayjs,
            userInfo,
            showVideoRecordFocusModal,
            showPostModal,
            videoRecordIndex,
            videoRecord,
            bufferVideoList,
            recordVideo,
            selectVideo,
            deleteSelectVideo,
            findVideo,
            storeRecordVideo,
            router,
        }
    }
}
</script>