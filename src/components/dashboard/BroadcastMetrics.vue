<template>
    <div class="circular-progress container">
      <div class="page-header">
        <h1>WhatsApp Broadcast Metrics</h1>
        <p>Analyze the performance of your WhatsApp broadcasts with these key metrics.</p>
      </div>
      <div class="row">
        <div class="col-md-3 col-sm-6" v-for="(metric, index) in metrics" :key="index">
          <div class="metric-card">
            <div>
              <MetricsCircle :progress="metric.value" />
            </div>
            <div class="progress-label">{{ metric.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
import MetricsCircle from '@/components/ui/charts/MetricsCircle.vue';

import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
    //   metrics: null,
      id: this.$route.params.id
    };
  },
  components: {
    MetricsCircle
  },
  created() {
    this.setBroadcastMetrics(this.id);
  },
  beforeDestroy(){
    this.deleteBroadcastMetrics()
    console.log(this.metrics)
  },
  methods: {
    ...mapActions(['setBroadcastMetrics', 'deleteBroadcastMetrics']),
  },
  computed: {
    ...mapState(['metrics'])
  }
};
</script>

  
  
  <style scoped>
  .circular-progress {
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  .page-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .page-header h1 {
    font-size: 2em;
    margin-bottom: 10px;
  }
  
  .page-header p {
    font-size: 1.2em;
    color: #666;
  }
  
  .metric-card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .progress-label {
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  </style>
  
