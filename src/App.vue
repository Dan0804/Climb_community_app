<template>
  <div class="flex h-screen">
    <div class="w-1/4 mt-5 ml-10 flex flex-col justify-between">
      <div>
        <!-- I will change this logo when I make main logo -->
        <i class="fa-brands fa-apple text-6xl text-primary mb-5 ml-4"></i>

        <!-- side menu icons -->
        <div class="flex flex-col items-start">
          <div class="hover:text-hover_primary hover:bg-lighter px-4 py-2 rounded-full">
              <i class="fa-solid fa-house-chimney fa-fw text-2xl mr-2"></i>
              <span class="hidden lg:inline-block">홈</span>
          </div>
          
          <div class="hover:text-hover_primary hover:bg-lighter px-4 py-2 rounded-full">
              <i class="fa-solid fa-hashtag fa-fw text-2xl mr-2"></i>
              <span class="hidden lg:inline-block">헤시테그</span>
          </div>
          
          <div class="hover:text-hover_primary hover:bg-lighter px-4 py-2 rounded-full">
              <i class="fa-solid fa-bell fa-fw text-2xl mr-2"></i>
              <span class="hidden lg:inline-block">알람</span>
          </div>
          
          <div class="hover:text-hover_primary hover:bg-lighter px-4 py-2 rounded-full">
              <i class="fa-regular fa-envelope fa-fw text-2xl mr-2"></i>
              <span class="hidden lg:inline-block">쪽지</span>
          </div>
          
          <div class="hover:text-hover_primary hover:bg-lighter px-4 py-2 rounded-full">
              <i class="fa-regular fa-bookmark fa-fw text-2xl mr-2"></i>
              <span class="hidden lg:inline-block">북마크</span>
          </div>
          
          <div class="hover:text-hover_primary hover:bg-lighter px-4 py-2 rounded-full">
              <i class="fa-solid fa-list fa-fw text-2xl mr-2"></i>
              <span class="hidden lg:inline-block">리스트</span>
          </div>
          
          <div class="hover:text-hover_primary hover:bg-lighter px-4 py-2 rounded-full">
              <i class="fa-regular fa-user fa-fw text-2xl mr-2"></i>
              <span class="hidden lg:inline-block">프로필</span>
          </div>
          
          <div class="hover:text-hover_primary hover:bg-lighter px-4 py-2 rounded-full">
              <i class="fa-solid fa-ellipsis fa-fw text-2xl mr-2"></i>
              <span class="hidden lg:inline-block">더 보기</span>
          </div>
        </div>

        <div class="w-full h-12">
          <button class="bg-hover_primary text-white w-40 h-12 rounded-full hover:bg-bgdark mt-3">
            <span class="hidden lg:block">트윗</span>
            <i class="fa-solid fa-photo-film lg:hidden"></i>
          </button>
        </div>
      </div>

      <!-- profile -->
      <div class="mr-3 mb-10">
        <div class="w-full h-12">
          <button class="px-2 py-1 w-full h-12 rounded-full hover:bg-blue-50 flex items-center">
            <img src="http://picsum.photos/100" class="w-10 h-10 rounded-full" />
            <div class="lg:ml-2 lg:block hidden">
                <div class="text-sm font-bold">wheogus185</div>
                <div class="text-xs text-gray-500 text-left">조대현</div>
            </div>
            <i class="fa-solid fa-ellipsis fa-fw text-l ml-auto hidden lg:block"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="flex-1 bg-blue-50"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>