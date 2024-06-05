<template>
  <div class="message-display" ref="messageContainer">
    <div v-for="message in messages" :key="message.id">
      <!-- bot chat area -->
      <div v-if="message.id != 'user'" class="message-text bot-text" :style="message.style">
        <div><img class="bot-logo" alt="App logo" src="../../assets/bot.png" width="30" height="30"></div>
        <div class="bot-text-content">
          <span class="receiver-shoot-out"></span> <!-- Move shoot-out inside the content area -->
          {{ message.text }}
          <div v-if="message.options && message.options.length > 0">
            <ol>
              <li v-for="(option, index) in message.options" :key="index">{{ option }}</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- user chat area -->
      <div v-if="message.id === 'user'" class="message-text user-text">
        <!-- <div class="material-icons user-icon white-text">person_pin</div> -->
        <div class="user-text-content">
          <span class="sender-shoot-out"></span> <!-- Move sender-shoot-out inside the content area -->
          {{ message.text }}
        </div>
      </div><br>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      messages: Array,
    }
  };
</script>

<style>
.message-display {
  flex-grow: 1;
  height: 250px;
}

.user-text {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end; /* Align user text to the right */
  margin-right: 25px
}

.user-text-content {
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: #dcf8c6; /* Background color for bot messages */
  border-radius: 12px 0px 12px 12px;
  padding: 8px;
  min-width: 50px;
  max-width: 250px;
  position: relative;
}

.bot-text-content {
  white-space: pre-wrap;
  min-width: 50px;
  max-width: 250px;
  word-wrap: break-word;
  margin-left: 10px;
  background-color: #e0e0e0; /* Background color for user messages */
  border-radius: 0px 12px 12px 12px;
  padding: 8px;
  position: relative; /* Set position relative for positioning the shootout */
}

.receiver-shoot-out {
  position: absolute;
  top: 0px;
  left: -5px; /* Adjust the distance from the right side */
  width: 10px;
  height: 15px;
  border-radius: 0 0 0 10px; /* Adjust border-radius as needed */
  background-color: #e0e0e0; /* Color of the shootout */
}

.sender-shoot-out {
  position: absolute;
  top: 0px;
  right: -6px; /* Adjust the distance from the right side */
  width: 10px;
  height: 15px;
  border-radius: 0 0 10px 0px; /* Adjust border-radius as needed */
  background-color: #dcf8c6; /* Color of the shootout */
}

.user-icon {
  margin-top: 5px;
}

.bot-text {
  display: flex;
  flex-direction: row;
  justify-content: left;
  justify-self: left;
}
</style>
