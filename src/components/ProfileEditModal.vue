<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex justify-center min-h-screen sm:pt-4 sm:px-4 sm:pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <!-- contents -->
            <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                <div class="border-b border-gray-100 m-3 items-center flex justify-between">
                    <div class="flex items-center">
                        <button @click="$emit('close_modal')" class="fas fa-times text-blue-400 text-xl h-10 w-10 p-2 mb-1 hover:bg-blue-50 rounded-full"></button>
                        <span class="pt-px font-bold ml-2">프로필 수정</span>
                    </div>
                    <div class="text-right mr-2">
                        <button @click="onSaveProfile" class="bg-primary hover:bg-light text-white text-sm font-bold px-4 py-2 rounded-full">
                            저장
                        </button>
                    </div>
                </div>

                <!-- image section -->
                <div class="h-60">
                    <!-- background -->
                    <div class="flex flex-none items-center justify-center relative bg-gray-300 h-40">
                        <img ref="backgroundImage" :src="userInfo.background_image_url" class="object-cover absolute w-full h-full">
                        <button @click="onChangeBackgroundImage" class="absolute h-10 w-10 hover:text-gray-200 rounded-full fas fa-camera text-white text-xl"></button>
                        <input @change="previewBackgroundImage" type="file" accept="image/*" id="backgroundImageInput" class="hidden">

                        <!-- profile image -->
                        <img ref="profileImage" :src="userInfo.profile_image_url" class="border-4 border-white w-28 h-28 rounded-full absolute -bottom-14 left-2 object-cover">
                        <button @click="onChangeProfileImage" class="absolute h-10 w-10 hover:text-gray-200 rounded-full fas fa-camera text-white text-xl -bottom-5 left-11"></button>
                        <input @change="previewProfileImage" type="file" accept="image/*" id="profileImageInput" class="hidden">
                    </div>
                </div>

                <!-- profile contents section -->
                <div class="flex flex-col space-y-2 ml-20 mb-10">

                        <span>이름</span>
                        <input class="bg-gray-100 focus:ring-2 focus:ring-blue-300 focus:bg-white text-xs rounded-full w-2/5 p-2 px-4" type="text" placeholder="어느 암장이세요?" v-model="UserName">

                        <span class="mt-5">주 암장</span>
                        <div class="relative mb-2">
                            <input class="bg-gray-100 focus:ring-2 focus:ring-blue-300 focus:bg-white text-xs rounded-full w-2/5 p-2 pl-7" type="text" placeholder="어느 암장이세요?" v-model="search">
                            <i class="fa-solid fa-hashtag absolute left-0 -top-0.5 mt-2 ml-3 text-sm text-light"></i>
                            <button v-if="hashTagCenter.length != 0" class="px-3 py-1 my-1 mx-1 bg-hover_primary text-white hover:bg-red-200 hover:text-black rounded-full absolute -top-1" @click="hashTagDelete">
                                <i class="fa-solid fa-xmark mr-2"></i>{{ hashTagCenter }}
                            </button>
                            <div class="h-20 border-b border-gray-150 overflow-y-auto">
                                <button class="px-3 py-1 my-2 mx-1 bg-BgLightBlue hover:bg-hover_primary hover:text-white rounded-full" v-for="center in filter" :key="center.id" :value="center.center_name" :id="center.id" @click="hashTagAdd">
                                    {{ center.center_name }}
                                </button>
                            </div>
                        </div>

                        <span class="mt-5">주 난이도</span>
                        <div class="p-2 border-2 border-blue-300 mr-auto rounded-full space-x-1">
                            <button v-for="level in LevelList" :key="level" :value="level" :class="`text-${level} w-7 border-2 border-BgLightBlue rounded-full hover:border-primary hover:bg-BgLightBlue`"><i class="fa-solid fa-circle"></i></button>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import store from "../store"
import { storage, db } from "../firebase"
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"
import { doc, updateDoc, getDocs } from "firebase/firestore"
import { CenterCollection, } from '../firebase'

export default {
    setup(props, {emit}) {
        const userInfo = computed(() => store.state.user)
        const backgroundImage = ref(null)
        const backgroundImageData = ref(null)
        const profileImage = ref(null)
        const profileImageData = ref(null)
        const UserName = ref(userInfo.value.user_name)

        const onChangeBackgroundImage = () => {
            document.getElementById('backgroundImageInput').click()
        }

        const onChangeProfileImage = () => {
            document.getElementById('profileImageInput').click()
        }

        const previewBackgroundImage = (event) => {
            const file = event.target.files[0]
            backgroundImageData.value = file
            let reader = new FileReader()
            reader.onload = function (event) {
                backgroundImage.value.src = event.target.result
            }
            reader.readAsDataURL(file)
        }

        const previewProfileImage = (event) => {
            const file = event.target.files[0]
            profileImageData.value = file
            let reader = new FileReader()
            reader.onload = function (event) {
                profileImage.value.src = event.target.result
            }
            reader.readAsDataURL(file)
        }

        const onSaveProfile = async () => {
            if ( !profileImageData.value && !backgroundImageData.value) {
                return
            }

            if (profileImageData.value) {
                try {
                    const profileRef = await storageRef(storage, `profile/${userInfo.value.uid}/profile`)
                    await uploadBytes(profileRef, profileImageData.value)
                    const url = await getDownloadURL(profileRef)
                    await updateDoc(doc(db, "users", userInfo.value.uid), {
                        profile_image_url: url,
                    })
                    store.commit("setProfileImage", url)
                } catch(e) {
                    console.log(`profile image data error:${e}`)
                }
            }

            if (backgroundImageData.value) {
                try {
                    const backgroundRef = await storageRef(storage, `profile/${userInfo.value.uid}/background`)
                    await uploadBytes(backgroundRef, backgroundImageData.value)
                    const url = await getDownloadURL(backgroundRef)
                    await updateDoc(doc(db, "users", userInfo.value.uid), {
                        background_image_url: url,
                    })
                    store.commit("setBackgroundImage", url)
                } catch(e) {
                    console.log(`background image data error:${e}`)
                }
            }
            emit('close_modal')
        }

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

        const LevelList = ['white', `yellow-400`, 'orange-400', 'green-800', 'sky-500', 'red-500', 'purple-600', 'gray-300', 'black']

        return {
            userInfo,
            onChangeBackgroundImage,
            onChangeProfileImage,
            previewBackgroundImage,
            previewProfileImage,
            backgroundImage,
            backgroundImageData,
            profileImage,
            profileImageData,
            onSaveProfile,
            UserName,
            LevelList,
            centerList,
            search,
            filter,
            hashTagCenter,
            hashTagId,
            hashTagAdd,
            hashTagDelete,
        }
    }

}
</script>