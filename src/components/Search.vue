<template>
    <div class="flex flex-1 flex-col border-r border-l border-border_line">
        <!-- page title -->
        <div class="border-b border-border_line px-3 py-4 font-bold text-lg text-center">
        검색 창
        </div>

        <!-- Search bar -->
        <div class="relative mx-3 my-5">
          <input class="bg-gray-100 focus:ring-2 focus:ring-blue-300 focus:bg-white text-sm rounded-full w-full p-2 pl-8" type="text" placeholder="어느 암장이세요?" v-model="search" @input="handleSearchInput">
          <i class="fa-solid fa-magnifying-glass absolute left-0 mt-2 ml-3 text-sm text-light"></i>
        </div>

        <!-- Center list -->
        <div class="overflow-y-auto">
        </div>
    </div>
</template>

<script>

export default {
    setup() {
        const handleSearchInput = (event) => {
            this.search = event.target.value

            if(this.search.length !== 0) {
                clearTimeout(this.debounce)
                this.debounce = setTimeout(() => {
                    const filteredList = this.stageInfoList.filter(item => item.title.includes(this.search))
                    this.searchList = filteredList
                }, 500)
            } else {
                clearTimeout(this.debounce)
                this.debounce = setTimeout(() => {
                    this.searchList= []
                }, 500)
            }
        }
    }
}
</script>