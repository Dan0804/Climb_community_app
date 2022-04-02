import { LikeCollection, db } from "../firebase"
import { doc, setDoc, updateDoc, increment, query, where, getDocs, deleteDoc } from "firebase/firestore"
import store from '../store'

export default async (post) => {
    try {
        if (post.isLiked) {
            const likeSnapshot = await getDocs(query(LikeCollection, where("from_like_id", "==", post.id), where("uid", "==", store.state.user.uid)))
            await deleteDoc(doc(db, "likes", likeSnapshot.docs[0].id))
            
            await updateDoc(doc(db, "posts", post.id), {
                num_likes: increment(-1),
            })
        } else {
            const docu = doc(LikeCollection)
            await setDoc(docu, {
                id: docu.id,
                from_like_id: post.id,
                uid: store.state.user.uid,
                created_at: Date.now()
            })
    
            await updateDoc(doc(db, "posts", post.id), {
                num_likes: increment(1),
            })
        }

    } catch(e) {
        console.log("handle likes error:", e)
    }
}