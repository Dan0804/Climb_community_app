import { db, LikeCollection } from "../firebase"
import { doc, getDoc, query, where, getDocs } from "firebase/firestore"

export default async (post, userInfo) => {
    const docu = await getDoc(doc(db, "users", post.uid))
    post.profile_image_url = docu.data().profile_image_url
    post.email = docu.data().email
    post.user_name = docu.data().user_name
    console.log(userInfo)

    const likeSnapshot = await getDocs(query(LikeCollection, where("from_like_id", "==", post.id), where("uid", "==", userInfo.uid)))
    if (likeSnapshot.empty) {
        post.isLiked = false
    } else {
        post.isLiked = true
    }

    return post
}