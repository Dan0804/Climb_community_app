<template>
    <div class="flex-1 border-r border-gray-200 flex-col overflow-y-auto">
        <!-- title -->
        <div class="p-3 font-bold text-lg text-center border-b border-gray-100">
            등록
        </div>

        <!-- Post section -->
        <div class="flex flex-1 flex-col px-3 py-3 h-full">
            <button class="bg-hover_primary text-white hover:text-hover_primary hover:bg-BgLightBlue hover:border-1 hover:border-hover_primary px-4 py-2 mb-4 h-12 w-28 rounded-full">
                <span class="font-semibold">진짜 등록!!</span>
            </button>
            <textarea class="w-full font-semibold focus:outline-none resize-none bg-green-300" style="height:80%" placeholder="어떤 재미있는 일이 일어났나요?"></textarea>
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