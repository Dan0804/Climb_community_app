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
                <div class="relative h-16">
                    <!-- profile image -->
                    <img ref="profileImage" :src="userInfo.profile_image_url" class="border-4 border-white w-32 h-32 rounded-full absolute right-9 object-cover">
                    <button @click="onChangeProfileImage" class="absolute h-10 w-10 hover:text-gray-200 rounded-full fas fa-camera text-white text-xl right-20 -bottom-4"></button>
                    <input @change="previewProfileImage" type="file" accept="image/*" id="profileImageInput" class="hidden">
                </div>

                <!-- profile contents section -->
                <div class="flex flex-col space-y-2 ml-6 mb-10">
                    <span>닉네임</span>
                    <input class="bg-gray-100 focus:ring-2 focus:ring-blue-300 focus:bg-white text-xs rounded-full w-44 p-2 px-4" type="text" v-model="NickName">

                    <span class="mt-5">주 암장</span>
                    <div class="relative mb-2">
                        <div class="mb-1">
                            <input class="bg-gray-100 focus:ring-2 focus:ring-blue-300 focus:bg-white text-sm rounded-full w-44 p-2 pl-7" type="text" placeholder="어느 암장이세요?" v-model="search">
                            <i class="fa-solid fa-hashtag absolute left-0 -top-0.5 mt-2 ml-3 text-sm text-light"></i>
                            <button v-if="hashTagCenter.length != 0" class="px-3 py-2 my-1 mx-1 text-sm bg-hover_primary text-white hover:bg-red-200 hover:text-black rounded-full absolute -top-1" @click="hashTagDelete">
                                <i class="fa-solid fa-xmark mr-2"></i>{{ hashTagCenter }}
                            </button>
                        </div>
                        <div class="h-28 border-b border-gray-150 mr-40 overflow-y-auto">
                            <button class="px-3 py-1 my-0.5 mx-1 bg-BgLightBlue hover:bg-hover_primary hover:text-white rounded-full" v-for="center in filter" :key="center.id" :value="center" @click="hashTagAdd">
                                {{ center }}
                            </button>
                        </div>
                    </div>

                    <span class="mt-5">주 난이도</span>
                    <div class="p-1 border-2 border-blue-300 mr-auto rounded-full space-x-1">
                        <button v-for="level in LevelList" :key="level" :class="`${level} w-8 border-2 border-BgLightBlue rounded-full hover:border-primary hover:bg-BgLightBlue text-xl ${levelColor === level ? 'border-primary bg-BgLightBlue' : ''}`" @click="LevelSelect(level)"><i class="fa-solid fa-circle"></i></button>
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
import { doc, updateDoc, getDoc, } from "firebase/firestore"

export default {
    setup(props, {emit}) {
        const userInfo = computed(() => store.state.user)
        const profileImage = ref(null)
        const profileImageData = ref(null)
        const NickName = ref(userInfo.value.nick_name)

        const onChangeProfileImage = () => {
            document.getElementById('profileImageInput').click()
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

        const centerList = ref([])
        const search = ref('')
        let i = 0

        onBeforeMount( async () => {
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
                return
            }
        })

        const hashTagCenter = ref(userInfo.value.main_center)

        const hashTagAdd = (event) => {
            if ( hashTagCenter.value === '' ) {
                hashTagCenter.value = event.target.value
            } else {
                alert("이미 암장을 선택하셨습니다.")
            }
        }

        const hashTagDelete = () => {
            hashTagCenter.value = ''
        }

        // const levelClick = ref(false)
        const levelColor = ref(userInfo.value.my_level)
        const LevelList = ['text-white', `text-yellow-400`, 'text-orange-400', 'text-green-800', 'text-sky-500', 'text-red-600', 'text-purple-600', 'text-gray-300', 'text-black']
        const LevelSelect = (level) => {
            if (levelColor.value != level) {
                levelColor.value = level
                console.log(levelColor.value)
            } else {
                levelColor.value = ''
            }
        }

        const onSaveProfile = async () => {
            if ( !profileImageData.value 
                && NickName.value === userInfo.value.nick_name 
                && hashTagCenter.value === userInfo.value.center_name
                && levelColor.value === userInfo.value.my_level ) {
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

            if (NickName.value != userInfo.value.nick_name) {
                try {
                    console.log(NickName.value)
                    await updateDoc(doc(db, "users", userInfo.value.uid), {
                        nick_name: NickName.value,
                    })
                    store.commit("setProfileNickName", NickName.value)
                } catch(e) {
                    console.log(`Nick Name data error:${e}`)
                }
            }

            if (hashTagCenter.value !=userInfo.value.center_name) {
                try {
                    await updateDoc(doc(db, "users", userInfo.value.uid), {
                        main_center: hashTagCenter.value,
                    })
                    store.commit("setProfileMainCenter", hashTagCenter.value)
                } catch(e) {
                    console.log(`Main Center data error:${e}`)
                }
            }

            if (levelColor.value != userInfo.value.my_level) {
                try {
                    await updateDoc(doc(db, "users", userInfo.value.uid), {
                        my_level: levelColor.value,
                    })
                    store.commit("setProfileMyLevel", levelColor.value)
                } catch(e) {
                    console.log(`My Level data error:${e}`)
                }
            }

            emit('close_modal')
        }

        return {
            userInfo,
            onChangeProfileImage,
            previewProfileImage,
            profileImage,
            profileImageData,
            onSaveProfile,
            NickName,
            centerList,
            search,
            filter,
            hashTagCenter,
            hashTagAdd,
            hashTagDelete,
            levelColor,
            LevelList,
            LevelSelect,
        }
    }
}
</script>