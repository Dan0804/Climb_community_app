<template>
    <div class="flex flex-1 flex-col border-r border-l border-border_line">
        <!-- page title -->
        <div class="border-b border-border_line px-3 py-4 font-bold text-lg text-center">
            {{ centerInfo.center_name }}
        </div>

        <!-- post -->
        <div class="overflow-y-auto">
            <Post :userInfo="userInfo" :post="post" v-for="post in posts" :key="post.id"/>
        </div>
    </div>
</template>

<script>
import Post from "../components/post.vue"
import { ref, onBeforeMount, computed, } from "vue"
import { db, PostCollection, } from "../firebase"
import store from "../store"
import { query, onSnapshot, orderBy, where, getDoc, doc, } from "firebase/firestore"
import getPostInfo from "../utils/getPostInfo.js"
import { useRoute } from 'vue-router'

export default {
    components: { Post },
    setup() {
        const userInfo = computed(() => store.state.user)
        const route = useRoute()
        const posts = ref([])
        const centerInfo = ref(null)


        onBeforeMount( async () => {
            const centerSnap = await getDoc(doc(db, "centers", route.params.id))
            centerInfo.value = centerSnap.data()

            const q = query(PostCollection, where("center_id", "==", route.params.id), orderBy("created_at", "desc"))

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
            userInfo,
            posts,
            route,
            centerInfo,
        }
    },
}
</script>