import { PostCollection } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default (postBody, userInfo) => {

    return new Promise( async (resolve, reject) => {
        try {
            const docu = doc(PostCollection)
            await setDoc(docu, {
                id: docu.id,
                post_body: postBody,
                uid: userInfo.uid,
                created_at: Date.now(),
                num_comments: 0,
                num_likes: 0,
                profile_image_url: userInfo.profile_image_url
            })
            resolve(true)
        } catch(e) {
            reject(e)
        }
    })
}