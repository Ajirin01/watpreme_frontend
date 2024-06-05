<template>
    <div class="circular-progress">
        <div class="row">
            <div class="col-md-3 col-sm-6" v-for="(progress, index) in progresses" :key="index">
                <MetricsCircle :progress="progress"/>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import MetricsCircle from '@/components/ui/charts/MetricsCircle.vue'

  export default {
    data(){
        return {
            progresses: [83, 30, 83, 50]
        };
    },
    components: {
        MetricsCircle
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  