<template>
    <div class="broadcast-list">
      <BroadcastList />
    </div>
  </template>
  
  <script>
    // @ is an alias to /src
    import BroadcastList from '@/components/dashboard/BroadcastList.vue';
  
    export default {
        components: {
            BroadcastList
        }
    }
  </script>
  
  