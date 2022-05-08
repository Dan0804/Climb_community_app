<template>
    <div class="flex flex-col items-center space-y-6 mt-10">
    <i :class="`fa-brands fa-twitter text-4xl text-primary ${loading ? 'animate-bounce' : ''}`"></i>
    <span class="text-2xl font-bold">로그인</span>
    <button class="w-96 rounded bg-primary text-white py-4" @click="googleLogin">구글 로그인</button>

    <!-- 이거는 이메일 가입하고 로그인하는걸로 이제는 안쓸거임 -->
    <!-- <input v-model="email" class="rounded w-96 px-4 py-3 border border-gray-300 focus:ring-2 focus:border-primary" placeholder="이메일" type="text">
    <input @keyup.enter="onLogin" v-model="password" class="rounded w-96 px-4 py-3 border border-gray-300 focus:ring-2 focus:border-primary" placeholder="비밀번호" type="password">
    <button class="w-96 rounded bg-primary text-white py-4" @click="onLogin">로그인</button> -->
    <!-- <router-link to="/register">
      <button class="text-primary">계정이 없으신가요? 회원가입하기</button>
    </router-link> -->

  </div>
</template>

<script>
import { ref } from 'vue'
import { loginEmail, db, auth } from '../firebase'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import store from '../store'
import { browserLocalPersistence, GoogleAuthProvider, setPersistence, signInWithPopup } from 'firebase/auth'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const router = useRouter()

    // 이메일 가입하고 로그인하는 함수
    // const onLogin = async () => {

    //   if(!email.value || !password.value) {
    //     alert('이메일, 비밀번호를 모두 입력해주세요!!')
    //     return
    //   }

    //   try {
    //     loading.value = true
    //     const { user } = await loginEmail(email.value, password.value)
    //     const docSnap = await getDoc(doc(db, "users", user.uid))
    //     console.log(docSnap)
    //     store.commit("setUser", docSnap.data())
    //     // console.log(store.state.user)
    //     router.replace("/")
        
    //   } catch(e) {
    //     switch (e.code) {
    //       case 'auth/invalid-email':
    //         alert('잘못된 이메일 형식입니다.')
    //         break
    //       case 'auth/user-not-found':
    //         alert('등록되지 않은 이메일입니다.')
    //         break
    //       case 'auth/wrong-password':
    //         alert('비밀번호가 틀립니다.')
    //       default:
    //         alert(e.message)
    //     }
    //   } finally {
    //     loading.value = false
    //   }
    // }

    const googleLogin = () => {
        var provider = new GoogleAuthProvider()

        setPersistence(auth, browserLocalPersistence).then(() => {
            signInWithPopup(auth, provider).then( async (result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result)
                const token = credential.accessToken
                const user = result.user
                console.log(user.uid)

                const docSnap = await getDoc(doc(db, "users", user.uid))
                // console.log(docSnap.data())
                
                if ( docSnap.data() != undefined ) {
                    store.commit("setUser", docSnap.data())
                    router.replace("/")
                } else {
                    await setDoc(doc(db, "users", user.uid), {
                        uid: user.uid,
                        user_name: user.displayName,
                        nick_name: user.displayName,
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
        })

    }

    return {
      email,
      password,
      loading,
      // onLogin,
      googleLogin,
   }
  } 
}
</script>