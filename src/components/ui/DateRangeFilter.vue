<template>
    <div class="date-range-filter">
      <p><b>Date Range Filter</b></p>
      <div class="row">
        <!-- Column for "From" Date -->
        <div class="col">
          <div class="input-group mb-3">
            <small class="input-group-text" id="fromDateLabel">Date Picker From</small>
            <input type="date" class="form-control" v-model="fromDate" id="fromDate" aria-label="From date" aria-describedby="fromDateLabel">
          </div>
        </div>
        
        <!-- Column for "To" Date -->
        <div class="col">
          <div class="input-group mb-3">
            <small class="input-group-text" id="toDateLabel">Date Picker To</small>
            <input type="date" class="form-control" v-model="toDate" id="toDate" aria-label="To date" aria-describedby="toDateLabel">
          </div>
        </div>
        
        <!-- Column for Period Dropdown -->
        <div class="col">
          <div class="input-group mb-3">
            <label class="input-group-text" for="periodSelect">Period</label>
            <select class="form-select" id="periodSelect" v-model="selectedPeriod">
              <option v-for="period in periods" :key="period.value" :value="period.value">{{ period.label }}</option>
            </select>
          </div>
        </div>
      </div>
  
      <div class="date-range-filter-divider"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DateRangeFilter",
    data() {
      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().slice(0, 10);
      
      return {
        fromDate: today, // Set initial value for "From" Date
        toDate: today,   // Set initial value for "To" Date
        periods: [
          { label: 'Last 10 days', value: 10 },
          { label: 'Last 20 days', value: 20 },
          { label: 'Last 30 days', value: 30 },
          // Add more period options as needed
        ],
        selectedPeriod: 10 // Set the default selected period to the value of the first period
      };
    },
    mounted(){
        // const selectElements = document.querySelectorAll('select');
        // M.FormSelect.init(selectElements, {});
        // document.querySelectorAll('.select-wrapper input.select-dropdown')[0].style.border = "none"
    }
  };
  </script>
  
  <style scoped>
  .date-range-filter {
    margin-left: 20px;
  }
  
  input {
    border: none !important;
  }
  
  .date-range-filter-divider {
    width: 55%;
    height: 1px;
    margin-left: 10px;
    box-shadow: 2px 2px 2px gray;
    margin-top: -25px;
  }
  </style>
  