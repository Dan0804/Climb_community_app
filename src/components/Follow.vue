<template>
    <div class="hidden lg:block lg:w-1/4 px-4 py-2">
        <!-- follow search input -->
        <div class="relative mb-5">
          <input class="bg-gray-100 focus:ring-2 focus:ring-blue-300 focus:bg-white text-sm rounded-full w-full p-2 pl-8" type="text" placeholder="오늘은 어느 암장을 가볼까?">
          <i class="fa-solid fa-magnifying-glass absolute left-0 mt-2 ml-3 text-sm text-light"></i>
        </div>

        <!-- follow recommends -->
        <div class="flex flex-col w-full rounded-xl bg-gray-100 xt-10 mb-10">
          <div class="border-b border-gray-200 px-3 py-3">
            <span class="text-sm font-bold py-3">암장 리스트</span>
          </div>

          <div class="relative border-b border-gray-200 hover:bg-gray-200 px-4 py-2 cursor-pointer">
            <div class="flex items-center">
              <img class="rounded-full w-10 h-10" src="http://picsum.photos/300">
              <div class="flex ml-1 flex-col text-xs">
                <div class="font-bold pb-0.5">더 클라임</div>
                <div class="text-gray-500">
                  <span class="pr-1">주소 :</span>
                  <span>서울시 강남</span>
                </div>
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

        <!-- follow recommends -->
        <div class="flex flex-col w-full rounded-xl bg-gray-100 xt-10">
          <div class="border-b border-gray-200 px-3 py-3">
            <span class="text-sm font-bold py-3">팔로우 추천</span>
          </div>

          <div class="relative border-b border-gray-200 hover:bg-gray-200 px-4 py-2 cursor-pointer">
            <div class="flex items-center">
              <img class="rounded-full w-10 h-10" src="http://picsum.photos/100">
              <div class="flex ml-1 flex-col text-xs">
                <div class="font-bold pb-0.5">조대현</div>
                <div class="text-gray-500">@naver.com</div>
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
</template>

<script>
export default {

}
</script>