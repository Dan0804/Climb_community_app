<template>
  <div class="flex h-screen container mx-auto">

    <!-- menu frame -->
    <Menu class="xl:ml-36"/>

    <!-- main frame -->
      <router-view class="xl:mr-60" />
  </div>
</template>

<script>
import Menu from '../components/Menu.vue'
export default {
  components: { Menu },
  setup() {},
}
</script>