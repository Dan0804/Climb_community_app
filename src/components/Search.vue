<template>
    <div class="flex flex-1 flex-col border-r border-l border-border_line">
        <!-- page title -->
        <div class="border-b border-border_line px-3 py-4 font-bold text-lg text-center">
            검색
        </div>

        <!-- Search bar -->
        <div class="relative mx-3 my-5">
          <input class="bg-gray-100 focus:ring-2 focus:ring-blue-300 focus:bg-white text-sm rounded-full w-full p-2 pl-8" type="text" placeholder="어느 암장이세요?" v-model="search">
          <i class="fa-solid fa-magnifying-glass absolute left-0 mt-2 ml-3 text-sm text-light"></i>
        </div>

        <!-- Center list -->
        <div class="overflow-y-auto">
            <CenterMenus :center="center" v-for="center in filter" :key="center.id"></CenterMenus>
        </div>
    </div>
</template>

<script>
import { getDocs, } from 'firebase/firestore'
import { CenterCollection, } from '../firebase'
import { computed, onBeforeMount, ref, } from 'vue'
import CenterMenus from './centerMenus.vue'

export default {
    components: { CenterMenus },
    setup() {
        const centerList = ref([])
        const search = ref('')
        let i = 0

        onBeforeMount( async () => {
            const q = await getDocs(CenterCollection)
            q.forEach( (doc) => {
                centerList.value.push(doc.data())
            })
        })

        const filter = computed(() => {
            const filteredList = ref([])
            if ( search.value.length != 0 ) {
                for (i=0 ; i < centerList.value.length ; i++) {
                    if ( centerList.value[i].center_name.toLowerCase().includes(search.value.toLowerCase()) ) {
                        filteredList.value.push(centerList.value[i])
                    }
                }
                return filteredList.value

            } else {
                return centerList.value
            }
        })
        

        return {
            centerList,
            search,
            filter,
        }
    }
}
</script>