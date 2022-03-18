<template>
    <div class="flex flex-1">
        <!-- profile section -->
        <div class="flex-1 flex flex-col border-r border-color">
            <!-- title -->
            <div class="flex px-3 py-1 border-b border-color">
                <button class="mr-4">
                    <i class="fa-solid fa-arrow-left text-blue-300 rounded-full p-3 hover:bg-blue-50"></i>
                </button>
                <div>
                    <div class="font-semibold text-lg">naver.com</div>
                    <div class="text-xs text-gray-500">3 트윗</div>
                </div>
            </div>

            <!-- background image -->
            <div class="flex-none relative bg-gray-300 h-40">
                <!-- porfile image -->
                <div class="border-4 border-white bg-gray-100 w-28 h-28 rounded-full absolute -bottom-14 left-2">
                    <img src="http://picsum.photos/200" class="rounded-full opacity-90 hover:opacity-100 cursor-pointer">
                </div>
            </div>

            <!-- profile edit button -->
            <div class="text-right mt-2 mr-2">
                <button class="border-2 border-blue-300 text-blue-300 px-3 py-1 hover:bg-blue-50  font-bold rounded-full">프로필 수정</button>
            </div>

            <!-- user info -->
            <div class="mx-4 mt-3">
                <div class="font-extrabold text-lg">조대현</div>
                <div class="text-gray">@naver.com</div>
                <div>
                    <span class="text-gray pr-1">가입일 :</span>
                    <span class="text-gray">2012년 12월</span>
                </div>
                <div>
                    <span class="font-bold mr-1">28</span>
                    <span class="text-gray mr-3">팔로우 중</span>
                    <span class="font-bold mr-1">7</span>
                    <span class="text-gray">팔로워</span>
                </div>
            </div>

            <!-- taps -->
            <div class="flex border-b border-color mt-3">
                <div class="flex-1 text-gray-500 hover:border-b-4 border-blue-400 text-center hover:bg-blue-50 cursor-pointer font-bold py-3">등록 글</div>
                <div class="flex-1 text-gray-500 hover:border-b-4 border-blue-400 text-center hover:bg-blue-50 cursor-pointer font-bold py-3">좋아요</div>
            </div>
        </div>
        <!-- trend section -->
        <Follow />
    </div>
</template>

<script>
import Follow from '../components/Follow.vue'
export default {
    components: { Follow },
    setup() {}
}
</script>