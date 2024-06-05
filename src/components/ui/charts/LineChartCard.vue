<template>
    <div class="row">
      <div class="col s12">
        <div class="container-card">
          <p><b>{{title}}</b></p>
          <div><line-chart :data="chartData" :options="chartOptions"></line-chart></div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import { Line} from 'vue-chartjs';
  import { Chart, CategoryScale, LinearScale, LineController, Legend, Tooltip, PointElement, LineElement, Title } from 'chart.js';

  // Register the required chart components
  Chart.register(CategoryScale, LinearScale, LineController, Legend, Tooltip, PointElement, LineElement, Title);

  
  export default {
    props: {
      title: String,
      data: Object
    },
    components: {
      LineChart: Line
    },
    data() {
      return {
        chartData: this.data,
        chartOptions: {
          responsive: true,
          maintainAspectRatio: true
          // Add more chart options as needed
        }
      };
    }
  };
  </script>
  
  
<style scoped>
</style>
  