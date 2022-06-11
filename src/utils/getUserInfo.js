import { db, } from "../firebase"
import { doc, getDoc, } from "firebase/firestore"

export default async (user) => {
    const docu = await getDoc(doc(db, "users", user.uid))
    user.profile_image_url = docu.data().profile_image_url
    user.email = docu.data().email
    user.nick_name = docu.data().nick_name

    return user
}