<template>
    <div class="contacts-table-container">
      <!-- Search input and Add New Contact(s) button -->
      <div class="search-and-add">
        <!-- Search input -->
        <div class="input-field search-input">
          <b-input-group size="sm" class="mb-2">
            <b-input-group-prepend is-text>
              <b-icon icon="search"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="search" v-model="searchQuery" placeholder="Search terms"></b-form-input>
          </b-input-group>
        </div>

        <div class="d-flex align-items-center justify-content-right import-options">
            <!-- Modal Trigger -->
            <button type="button" class="btn btn-primary add-contactDetail-btn" v-b-modal.modal-addContactModal>
                <b-icon-person-plus-fill></b-icon-person-plus-fill> ADD <span class="table-name">CONTACT</span> 
            </button>

            <div class="ml-2">
                <b-button variant="outline-success" class="icon-button ml-2">
                    <b-icon icon="download" variant="success" @click="exportContacts"></b-icon>
                </b-button>
                <b-button variant="outline-success" class="icon-button ml-2">
                    <b-icon icon="upload" variant="success" @click="openFileInput"></b-icon>
                </b-button>
                <!-- Hidden file input -->
                <input type="file" ref="fileInput" style="display: none" @change="importContacts">
            </div>

            <div class="write-radio">
                <ul>
                    <li><span><input type="radio" name="rewrite" id=""></span> Rewrite all</li>
                    <li><span><input type="radio" name="rewrite" id=""></span> Skip all</li>
                </ul>
            </div>

            <div class="contact-more-option">
                <b-button variant="light" class="icon-button ml-2"><b-icon icon="three-dots-vertical" variant="primary"></b-icon></b-button>
            </div>
        </div>
      </div>

      <div>
        <b-table striped hover :items="paginatedContacts" :fields="fields" responsive>
          <!-- Checkbox column -->
          <template #cell(check)="data">
            <input type="checkbox" class="" v-model="selectedContacts" :value="data.item.id" />
          </template>
    
          <!-- Basic Info column -->
          <template #cell(basic-info)="data">
            <div class="user-info">
              <div class="avatar">
                <img class="circle" src="https://materializecss.com/images/yuna.jpg" alt="">
              </div>
              <div class="details">
                <span class="username grey-text text-darken-3"><b>{{ data.item.name }}</b></span>
                <span class="email grey-text text-darken-3">{{ data.item.phone }}</span>
              </div>
            </div>
          </template>
    
          <!-- Status column -->
          <template #cell(status)="data">
            {{ data.item.status }}
          </template>
    
          <!-- Custom Attributes column -->
          <template #cell(custom-attributes)="data">
            <div class="attributes-list">
              <div v-for="(attribute, index) in data.item.attributes" :key="index" class="attribute-item">
                <span v-if="attribute.value">{{ attribute.custom_attribute.name }}: {{ attribute.value }}</span>
                <span v-else>{{ attribute.custom_attribute.name }}</span>
                <b-icon-trash v-if="attribute.value && (attribute.custom_attribute.name !== 'name' && attribute.custom_attribute.name !== 'phone')" class="delete-icon" @click="removeAttribute(data.item, attribute.id)"></b-icon-trash>
              </div>
            </div>
          </template>
    
          <!-- Created Date column -->
          <template #cell(created-date)="data">
            {{ data.item.created_at }}
          </template>
    
          <!-- Broadcast column -->
          <template #cell(broadcast)="data">
            <b-icon v-if="isTruthy(data.item.broadcast)" icon="check" variant="success"></b-icon>
            <b-icon v-else icon="x" variant="danger"></b-icon>
          </template>
    
          <!-- SMS column -->
          <template #cell(sms)="data">
            <b-icon v-if="isTruthy(data.item.sms)" icon="check" variant="success"></b-icon>
            <b-icon v-else icon="x" variant="danger"></b-icon>
          </template>
    
          <!-- Dropdown column -->
          <template #cell(dropdown)="data">
            <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
              <template #button-content>
                <b-icon icon="three-dots-vertical"></b-icon>
              </template>
              <b-dropdown-item class="modal-trigger" v-b-modal.modal-editContactModal @click="handleSetSelectedContact(data.item)">Edit</b-dropdown-item>
              <b-dropdown-item href="#" @click="handleDeleteContact(data.item.id)">Delete</b-dropdown-item>
            </b-dropdown>
          </template>
        </b-table>
      </div>
  
      <!-- Pagination buttons and info -->
      <div class="pagination-container">
        <span class="grey-text" style="margin-top: 20px">Page {{ currentPage }} of {{ totalPages }}</span>
        <input type="number" min="5" @change="updatePageSize()" style="width: 50px; height: 30px; margin-top: 10px">
        <button class="paginate-buttons" @click="previousPage" :disabled="currentPage === 1">Prev</button>
        <button v-for="page in totalPages" :key="page" class="paginate-buttons" :class="{ 'active-page': page === currentPage }" @click="goToPage(page)">{{ page }}</button>
        <button class="paginate-buttons" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>

      <!--Add Contact(s) Modal Structure -->
      <b-modal id="modal-addContactModal" title="Add Contact">
        <AddContactForm ref="addContactForm" @contact-saved="handleContactSaved" />

        <template #modal-footer="{cancel}">
            <b-button size="sm" variant="danger" @click="cancel()">
              Cancel
            </b-button>
            <b-button size="sm" variant="success" @click="save()">
              save
            </b-button>
        </template>
      </b-modal>

      <!--Edit Contact(s) Modal Structure -->
      <b-modal id="modal-editContactModal" title="Edit Contact">
        <EditContactForm/>

        <template #modal-footer="{cancel}">
          <b-button size="sm" variant="danger" @click="cancel()">
            Cancel
          </b-button>
          <b-button size="sm" variant="success" @click="saveEditContact()">
            save
          </b-button>
      </template>
      </b-modal>
    </div>
</template>
  
<script>
  //import Paginator from '@/assets/Paginator.js';
  import AddContactForm from '@/components/ui/modals/AddContact.vue'
  import EditContactForm from '@/components/ui/modals/EditContact.vue'
  import { mapActions, mapState } from 'vuex';
  
  export default {
    data() {
      return {
        fields: [
          { key: 'check', label: '' }, // Checkbox column
          { key: 'basic-info', label: 'Basic Info' }, // Basic Info column
          { key: 'status', label: 'Status', sortable: true }, // Status column
          { key: 'custom-attributes', label: 'Custom Attributes' }, // Custom Attributes column
          { key: 'created-date', label: 'Created Date', sortable: true }, // Created Date column
          { key: 'broadcast', label: 'Broadcast', sortable: true }, // Broadcast column
          { key: 'sms', label: 'SMS', sortable: true }, // SMS column
          { key: 'dropdown', label: '' } // Dropdown column
        ],
        size: 1,
        searchQuery: '', // Search query
        selectedContacts: [], // Array to store selected contacts
        selectAll: false, // Flag to track if all checkboxes are selected
        currentPage: 1, // Current page number
        pageSize: 5, // Number of items per page
      };
    },
    computed: {
        ...mapState(['contacts', 'selectedContact']),
        // Filtered contacts based on search query
        filteredContacts() {
            return this.contacts.filter(contactDetail =>
                (contactDetail && contactDetail.name && contactDetail.name.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
                (contactDetail.phone && contactDetail.phone.toLowerCase().includes(this.searchQuery.toLowerCase()))
            );
        },
        // Total number of pages based on the number of items and page size
        totalPages() {
            return Math.ceil(this.filteredContacts.length / this.pageSize);
        },
        // Paginated contacts based on the current page and page size
        paginatedContacts() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.filteredContacts.slice(startIndex, endIndex);
        }
    },
    methods: {
        ...mapActions(['fetchContacts', 'setCustomAttributes', 'updateContact', 'deleteContact', 'deleteContactAttribute', 'postContact', 'setSelectedContact']),
        isTruthy(value) {
            // Convert the value to a boolean and return it
            return Boolean(Number(value));
        },
        handleSetSelectedContact(contactDetail){
            this.setSelectedContact(contactDetail)
            console.log(this.selectedContact)
        },
        handleDeleteContact(id) {
            this.deleteContact(id)
        },
        toggleSelectAll() {
            // Toggle selection of all checkboxes
            if (this.selectAll) {
            this.selectedContacts = this.filteredContacts.map(contactDetail => contactDetail.id);
            } else {
            this.selectedContacts = [];
            }
        },
        // Function to handle page change
        goToPage(pageNumber) {
            this.currentPage = pageNumber;
        },
        // Function to navigate to the previous page
        previousPage() {
            if (this.currentPage > 1) {
            this.currentPage--;
            }
        },
        // Function to navigate to the next page
        nextPage() {
            if (this.currentPage < this.totalPages) {
            this.currentPage++;
            }
        },
        updatePageSize() {
            // Handle null and undefined values for pageSize
            let newPageSize = event.target.value
            console.log(this.size)
            if (newPageSize === null || typeof newPageSize === 'undefined') {
                // Set a default value for pageSize
                newPageSize = 5; // You can set any default value you prefer
            } else if (newPageSize < 1) {
                // Ensure pageSize is not less than 1
                newPageSize = 1;
            }else{
                this.pageSize = newPageSize
            }
            // Reset current page to 1 when changing page size
            this.currentPage = 1;
        },
        removeAttribute(contactDetail, id) {
          this.setSelectedContact(contactDetail)
          // console.log(this.selectedContact, id)
          this.deleteContactAttribute(id)
        },
        saveEditContact(){
            console.log(this.selectedContact)
            this.updateContact(this.selectedContact)
        },
        save() {
            // Trigger save action of AddContactForm component
            console.log(this.$refs.addContactForm.saveContact());
            const savedContact = this.$refs.addContactForm.saveContact()
            let contact = [
              {  
                  name: savedContact.username, 
                  phone: savedContact.phoneNumber,
                  status: 'Active', 
                  broadcast: false, 
                  sms: false 
              }
            ]

            this.postContact(contact)
        },
        handleContactSaved() {
            // Handle save action completion here (e.g., close the modal)
            this.$bvModal.hide('modal-addContactModal'); // Close the modal
        },

        openFileInput() {
            // Trigger click event on the hidden file input
            this.$refs.fileInput.click();
        },

        parseCSV(csvContent) {
            // Split CSV content into rows
            const rows = csvContent.split("\n");

            // Get headers
            const headers = rows[0].split(",");

            // Initialize contacts array
            const contacts = [];

            // Parse each row
            for (let i = 1; i < rows.length; i++) {
                const values = rows[i].split(",");
                const contact = {};

                // Assign values to corresponding headers
                for (let j = 0; j < headers.length; j++) {
                    contact[headers[j]] = values[j];
                }

                // Parse the attributes field back to an object
                if (contact.attributes) {
                  console.log(contact.attributes)
                  contact.attributes = JSON.parse(contact.attributes.replace(/\|/g, ','));
                    // contact.attributes = JSON.parse(contact.attributes);
                }

                // Add contact to contacts array
                contacts.push(contact);
            }

            return contacts;
        },

        exportContacts() {
            // Define the headers
            const headers = Object.keys(this.contacts[0]);

            // Convert contacts data to CSV format
            const csvContent = `${headers.join(",")}\n${this.contacts.map(contact => {
                // Stringify the attribute field with a different delimiter
                const stringifiedContact = { ...contact };
                stringifiedContact.attributes = JSON.stringify(contact.attributes).replace(/,/g, '|');

                // Join values with commas
                return Object.values(stringifiedContact).join(",");
            }).join("\n")}`;

            // Create a Blob object with the CSV content
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

            // Create a download link
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.setAttribute("download", "contacts.csv");

            // Simulate a click to trigger the download
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
        },

        importContacts(event) {
            const file = event.target.files[0]; // Get the uploaded file
            const reader = new FileReader();

            // Define a callback function to handle the file reading
            reader.onload = (e) => {
                const csvData = e.target.result; // Get the CSV data
                const contacts = this.parseCSV(csvData); // Parse the CSV data

                // Do something with the parsed contacts data (e.g., save it to Vuex store)
                console.log(contacts);
                this.postContact(contacts)
            };

            // Read the uploaded file as text
            reader.readAsText(file);
        },
    },
    mounted() {
        this.fetchContacts()
        this.setCustomAttributes()
    },
    components:{
        AddContactForm,
        EditContactForm
    }
  };
</script>
  
<style scoped>
  .import-options{
    margin-top: -20px
  }
  .write-radio{
    margin-top: 20px;
    margin-left: -25px
  }
  .write-radio ul li{
    list-style: none;
  }
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
  
  .user-info{
    display: flex;
    justify-content: flex-start;
    }

    .user-info .avatar img{
        width: 40px;
        height: 40px;
    }

    .user-info .details{
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: left;
        text-align: left;
        margin-left: 5px;
    }
  .input-field{
    width: 200px;
  }
  .circle{
    border-radius: 5px;
  }
  .add-contactDetail-btn {
    font-size: .7rem;
    border-radius: 8px !important;
  }
  /* Add custom styles as needed */
  .search-and-add {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  @media (max-width: 768px) {
    .search-and-add {
      flex-direction: column;
    }
  }
  .search-input {
    margin-top: 0px;
  }
  .contacts-table-container {
    font-size: .8rem;
    background-color: white;
    width: 90%;
    margin: 20px auto;
    padding: 30px;
  }
  .pagination-container {
    display: flex;
    column-gap: 10px;
    justify-content: flex-end;
    margin-top: 30px
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }
  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }
  .active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
  }
  .active-page:hover {
    background-color: #2988c8;
  }
</style>
  