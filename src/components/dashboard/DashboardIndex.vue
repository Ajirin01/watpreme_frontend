<template>
    <div class="dashboard">
        <!-- First Row -->
        <div class="row">
            <div class="date-range-filter mt-3">
                <DateRangeFilter />
            </div>
        </div>
        <!-- Second Row -->
        <div class="row">
            <div class="container-card mt-4">
                <div class="ticket-overview">
                    <span class="overview">Overview</span>
                </div>
                <div class="tickets-list">
                    <TicketCard status="New Ticket" count="0"/>
                    <TicketCard status="Open Ticket" count="1"/>
                    <TicketCard status="Pending" count="0"/>
                    <TicketCard status="Solved" count="13"/>
                    <TicketCard status="Solved by Bot" count="1"/>
                    <TicketCard status="Solved by Agent" count="12"/>
                    <TicketCard status="Expired" count="12"/>
                    <TicketCard status="Expired without Agent Reply" count="9"/>
                </div>

                
            </div>
        </div>

        <!-- Third Row -->
        <div class="row mt-4">
            <div class="col col-sm-8"> <!-- Use col s9 for small screens and above -->
                <div class="container-card">
                    <!-- <BarChartCard :title="'Ticket Status Bar Chart'" :data="barChartData"/> -->
                    <LineChartCard :title="'Ticket Status Chart'" :data="lineChartData"/>
                </div>
            </div>
            <div class="col col-sm-4"> <!-- Use col s3 for small screens and above -->
                <div class="container-card" style="margin-bottom: 10px;">
                    <!-- <LineChartCard :title="'Ticket Status Chart'" :data="lineChartData"/> -->
                    <BarChartCard :title="'Ticket Status Bar Chart'" :data="barChartData"/>
                </div>

                <div class="container-card">
                    <!-- <LineChartCard :title="'Ticket Status Chart'" :data="lineChartData"/> -->
                    <DonutChartCard :title="'Ticket Status Pie Chart'" :data="barChartData"/>
                </div>
            </div>
            <!-- Your HTML structure for the third row goes here -->
        </div>
        
    </div>
</template>
  
<script>
import TicketCard from '@/components/ui/TicketCard'
import LineChartCard from '@/components/ui/charts/LineChartCard'
import BarChartCard from '@/components/ui/charts/BarChartCard'
import DonutChartCard from '@/components/ui/charts/DonutChartCard'
import DateRangeFilter from '@/components/ui/DateRangeFilter'


const colors = {
  red: "#a73f40",
  yellow: "#f9ce3f",
  green: "#58d9a8",
  default: "#4a4d4c",
  blue: "#6ba1be",
  purple: "#6658b6",
  darkBlue: "#323e61"
};

export default {
  name: 'DashboardIndex',
  data() {
    return {
      lineChartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Ticket Status',
            backgroundColor: colors.blue, // Set the background color using the colors object
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      },

      barChartData: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Ticket Status',
            backgroundColor: Object.values(colors), // Set the background colors using the colors object
            data: [12, 19, 3, 5, 2, 3]
          }
        ]
      }
    };
  },
  components: {
    TicketCard,
    LineChartCard,
    BarChartCard,
    DonutChartCard,
    DateRangeFilter
  }
};
</script>

  
<style scoped>
    .tickets-list{
        display: flex;
        justify-content: flex-start;
        justify-items: center;
        justify-content: center;
    }
    .overview{
        font-weight: bold;
    }

    .container-card{
        border-radius: 20px;
        box-shadow: 2px 2px 2px rgba(128, 128, 128, 0.411);
        min-height: 160px;
        background-color: white;
        padding: 20px;
        width: 100%;
        padding-bottom: 50px;
        margin-top: 10px
    }
</style>
  