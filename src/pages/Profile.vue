<template>
    <div v-if="profileUser" class="flex flex-1">
        <!-- profile section -->
        <div class="flex-1 flex flex-col border-r border-color">
            <!-- title -->
            <div class="flex px-3 py-1 border-b border-color">
                <button @click="router.go(-1)" class="mr-4">
                    <i class="fa-solid fa-arrow-left text-blue-300 rounded-full p-3 hover:bg-blue-50"></i>
                </button>
                <div>
                    <div class="font-semibold text-lg">{{ profileUser.user_name }}</div>
                    <div class="text-xs text-gray-500">{{ profileUser.num_posts }} 트윗</div>
                </div>
            </div>

            <div class="flex-none relative bg-gray-300 h-36">
                <!-- background image -->
                <img :src="profileUser.background_image_url" class="w-full h-36 object-cover">
                <!-- porfile image -->
                <div class="border-4 border-white bg-gray-100 w-28 h-28 rounded-full absolute top-2 left-2">
                    <img :src="profileUser.profile_image_url" class="rounded-full opacity-90 hover:opacity-100 cursor-pointer w-full h-full object-cover">
                </div>
            </div>

            <!-- profile edit button -->
            <div class="text-right mt-2 mr-2 relative">
                <div v-if="userInfo.uid === profileUser.uid">
                    <button @click="showProfileEditModal = true" class="absolute border-2 border-blue-300 text-sm text-blue-300 px-3 py-2 hover:bg-blue-50 w-24 right-0 font-bold rounded-full">프로필 수정</button>
                </div>
                <div v-else>
                    <div v-if="userInfo.followings.includes(profileUser.uid)" @click="onUnfollow">
                        <button class="absolute w-24 right-0 text-sm bg-primary text-white px-3 py-2 hover:opacity-0 font-bold rounded-full">팔로잉</button>
                        <button class="absolute w-24 right-0 text-sm bg-red-400 text-white px-3 py-2 opacity-0 hover:opacity-100 font-bold rounded-full">언팔로우</button>
                    </div>
                    <div v-else @click="onFollow">
                        <button class="absolute w-24 right-0 border-2 border-blue-300 text-sm text-blue-300 px-3 py-2 hover:bg-blue-50 font-bold rounded-full">팔로우</button>
                    </div>
                </div>
            </div>

            <!-- user info -->
            <div class="mx-4 mt-1">
                <div class="font-extrabold text-lg">{{ profileUser.user_name }}</div>
                <div class="text-gray">{{ profileUser.email }}</div>
                <div>
                    <span class="text-gray pr-1">가입일 :</span>
                    <span class="text-gray">{{ dayjs(profileUser.created_at).format("YYYY년 MM월 DD일") }}</span>
                </div>
                <div>
                    <span class="font-bold mr-1">{{ profileUser.followings.length }}</span>
                    <span class="text-gray mr-3">팔로우 중</span>
                    <span class="font-bold mr-1">{{ profileUser.followers.length }}</span>
                    <span class="text-gray">팔로워</span>
                </div>
            </div>

            <!-- taps -->
            <div class="flex border-b border-color mt-3">
                <div @click="currentTab = 'post'" :class="`${currentTab === 'post' ? 'border-b border-primary text-primary bg-BgLightBlue' : 'text-gray-500 hover:border-b border-primary hover:bg-BgLightBlue'} flex-1 text-center cursor-pointer font-bold py-1`">등록 글</div>
                <div @click="currentTab = 'like'" :class="`${currentTab === 'like' ? 'border-b border-primary text-primary bg-BgLightBlue' : 'text-gray-500 hover:border-b border-primary hover:bg-BgLightBlue'} flex-1 text-center cursor-pointer font-bold py-1`">좋아요</div>
            </div>

            <!-- Posts -->
            <div class="overflow-y-auto">
                <Post v-for="post in currentTab == 'post' ? posts : likePosts" :key="post" :userInfo="userInfo" :post="post"/>
            </div>
        </div>

        <profile-edit-modal v-if="showProfileEditModal" @close_modal="showProfileEditModal = false"></profile-edit-modal>
    </div>
</template>

<script>
import Follow from '../components/Follow.vue'
import Post from '../components/post.vue'
import ProfileEditModal from '../components/ProfileEditModal.vue'
import { ref, computed, onBeforeMount } from 'vue'
import store from '../store'
import { PostCollection, LikeCollection, db } from '../firebase'
import { onSnapshot, orderBy, query, where, doc, getDoc, updateDoc, arrayUnion, arrayRemove, } from 'firebase/firestore'
import { useRoute } from 'vue-router'
import router from '../router'
import getPostInfo from '../utils/getPostInfo'
import dayjs from 'dayjs'

export default {
    components: { Follow, Post, ProfileEditModal },
    setup() {
        const userInfo = computed(() => store.state.user)
        const profileUser = ref(null)
        const posts = ref([])
        const likePosts = ref([])
        const currentTab = ref("post")
        const route = useRoute()
        const showProfileEditModal = ref(false)

        onBeforeMount(() => {
            const profileUID = route.params.uid ?? userInfo.value.uid

            onSnapshot(doc(db, "users", profileUID), (doc) => {
                profileUser.value = doc.data()
            })

            const qPost = query(PostCollection, where("uid", "==", profileUID), orderBy("created_at", "desc"))
            const qLike = query(LikeCollection, where("uid", "==", profileUID), orderBy("created_at", "desc"))
        
            onSnapshot(qPost, (snapshot) => {
                snapshot.docChanges().forEach( async (change) => {
                    let post = await getPostInfo(change.doc.data())

                    if (change.type === "added") {
                        posts.value.splice(change.newIndex, 0, post)
                    } else if (change.type === 'modified') {
                        posts.value.splice(change.oldIndex, 1, post)
                    } else if (change.type === 'removed') {
                        posts.value.splice(change.oldIndex, 1)
                    }
                })
            })

            onSnapshot(qLike, (snapshot) => {
                snapshot.docChanges().forEach( async (change) => {
                    const Likedoc = await getDoc(doc(db, "posts", change.doc.data().from_like_id))
                    let post = await getPostInfo(Likedoc.data())

                    if (change.type === "added") {
                        likePosts.value.splice(change.newIndex, 0, post)
                    } else if (change.type === "modified") {
                        likePosts.value.splice(change.oldIndex, 1, post)
                    } else if (change.type === "removed") {
                        likePosts.value.splice(change.oldIndex, 1)
                    }
                })
            })
        })

        const onFollow = async () => {
            await updateDoc(doc(db, "users", userInfo.value.uid), {
                followings: arrayUnion(profileUser.value.uid)
            })

            await updateDoc(doc(db, "users", profileUser.value.uid), {
                followers: arrayUnion(userInfo.value.uid)
            })

            store.commit("setFollow", profileUser.value.uid)
        }

        const onUnfollow = async () => {
            await updateDoc(doc(db, "users", userInfo.value.uid), {
                followings: arrayRemove(profileUser.value.uid)
            })

            await updateDoc(doc(db, "users", profileUser.value.uid), {
                followers: arrayRemove(userInfo.value.uid)
            })

            store.commit("setUnFollow", profileUser.value.uid)
        }

        return {
            userInfo,
            posts,
            likePosts,
            dayjs,
            currentTab,
            profileUser,
            showProfileEditModal,
            router,
            onFollow,
            onUnfollow,
        }
    }
}
</script>