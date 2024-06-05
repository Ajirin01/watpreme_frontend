<template>
    <div class="home">
      <OperatorsManager />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import OperatorsManager from '@/components/dashboard/OperatorsManager.vue';
  
  export default {
    name: 'SettingsView',
    components: {
      OperatorsManager
  }
  }
  </script>
  