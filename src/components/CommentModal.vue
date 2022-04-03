<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex justify-center min-h-screen sm:pt-4 sm:px-4 sm:pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <!-- contents -->
            <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                <div class="border-b border-gray-100 m-3 items-center flex justify-between">
                    <button @click="$emit('close_modal')" class="fas fa-times text-blue-400 text-xl h-10 w-10 p-2 hover:bg-blue-50 rounded-full"></button>
                    <!-- posting button -->
                    <div class="text-right sm:hidden mr-2 mb-1">
                        <buttonv v-if="!commentBody.length" @click="onCommentPost" class="bg-light text-sm text-white font-bold px-4 py-2 rounded-full">
                            답글 등록
                        </buttonv>
                        <button v-else @click="onCommentPost" class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-hover_primary text-sm font-bold px-4 py-2 rounded-full">
                            답글 등록
                        </button>
                    </div>
                </div>

                <!-- original posting section -->
                <div class="flex px-3 pt-3 pb-2">
                    <div class="flex flex-col">
                        <img :src="post.profile_image_url" class="w-10 h-10 rounded-full hover:opacity-80">
                        <div class="ml-5 w-0.5 h-full bg-gray-300 mt-2 -mb-2"></div>
                    </div>
                    <div class="flex-1 ml-3">
                        <div class="flex text-sm space-x-2 items-center">
                            <span class="font-bold">{{ post.user_name }}</span>
                            <span class="text-gray-500 text-xs">{{ post.email }}</span>
                            <span class="text-gray-500 text-xs">{{ moment(post.created_at).fromNow() }}</span>
                        </div>
                        <div>
                            {{ post.post_body }}
                        </div>
                        <div class="flex items-baseline">
                            <span class="text-blue-400 font-bold text-sm">{{ post.user_sname }}</span>
                            <span class="text-gray-500 text-xs pt-2">님에게 보내는 답글</span>
                        </div>
                    </div>
                </div>

                <!-- reply section -->
                <div class="flex px-3 py-3">
                    <img :src="userInfo.profile_image_url" class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer">
                    <div class="flex flex-1 flex-col ml-2">
                        <textarea v-model="commentBody" class="w-full font-bold focus:outline-none mb-3 resize-none" rows="10" placeholder="어떻게 생각하시나요?"></textarea>
                        
                        <!-- reply button -->
                        <div class="text-right hidden sm:block mr-2 mb-1">
                            <buttonv v-if="!commentBody.length" @click="onCommentPost" class="bg-light text-sm text-white font-bold px-4 py-2 rounded-full">
                                답글 등록
                            </buttonv>
                            <button v-else @click="onCommentPost" class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-hover_primary text-sm font-bold px-4 py-2 rounded-full">
                                답글 등록
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from "vue"
import moment from "moment"
import store from "../store"
import { CommentCollection, db } from '../firebase'
import { doc, increment, setDoc, updateDoc } from "firebase/firestore"

export default {
    props: ["post"],
    setup(props, { emit }) {
        const commentBody = ref('')
        const userInfo = computed(() => store.state.user)
        const onCommentPost = async () => {
            try {
                const docu = doc(CommentCollection)
                await setDoc(docu, {
                    id: docu.id,
                    from_post_id: props.post.id,
                    comment_body: commentBody.value,
                    uid: userInfo.value.uid,
                    created_at: Date.now(),
                })

                await updateDoc(doc(db, "posts", props.post.id), {
                    num_comments: increment(1),
                })
                emit('close_modal')
            } catch(e) {
                console.log('on comment post error : ', e)
            }
        }
        
        return {
            commentBody,
            onCommentPost,
            userInfo,
            moment,
        }
    }
}
</script>