<template>
  <div class="flex h-screen container mx-auto">

    <!-- side frame -->
    <div class="flex flex-col justify-between lg:w-1/7 w-30 mt-5 ml-10">
      
      <!-- icons -->
      <div>
        <!-- I will change this logo when I make main logo -->
        <i class="fa-brands fa-apple text-primary mb-5 ml-4 text-6xl"></i>

        <div class="flex flex-col items-start">
          <div class="cursor-pointer hover:text-hover_primary hover:bg-BgLightBlue px-4 py-2 rounded-full">
              <i class="fa-solid fa-house-chimney fa-fw text-2xl mr-2"></i>
              <span class="hidden lg:inline-block">홈</span>
          </div>
          
          <div class="cursor-pointer hover:text-hover_primary hover:bg-BgLightBlue px-4 py-2 rounded-full">
              <i class="fa-solid fa-hashtag fa-fw text-2xl mr-2"></i>
              <span class="hidden lg:inline-block">헤시테그</span>
          </div>
          
          <div class="cursor-pointer hover:text-hover_primary hover:bg-BgLightBlue px-4 py-2 rounded-full">
              <i class="fa-solid fa-bell fa-fw text-2xl mr-2"></i>
              <span class="hidden lg:inline-block">알람</span>
          </div>
          
          <div class="cursor-pointer hover:text-hover_primary hover:bg-BgLightBlue px-4 py-2 rounded-full">
              <i class="fa-regular fa-envelope fa-fw text-2xl mr-2"></i>
              <span class="hidden lg:inline-block">쪽지</span>
          </div>
          
          <div class="cursor-pointer hover:text-hover_primary hover:bg-BgLightBlue px-4 py-2 rounded-full">
              <i class="fa-regular fa-bookmark fa-fw text-2xl mr-2"></i>
              <span class="hidden lg:inline-block">북마크</span>
          </div>
          
          <div class="cursor-pointer hover:text-hover_primary hover:bg-BgLightBlue px-4 py-2 rounded-full">
              <i class="fa-solid fa-list fa-fw text-2xl mr-2"></i>
              <span class="hidden lg:inline-block">리스트</span>
          </div>
          
          <div class="cursor-pointer hover:text-hover_primary hover:bg-BgLightBlue px-4 py-2 rounded-full">
              <i class="fa-regular fa-user fa-fw text-2xl mr-2"></i>
              <span class="hidden lg:inline-block">프로필</span>
          </div>
          
          <div class="cursor-pointer hover:text-hover_primary hover:bg-BgLightBlue px-4 py-2 rounded-full">
              <i class="fa-solid fa-ellipsis fa-fw mr-2 text-2xl"></i>
              <span class="hidden lg:inline-block">더 보기</span>
          </div>
        </div>

        <!-- side register -->
        <div class="w-full h-12 pr-3">
          <button class="bg-hover_primary text-white hover:bg-button_hover mt-3 w-full h-12 rounded-full">
            <span class="hidden lg:block">등록</span>
            <i class="fa-solid fa-photo-film lg:hidden"></i>
          </button>
        </div>
      </div>

      <!-- profile -->
      <div class="mr-3 mb-10">
        <div class="w-full h-12">
          <button class="flex items-center hover:bg-blue-50 px-2 py-1 w-full h-12 rounded-full">
            <img src="http://picsum.photos/200" class="w-10 h-10 rounded-full" />
            <div class="lg:ml-2 lg:block hidden">
                <div class="text-sm font-bold">wheogus185</div>
                <div class="text-gray-500 text-left text-xs">조대현</div>
            </div>
            <i class="fa-solid fa-ellipsis fa-fw hidden lg:block text-l ml-auto"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- main, follow frame -->
    <div class="flex flex-1 h-screen">
      
      <!-- main section -->
      <div class="flex-1 border-r border-l border-border_line overflow-y-auto">
        <div class="flex flex-col">

          <!-- page title -->
          <div class="border-b border-border_line px-3 py-2 font-bold text-lg">
            home
          </div>

          <!-- register section -->
          <div class="border-b border-border_line flex px-3 py-3">
            <img src="http://picsum.photos/200" class="hover:opacity-80 cursor-pointer w-10 h-10 rounded-full">
            <div class="flex flex-1 flex-col ml-2">
              <textarea class="focus:outline-none resize-none mb-3 w-full font-bold" placeholder="무슨 일이 일어나고 있나요?"></textarea>
              <div class="text-right">
                <button class="bg-hover_primary hover:bg-button_hover text-white text-sm font-bold px-4 py-2 rounded-full">
                  등록
                </button>
              </div>
            </div>
          </div>

          <!-- post -->
          <div class="flex px-3 py-3 border-b border-border_line" v-for="post in 10" :key="post">
            <img src="http://picsum.photos/200" class="hover:opacity-80 cursor-pointer w-10 h-10 rounded-full">
            <div class="flex flex-1 flex-col ml-3 space-y-1">
              <div class="text-sm space-x-2">
                <span class="font-bold">조대현</span>
                <span class="text-gray-500 text-sm">wheogus185@naver.com</span>
                <span class="text-gray-500 text-sm">•</span>
                <span class="text-gray-500 text-sm">7분</span>
              </div>

              <!-- post contents -->
              <div>post 내용</div>

              <!-- post icon -->
              <div class="flex justify-between text-gray-500 mr-5">
                <div class="cursor-pointer hover:bg-blue-100 hover:text-blue-400 rounded-full p-2">
                  <i class="fa-regular fa-comment"></i>
                  <span class="ml-1 text-sm">11</span>
                </div>
                <div class="cursor-pointer hover:bg-green-100 hover:text-green-400 rounded-full p-2">
                  <i class="fa-solid fa-retweet"></i>
                  <span class="ml-1 text-sm">5</span>
                </div>
                <div class="cursor-pointer hover:bg-red-100 hover:text-red-400 rounded-full p-2">
                  <i class="fa-regular fa-heart"></i>
                  <span class="ml-1 text-sm">3</span>
                </div>
                <div class="cursor-pointer hover:bg-blue-100 hover:text-blue-400 rounded-full p-2">
                  <i class="fa-solid fa-share-from-square"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- follow section -->
      <div class="hidden lg:block lg:w-1/4 px-4 py-2">
        <!-- follow search input -->
        <div class="relative mb-5">
          <input class="bg-gray-100 focus:ring-2 focus:ring-blue-300 focus:bg-white text-sm rounded-full w-full p-2 pl-8" type="text" placeholder="검색">
          <i class="fa-solid fa-magnifying-glass absolute left-0 mt-2 ml-3 text-sm text-light"></i>
        </div>

        <!-- follow recommends -->
        <div class="flex flex-col w-full rounded-xl bg-gray-100 xt-10">
          <div class="border-b border-gray-200 px-3 py-3">
            <span class="text-sm font-bold py-3">팔로우 추천</span>
          </div>

          <div class="relative border-b border-gray-200 hover:bg-gray-200 px-4 py-2 cursor-pointer">
            <div class="flex">
              <img class="rounded-full w-10 h-10" src="http://picsum.photos/100">
              <div class="flex ml-1 flex-col text-xs">
                <div>조대현</div>
                <div>@naver.com</div>
              </div>
              <div class="flex absolute right-0 inset-y-0">
                <button class="border-blue-300 border-2 bg-white text-blue-400 hover:bg-blue-300 hover:text-white rounded-full px-2 my-3 mr-2 text-xs">팔로우</button>
              </div>
            </div>
          </div>
          <div class="px-3 py-2 hover:bg-blue-100 hover:rounded-b-xl cursor-pointer">
            <span class="text-blue-400 text-base rounded-xl">More</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>