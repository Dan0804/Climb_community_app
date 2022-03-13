<template>
  <div class="flex h-screen container mx-auto">

    <!-- side frame -->
    <Menu />

    <!-- main, follow frame -->
    <div class="flex flex-1 h-screen">
      <Home />
    </div>
  </div>
</template>

<script>
import Home from './pages/Home.vue'
import Menu from './components/Menu.vue'
export default {
  components: { Home, Menu },
  setup() {}
}
</script>

<style>

</style>