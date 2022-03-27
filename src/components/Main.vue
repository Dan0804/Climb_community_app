<template>
    <div class="flex-1 border-r border-l border-border_line overflow-y-auto">
        <div class="flex flex-col">

            <!-- page title -->
            <div class="border-b border-border_line px-3 py-4 font-bold text-lg text-center">
            홈
            </div>

            <!-- post -->
            <Post :userInfo="userInfo" :post="post" v-for="post in posts" :key="post.id"/>
        </div>
    </div>
</template>

<script>
import Post from "./post.vue"
import { ref, onBeforeMount, computed } from "vue"
import { db } from "../firebase"
import store from "../store"
import { collection, query, onSnapshot, orderBy, } from "firebase/firestore"

export default {
    components: { Post },
    setup() {
        const userInfo = computed(() => store.state.user)
        const posts = ref([]);
        const q = query(collection(db, "posts"), orderBy("created_at", "desc"));
        onBeforeMount(() => {
            onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        posts.value.splice(change.newIndex, 0, change.doc.data());
                    }
                    else if (change.type === "modified") {
                        posts.value.splice(change.oldIndex, 1, change.doc.data());
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