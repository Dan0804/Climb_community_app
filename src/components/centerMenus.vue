<template>
    <router-link :to="`/center/${center.id}`">
        <div class="mx-5 px-5 bg-BgLightBlue py-1 cursor-pointer my-1 rounded-2xl">
            {{ center.center_name }}
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