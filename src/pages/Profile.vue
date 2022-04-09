<template>
    <div v-if="profileUser" class="flex flex-1">
        <!-- profile section -->
        <div class="flex-1 flex flex-col border-r border-color">
            <!-- title -->
            <div class="flex px-3 py-1 border-b border-color">
                <button class="mr-4">
                    <i class="fa-solid fa-arrow-left text-blue-300 rounded-full p-3 hover:bg-blue-50"></i>
                </button>
                <div>
                    <div class="font-semibold text-lg">{{ profileUser.user_name }}</div>
                    <div class="text-xs text-gray-500">{{ profileUser.num_posts }} 트윗</div>
                </div>
            </div>

            <!-- background image -->
            <div class="flex-none relative bg-gray-300 h-40">
                <!-- porfile image -->
                <div class="border-4 border-white bg-gray-100 w-28 h-28 rounded-full absolute -bottom-14 left-2">
                    <img :src="profileUser.profile_image_url" class="rounded-full opacity-90 hover:opacity-100 cursor-pointer">
                </div>
            </div>

            <!-- profile edit button -->
            <div class="text-right mt-2 mr-2">
                <button class="border-2 border-blue-300 text-blue-300 px-3 py-1 hover:bg-blue-50  font-bold rounded-full">프로필 수정</button>
            </div>

            <!-- user info -->
            <div class="mx-4 mt-3">
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
                <div @click="currentTab = 'post'" :class="`${currentTab === 'post' ? 'border-b border-primary text-primary bg-BgLightBlue' : 'text-gray-500 hover:border-b border-primary hover:bg-BgLightBlue'} flex-1 text-center cursor-pointer font-bold py-3`">등록 글</div>
                <div @click="currentTab = 'like'" :class="`${currentTab === 'like' ? 'border-b border-primary text-primary bg-BgLightBlue' : 'text-gray-500 hover:border-b border-primary hover:bg-BgLightBlue'} flex-1 text-center cursor-pointer font-bold py-3`">좋아요</div>
            </div>

            <!-- Posts -->
            <div class="overflow-y-auto">
                <Post v-for="post in currentTab == 'post' ? posts : likePosts" :key="post" :userInfo="userInfo" :post="post"/>
            </div>

        </div>
        <!-- trend section -->
        <Follow />
        <profile-edit-modal></profile-edit-modal>
    </div>
</template>

<script>
import Follow from '../components/Follow.vue'
import Post from '../components/Post.vue'
import ProfileEditModal from '../components/ProfileEditModal.vue'
import { ref, computed, onBeforeMount } from 'vue'
import store from '../store'
import { PostCollection, LikeCollection, db } from '../firebase'
import { onSnapshot, orderBy, query, where, doc, getDoc, } from 'firebase/firestore'
import { useRoute } from 'vue-router'
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

        onBeforeMount(() => {
            const profileUID = route.params.uid ?? userInfo.value.uid

            const qPost = query(PostCollection, where("uid", "==", profileUID), orderBy("created_at", "desc"))
            const qLike = query(LikeCollection, where("uid", "==", profileUID), orderBy("created_at", "desc"))
            
            onSnapshot(doc(db, "users", profileUID), (doc) => {
                profileUser.value = doc.data()
            })

            onSnapshot(qPost, (snapshot) => {
                snapshot.docChanges().forEach( async (change) => {
                    let post = await getPostInfo(change.doc.data(), userInfo.value)

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
                    let post = await getPostInfo(Likedoc.data(), userInfo.value)

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
            dayjs,
            currentTab,
            profileUser,
        }
    }
}
</script>