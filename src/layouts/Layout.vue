<template>
    <component :is="layout"></component>
</template>

<script>
import AfterLogin from "./AfterLogin.vue"
import BeforeLogin from "./BeforeLogin.vue"
import { computed } from "vue"
import { useRoute } from 'vue-router'

export default {
    components: { AfterLogin, BeforeLogin },
    setup() {
        const route = useRoute()
        const layout = computed(() => route.meta.layout || 'AfterLogin')

        return {
            layout,
        }
    }
}
</script>