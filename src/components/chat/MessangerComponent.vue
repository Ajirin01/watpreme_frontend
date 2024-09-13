<template>
  <div id="app">
    <!-- Message container for displaying chat messages -->
    <div class="message-container" ref="messageContainer">
      <MessageDisplay :messages="chatMessages" :key="messageKey" :userId="1"/>
    </div>

    <!-- User input area -->
    <div>
      <ChatInput @user-message="handleUserMessage" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ChatInput from "@/components/chat/ChatInput.vue";
import MessageDisplay from "@/components/chat/MessageDisplay.vue";
import Pusher from 'pusher-js';
import {API_HOST} from '@/constants/apiHost';


export default {
  props: {
    chatId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      chatMessages: [],  // Array to store chat messages
      currentChatId: null,  // Current chat ID being processed
      messageKey: 0,  // Key for re-rendering MessageDisplay component
    };
  },
  watch: {
    // Watch for changes in chatMessages and scroll to the bottom
    chatMessages() {
      this.$nextTick(this.scrollToBottom);
    },
    // Watch for changes in the route parameter and load messages
    chatId: {
      immediate: true,
      handler(newChatId) {
        this.loadMessages(newChatId);
      }
    }
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

    // Load messages for the selected chat
    async loadMessages(chatId) {
      this.chatMessages = []
      this.currentChatId = chatId;
      try {
        const response = await axios.get(`${API_HOST}/api/conversations/${chatId}/messages`);
        this.chatMessages = response.data;
        this.messageKey += 1; // Update key to force re-render
      } catch (error) {
        console.error('Failed to fetch chat messages:', error);
      }
    },

    // Handle user's input message
    async handleUserMessage(userInput) {
      // Create a user text message and add it to chatMessages
      const userText = {
          id: this.chatMessages.length + 1,
          message: `${userInput}`,
          sender: {
              type: "operator",
              id: 1
          },
          receiver: {
              type: "user",
              id: 2
          },
          status: 'sending', 
          created_at: Date.now()
      };

      this.chatMessages.push(userText);
      this.scrollToBottom();

      // Send the message to the backend
      try {
        await axios.post(`${API_HOST}/api/conversations/${this.currentChatId}/messages`, userText);
        userText.status = 'sent'; // Update status to 'sent' on success
      } catch (error) {
        userText.status = 'failed'; // Update status to 'failed' on error
        console.error('Failed to send message:', error);
      }
    }
  },
  computed: {

  },
  mounted() {
    // Load messages for the initial chat
    // console.log(this.chatId, "@@@@@@@@@@@@@@")
    this.loadMessages(this.chatId); // Assuming 1 is the initial chat ID, adjust as necessary

    // Pusher configuration
    Pusher.logToConsole = true;
    const pusher = new Pusher('8c7fd270f7eb75c0f6e1', {
      cluster: 'eu',
      encrypted: true
    });

    const channel = pusher.subscribe('whatsapp-events');
    channel.bind('message-received', async (data) => {
      const messageText = data.message?.messages?.[0]?.text?.body ?? '';

      if (messageText) {
        const userText = {
          id: this.chatMessages.length + 1,
          contact_id: 1,
          business_id: 1,
          message: messageText,
          sender: {
            type: 'user', // Assuming 'user' is the correct type for received messages
            id: data.message?.messages?.[0]?.from ?? 'unknown', // Use the sender's ID from the message or 'unknown'
          },
          receiver: {
            type: 'operator',
            id: 1, // Assuming the operator's ID is 1
          },
          status: 'received',
          created_at: Date.now(),
        };

        try {
          // Save the incoming message to the database
          await axios.post(`${API_HOST}/api/conversations/${this.currentChatId}/webhook/messages`, userText);

          // If saving to the database is successful, update the UI
          if (data.message) {
            this.chatMessages.push(userText);
            this.scrollToBottom();
          }
        } catch (error) {
          console.error('Failed to save incoming message:', error);
        }
      }
    });

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
  padding-top: 20px;
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
