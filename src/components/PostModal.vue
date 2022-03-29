<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <!-- contents -->
            <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div class="border-b border-gray-100 m-3 items-center">
                    <button @click="$emit('close_modal')" class="fas fa-times text-blue-400 text-xl h-10 w-10 p-2 hover:bg-blue-50 rounded-full"></button>
                </div>

                <!-- tweeting section -->
                <div class="flex px-3 py-3">
                    <img src="http://picsum.photos/100" class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer">
                    <div class="flex flex-1 flex-col ml-2">
                        <textarea v-model="postBody" class="w-full font-bold focus:outline-none mb-3 resize-none" rows="10" placeholder="오늘은 어떤 재미있는 일이 있었나요?"></textarea>
                        <div class="text-right">
                            <buttonv v-if="!postBody.length" @click="onAddTweet" class="bg-light text-sm text-white font-bold px-4 py-2 rounded-full">
                                등록
                            </buttonv>
                            <button v-else @click="onAddTweet" class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-hover_primary text-sm font-bold px-4 py-2 rounded-full">
                                등록
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue"

export default {
    setup() {
        const postBody = ref('')

        return {
            postBody,
        }
    }

}
</script>