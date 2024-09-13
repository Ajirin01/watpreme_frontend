<template>
  <div>
    <div class="container">
      <!-- Row 1 -->
      <div class="row avaliabilty">
        <div class="col-md-6 d-flex align-items-center justify-content-left">
          <div class="circle-text"><b v-if="selectedContact">{{ selectedContact.name[0] }}</b></div>
          <div class="status-circle"></div>
          <div class="status-label">Available</div>
        </div>
        <div class="col-md-6 d-flex align-items-center justify-content-right">
          <b-button variant="outline-secondary" class="icon-button"><b-icon icon="telephone-fill" variant="success"></b-icon></b-button>
          <b-button variant="outline-secondary" class="icon-button"><b-icon icon="chat-left-text-fill" variant="success"></b-icon></b-button>
        </div>
      </div>
      <!-- Basic Information and Contact custom parameters -->
      <div class="row">
        <div class="col-md-12 basic-info">
          <b>Basic Information</b> <br>
        {{ selectedContact.name }}
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 custom-paramters d-flex align-items-center justify-content-between">
          <b>Contact custom parameters</b>
          <b-button variant="success" class="icon-button light-text" size="sm"><b-icon icon="pen" variant="light"></b-icon></b-button>
        </div>
        <div class="col-md-12 parameter-items">
          <div class="parameter-item" v-for="(attribute, index) in customAttributes" :key="index">
            <b-list-group horizontal>
              <b-list-group-item class="d-flex align-items-center">{{ attribute.custom_attribute.name }}</b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                {{ attribute.value }}
                <span class="parameter-item-close-btn" @click="removeCustomAttribute(index)">x</span>
              </b-list-group-item>
            </b-list-group>
          </div>
        </div>

        <div class="col-md-12 tags">
          <div class="tags-header">Tags</div>
          <div>
            <custom-tags @tag-added="addTag" @tag-removed="removeTag"></custom-tags>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CustomTags from '@/components/ui/CustomTags.vue';
import {API_HOST} from '@/constants/apiHost';
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      customAttributes: [],
      tags: [],
      chatMessages: [],
    };
  },
  computed: {
    ...mapState(['selectedContact']),
  },
  watch: {
    selectedContact(newContact) {
      if (newContact && newContact.attributes) {
        this.customAttributes = newContact.attributes;
      } else {
        this.customAttributes = [];
      }
    },
  },
  methods: {
    ...mapMutations(['setSelectedContact']), // Assuming you have a mutation to set the selected contact
    addTag(tag) {
      this.tags.push(tag); // Add tag to the tags array
    },
    removeTag(index) {
      this.tags.splice(index, 1); // Remove tag from the tags array
    },
    removeCustomAttribute(index) {
      this.customAttributes.splice(index, 1); // Remove custom attribute from the array
    },
    async loadMessages(chatId) {
      this.chatMessages = [];
      try {
        const response = await axios.get(`${API_HOST}/api/conversations/${chatId}`);
        this.chatMessages = response.data;
        if (this.chatMessages.contact) {
          this.setSelectedContact(this.chatMessages.contact);
        }
      } catch (error) {
        console.error('Failed to fetch chat messages:', error);
      }
    },
  },
  components: {
    CustomTags,
  },
  mounted() {
    let chatId = this.$route.params.id;
    this.loadMessages(chatId);
  },
};
</script>

<style scoped>
.tags {
  margin-top: 20px;
  margin-bottom: 20px;
}
.tags-header {
  font-weight: bold;
  padding-bottom: 15px;
}
.justify-content-between {
  width: 100%;
}
.parameter-item-close-btn {
  margin-left: 20px;
  border: 1.5px solid gray;
  border-radius: 4px;
  padding: 0px 5px;
  cursor: pointer;
  transition: all 0.1s ease-in;
}
.parameter-item-close-btn:hover {
  background-color: rgb(197, 195, 195);
}
.parameter-items {
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px rgb(231, 231, 231) solid;
}

.parameter-item {
  margin-top: 5px;
}
.custom-paramters {
  padding-top: 15px;
}
.basic-info {
  margin-top: 15px;
  padding-bottom: 40px;
  border-bottom: 1px rgb(231, 231, 231) solid;
}
.avaliabilty {
  border-bottom: 1px rgb(231, 231, 231) solid;
  padding-bottom: 25px;
}
.circle-text {
  width: 50px;
  height: 50px;
  line-height: 50px;
  background-color: #f0f0f0;
  text-align: center;
  border-radius: 50%;
  display: inline-block;
}

.status-circle {
  width: 10px;
  height: 10px;
  background-color: #28a745; /* green color */
  margin-left: -15px;
  border-radius: 50%;
  margin-top: 40px;
  display: inline-block;
}

.status-label {
  margin-left: 10px;
}

.icon-button {
  margin-left: 10px;
}
</style>
