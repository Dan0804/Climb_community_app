import { db, } from "../firebase"
import { doc, getDoc, } from "firebase/firestore"
import store from "../store"
import { computed } from "vue"

export default async (post) => {
    const userInfo = computed(() => store.state.user)
    const docu = await getDoc(doc(db, "users", post.uid))
    post.profile_image_url = docu.data().profile_image_url
    post.email = docu.data().email
    post.nick_name = docu.data().nick_name

    return post
}