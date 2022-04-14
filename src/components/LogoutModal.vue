<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" @click="$emit('close_modal')" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex justify-center min-h-screen sm:pt-20 sm:px-4 sm:pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div @click.stop class="relative inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform w-96">
                <div class="h-40 bg-white">

                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    setup() {
        const onLogout = async () => {
            await Logout
            store.commit("setUser", null)
            await router.replace("/login")
        }
    }
}
</script>