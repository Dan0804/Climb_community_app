<template>
    <div class="flex flex-col items-center space-y-6 mt-32">
        <span class="text-2xl font-bold">Climb View</span>
        <span class="text-2xl font-bold">로그인</span>
        <button class="w-52 rounded bg-primary text-white py-4" @click="GoogleLogin">
            <i class="fa-brands fa-google mr-2"></i>
            Google 로그인
        </button>
        <!-- <button class="w-64 rounded bg-primary text-white py-4" @click="FacebookLogin">
            <i class="fa-brands fa-facebook mr-2"></i>
            Facebook 로그인
        </button>
        <button class="w-64 rounded bg-primary text-white py-4" @click="googleLogin">
            <i class="fa-brands fa-apple mr-2"></i>
            Apple 로그인
        </button> -->
    </div>
</template>

<script>
import { db, auth } from '../firebase'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import store from '../store'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export default {
  setup() {
    const router = useRouter()

    const GoogleLogin = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider).then( async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            const user = result.user

            const docSnap = await getDoc(doc(db, "users", user.uid))
            
            if ( docSnap.data() != undefined ) {
                store.commit("setUser", docSnap.data())
                router.replace("/")
            } else {
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    user_name: user.displayName,
                    nick_name: user.displayName,
                    main_center: '',
                    my_level: '',
                    email: user.email,
                    profile_image_url: '/profile.jpeg',
                    background_image_url: '/background.png',
                    num_posts: 0,
                    followers: [],
                    followings: [],
                    created_at: Date.now()
                })
                const docSnap = await getDoc(doc(db, "users", user.uid))
                store.commit("setUser", docSnap.data())
                router.replace("/")
            }
            
        }).catch((e) => {
            const errorCode = e.code
            const errorMessage = e.message
            const email = e.email
            const credential = GoogleAuthProvider.credentialFromError(e)
        })
    }

    return {
      GoogleLogin,
   }
  } 
}
</script>