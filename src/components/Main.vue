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
import { ref, onBeforeMount, computed, onMounted } from "vue"
import { db } from "../firebase"
import store from "../store"
import { collection, query, onSnapshot, orderBy, getDoc, doc, } from "firebase/firestore"

export default {
    components: { Post },
    setup() {
        const userInfo = computed(() => store.state.user)
        const posts = ref([]);
        const q = query(collection(db, "posts"), orderBy("created_at", "desc"))

        onMounted(() => {
            console.log(store.state.user)
        })

        onBeforeMount(() => {
            onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach( async (change) => {
                    let post = await getUserInfo(change.doc.data())
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
        
        const getUserInfo = async (post) => {
            const docu = await getDoc(doc(db, "users", post.uid))
            post.profile_image_url = docu.data().profile_image_url
            post.email = docu.data().email
            post.user_name = docu.data().user_name

            console.log(post)

            return post
        }

        return {
            userInfo, posts
        }
    },
}
</script>