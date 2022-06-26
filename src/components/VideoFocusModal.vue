<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex justify-center min-h-screen sm:pt-4 sm:px-4 sm:pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <!-- contents -->
            <div class="relative inline-block align-bottom rounded-md text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-72 h-fit mt-12">
                <div class="relative">
                    <button @click="$emit('close_modal')" class="fa-solid fa-circle-xmark text-4xl h-10 w-10 absolute -top-11 text-white"></button>
                    <!-- posting button -->
                </div>
                <video playsinline autoplay muted loop :src="`${nowVideo}`" :id="`${nowVideo}_${videoIndex}`" class="object-contain bg-black p-1 rounded-md" @click="videoPlay" type="video/mp4"></video>
                <div v-if="videoStatus === false">
                    <i class="absolute fa-solid fa-play top-5 left-5 text-white text-5xl"></i>
                    <i v-if="leftEnd === false" class="absolute fa-solid fa-circle-arrow-left bottom-60 left-3 text-white text-5xl" @click="moveLeft"></i>
                    <i v-if="rightEnd === false" class="absolute fa-solid fa-circle-arrow-right bottom-60 right-3 text-white text-5xl" @click="moveRight"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    props: ["post", "index"],
    setup(props, { emit }) {
        const videoValue = ref(null)
        const nowVideo = ref(null)
        const videoIndex = ref(null)
        const videoStatus = ref(true)
        const leftEnd = ref(false)
        const rightEnd = ref(false)

        videoIndex.value = props.index
        nowVideo.value = props.post.post_media[videoIndex.value]

        if (videoIndex.value === 0) {
            leftEnd.value = true
        } else if (videoIndex.value === props.post.post_media.length - 1) {
            rightEnd.value = true
        }

        const videoPlay = () => {
            videoValue.value = document.getElementById(`${props.post.post_media[videoIndex.value]}_${videoIndex.value}`)
            console.log(leftEnd.value)
            console.log(rightEnd.value)

            if (videoValue.value.paused) {
                videoStatus.value = true
                videoValue.value.play()
            } else {
                videoStatus.value = false
                videoValue.value.pause()
            }
        }

        const moveLeft = () => {
            videoIndex.value -= 1
            nowVideo.value = props.post.post_media[videoIndex.value]
            videoValue.value = document.getElementById(`${props.post.post_media[videoIndex.value]}_${videoIndex.value}`)

            videoStatus.value = true
            rightEnd.value = false

            if (videoIndex.value === 0) {
                leftEnd.value = true
            }
        }

        const moveRight = () => {
            videoIndex.value += 1
            nowVideo.value = props.post.post_media[videoIndex.value]
            videoValue.value = document.getElementById(`${props.post.post_media[videoIndex.value]}_${videoIndex.value}`)

            videoStatus.value = true
            leftEnd.value = false

            if (videoIndex.value === props.post.post_media.length - 1) {
                rightEnd.value = true
            }
        }

        return {
            videoValue,
            nowVideo,
            videoIndex,
            videoStatus,
            leftEnd,
            rightEnd,
            videoPlay,
            moveLeft,
            moveRight,
        }
    }
}
</script>