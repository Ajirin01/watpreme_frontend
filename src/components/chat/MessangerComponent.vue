<template>
  <div id="app">
    <!-- Message container for displaying chat messages -->
    <div class="message-container" ref="messageContainer">
      <MessageDisplay :messages="chatMessages" :key="messageKey"/>
    </div>

    <!-- User input area -->
    <div>
      <ChatInput @user-message="handleUserMessage" />
    </div>
  </div>
</template>

<script>
import ChatInput from "@/components/chat/ChatInput.vue";
import MessageDisplay from "@/components/chat/MessageDisplay.vue";
import chatData from "@/assets/chatData.json";

export default {
  data() {
    return {
      chatMessages: [],  // Array to store chat messages
      currentMessageId: null,  // Current message ID being processed
      messageKey: 0,         // Key for re-rendering MessageDisplay component
      end: false,
    };
  },
  watch: {
    // Watch for changes in chatMessages and scroll to the bottom
    chatMessages() {
      this.$nextTick(this.scrollToBottom);
    },
  },
  methods: {
    // Scroll to the bottom of the message container
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },

    // Simulate delay before displaying bot response
    sendDelayedMessage(chatMessages, botResponse) {
      // Display "typing" message
      chatMessages.push({ id: 'typing', type: 'typing', text: 'Bot is typing...', style: { fontStyle: 'italic' } });
      this.scrollToBottom();

      setTimeout(() => {
        // Remove "typing" message
        const typingIndex = chatMessages.findIndex((msg) => msg.id === 'typing');
        if (typingIndex !== -1) {
          chatMessages.splice(typingIndex, 1);
        }

        // Display bot response
        chatMessages.push(botResponse);
        this.scrollToBottom();
      }, 1000);
    },

    // Recursively find a message by ID in the chat data
    findMessageByIdRecursive(data, messageId) {
      for (const message of data) {
        if (message.id === messageId) {
          // If id is parent id
          return message;
        } else if (message.conditions && message.conditions.length > 0) {
          // If conditions are present 
          const nestedResult = this.findMessageByIdRecursive(message.conditions, messageId);
          if (nestedResult) {
            return nestedResult;
          }
        } else if (message.content) {
          if (message.content.id === messageId) {// if ID it's found in the content object of the parent instead i.e message > content
            return message.content;
          } else if (message.content.id !== messageId && message.content.conditions.length > 0) {// if ID it's found in the conditions object of content of the parent instead i.e message > content > conditions
            const nestedResult = this.findMessageByIdRecursive(message.content.conditions, messageId);
            if (nestedResult) {
              return nestedResult;
            }
          } else if (message.content.next && message.content.next.conditions) {// if ID it's found in the conditions object of next of content of the parent instead i.e message > content > next > conditions
            // If conditions are present in the next property of content, recursively search within them
            if (message.content.next.id === messageId) {
              return message.content.next;
            } else if (message.content.next.conditions && message.content.next.conditions.length > 0) {
              const nestedResult = this.findMessageByIdRecursive(message.content.next.conditions, messageId);
              if (nestedResult) {
                return nestedResult;
              }
            }
          }
        }
      }
      return null;
    },

    // Recursively find a message by ID in the chat data
    findMessageByStartRecursive(data) {
      for (const message of data) {
        if (message.starts) {
          // If id is parent id
          return message;
        } else if (message.conditions && message.conditions.length > 0) {
          // If conditions are present 
          const nestedResult = this.findMessageByStartRecursive(message.conditions);
          if (nestedResult) {
            return nestedResult;
          }
        } else if (message.content) {
          if (message.content.starts) {// if ID it's found in the content object of the parent instead i.e message > content
            return message.content;
          } else if (!message.content.starts && message.content.conditions.length > 0) {// if ID it's found in the conditions object of content of the parent instead i.e message > content > conditions
            const nestedResult = this.findMessageByStartRecursive(message.content.conditions);
            if (nestedResult) {
              return nestedResult;
            }
          } else if (message.content.next && message.content.next.conditions) {// if ID it's found in the conditions object of next of content of the parent instead i.e message > content > next > conditions
            // If conditions are present in the next property of content, recursively search within them
            if (message.content.next.starts) {
              return message.content.next;
            } else if (message.content.next.conditions && message.content.next.conditions.length > 0) {
              const nestedResult = this.findMessageByStartRecursive(message.content.next.conditions);
              if (nestedResult) {
                return nestedResult;
              }
            }
          }
        }
      }
      return null;
    },

    // Handle user's input message
    handleUserMessage(userInput) {
      console.clear();

      // Create a user text message and add it to chatMessages
      const userText = { id: 'user', type: 'text', text: `${userInput}` };
      this.chatMessages.push(userText);
      this.scrollToBottom();

      // Find the current message in chatData based on the currentMessageId
      const currentMessage = this.findMessageByIdRecursive(chatData, this.currentMessageId);
      console.log(currentMessage);

      // check if the message is ending message so that we can start from the beginning
      if(currentMessage.ends){
        this.sendDelayedMessage(this.chatMessages, this.findMessageByIdRecursive(chatData, 1))
        this.currentMessageId = 1
      }

      // Process conditional messages
      if (currentMessage != null && currentMessage.conditions.length > 0) {
        const optionIndex = parseInt(userInput, 10);

        if (Number.isInteger(optionIndex) && optionIndex >= 1 && optionIndex <= currentMessage.options.length) {
          const option = currentMessage.options[optionIndex - 1];
          const targetOption = option;

          // Find the next message based on the selected option
          const nextMessage = currentMessage.conditions.find((condition) => condition.selectedOption === targetOption);

          if (nextMessage.content) {
            // Update currentMessageId to the next content ID
            this.currentMessageId = nextMessage.content.id;
            if(currentMessage.ends){
              this.currentMessageId = 1
            }
          }

          // Check for rerun and send the appropriate delayed message
          if (nextMessage.content && nextMessage.content.rerun != null) {
            // console.log("nextMessage.content.rerun", nextMessage.content.rerun);
            const rerunMessage = this.findMessageByIdRecursive(chatData, nextMessage.content.rerun);
            this.currentMessageId = rerunMessage.id;
            if(currentMessage.ends){
              this.currentMessageId = 1
            }
            this.sendDelayedMessage(this.chatMessages, rerunMessage);
          } else if (currentMessage.content && currentMessage.content.next?.conditions?.length > 0) {
            console.log("nextMessage.content.next.conditions", currentMessage.content);
            if(currentMessage.ends){
              this.currentMessageId = 1
            }
            this.sendDelayedMessage(this.chatMessages, currentMessage.content);
            this.currentMessageId = currentMessage.content.next.id;
          } else {
            if(currentMessage.ends){
              this.currentMessageId = 1
            }
            this.sendDelayedMessage(this.chatMessages, nextMessage.content);
          }
        }else{
          const errorMessage = { id: 'bot', type: 'text', text: 'Please enter a valid number option' };
          if(currentMessage.ends){
            this.currentMessageId = 1
          }
          this.sendDelayedMessage(this.chatMessages, errorMessage);
        }
      }

      // Process ordinary text messages
      if (currentMessage != null && Object.keys(currentMessage.next).length !== 0 && currentMessage.conditions.length === 0) {
        // console.log("this is a next message is: ", currentMessage.next);
        this.currentMessageId = currentMessage.next.id;
        this.sendDelayedMessage(this.chatMessages, currentMessage.next);

        if(currentMessage.ends){
          this.currentMessageId = 1
        }
      }
    }

  },
  mounted() {
    // Initialize chat with the first message from chatData
    // const firstMessage = chatData.find((msg) => msg.id == this.currentMessageId);
    const firstMessage =  this.findMessageByStartRecursive(chatData);
    this.sendDelayedMessage(this.chatMessages, firstMessage);
    this.currentMessageId = firstMessage.id;
  },
  components: {
    ChatInput,
    MessageDisplay,
  },
};
</script>

<style>
#app {
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 20px
}

.row {
  height: 100%;
}

.col {
  overflow-y: hidden;
  margin: 0 auto;
}

/* Style the chat messages */
.message-container {
  flex-grow: 1;
  overflow-y: auto;
  scrollbar-width: 4px;  /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 11 */
}

.message-container::-webkit-scrollbar {
  width: 4px;  /* Set the width of the scrollbar */
}

.message-container::-webkit-scrollbar-thumb {
  background-color: #888;  /* Color of the scrollbar thumb */
  border-radius: 4px;  /* Round corners of the thumb */
}


.user-message {
  background-color: #dcf8c6;
  border-radius: 12px;
  padding: 8px;
  max-width: 70%;
  align-self: flex-end;
  margin-left: 30%;
  margin-bottom: 10px; /* Adjust as needed */
}

.bot-message {
  background-color: #fff;
  border-radius: 12px;
  padding: 8px;
  max-width: 70%;
  align-self: flex-start;
  margin-right: 30%;
  margin-bottom: 10px; /* Adjust as needed */
}

.inputArea {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
</style>
