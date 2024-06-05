<template>
  <div class="home">
    <DashboardIndex />
  </div>
</template>

<script>
// @ is an alias to /src
import DashboardIndex from '@/components/dashboard/DashboardIndex.vue';

export default {
  name: 'HomeView',
  components: {
    DashboardIndex
}
}
</script>
