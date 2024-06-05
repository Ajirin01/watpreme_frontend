<template>
  <div class="row">
    <div class="col col-sm-12">
      <div class="container-card">
        <p><b>{{title}}</b></p>
        <div><bar-chart :data="barChartData" :options="barChartOptions"></bar-chart></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart, CategoryScale, BarController, BarElement, Legend, Tooltip, PointElement, LineElement, Title } from 'chart.js';

// Register the required chart components
Chart.register(CategoryScale, BarController, BarElement, Legend, Tooltip, PointElement, LineElement, Title);


export default {
  props:{
    title: String,
    data: Object
  },
  components: {
    BarChart: Bar
  },
  data() {
    return {
      barChartData: this.data,
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        height: 400
        // Add more bar chart options as needed
      }
    };
  }
};
</script>


<style scoped>
</style>
