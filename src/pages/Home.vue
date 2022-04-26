<template>
  <Search />

  <Follow />
</template>

<script>
import Search from '../components/Search.vue'
import Follow from '../components/Follow.vue'
export default {
    components: { Search, Follow },
    setup() {}
}
</script>