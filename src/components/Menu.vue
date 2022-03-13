<template>
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
</template>

<script>
export default {

}
</script>