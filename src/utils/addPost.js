import { PostCollection, db } from "../firebase";
import { doc, setDoc, updateDoc, increment } from "firebase/firestore";

export default (postBody, userInfo, postMedia) => {

    return new Promise( async (resolve, reject) => {
        try {
            const docu = doc(PostCollection)
            await setDoc(docu, {
                id: docu.id,
                post_body: postBody,
                post_media: postMedia,
                uid: userInfo.uid,
                created_at: Date.now(),
                num_comments: 0,
                num_likes: 0,
                profile_image_url: userInfo.profile_image_url
            })

            await updateDoc(doc(db, "users", userInfo.uid), {
                num_posts: increment(1),
            })

            resolve(true)
        } catch(e) {
            reject(e)
        }
    })
}