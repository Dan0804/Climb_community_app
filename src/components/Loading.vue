<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex justify-center min-h-screen sm:pt-4 sm:px-4 sm:pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-30 transition-opacity" aria-hidden="true"></div>

            <!-- contents -->
            <div class="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all h-12 w-48 mt-72">
                <div class="relative mt-2 ml-4">
                    <div style="border-top-color:transparent"
                        class="w-8 h-8 border-4 border-blue-400 border-solid rounded-full animate-spin">
                    </div>
                    <span class="absolute top-1 right-5">게시글 저장 중...</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>