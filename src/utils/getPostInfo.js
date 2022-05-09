import { db, LikeCollection } from "../firebase"
import { doc, getDoc, query, where, getDocs } from "firebase/firestore"
import store from "../store"
import { computed } from "vue"

export default async (post) => {
    const userInfo = computed(() => store.state.user)
    const docu = await getDoc(doc(db, "users", post.uid))
    post.profile_image_url = docu.data().profile_image_url
    post.email = docu.data().email
    post.user_name = docu.data().user_name
    post.nick_name = docu.data().nick_name

    const likeSnapshot = await getDocs(query(LikeCollection, where("from_like_id", "==", post.id), where("uid", "==", userInfo.value.uid)))
    if (likeSnapshot.empty) {
        post.isLiked = false
    } else {
        post.isLiked = true
    }

    return post
}