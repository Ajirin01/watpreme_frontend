<template>
  <div class="container">
    <div class="row">
      <!-- Search Messages -->
      <div class="col-md-12">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="bi bi-search"></i></span>
          </div>
          <input id="search" type="text" placeholder="search" class="form-control" v-model="searchQuery">

          <!-- Dropdown for selecting search fields -->
          <select id="searchField" class="form-control" v-model="searchField">
            <option value="name">Name or message</option>
            <option value="message">Message</option>
            <!-- Add more options for other fields if needed -->
          </select>
        </div>
      </div>
    </div>
  
    <!-- Filter Options -->
    <div class="row mt-3">
      <div class="col-md-6">
        <b-dropdown text="Active Chats" variant="clear">
          <b-dropdown-item>Unread</b-dropdown-item>
          <b-dropdown-item>read</b-dropdown-item>
        </b-dropdown>
      </div>

      <div class="col-md-6 d-flex justify-content-end align-items-center">
        <!-- Filter Button -->
        <button class="btn btn-light btn-circle mr-3 cirlce" @click="applyFilter">
          <i class="bi bi-funnel-fill text-secondary"></i>
        </button>
    
        <!-- Add Button -->
        <div class="add-filter-btn" @click="addNewItem">
          +
        </div>
      </div>
    </div>

    <!-- chat list header -->
    <div class="chat-header">
      <div>
        <span class="chat-header-text">Today</span>
      </div>
      <div class="line"></div>
    </div>

    <!-- Chat Lists -->
    <div class="row mt-3">
      <div class="col-md-12">
        <div class="chat-list" v-for="(chat, index) in chats" :key="index" @click="selectChat(chat)">
          <b>{{ chat.name }}</b>
          <div class="chat-text">{{chat.text}}</div>
          <div class="chat-list-footer">
            <span class="open-btn">Open</span>
            <span class="timestamp">{{chat.timestamp}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  
  <script>
    export default {
        data() {
        return {
            searchQuery: '', // Search query for messages
            searchField: 'name', // Default search field
            chats: [ // Sample chat list, replace with your actual data
            { id: 1, name: 'Olagoke Mubarak', text: "Hi Olagoke Mubarak, Thank you for your message", timestamp: "02:44pm"},
            { id: 2, name: 'Bola Hamed', text: "Bola good morning", timestamp: "12:44am"},
            // Add more chat items as needed
            ],
            selectedChat: null // Currently selected chat
        };
        },
        methods: {
          selectChat(chat) {
              this.selectedChat = chat;
              // Implement logic to display messages of the selected chat
          },
          addNewItem(){
            console.log("Add new item")
          },
          applyFilter(){
            console.log("Apply filter")
          }
        },
        mounted() {
        // Initialize Materialize CSS select element
        // M.FormSelect.init(document.getElementById('searchField'));
        }
    };
  </script>
  
  <style scoped>
  .chat-text{
    color: rgb(104, 104, 104)
  }
  .add-filter-btn{
    background-color: rgba(28, 193, 28, 0.842);
    border-radius: 50px;
    padding: 0px 12px;
    font-size: 1.6rem;
    margin-left: 10px;
    border: 1px solid rgb(19, 19, 19);
    color: white
  }
  .open-btn{
    background-color: rgba(12, 172, 12, 0.16);
    padding: 0px 5px;
    border-radius: 3px;
  }
  .chat-list{
    margin-top: 10px
  }
  .chat-list-footer{
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(227, 226, 226)
  }
  .chat-header-text{
    width: 20%;
    font-size: .8rem;
    font-weight: bold;
  }
  .line {
    border-top: 1px solid rgb(211, 209, 209);
    width: 85%;
    margin-top: 11px; /* Adjust as needed for spacing */
    margin-left: 5px
  }
  .cirlce{
    border-radius: 100px;
  }

  .chat-header{
    display: flex;
    justify-content: left;
    margin-top: 20px
  }
  </style>
  