<template>
  <div class="container">
    <!-- Broadcast Name -->
    <b-card class="mb-4" header="Broadcast Information">
      <div class="form-group">
        <label for="broadcastName">Name:</label>
        <input type="text" id="broadcastName" v-model="newBroadcast.name" class="form-control" placeholder="Enter broadcast name">
      </div>
    </b-card>

    <!-- Channel and Template -->
    <b-card class="mb-4" header="Channel and Template">
      <div class="form-group">
        <label for="channel">Channel:</label>
        <select id="channel" v-model="newBroadcast.channel" class="form-control">
          <option disabled value="">Select channel</option>
          <option v-for="channel in channels" :key="channel" :value="channel">{{ channel }}</option>
        </select>
      </div>

      <div class="form-group mt-3">
        <label for="templateId">Template:</label>
        <div class="d-flex align-items-center">
          <h6 class="mb-0"> {{ broadcastSelectedTemplate.template?.name }}</h6>
          <span class="ml-2">
            <b-icon-pen-fill @click="openTemplateModal"></b-icon-pen-fill>
          </span>
        </div>
      </div>
    </b-card>

    <!-- Recipients -->
    <b-card class="mb-4" header="Recipients">
      <div class="form-group">
        <label for="recipients">Recipients:</label>
        <span class="ml-2"><b-icon-pen-fill v-b-modal.modal-createmessageTemplateModel></b-icon-pen-fill></span>
      </div>
      
      <b-card title="Manage Recipients" class="mt-3">
        <b-card-text>
          <!-- Table -->
          <table class="table table-hover">
            <!-- Table headers -->
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                    <span></span>
                  </label>
                </th>
                <th><b>Name</b></th>
                <th><b>Phone</b></th>
                <th><b>Attributes</b></th>
                <th></th>
              </tr>
            </thead>
            <!-- Table body -->
            <tbody>
              <tr v-for="recipient in broadcastRecipients" :key="recipient.id">
                <!-- Table row data -->
                <td>
                  <label>
                    <input type="checkbox" v-model="selectedContacts" :value="recipient" />
                    <span></span>
                  </label>
                </td>
                <td>
                  <span class="username grey-text text-darken-3"><b>{{ recipient.name }}</b></span>
                </td>
                <td>
                  <span class="email grey-text text-darken-3">{{ recipient.phone }}</span>
                </td>
                <td>
                  <div class="attributes-list">
                    <div v-for="(attribute, index) in recipient.attributes" :key="index" class="attribute-item">
                      <span v-if="attribute.value">{{ attribute.custom_attribute.name }}: {{ attribute.value }}</span>
                      <span v-else>{{ attribute.custom_attribute.name }}</span>
                      <b-icon-trash v-if="attribute.value && (attribute.custom_attribute.name !== 'name' && attribute.custom_attribute.name !== 'phone')" class="delete-icon" @click="removeAttribute(recipient, attribute.id)"></b-icon-trash>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </b-card-text>
        <b-button size="sm" variant="danger" @click="removeSelectedRecipient">
          Remove selected
        </b-button>
      </b-card>
    </b-card>

    <!-- Scheduling -->
    <b-card class="mb-4" header="Scheduling">
      <div class="form-group">
        <div class="row">
          <div class="col-md-3">
            <label for="isScheduled">Is Scheduled:</label>
          </div>
          <div class="col-md-9">
            <div style="margin-top: 2px">
              <input type="checkbox" id="isScheduled" v-model="newBroadcast.is_scheduled">
            </div>
          </div>
        </div>
      </div>
      <!-- Posting time input field that is conditionally rendered -->
      <div v-if="newBroadcast.is_scheduled" class="form-group">
        <div class="row">
          <div class="col-md-3">
            <label for="postingTime">Posting Time:</label>
          </div>
          <div class="col-md-9">
            <input type="datetime-local" id="postingTime" v-model="newBroadcast.posting_time" class="form-control">
          </div>
        </div>
      </div>
    </b-card>

    <!-- Template Selection Modal -->
    <b-modal id="modal-selectTemplateModel" title="Select Template" size="lg">
      <template v-if="newBroadcast.channel === 'WhatsApp'">
        <!-- WhatsApp Template Selection -->
        <div>
          <SelectTemplateModal ref="selectTemplateForm" />
        </div>
      </template>
      
      <template v-if="newBroadcast.channel === 'SMS'">
        <!-- SMS Composition -->
        <div>
          <label>Subject:</label>
          <input v-model="newBroadcast.smsSubject" class="form-control" />
        </div>
        
        <div>
          <label>Compose SMS:</label>
          <textarea v-model="newBroadcast.smsContent" class="form-control" rows="5"></textarea>
        </div>
      </template>
      
      <template v-if="newBroadcast.channel === 'Email'">
        <!-- Email Composition -->
        <div>
          <label>Subject:</label>
          <input v-model="newBroadcast.emailSubject" class="form-control" />
        </div>

        <div>
          <label>Compose Email:</label>
          <quill-editor v-model="newBroadcast.emailContent" :options="editorOptions"></quill-editor>
        </div>
      </template>
      
      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="danger" @click="cancel()">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="saveTemplate">
          Save
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SelectTemplateModal from '@/components/ui/modals/SelectTemplateModal.vue';
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.snow.css';

export default {
  components: {
    quillEditor,
    SelectTemplateModal
  },
  data() {
    return {
      newBroadcast: {
        name: '',
        business_id: '',
        template_id: '',
        channel: '',
        status: '',
        recipients: [],
        is_scheduled: false,
        posting_time: null,
        smsContent: '',
        emailContent: '',
        smsSubject: '',
        emailSubject: ''
      },
      channels: ['Email', 'SMS', 'WhatsApp'],
      selectAll: false,
      selectedContacts: [],
      editorOptions: {
        theme: 'snow'
      }
    };
  },
  methods: {
    ...mapActions(['postBroadcast', 'setmessageTemplate', 'deletemessageTemplate', 'setBroadcastSelectedTemplate']),
    clearForm() {
      this.newBroadcast = {
        name: '',
        business_id: '',
        template_id: '',
        channel: '',
        recipients: [],
        is_scheduled: false,
        posting_time: null,
        smsContent: '',
        emailContent: ''
      };
      this.selectAll = false;
      this.selectedContacts = [];
    },
    saveCreateBroadcast() {
      console.log(this.newBroadcast);
  
      this.newBroadcast.recipients = this.selectedContacts.map(contact => contact.phone);
  
      this.postBroadcast(this.newBroadcast)
        .then(() => {
          alert("Broadcast created successfully");
          this.clearForm();
        })
        .catch(error => {
          console.error("Failed to create broadcast", error);
          alert("Failed to create broadcast");
        });
    },
    saveTemplate() {
      if(this.newBroadcast.channel === "WhatsApp"){
        this.$refs.selectTemplateForm.saveSelectedTemplate();
      }else{
        const content = this.newBroadcast.channel === "SMS" ? this.newBroadcast.smsContent : this.newBroadcast.emailContent;
        const subject = this.newBroadcast.channel === "SMS" ? this.newBroadcast.smsSubject : this.newBroadcast.emailSubject;
        console.log({template: {name: subject, components:  [{type: 'body', text: content}]}})
        this.setBroadcastSelectedTemplate({template: {name: subject, components: [{type: 'body', text: content}]}})
      }
    },
    removeSelectedRecipient() {
      const updatedRecipients = this.broadcastRecipients.filter(recipient => !this.selectedContacts.some(selected => selected.id === recipient.id));
      this.deletemessageTemplate(updatedRecipients);

      this.selectedContacts = [];
      this.selectAll = false;

      console.log(updatedRecipients);
    },
    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedContacts = this.broadcastRecipients.slice();
      } else {
        this.selectedContacts = [];
      }
    },
    openTemplateModal() {
      this.$bvModal.show('modal-selectTemplateModel');
    }
  },
  computed: {
    ...mapState(['broadcastRecipients', 'broadcastSelectedTemplate']),
    calculatedmessageTemplate() {
      if (Array.isArray(this.broadcastRecipients)) {
        return this.broadcastRecipients;
      }
      return [];
    }
  },
  watch: {
    selectedContacts: {
      handler(newVal) {
        this.selectAll = newVal.length === this.broadcastRecipients.length;
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.attributes-list {
  display: flex;
  flex-wrap: wrap;
}

.attribute-item {
  background-color: #dad9d9;
  border-radius: 20px;
  padding: 5px 10px;
  margin-right: 10px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.delete-icon {
  cursor: pointer;
  margin-left: 5px;
}
</style>
