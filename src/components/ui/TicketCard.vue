<template>
    <div class="ticker-card">
        <div :style="ticketStyle">{{count}}</div>
        <div :style="ticketStyle">{{status}}</div>
    </div>
</template>
  
<script>
    export default {
        name: 'TicketCard',
        props: {
            status: String,
            count: [Number, String]
        },
        computed: {
            ticketStyle() {
                return {
                    // Dynamically apply text color based on status
                    color: this.getStatusColor()
                };
            }
        },
        methods: {
            // Define a method to determine the color based on the status
            getStatusColor() {
                // Assuming you have predefined colors for different statuses
                const colors = {
                    red: "#a73f40",
                    yellow: "#f9ce3f",
                    green: "#58d9a8",
                    default: "#4a4d4c",
                    blue: "#6ba1be",
                    purple: "#6658b6",
                    darkBlue: "#323e61"
                }

                // Modify this function according to your specific status-color mapping
                switch (this.status) {
                    case 'Open Ticket':
                        return colors.red;
                    case 'New Ticket':
                        return colors.yellow;
                    case 'Pending':
                        return colors.blue;
                    case 'Solved':
                        return colors.default;
                    case 'Solved by Bot':
                        return colors.green;
                    case 'Solved by Agent':
                        return colors.purple;
                    case 'Expired':
                        return colors.darkBlue;
                    case 'Expired without Agent Reply':
                        return colors.default;
                    default:
                        return 'black'; // Default color for unknown statuses
                }
            }
        }
    }
</script>
  
  
<style scoped>
    .ticker-card{
        min-width: 120px;
        min-height: 80px;
        border: 2px solid rgba(196, 194, 194, 0.283);
        text-align: center;
        padding-top: 15px;
        font-weight: bold;
        margin-top: 10px;
        margin-left: -2px;
        padding-left: 20px;
        padding-right: 20px;
        max-width: 200px;
        border-radius: 3px;
    }
</style>
  