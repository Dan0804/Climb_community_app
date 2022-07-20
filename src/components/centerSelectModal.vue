<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex justify-center min-h-screen sm:pt-4 sm:px-4 sm:pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle mt-16 w-72 h-96 border-2 border-black">
                 <button @click="$emit('close_modal')" class="fas fa-arrow-left text-blue-400 text-xl h-10 w-10 p-1 hover:bg-blue-50 rounded-full items-center"></button>

                 <!-- Search bar -->
                <div class="relative px-3 py-5 border-b">
                <input class="bg-gray-100 focus:ring-2 focus:ring-blue-300 focus:bg-white text-sm rounded-full w-full p-2 pl-8" type="text" placeholder="어느 암장이세요?" v-model="search">
                <i class="fa-solid fa-magnifying-glass absolute left-3 mt-2 ml-3 text-sm text-light"></i>
                </div>

                <!-- Center list -->
                    <div class="h-64 overflow-y-auto">
                        <div v-for="center in filter" :key="center.id">
                            <router-link @click="selectCenter(center), $emit('close_modal')" :to="`/videoRecord`">
                                <div class="mx-5 px-5 bg-BgLightBlue py-1 cursor-pointer my-1 rounded-xl">{{ center }}</div>
                            </router-link>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import { doc, getDoc, updateDoc, } from 'firebase/firestore'
import { db, auth, } from '../firebase'
import { computed, onBeforeMount, ref, } from 'vue'
import store from '../store'
import router from '../router'
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/ko"
dayjs.extend(relativeTime)

export default {
    emits: ['center'],
    setup(props, {emit}) {
        const userInfo = computed(() => store.state.user)
        const centerList = ref([])
        const search = ref('')
        const buffer_center = ref('')
        let i = 0

        onBeforeMount( async () => {
            let stored_date = userInfo.value.buffer_center_time
            let now_date = dayjs(Date.now()).format("DD")

            if (stored_date != now_date && auth.currentUser === null) {
                alert("리셋을 위해서 재로그인 부탁드립니다!!")
                emit('close_modal')
            }

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
                return centerList.value
            }
        })

        const selectCenter = async (center) => {
            try {
                await updateDoc(doc(db, 'users', userInfo.value.uid), {
                    buffer_center: center,
                })

                store.commit("setBufferCenter", center)
            } catch (e) {
                alert("클라이머님!! 오류가 발생해서 재접속 부탁드려요 ㅠㅠ")
                console.log('on centerSelectModal error on homepage:', e)
                emit("close_modal")
            }
        }
        
        return {
            dayjs,
            userInfo,
            centerList,
            search,
            buffer_center,
            filter,
            selectCenter,
        }
    }
}
</script>