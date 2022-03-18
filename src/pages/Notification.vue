<template>
    <div class="flex-1 border-r border-gray-200 flex-col overflow-y-auto">
        <!-- title -->
        <div class="p-3 font-bold text-lg border-b border-gray-100">
            알림
        </div>

        <!-- Notifications -->
        <div class="cursor-pointer flex flex-col hover:bg-gray-50 border-b border-gray-200 p-3">
            <div class="flex justify-between">
                <img class="hover:opacity-80 rounded-full w-10 h-10" src="http://picsum.photos/100">
                <i class="fa-solid fa-ellipsis flex place-items-center justify-center hover:border-2 hover:border-gray-100 hover:bg-blue-300 rounded-full w-10 h-10 "></i>
            </div>
            <div>
                <span class="font-bold">조대현</span> 님의 최근 글
            </div>
            <div class="text-gray-500">클라이밍해서 손가락이 아프다.</div>
        </div>
    </div>

    <!-- Follow -->
    <Follow />

</template>

<script>
import Follow from '../components/Follow.vue'
export default {
    components: { Follow },
    setup() {}
}
</script>