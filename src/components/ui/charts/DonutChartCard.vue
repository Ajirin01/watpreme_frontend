<template>
    <div class="row">
      <div class="col col-sm-12">
        <div class="container-card">
          <p><b>{{ title }}</b></p>
          <div><donut-chart :data="chartData" :options="chartOptions"></donut-chart></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Doughnut } from 'vue-chartjs';
  import { Chart, ArcElement, CategoryScale, LinearScale, Legend, Tooltip, Title } from 'chart.js';

    // Register the required chart components
    Chart.register(ArcElement, CategoryScale, LinearScale, Legend, Tooltip, Title);
  
  export default {
    props: {
      title: String,
      data: Object
    },
    components: {
      DonutChart: Doughnut
    },
    data() {
      return {
        chartData: this.data,
        chartOptions: {
          responsive: true,
          maintainAspectRatio: true,
          // Add more chart options as needed
        }
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  