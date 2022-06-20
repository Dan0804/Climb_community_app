<template>
      <div @click="$emit('close_modal')" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex justify-center min-h-screen sm:pt-4 sm:px-4 sm:pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div @click.stop class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle mt-36 w-72 h-96 border-2 border-black">
                <div class="flex border-b border-gray-150 m-1 items-center">
                    <button @click="$emit('close_modal')" class="fas fa-times text-blue-400 text-xl h-10 w-10 p-1 hover:bg-blue-50 rounded-full items-center"></button>
                </div>
                <div class="text-center">
                    <i class="fa-solid fa-triangle-exclamation text-red-600 text-lg"></i>
                    <span class="ml-2">다음을 꼭 유의해주세요!</span>
                </div>
                <div class="flex ml-3 mt-1">
                    <div class="border-4 h-8 w-8 rounded-full">
                        <i class="fa-solid fa-circle text-2xl -mt-1 text-red-500"></i>
                    </div>
                    <span class="text-xs ml-2">게시글 열람, 프로필 조회 등은 가능하나 다음과 같은 기능은 사용이 불가합니다.</span>
                </div>
                <div class="ml-10 mt-2 border-2 border-blue-300 pl-2 mr-10 pb-1 rounded-lg">
                    <span class="text-xs text-red-600">게시글 작성, 종아요 버튼</span>
                    <span class="text-xs"> 등의 상호작용</span>
                </div>
                <div class="flex ml-3 mt-4">
                    <div class="border-4 h-8 w-8 rounded-full">
                        <i class="fa-solid fa-circle text-2xl -mt-1 text-green-400"></i>
                    </div>
                    <span class="text-xs ml-2 mr-2">게시글 작성과 같은 상호작용 시 버튼이 위와 같이 빨간색일 때에는 재로그인으로 녹색이 되도록 해주세요.</span>
                </div>
                <div class="ml-5 mr-2 mt-4 text-xs">
                    본 사이트는 <span class="text-red-600 font-bold">현재 암장문제들을 공유하는 목적</span>으로 만들어졌습니다. 현재는 모든 암장이 <span class="text-red-600 font-bold">30일마다 게시글이 초기화</span>되며 추후 각 암장의 세팅 일정에 맞게 초기화를 할 수 있도록하겠습니다.
                </div>
                <div class="ml-5 mr-2 mt-4 text-xs">
                    <span class="text-red-600 font-bold">본 사이트의 목적과 부합하지 않는 게시글은 삭제</span>될 수 있는 점을 유의주시길바랍니다.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup(props, {emit}) {

    }
}
</script>

<style>

</style>