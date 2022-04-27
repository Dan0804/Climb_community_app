<template>
    <div class="flex flex-1 flex-col border-r border-l border-border_line">
        <!-- page title -->
        <div class="border-b border-border_line px-3 py-4 font-bold text-lg text-center">
        홈
        </div>

        <!-- post -->
        <div class="overflow-y-auto">
            <Post :userInfo="userInfo" :post="post" v-for="post in posts" :key="post.id"/>
        </div>
    </div>
</template>

<script>
import Post from "./Post.vue"
import { ref, onBeforeMount, computed, } from "vue"
import { PostCollection, auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import store from "../store"
import { query, onSnapshot, orderBy, } from "firebase/firestore"
import getPostInfo from "../utils/getPostInfo.js"

export default {
    components: { Post },
    setup() {
        const userInfo = computed(() => store.state.user)
        const posts = ref([]);
        const q = query(PostCollection, orderBy("created_at", "desc"))

        onBeforeMount(() => {
            onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach( async (change) => {
                    let post = await getPostInfo(change.doc.data())
                    if (change.type === "added") {
                        posts.value.splice(change.newIndex, 0, post);
                    }
                    else if (change.type === "modified") {
                        posts.value.splice(change.oldIndex, 1, post);
                    }
                    else if (change.type === "removed") {
                        posts.value.splice(change.oldIndex, 1);
                    }
                });
            });
        });

        return {
            userInfo, posts
        }
    },
}
</script>