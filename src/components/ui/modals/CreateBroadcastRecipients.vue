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
        <div class="ml-2">
          <b-button variant="outline-success" class="icon-button ml-2">
            <b-icon icon="upload" variant="success" @click="openFileInput"></b-icon>
          </b-button>
          <!-- Import -->
          <!-- Hidden file input -->
          <input type="file" ref="fileInput" style="display: none" @change="importContacts">
        </div>
      </div>
    </div>

    <!-- Attribute filter -->
    <div class="attribute-filter">
      <b-form-group label="Filter by Attribute">
        <b-input-group>
          <b-form-select v-model="selectedAttribute" :options="attributeOptions" placeholder="Select an attribute"></b-form-select>
          <b-form-input v-model="attributeFilterValue" placeholder="Enter value"></b-form-input>
        </b-input-group>
      </b-form-group>
    </div>

    <div>
      <b-table
        striped hover
        :items="paginatedContacts"
        :fields="fields"
        :select-mode="selectMode"
        responsive="sm"
        ref="selectableTable"
        selectable
        @row-selected="onRowSelected">

        <template #thead-top="data">
          <b-tr>
            <b-th><span class="sr-only" :id="data.id">Name and ID</span></b-th>
            <b-th colspan="2"><b-button size="sm" @click="selectAllRows">Select all</b-button></b-th>
            <b-th colspan="2"><b-button size="sm" @click="clearSelected">Clear selected</b-button></b-th>
          </b-tr>
        </template>

        <!-- Checkbox column -->
        <template #cell(check)="data">
          <input type="checkbox" class="" v-model="selectedContacts" :value="data.item.id" />
        </template>

        <!-- Basic Info column -->
        <template #cell(basic-info)="data">
          <div class="user-info">
            <div class="details">
              <span class="username grey-text text-darken-3"><b>{{ data.item.name }}</b></span>
              <span class="email grey-text text-darken-3">{{ data.item.phone || data.item.email }}</span>
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
  </div>
</template>


<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      fields: [
        { key: 'check', label: '' }, // Checkbox column
        { key: 'basic-info', label: 'Basic Info' }, // Basic Info column
        { key: 'custom-attributes', label: 'Custom Attributes' }, // Custom Attributes column
        { key: 'broadcast', label: 'Broadcast', sortable: true }, // Broadcast column
        { key: 'sms', label: 'SMS', sortable: true }
      ],
      size: 1,
      searchQuery: '', // Search query
      selectedAttribute: '', // Selected attribute for filtering
      attributeFilterValue: '', // Value for filtering by selected attribute
      selectedContacts: [], // Array to store selected contacts
      selectAll: false, // Flag to track if all checkboxes are selected
      currentPage: 1, // Current page number
      pageSize: 5, // Number of items per page
      selectMode: 'multi',
      selected: []
    };
  },
  computed: {
    ...mapState(['contacts', 'selectedContact', 'broadcastRecipients']),
    // List of available attribute options for filtering
    attributeOptions() {
      // Extract unique attribute names from contacts
      const attributes = this.contacts.reduce((acc, contact) => {
        acc[0] = ""
        contact.attributes?.forEach(attr => {
          if (!acc.includes(attr.custom_attribute.name)) {
            acc.push(attr.custom_attribute.name);
          }
        });
        return acc;
      }, []);
      return attributes.map(attr => ({ value: attr, text: attr }));
    },
    // Filtered contacts based on search query and attribute filter
    // Ensure `contacts` is properly loaded before applying filters
    filteredContacts() {
      if (!this.contacts) return [];
      const query = this.searchQuery.toLowerCase();
      const attribute = this.selectedAttribute.toLowerCase();
      const attributeValue = this.attributeFilterValue.toLowerCase();
      return this.contacts.filter(contact => {
        // Check if the name or phone matches the query
        const basicInfoMatch = 
          (contact.name && contact.name.toLowerCase().includes(query)) ||
          (contact.phone && contact.phone.toLowerCase().includes(query));
        
        // Check if any attribute matches the query or selected attribute filter
        const attributesMatch = contact.attributes?.some(attribute => 
          (attribute.value && attribute.value.toLowerCase().includes(query)) ||
          (attribute.custom_attribute.name && attribute.custom_attribute.name.toLowerCase().includes(query))
        );

        // If an attribute filter is selected, ensure the contact matches the attribute filter
        const attributeFilterMatch = attribute 
          ? contact.attributes?.some(attr => 
              attr.custom_attribute.name.toLowerCase() === attribute &&
              attr.value.toLowerCase().includes(attributeValue)
            )
          : true;

        return (basicInfoMatch || attributesMatch) && attributeFilterMatch;
      });
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
    ...mapActions(['setCustomAttributes', 'updateContact', 'deleteContact', 'deleteContactAttribute', 'postContact', 'setSelectedContact', 'setBroadcastRecipients']),
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
      } else {
          this.pageSize = newPageSize
      }
      // Reset current page to 1 when changing page size
      this.currentPage = 1;
    },
    saveEditContact(){
      console.log(this.selectedContact)
      this.updateContact(this.selectedContact)
    },
    save() {
      const selectedRecipients = this.selectedContacts.map(contactId => {
        return this.contacts.find(contact => contact.id === contactId);
      }).filter(contact => contact !== null);

      console.log(selectedRecipients);
      this.setBroadcastRecipients(selectedRecipients);
      // this.postContact(contact)
    },
    onRowSelected(items) {
      this.selected = items
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows()
      this.selectedContacts = this.filteredContacts.map(contactDetail => contactDetail.id);
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected()
      this.selectedContacts = []
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
          // console.log("@@@@@", headers[j])
          // if(contact[headers[j]] === "email"){
          //   console.log(values[j])
          // }
        }

        // Parse the attributes field back to an object
        if (contact.attributes) {
          console.log(contact.attributes)
          contact.attributes = JSON.parse(contact.attributes.replace(/\|/g, ','));
        }

        // Add contact to contacts array
        // console.log(contact)
        contacts.push(contact);
      }
      // console.log(contacts)
      return contacts;
    },

    importContacts(event) {
      const file = event.target.files[0]; // Get the uploaded file
      const reader = new FileReader();

      // Define a callback function to handle the file reading
      reader.onload = (e) => {
        const csvData = e.target.result; // Get the CSV data
        const contacts = this.parseCSV(csvData); // Parse the CSV data

        console.log(contacts)

        // Add the parsed contacts to filteredContacts reactively
        this.contacts.push(...contacts);
        // console.log(this.contacts);
      };

      // Read the uploaded file as text
      reader.readAsText(file);
    },
    markAlreadySelectedContacts() {
      console.log('Broadcast Recipients:', this.broadcastRecipients);
      console.log('Filtered Contacts:', this.filteredContacts);
      const selectedRecipients = this.broadcastRecipients.map(selectedContact => {
        return this.filteredContacts.find(contact => contact.id === selectedContact.id);
      });

      console.log('Selected Recipients:', selectedRecipients);
      this.selectedContacts = selectedRecipients.map(contact => contact.id);
      // console.log('Selected Contacts IDs:', this.selectedContacts);
    }
  },
  mounted() {
    console.log(this.broadcastRecipients)
    // this.fetchContacts()
    this.setCustomAttributes()
    this.markAlreadySelectedContacts()
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