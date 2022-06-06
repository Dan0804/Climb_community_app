<template>
    <Layout></Layout>
</template>

<script>
import Layout from './layouts/Layout.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

export default {
    components: { Layout },
    setup() {}
}
</script>