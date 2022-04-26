<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" @click="$emit('center_register_close_modal')" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex justify-center pt-20 px-4 pb-20 text-center p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div @click.stop class="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform w-96">
                <div class="h-64 bg-white">
                    <div class="text-center pt-5">
                        암장 등록
                    </div>
                    <input class="bg-gray-100 focus:ring-2 focus:ring-blue-300 focus:bg-white text-sm rounded-full w-48 p-2 pl-8 mt-16 ml-24" type="text" placeholder="Center 입력" />
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { CenterCollection, db } from "../firebase";

export default {
    setup(props, {emit}) {
        const addCenter = async () => {
            
        }
    }
}
</script>