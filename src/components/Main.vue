<template>
    <div class="flex-1 border-r border-l border-border_line overflow-y-auto">
        <div class="flex flex-col">

            <!-- page title -->
            <div class="border-b border-border_line px-3 py-4 font-bold text-lg text-center">
            홈
            </div>

            <!-- post -->
            <div class="flex px-3 py-3 border-b border-border_line">
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
                        <div class="cursor-pointer hover:bg-red-100 hover:text-red-400 rounded-full p-2">
                            <i class="fa-regular fa-heart"></i>
                            <span class="ml-1 text-sm">3</span>
                        </div>
                        <div class="cursor-pointer hover:bg-green-100 hover:text-green-400 rounded-full p-2">
                            <i class="fa-solid fa-share-from-square px-1"></i>
                        </div>
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