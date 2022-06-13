<template>
      <div @click="$emit('close_modal')" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex justify-center min-h-screen sm:pt-4 sm:px-4 sm:pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div @click.stop class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle mt-32 w-64 h-96 border-2 border-black">
                <div class="flex border-b-2 m-1 items-center">
                    <button @click="$emit('close_modal')" class="fas fa-times text-blue-400 text-xl h-10 w-10 p-1 hover:bg-blue-50 rounded-full items-center"></button>
                    <span class="ml-16 font-semibold">팔로잉</span>
                </div>
                <div class="h-80 overflow-y-auto">
                    <div v-for="following in followingInfo" :key="following" class="border-b pb-1 px-2 mx-1">
                        <router-link :to="`/profile/${following.uid === userInfo.uid ? '' : following.uid}`" class="flex items-center">
                            <div class=" w-10 h-10 rounded-full">
                                <img :src="following.profile_image_url" class="rounded-full opacity-90 hover:opacity-100 cursor-pointer w-full h-full object-cover">
                            </div>
                            <div class="ml-1">
                                <div class="text-sm">{{ following.nick_name }}</div>
                                <div class="text-xs text-gray-500">{{ following.email }}</div>
                            </div>
                        </router-link>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue'
import { getDocs, where, query, collection, getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import store from '../store'
import getUserInfo from '../utils/getUserInfo.js'
import { useRoute } from 'vue-router'

export default {
    setup(props, {emit}) {
        const userInfo = computed(() => store.state.user)
        const profileUser = ref(null)
        const route = useRoute()
        const followingInfo = ref([])
        console.log(userInfo.value.followings)

        onBeforeMount( async () => {
            const profileUID = route.params.uid ?? userInfo.value.uid
            
            const docu = await getDoc(doc(db, "users", profileUID))

            docu.data().followings.forEach( async (following) => {
                const querySnapshot = await getDocs(query(collection(db, "users"), where("uid", "==", following)))
                querySnapshot.docs.forEach( async (doc) => {
                    followingInfo.value.push(await getUserInfo(doc.data()))
                })
            })
        })

        return {
            userInfo,
            profileUser,
            followingInfo,
            getUserInfo
        }
    }
}
</script>