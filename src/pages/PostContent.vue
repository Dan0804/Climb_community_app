<template>
    <div class="flex flex-1">
        <div class="flex-1 border-r border-gray-100">
            <div class="flex flex-col">
                <div class="flex items-center px-3 py-2 border-b border-gray-100">
                    <button @click="router.go(-1)">
                        <i class="fas fa-arrow-left text-primary text-lg ml-3 hover:bg-blue-50 p-2 h-10 w-10 rounded-full"></i>
                    </button>
                    <span class="font-bold text-lg ml-6">트윗</span>
                </div>

                <!-- post -->
                <div class="px-3 py-2 flex">
                    <img src="http://picsum.photos/100" class="w-10 h-10 rounded-full hover:opacity-90 cursor-pointer" />
                    <div class="ml-3">
                        <div class="font-bold">이름</div>
                        <div class="text-gray-500 text-xs">이메일</div>
                    </div>
                </div>
                <div class="p-3">본문 내용</div>
                <div class="p-3">날짜</div>
                <div class="h-px w-full bg-gray-100"></div>
                <div class="flex items-baseline space-x-1 pl-3 py-2">
                    <span class="font-bold text-sm">1</span>
                    <span class="text-gray text-xs">리트윗</span>
                    <span class="font-bold text-sm pl-5">3</span>
                    <span class="text-gray text-xs">마음에 들어요</span>
                </div>
                <div class="h-px w-full bg-gray-100"></div>

                <!-- buttons -->
                <div class="flex justify-around">
                    <button>
                        <i class="far fa-comment text-gray-400 text-xl hover:bg-blue-100 hover:text-blue-400 rounded-full m-2 p-1 w-10"></i>
                    </button>
                    <button>
                        <i class="fa-solid fa-retweet text-gray-400 text-xl hover:bg-green-100 hover:text-green-400 rounded-full m-2 p-1 w-10"></i>
                    </button>
                    <button>
                        <i class="fa-regular fa-heart text-gray-400 text-xl hover:bg-red-100 hover:text-red-400 rounded-full m-2 p-1 w-10"></i>
                    </button>
                </div>
                <div class="h-px w-full bg-gray-100"></div>
                
                <!-- comments -->
                <div class="flex px-3 py-2 border-b border-gray-100">
                    <img src="http://picsum.photos/100" class="w-10 h-10 rounded-full hover:opacity-90 cursor-pointer" />
                    <div class="flex-1 ml-3 space-y-2">
                        <div class="flex items-baseline space-x-1">
                            <span class="font-bold">이름</span>
                            <span class="text-gray text-xs">이메일</span>
                            <span class="text-gray text-xs">지난 날짜</span>
                        </div>
                        <div>댓글</div>
                    </div>
                    <button>
                        <i class="fas fa-trash text-red-400 hover:bg-red-50 m-2 rounded-full p-2"></i>
                    </button>
                </div>
            </div>
        </div>
        <follow></follow>
    </div>
</template>

<script>
import Follow from "../components/Follow.vue"
import router from "../router"

export default {
    components: { Follow },
    setup() {
        return {
            router, 
        }
    }
}
</script>