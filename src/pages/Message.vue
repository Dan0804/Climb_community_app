<template>
    <div class="flex flex-1">
        <!-- chat list -->
        <div class="w-2/5 border-r border-gray-200 overflow-y-scroll">
            <div class="flex flex-col">
                <div class="flex justify-between border-b border-gray-200 h-14">
                    <div class="p-3 font-bold text-lg">
                        쪽지
                    </div>
                    <i class="fa-regular fa-paper-plane text-lg p-2 mt-1.5 mx-2"></i>
                </div>
                <!-- a chat list -->
                <div class="flex hover:bg-gray-200 border-b border-gray-200 p-3">
                    <img class="cursor-pointer w-10 h-10 rounded-full mr-2" src="http://picsum.photos/200">
                    <div>
                        <div class="flex space-x-1">
                            <div class="font-bold text-xs">조대현</div>
                            <div class="text-gray-500 text-xs">@naver.com</div>
                            <div class="text-xs">3월 14일</div>
                        </div>
                        <div class="text-gray-500 text-xs">메시지</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- chatting -->
        <div class="w-3/5 border-r border-gray-200">
            <div class="flex flex-col h-screen">
                <!-- title -->
                <div class="flex px-3 border-b border-gray-200 items-center h-14">
                    <img class="cursor-pointer w-8 h-8 rounded-full mr-2" src="http://picsum.photos/200">
                    <div>
                        <div class="font-bold text-sm">조대현</div>
                        <div class="text-xs text-gray-500">@naver.com</div>
                    </div>
                </div>

                <div class="flex-1 overflow-y-scroll">
                    <!-- my chat bubble -->
                    <div class="text-right px-3 py-3">
                        <span class="bg-blue-400 text-white text-sm px-4 py-2 rounded-full">메시지</span>
                        <div class="text-xs text-gray-500 pt-2">
                            2022년 3월 14일 오후 11:11
                        </div>
                    </div>

                    <!-- opponent chat bubble -->
                    <div class="text-left px-3 py-3">
                        <span class="bg-gray-200 text-sm px-4 py-2 rounded-full">메시지</span>
                        <div class="text-xs text-gray-500 pt-2">
                            2022년 3월 14일 오후 11:11
                        </div>
                    </div>
                </div>

                <!-- chat input -->
                <div class="flex items-center bg-white border-t border-gray-200 sticky">
                    <input type="text" class="m-2 py-1 px-4 rounded-full bg-gray-100 resize-none outline-none flex-1" placeholder="새 쪽지 작성하기" />
                    <button class="text-center">
                        <i class="fa-solid fa-share text-blue-300 text-lg px-2 py-1 mr-1 hover:bg-gray-100 rounded-full"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>