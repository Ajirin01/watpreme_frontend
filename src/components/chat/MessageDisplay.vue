<template>
  <div class="message-display" ref="messageContainer">
    <div v-for="message in messages" :key="message.id">
      <!-- bot chat area -->
      <div v-if="message.sender.type === 'operator'" class="message-text bot-text" :style="message.style">
        <div class="bot-text-content">
          <span class="receiver-shoot-out"></span>
          {{ message.message }}
          <div class="status-indicator">
            <span>{{ convertTimestampToTime(message.created_at) }}</span>
            <span v-html="getStatusIndicator(message.status)"></span>
          </div>
        </div>
      </div>

      <!-- user chat area -->
      <div v-if="message.sender.type === 'user'" class="message-text user-text">
        <div class="user-text-content">
          <span class="sender-shoot-out"></span>
          {{ message.message }}
          <div class="status-indicator">
            <span>{{ convertTimestampToTime(message.created_at) }}</span>
          </div>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    convertTimestampToTime(timestamp) {
      // console.log("Original timestamp:", timestamp);
      // Ensure the timestamp is in milliseconds
      var date = new Date(timestamp);

      // console.log("Converted date:", date);

      var hours = date.getHours();
      var minutes = ('0' + date.getMinutes()).slice(-2);
      var meridian = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;

      return hours + ':' + minutes + ' ' + meridian;
    },
    getStatusIndicator(status) {
      switch (status) {
        case 'sending':
          return '<i class="bi bi-clock" style="font-size: .7rem"></i>'; // Clock icon for sending
        case 'sent':
          return '<i class="bi bi-check-all" style="font-size: .7rem"></i>'; // Double check (tick) icon for sent
        case 'failed':
          return '<i class="bi bi-exclamation-circle" style="color: red; font-size: .7rem"></i>'; // Red circled exclamation mark for failed
        default:
          return '';
      }
    }
  },
  // computed: {

  // },
  // mounted() {
  //   // Load messages for the initial chat
  //   console.log(this.$route.params.id, "@@@@@@@@@@@@@@")
  // }
};
</script>

<style>
.message-display {
  flex-grow: 1;
  height: 250px;
}

.bot-text {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  margin-right: 25px;
}

.bot-text-content {
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: #dcf8c6;
  border-radius: 12px 0px 12px 12px;
  padding: 8px;
  min-width: 50px;
  max-width: 250px;
  position: relative;
}

.user-text-content {
  white-space: pre-wrap;
  min-width: 50px;
  max-width: 250px;
  word-wrap: break-word;
  margin-left: 10px;
  background-color: #e0e0e0;
  border-radius: 0px 12px 12px 12px;
  padding: 8px;
  position: relative;
}

.sender-shoot-out {
  position: absolute;
  top: 0px;
  left: -5px;
  width: 10px;
  height: 15px;
  border-radius: 0 0 0 10px;
  background-color: #e0e0e0;
}

.receiver-shoot-out {
  position: absolute;
  top: 0px;
  right: -6px;
  width: 10px;
  height: 15px;
  border-radius: 0 0 10px 0px;
  background-color: #dcf8c6;
}

.user-icon {
  margin-top: 5px;
}

.user-text {
  display: flex;
  flex-direction: row;
  justify-content: left;
  justify-self: left;
}

.status-indicator {
  display: flex;
  justify-content: flex-end;
  font-size: 0.5rem;
  opacity: 0.7;
}
</style>
