<template>
    <router-link :to="`/center/${center}`">
        <div class="mx-5 px-5 bg-BgLightBlue py-1 cursor-pointer my-1 rounded-xl">
            {{ center }}
        </div>
    </router-link>
</template>

<script>
export default {
    props: ['center'],
    setup() {
    }
}
</script>