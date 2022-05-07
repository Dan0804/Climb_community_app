<template>
  <div class="flex h-screen container mx-auto">

    <!-- menu frame -->
    <Menu class="xl:ml-12"/>

    <!-- main frame -->
      <router-view class="xl:mr-48" />
  </div>
</template>

<script>
import Menu from '../components/Menu.vue'
export default {
  components: { Menu },
  setup() {},
}
</script>