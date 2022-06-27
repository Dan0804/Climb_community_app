<template>
    <div class="flex flex-1 flex-col border-r border-color">
        <!-- title -->
        <div class="flex px-3 py-0.5 border-b border-color">
            <button @click="router.go(-1)" class="mr-4">
                <i class="fa-solid fa-arrow-left text-blue-300 rounded-full p-3 hover:bg-blue-50"></i>
            </button>
            <div class="-space-y-1.5">
                <div class="font-semibold text-lg">{{ userInfo.nick_name }}</div>
                <div class="text-xs text-gray-500">{{ userInfo.num_posts }} 게시글</div>
            </div>
        </div>

        <!-- profile edit button -->
        <div class="text-right mt-2 mr-2 relative">
            <div>
                <button @click="showProfileEditModal = true" class="absolute border-2 border-blue-300 text-sm text-blue-300 px-3 py-2 hover:bg-blue-50 w-24 -bottom-12 right-0 font-bold rounded-full">프로필 수정</button>
            </div>
            <div class="absolute -bottom-20 right-0 text-sm mr-4">
                <button class="mr-4" @click="showFollowingModal = true">
                    <span class="font-bold mr-1">{{ userInfo.followings.length }}</span>
                    <span class="text-gray">팔로우 중</span>
                </button>
                <button @click="showFollowerModal = true">
                    <span class="font-bold mr-1">{{ userInfo.followers.length }}</span>
                    <span class="text-gray">팔로워</span>
                </button>
            </div>
        </div>

        <!-- user info -->
        <div class="mx-4 mt-1">
            <!-- porfile image -->
            <div class="border-4 border-white bg-gray-100 w-24 h-24 rounded-full">
                <img :src="userInfo.profile_image_url" class="rounded-full opacity-90 hover:opacity-100 cursor-pointer w-full h-full object-cover">
            </div>
            <div>
                <span class="font-extrabold text-lg mr-5">{{ userInfo.nick_name }}</span>
                <span class="border-2 border-blue-300 px-2 py-1 rounded-full">
                    <i class="fa-solid fa-location-dot text-primary"></i>
                    {{ userInfo.main_center }}
                    <i :class="`fa-solid fa-circle ${userInfo.my_level}`"></i>
                </span>
            </div>
            <div class="text-sm mt-1">
                <span class="text-gray pr-1">가입일 :</span>
                <span class="text-gray">{{ dayjs(userInfo.created_at).format("YYYY년 MM월 DD일") }}</span>
            </div>
        </div>

        <!-- taps -->
        <div class="flex border-b border-color mt-1">
            <div @click="currentTab = 'post'" :class="`${currentTab === 'post' ? 'border-b border-primary text-primary bg-BgLightBlue' : 'text-gray-500 hover:border-b border-primary hover:bg-BgLightBlue'} flex-1 text-center cursor-pointer font-bold py-1`"><i class="fas fa-folder"></i></div>
            <div @click="currentTab = 'like'" :class="`${currentTab === 'like' ? 'border-b border-primary text-primary bg-BgLightBlue' : 'text-gray-500 hover:border-b border-primary hover:bg-BgLightBlue'} flex-1 text-center cursor-pointer font-bold py-1`"><i class="fa-solid fa-heart"></i></div>
        </div>

        <!-- Posts -->
        <div class="overflow-y-auto">
            <Post v-for="post in currentTab == 'post' ? posts : likePosts" :key="post" :userInfo="userInfo" :post="post"/>
        </div>
    </div>

    <profile-edit-modal v-if="showProfileEditModal" @close_modal="showProfileEditModal = false"></profile-edit-modal>
    <FollowerModal v-if="showFollowerModal" @close_modal="showFollowerModal = false"></FollowerModal>
    <FollowingModal v-if="showFollowingModal" @close_modal="showFollowingModal = false"></FollowingModal>
</template>

<script>
import Follow from '../components/Follow.vue'
import Post from '../components/post.vue'
import ProfileEditModal from '../components/ProfileEditModal.vue'
import { ref, computed, onBeforeMount, } from 'vue'
import store from '../store'
import { PostCollection, LikeCollection, db } from '../firebase'
import { onSnapshot, orderBy, query, where, doc, getDoc, } from 'firebase/firestore'
import { useRoute } from 'vue-router'
import router from '../router'
import getPostInfo from '../utils/getPostInfo'
import dayjs from 'dayjs'
import FollowerModal from '../components/followerModal.vue'
import FollowingModal from '../components/followingModal.vue'

export default {
    components: { Follow, Post, ProfileEditModal, FollowerModal, FollowingModal, },
    setup() {
        const userInfo = computed(() => store.state.user)
        const posts = ref([])
        const likePosts = ref([])
        const currentTab = ref("post")
        const route = useRoute()
        const showProfileEditModal = ref(false)
        const showFollowerModal = ref(false)
        const showFollowingModal = ref(false)

        onBeforeMount(() => {

            const qPost = query(PostCollection, where("uid", "==", userInfo.value.uid), orderBy("created_at", "desc"))
            const qLike = query(LikeCollection, where("uid", "==", userInfo.value.uid), orderBy("created_at", "desc"))
        
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

        return {
            userInfo,
            posts,
            likePosts,
            route,
            dayjs,
            currentTab,
            showProfileEditModal,
            router,
            showFollowerModal,
            showFollowingModal,
        }
    }
}
</script>