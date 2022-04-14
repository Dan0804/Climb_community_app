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
                <div class="h-80">
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
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from "vue"
import addPost from "../utils/addPost.js"
import store from "../store"
import { storage, db } from "../firebase"
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"
import { doc, updateDoc } from "firebase/firestore"

export default {
    setup(props, {emit}) {
        const postBody = ref('')
        const userInfo = computed(() => store.state.user)
        const backgroundImage = ref(null)
        const backgroundImageData = ref(null)
        const profileImage = ref(null)
        const profileImageData = ref(null)

        const onAddPost = async () => {
            try {
                addPost(postBody.value, userInfo.value)
                postBody.value = ''
                emit('close_modal')
            } catch (e) {
                console.log('on add post error on homepage:', e)
            }
        }

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

        return {
            postBody,
            userInfo,
            onAddPost,
            onChangeBackgroundImage,
            onChangeProfileImage,
            previewBackgroundImage,
            previewProfileImage,
            backgroundImage,
            backgroundImageData,
            profileImage,
            profileImageData,
            onSaveProfile,
        }
    }

}
</script>