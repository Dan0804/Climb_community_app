<template>
  <div class="flex flex-col items-center space-y-6 mt-10">
    <i :class="`fa-brands fa-twitter text-4xl text-primary ${loading ? 'animate-bounce' : ''}`"></i>
    <span class="text-2xl font-bold">Climb Vue 회원가입</span>
    <input v-model="username" class="rounded w-96 px-4 py-3 border border-gray-300 focus:ring-2 focus:border-primary" placeholder="아이디" type="text">
    <input v-model="email" class="rounded w-96 px-4 py-3 border border-gray-300 focus:ring-2 focus:border-primary" placeholder="이메일" type="text">
    <input v-model="password" class="rounded w-96 px-4 py-3 border border-gray-300 focus:ring-2 focus:border-primary" placeholder="비밀번호" type="password">
    <button class="w-96 rounded bg-primary text-white py-4" @click="onRegister">회원가입</button>
    <router-link to="/login">
      <button class="text-primary">계정이 이미 있으신가요? 로그인 하기</button>
    </router-link>
  </div>
</template>

<script>
import {ref} from 'vue'
import { signupEmail } from '../firebase'
export default {
  setup() {
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const loading = ref(false)

    const onRegister = async () => {
      try {
        const credential = await signupEmail(email.value, password.value)
      } catch(e) {
        // console.log('create user with email and password error', e)
        if (e.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {alert('비밀번호는 6글자 이상으로 해주세요!')}
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