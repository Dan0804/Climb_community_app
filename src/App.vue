<template>
  <div class="flex h-screen container mx-auto">

    <!-- side frame -->
    <Menu />

    <!-- main frame -->
      <router-view />
  </div>
</template>

<script>
import Menu from './components/Menu.vue'
export default {
  components: { Menu },
  setup() {},
}
</script>

<style>

</style>