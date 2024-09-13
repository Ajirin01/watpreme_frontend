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
          <b-dropdown-item>Read</b-dropdown-item>
        </b-dropdown>
      </div>

      <div class="col-md-6 d-flex justify-content-end align-items-center">
        <!-- Filter Button -->
        <button class="btn btn-light btn-circle mr-3 circle" @click="applyFilter">
          <i class="bi bi-funnel-fill text-secondary"></i>
        </button>
    
        <!-- Add Button -->
        <div class="add-filter-btn" @click="showModal = true">
          +
        </div>
      </div>
    </div>

    <!-- Chat list header -->
    <div class="chat-header">
      <div>
        <span class="chat-header-text">Today</span>
      </div>
      <div class="line"></div>
    </div>

    <!-- Chat Lists -->
    <div class="row mt-3">
      <div class="col-md-12">
        <div class="chat-list" v-for="(chat, index) in filteredChats" :key="index" @click="selectChat(chat)">
          <router-link :to="'/chat/'+chat.id" class="chat-link">
            <b style="color: black">{{ chat.contact.name }}</b>
            <div class="chat-text">{{ chat.latestMessage }}</div>
            <div class="chat-list-footer">
              <span class="open-btn">Open</span>
              <span class="timestamp">{{ formatDate(chat.start_time) }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Modal for selecting contacts -->
    <b-modal v-model="showModal" title="Select Contact" @ok="sendMessageToNewContact">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text"><i class="bi bi-search"></i></span>
        </div>
        <input type="text" placeholder="Search contacts" class="form-control" v-model="contactSearchQuery">
      </div>
      <b-list-group>
        <b-list-group-item 
          v-for="contact in filteredContacts" 
          :key="contact.id" 
          @click="selectedContact = contact"
          :class="{ active: selectedContact && selectedContact.id === contact.id }">
          {{ contact.name }}
        </b-list-group-item>
      </b-list-group>
    </b-modal>
  </div>
</template>


<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      searchQuery: '', // Search query for messages
      searchField: 'name', // Default search field
      chats: [], // Actual chat data from the API
      selectedChat: null, // Currently selected chat
      showModal: false, // Control modal visibility
      contacts: [], // List of contacts for the modal
      selectedContact: null, // Contact selected from the modal
      contactSearchQuery: '' // Search query for contacts
    };
  },
  computed: {
    filteredChats() {
      return this.chats.filter(chat => {
        if (this.searchField === 'name') {
          return chat.contact.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                 chat.latestMessage.toLowerCase().includes(this.searchQuery.toLowerCase());
        } else if (this.searchField === 'message') {
          return chat.latestMessage.toLowerCase().includes(this.searchQuery.toLowerCase());
        }
      });
    },
    filteredContacts() {
      return this.contacts.filter(contact => 
        contact.name.toLowerCase().includes(this.contactSearchQuery.toLowerCase())
      );
    }
  },
  methods: {
    ...mapActions(['setSelectedContact']),
    selectChat(chat) {
      this.selectedChat = chat;
      console.log(this.selectedChat)
      this.setSelectedContact(chat.contact)
      // Implement logic to display messages of the selected chat
    },
    selectContact(contact) {
      this.selectedContact = contact;
    },
    addNewItem() {
      console.log("Add new item")
    },
    applyFilter() {
      console.log("Apply filter")
    },
    fetchChats() {
      axios.get('http://localhost:8000/api/conversations')
        .then(response => {
          this.chats = response.data.map(conversation => ({
            ...conversation,
            latestMessage: conversation.messages.length > 0 ? conversation.messages[conversation.messages.length - 1].message : ''
          }));
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchContacts() {
      axios.get('http://localhost:8000/api/contacts')
        .then(response => {
          this.contacts = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    sendMessageToNewContact() {
      if (!this.selectedContact) {
        return;
      }

      // Create a new conversation
      const newConversation = {
        id: this.chats.length + 1,
        contact_id: this.selectedContact.id,
        start_time: null,
        end_time: null,
        status: "inactive",
        uuid: null,
        created_at: null,
        updated_at: null,
        business_id: null,
        messages: [],
        contact: this.selectedContact,
        latestMessage: ""
    }


      this.chats.push(newConversation);
      this.selectedChat = newConversation;
      this.showModal = false;

      console.log(this.chats)
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    }
  },
  mounted() {
    this.fetchChats();
    this.fetchContacts();
  }
};

</script>

<style scoped>
.chat-link {
  text-decoration: none;
}
.timestamp {
  color: black;
}
.chat-text {
  color: rgb(104, 104, 104);
}
.add-filter-btn {
  background-color: rgba(28, 193, 28, 0.842);
  border-radius: 50px;
  padding: 0px 12px;
  font-size: 1.6rem;
  margin-left: 10px;
  border: 1px solid rgb(19, 19, 19);
  color: white;
}
.open-btn {
  background-color: rgba(12, 172, 12, 0.16);
  padding: 0px 5px;
  border-radius: 3px;
}
.chat-list {
  margin-top: 10px;
}
.chat-list-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(227, 226, 226);
}
.chat-header-text {
  width: 20%;
  font-size: .8rem;
  font-weight: bold;
}
.line {
  border-top: 1px solid rgb(211, 209, 209);
  width: 85%;
  margin-top: 11px; /* Adjust as needed for spacing */
  margin-left: 5px;
}
.circle {
  border-radius: 100px;
}
.chat-header {
  display: flex;
  justify-content: left;
  margin-top: 20px;
}
</style>
