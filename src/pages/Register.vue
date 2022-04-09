<template>
  <div class="flex flex-col items-center space-y-6 mt-10">
    <i :class="`fa-brands fa-twitter text-4xl text-primary ${loading ? 'animate-bounce' : ''}`"></i>
    <span class="text-2xl font-bold">Climb View 회원가입</span>
    <input v-model="username" class="rounded w-96 px-4 py-3 border border-gray-300 focus:ring-2 focus:border-primary" placeholder="아이디" type="text">
    <input v-model="email" class="rounded w-96 px-4 py-3 border border-gray-300 focus:ring-2 focus:border-primary" placeholder="이메일" type="text">
    <input @keyup.enter="onRegister" v-model="password" class="rounded w-96 px-4 py-3 border border-gray-300 focus:ring-2 focus:border-primary" placeholder="비밀번호" type="password">
    <button v-if="loading" class="w-96 rounded bg-primary text-white py-4">회원가입 중입니다.</button>
    <button v-else class="w-96 rounded bg-primary text-white py-4" @click="onRegister">회원가입</button>
    <router-link to="/login">
      <button class="text-primary">계정이 이미 있으신가요? 로그인 하기</button>
    </router-link>
  </div>
</template>

<script>
import {ref} from 'vue'
import { signupEmail, db } from '../firebase'
import { setDoc, doc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const router = useRouter()

    const onRegister = async () => {

      if(!username.value || !email.value || !password.value) {
        alert('아이디, 이메일, 비밀번호를 모두 입력해주세요!!')
        return
      }

      try {
        loading.value = true
        const { user } = await signupEmail(email.value, password.value)
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          user_name: username.value,
          email: email.value,
          profile_image_url: '/profile.jpeg',
          num_posts: 0,
          followers: [],
          followings: [],
          created_at: Date.now()
        })
        alert('회원가입이 완료되었습니다. 로그인 해주세요.')
        router.push('/login')
      } catch(e) {
        switch (e.code) {
          case 'auth/invalid-email':
            alert('이메일을 바르게 입력해주세요.')
            break
          case 'auth/weak-password':
            alert('비밀번호가 너무 쉬워요.')
            break
          case 'auth/email-already-in-use':
            alert('이미 가입되어있는 이메일입니다.')
            break
          default:
            alert('회원가입 실패')
            break
        }
      } finally {
        loading.value = false
      }
    }

    return {
      username,
      email,
      password,
      loading,
      onRegister,
    }
   }
  }
</script>