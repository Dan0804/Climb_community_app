<template>
    <div class="flex flex-col items-center space-y-6 mt-10">
    <i :class="`fa-brands fa-twitter text-4xl text-primary ${loading ? 'animate-bounce' : ''}`"></i>
    <span class="text-2xl font-bold">로그인</span>
    <input v-model="email" class="rounded w-96 px-4 py-3 border border-gray-300 focus:ring-2 focus:border-primary" placeholder="이메일" type="text">
    <input v-model="password" class="rounded w-96 px-4 py-3 border border-gray-300 focus:ring-2 focus:border-primary" placeholder="비밀번호" type="text">
    <button class="w-96 rounded bg-primary text-white py-4" @click="onLogin">회원가입</button>
    <router-link to="/register">
      <button class="text-primary">계정이 없으신가요? 회원가입하기</button>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>