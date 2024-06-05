<template>
    <div class="home">
      <SettingsTab />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import SettingsTab from '@/components/dashboard/SettingsTab.vue';
  
  export default {
    name: 'SettingsView',
    components: {
      SettingsTab
  }
  }
  </script>
  