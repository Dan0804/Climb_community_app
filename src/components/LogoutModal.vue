<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" @click="$emit('logout_close_modal')" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex justify-center pt-20 px-4 pb-20 text-center p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div @click.stop class="relative inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform w-96">
                <div class="h-40 bg-white">
                    <div class="pt-3 text-center">
                        정말로 로그아웃하겠습니까?
                    </div>
                    <div class="flex justify-center relative" @click="onLogout">
                        <button class="absolute hover:opacity-0 text-center mt-10 rounded-full bg-primary text-white w-32 py-2">
                            네!
                        </button>
                        <button class="absolute opacity-0 hover:opacity-100 text-center mt-10 rounded-full bg-red-400 text-white w-32 py-2">
                            로그아웃!
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import router from "../router"
import { Logout } from "../firebase"
import store from "../store"

export default {
    setup(props, {emit}) {
        const onLogout = async () => {
            await Logout
            store.commit("setUser", null)
            await router.replace("/login")
        }

        return {
            router,
            onLogout,
        }
    }
}
</script>