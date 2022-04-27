<template>
  <Main />

  <Follow />
</template>

<script>
import Search from '../components/Search.vue'
import Follow from '../components/Follow.vue'
import Main from '../components/Main.vue'

export default {
    components: { Search, Follow, Main },
    setup() {}
}
</script>