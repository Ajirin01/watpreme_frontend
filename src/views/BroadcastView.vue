<template>
    <div class="home">
      <BroadCast />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import BroadCast from '@/components/dashboard/BroadCast.vue';
  
  export default {
    name: 'HomeView',
    components: {
      BroadCast
  }
  }
  </script>
  