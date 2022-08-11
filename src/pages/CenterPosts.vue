<template>
    <div v-if="centerInfo" class="flex flex-1 flex-col border-r border-l border-border_line">
        <!-- page title -->
        <div class="border-b border-border_line px-3 py-4 font-bold text-lg text-center">
            {{ centerInfo.center_name }}
        </div>

        <!-- post -->
        <div class="overflow-y-auto">
            <Post :userInfo="userInfo" :post="post" v-for="post in posts" :key="post.id"/>
            <div class="text-center py-1 text-xl">
                <button v-if="lastVisible != undefined" class="px-14 py-2 text-primary" @click="nextPage">더 보기</button>
            </div>
        </div>
    </div>
</template>

<script>
import Post from "../components/post.vue"
import { ref, onBeforeMount, computed, } from "vue"
import { db, PostCollection, } from "../firebase"
import store from "../store"
import { query, onSnapshot, orderBy, where, getDoc, doc, limit, getDocs, startAfter, } from "firebase/firestore"
import getPostInfo from "../utils/getPostInfo.js"
import { useRoute } from 'vue-router'

export default {
    components: { Post },
    setup() {
        const month = Date.now() - (30 * 60 * 60 * 24 * 1000)
        const userInfo = computed(() => store.state.user)
        const route = useRoute()
        const posts = ref([])
        const centerInfo = ref(null)
        const q = ref([])
        const lastVisible = ref([])


        onBeforeMount( async () => {
            const centerSnap = await getDoc(doc(db, "centers", route.params.id))
            centerInfo.value = centerSnap.data()            
            q.value = query(PostCollection, where("center_id", "==", route.params.id), where("created_at", ">", month), orderBy("created_at", "desc"), limit(3))
            const documentSnapshots = await getDocs(q.value)
            lastVisible.value = documentSnapshots.docs[documentSnapshots.docs.length-1]

            onSnapshot(q.value, (snapshot) => {
                snapshot.docChanges().forEach( async (change) => {
                    let post = await getPostInfo(change.doc.data())
                    if (change.type === "added") {
                        posts.value.splice(change.newIndex, 0, post);
                    } else if (change.type === "modified") {
                        posts.value.splice(change.oldIndex, 1, post);
                    } else if (change.type === "removed") {
                        posts.value.splice(change.oldIndex, 1);
                    }
                });
            });
        });

        const nextPage = async () => {
            q.value = query(PostCollection, where("center_id", "==", route.params.id), where("created_at", ">", month), orderBy("created_at", "desc"), startAfter(lastVisible.value), limit(3))
            const documentSnapshots = await getDocs(q.value)
            lastVisible.value = documentSnapshots.docs[documentSnapshots.docs.length-1]

            onSnapshot(q.value, (snapshot) => {
                snapshot.docChanges().forEach( async (change) => {
                    let post = await getPostInfo(change.doc.data())
                    if (change.type === "added") {
                        posts.value.splice(change.newIndex + posts.value.length, 0, post);
                    } else if (change.type === "modified") {
                        posts.value.splice(change.oldIndex, 1, post);
                    } else if (change.type === "removed") {
                        posts.value.splice(change.oldIndex, 1);
                    }
                });
            });
        }

        return {
            userInfo,
            posts,
            route,
            centerInfo,
            q,
            lastVisible,
            nextPage,
        }
    },
}
</script>