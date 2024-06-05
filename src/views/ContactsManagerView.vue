<template>
    <div class="home">
      <ContactsManager />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import ContactsManager from '@/components/dashboard/ContactsManager.vue';
  
  export default {
    name: 'HomeView',
    components: {
      ContactsManager
  }
  }
  </script>
  