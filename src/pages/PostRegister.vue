<template>
    <div class="flex-1 border-r border-gray-200 flex-col overflow-y-auto">
        <!-- title -->
        <div class="p-3 font-bold text-lg text-center border-b border-gray-100">
            등록
        </div>

        <!-- Post section -->
        <div class="flex flex-1 flex-col px-3 py-3 h-full">
            <button v-if="!postBody.length" class="bg-BgLightBlue text-white px-4 py-2 mb-4 h-12 w-28 rounded-full cursor-not-allowed">
                <span class="font-semibold">진짜 등록!!</span>
            </button>
            <button v-else @click="onAddPost" class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-1 hover:border-hover_primary px-4 py-2 mb-4 h-12 w-28 rounded-full">
                <span class="font-semibold">진짜 등록!!</span>
            </button>
            <textarea v-model="postBody" class="w-full font-semibold focus:outline-none resize-none" style="height:80%" placeholder="어떤 재미있는 일이 일어났나요?"></textarea>
        </div>
    </div>

    <!-- Follow -->
    <Follow />

</template>

<script>
import Follow from '../components/Follow.vue'
import { ref, computed } from 'vue'
import store from '../store'
import { db } from '../firebase'
import { setDoc, doc, collection } from 'firebase/firestore'
import { useRouter } from 'vue-router'

export default {
    components: { Follow },
    setup() {
        const postBody = ref('')
        const userInfo = computed(() => store.state.user)
        const router = useRouter()

        const onAddPost = async () => {
            try {
                const docu = doc(collection(db, 'posts'))
                await setDoc(docu, {
                    id: docu.id,
                    post_body: postBody.value,
                    uid: userInfo.value.uid,
                    created_at: Date.now(),
                    num_comments: 0,
                    num_likes: 0,
                })
                router.push('/')
            } catch (e) {
                console.log('on add post error on homepage', e)
            }
        }

        return {
            postBody, userInfo, onAddPost, 
        }
    }
}
</script>