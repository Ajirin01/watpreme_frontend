<template>
    <div class="home">
      <TeamInbox />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import TeamInbox from '@/components/dashboard/TeamInbox.vue';
  
  export default {
    name: 'SettingsView',
    components: {
      TeamInbox
  }
  }
  </script>
  