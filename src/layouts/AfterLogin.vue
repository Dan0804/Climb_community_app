<template>
  <div class="flex h-screen container mx-auto">

    <!-- menu frame -->
    <Menu class="lg:ml-32"/>

    <!-- main frame -->
      <router-view class="lg:mr-32" />
  </div>
</template>

<script>
import Menu from '../components/Menu.vue'
export default {
  components: { Menu },
  setup() {},
}
</script>