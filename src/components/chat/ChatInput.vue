<template>
  <div class="input-area">
    <div class="chat-input">
      <textarea v-model="userInput" @keydown.enter.prevent.exact="handleEnter" @keydown.ctrl.enter.prevent="sendMessage" class="materialize-textarea" placeholder="Type your message..."></textarea>
      
      <div class="chat-icons">
        <b-icon class="chat-icon-item" icon="paperclip"></b-icon>
        <b-icon class="chat-icon-item" icon="emoji-smile"></b-icon>
        <b-icon class="chat-icon-item" icon="lightning"></b-icon>
        <b-icon class="chat-icon-item" icon="sticky"></b-icon>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">
          <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
          <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
        </svg>
      </div>

      <!-- <button @click="sendMessage" class="btn btn-success send">send</button> -->

      <b-button variant="success" class="send" @click="sendMessage" size="sm">Button</b-button>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      userInput: "",
    };
  },
  methods: {
    handleEnter(event) {
      if (event.ctrlKey) {
        // Check for Ctrl + Enter
        this.sendMessage();
      } else {
        // Allow Enter key for new line
        this.userInput += '\n';
      }
    },
    sendMessage() {
      if (this.userInput.trim() !== "") {
        this.$emit("user-message", this.userInput);
        this.userInput = "";
      }
    },
  },
};
</script>

<style>
    .bi-robot{
      transform: scale(1.4);
      margin-top: -5px;
      margin-left: 10px
    }
    .chat-icon-item{
      margin: 0px 5px
    }
    .chat-icons{
      font-size: 1.2rem;
      color: gray;
      margin-top: 15px
    }
    .chat-input{
        top: 500px;
        display: flex;
        justify-content: flex-start;
        background-color: white;
    }

    .input-field{
      width: 100%;
    }

    textarea {
      width: 60%;
      background-color: white !important;
      color: rgb(28, 24, 24);
      border: 1px gray solid;
      border-radius: 5px !important;
      padding-left: 10px !important; /* Adjust the value as needed */
      padding-bottom: 5px;
      height: 50px;
      border: none
    }

    .send{
      margin-left: 50px;
      transition: .2s ease-in;
      cursor: pointer;
      text-align: center;
      margin-bottom: 2px;
    }

    .send:hover{
      opacity: .7;
    }

    .materialize-textarea{
      max-height: 100px;
    }
</style>
