<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex justify-center min-h-screen sm:pt-4 sm:px-4 sm:pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <!-- contents -->
            <div class="relative inline-block align-bottom rounded-md text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-80 h-fit mt-12">
                <div class="relative">
                    <button @click="$emit('close_modal')" class="fa-solid fa-circle-xmark text-4xl h-10 w-10 absolute -top-11 text-white"></button>
                    <!-- posting button -->
                </div>
                <video playsinline autoplay muted :src="`${nowVideo}`" :id="`${nowVideo}`" class="object-contain bg-black p-1 rounded-md" @click="videoPlay" type="video/mp4"></video>
                <i v-if="videoStatus === false" class="absolute fa-solid fa-play top-5 left-5 text-white text-5xl"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    props: ["video", "index"],
    setup(props, { emit }) {
        const nowVideo = ref(null)
        const videoIndex = ref(null)
        const videoStatus = ref(true)

        videoIndex.value = props.index
        nowVideo.value = props.video

        const videoPlay = () => {
            const videoValue = document.getElementById(`${props.video}`)

            if (videoValue.paused) {
                videoStatus.value = true
                videoValue.play()
            } else {
                videoStatus.value = false
                videoValue.pause()
            }
        }

        return {
            nowVideo,
            videoIndex,
            videoStatus,
            videoPlay,
        }
    }
}
</script>