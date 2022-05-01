<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" @click="$emit('center_register_close_modal')" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex justify-center pt-20 px-4 pb-20 text-center p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div @click.stop class="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform w-96">
                <div class="h-64 bg-white">
                    <div class="text-center pt-5">
                        암장 등록
                    </div>
                    <input v-model="centerName" class="bg-gray-100 focus:ring-2 focus:ring-blue-300 focus:bg-white text-sm rounded-full w-48 p-2 pl-8 mt-16 ml-24" type="text" placeholder="Center 입력" />
                    <div id="center_list_app" class="text-right">
                        <button v-if="!centerName.length" class="bg-light text-sm font-bold px-4 py-2 mt-12 mr-5 rounded-full">등록</button>
                        <button v-else @click="onCenterRegister" class="bg-primary hover:bg-bgdark text-white text-sm font-bold px-4 py-2 mt-12 mr-5 rounded-full">등록</button>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
import { doc, setDoc, } from "firebase/firestore";
import { CenterCollection, } from "../firebase";
import { ref } from "vue";

export default {
    setup(props, {emit}) {
        const centerName = ref('')

        const onCenterRegister = async () => {
            try {
                const centerdocu = doc(CenterCollection)
                await setDoc(centerdocu, {
                    id: centerdocu.id,
                    center_name: centerName.value,
                    created_at: Date.now(),
                    visited_count: 0,
                    upload_count: 0,
                })

                console.log("등록 완료")
            } catch(e) {
                console.log('center register error: ', e)
            }   
        }

        return {
            centerName,
            onCenterRegister,
        }
    }
}
</script>