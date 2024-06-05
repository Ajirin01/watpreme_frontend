<template>
  <div class="broadcasts-table-container">
    <!-- Search input and Add New Broadcast button -->
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
        <button type="button" class="btn btn-primary add-broadcast-btn" v-b-modal.modal-addBroadcastModal>
          <b-icon-envelope-fill></b-icon-envelope-fill> CREATE <span class="table-name">BROADCAST</span>
        </button>

        <div class="ml-2">
          <b-button variant="outline-success" class="icon-button ml-2" @click="exportBroadcasts">
            <b-icon icon="download" variant="success"></b-icon>
          </b-button>
          <b-button variant="outline-success" class="icon-button ml-2" @click="openFileInput">
            <b-icon icon="upload" variant="success"></b-icon>
          </b-button>
          <!-- Hidden file input -->
          <input type="file" ref="fileInput" style="display: none" @change="importBroadcasts">
        </div>
      </div>
    </div>

    <div>
      <b-table striped hover :items="paginatedBroadcasts" :fields="fields" responsive>
        <!-- Checkbox column -->
        <template #cell(check)="data">
          <input type="checkbox" v-model="selectedBroadcasts" :value="data.item.id" />
        </template>

        <!-- Broadcast Name column -->
        <template #cell(broadcast-name)="data">
          {{ data.item.name }}
        </template>

        <!-- Channel column -->
        <template #cell(channel)="data">
          {{ data.item.channel }}
        </template>

        <!-- Recipients column -->
        <template #cell(recipients)="data">
          <div class="recipient-container">
              <div class="recipient1"></div>
              <div class="recipient2"></div>
              <div class="recipient3">{{ data.item.recipients.length }}</div>
          </div>
          
          
        </template>

        <!-- Status column -->
        <template #cell(status)="data">
          {{ data.item.status }}
        </template>

        <!-- Sent Date column -->
        <template #cell(sent-date)="data">
          {{ data.item.sent_date }}
        </template>

        <!-- Dropdown column -->
        <template #cell(dropdown)="data">
          <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
            <template #button-content>
              <b-icon icon="three-dots-vertical"></b-icon>
            </template>
            <b-dropdown-item v-b-modal.modal-editBroadcastModal @click="handleSetSelectedBroadcast(data.item)">
              Edit
            </b-dropdown-item>
            <b-dropdown-item @click="handleDeleteBroadcast(data.item.id)">
              Delete
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
    </div>

    <!-- Pagination buttons and info -->
    <div class="pagination-container">
      <span class="grey-text" style="margin-top: 20px">Page {{ currentPage }} of {{ totalPages }}</span>
      <input type="number" min="5" @change="updatePageSize" style="width: 50px; height: 30px; margin-top: 10px">
      <button class="paginate-buttons" @click="previousPage" :disabled="currentPage === 1">Prev</button>
      <button v-for="page in totalPages" :key="page" class="paginate-buttons" :class="{ 'active-page': page === currentPage }" @click="goToPage(page)">{{ page }}</button>
      <button class="paginate-buttons" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>

    <!-- Add Broadcast Modal Structure -->
    <b-modal id="modal-addBroadcastModal" title="Add Broadcast" size="lg">
      <AddBroadcastForm ref="addBroadcastForm" @broadcast-saved="handleBroadcastSaved" />

      <template #modal-footer="{cancel}">
        <b-button size="sm" variant="danger" @click="cancel()">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="saveBroadcast">
          Save
        </b-button>
      </template>
    </b-modal>

    <!-- Edit Broadcast Modal Structure -->
    <b-modal id="modal-editBroadcastModal" title="Edit Broadcast">
      <EditBroadcastForm ref="editBroadcastForm" :broadcast="selectedBroadcast" @broadcast-updated="handleBroadcastUpdated" />

      <template #modal-footer="{cancel}">
        <b-button size="sm" variant="danger" @click="cancel()">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="saveEditBroadcast">
          Save
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import AddBroadcastForm from '@/components/ui/modals/AddBroadcast.vue';
import EditBroadcastForm from '@/components/ui/modals/EditBroadcast.vue';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      fields: [
        { key: 'check', label: '' }, // Checkbox column
        { key: 'broadcast-name', label: 'Broadcast Name', sortable: true }, // Broadcast Name column
        { key: 'channel', label: 'Channel', sortable: true }, // Channel column
        { key: 'recipients', label: 'Recipients', sortable: true }, // Recipients column
        { key: 'status', label: 'Status', sortable: true }, // Status column
        { key: 'sent-date', label: 'Sent Date', sortable: true }, // Sent Date column
        { key: 'dropdown', label: '' } // Dropdown column
      ],
      searchQuery: '', // Search query
      selectedBroadcasts: [], // Array to store selected broadcasts
      currentPage: 1, // Current page number
      pageSize: 5, // Number of items per page
    };
  },
  computed: {
    ...mapState(['broadcasts', 'selectedBroadcast']),
    // Filtered broadcasts based on search query
    filteredBroadcasts() {
      return this.broadcasts.filter(broadcast =>
        (broadcast.name && broadcast.name.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (broadcast.channel && broadcast.channel.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    },
    // Total number of pages based on the number of items and page size
    totalPages() {
      return Math.ceil(this.filteredBroadcasts.length / this.pageSize);
    },
    // Paginated broadcasts based on the current page and page size
    paginatedBroadcasts() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredBroadcasts.slice(startIndex, endIndex);
    }
  },
  methods: {
    ...mapActions(['setBroadcasts', 'setSelectedBroadcast', 'postBroadcast', 'updateBroadcast', 'deleteBroadcast']),
    handleSetSelectedBroadcast(broadcast) {
      this.setSelectedBroadcast(broadcast);
    },
    handleDeleteBroadcast(id) {
      this.deleteBroadcast(id);
    },
    toggleSelectAll() {
      // Toggle selection of all checkboxes
      if (this.selectAll) {
        this.selectedBroadcasts = this.filteredBroadcasts.map(broadcast => broadcast.id);
      } else {
        this.selectedBroadcasts = [];
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
    updatePageSize(event) {
      let newPageSize = event.target.value;
      if (newPageSize === null || typeof newPageSize === 'undefined') {
        newPageSize = 5;
      } else if (newPageSize < 1) {
        newPageSize = 1;
      } else {
        this.pageSize = newPageSize;
      }
      this.currentPage = 1;
    },
    saveBroadcast() {
      this.$refs.addBroadcastForm.saveBroadcast()
        .then(() => {
          this.$bvModal.hide('modal-addBroadcastModal');
        })
        .catch(error => {
          console.error('Error saving broadcast:', error);
        });
    },
    saveEditBroadcast() {
      this.$refs.editBroadcastForm.saveBroadcast()
        .then(() => {
          this.$bvModal.hide('modal-editBroadcastModal');
        })
        .catch(error => {
          console.error('Error saving broadcast:', error);
        });
    },
    handleBroadcastSaved() {
      this.setBroadcasts();
    },
    handleBroadcastUpdated() {
      this.setBroadcasts();
    },
    exportBroadcasts() {
      // Implement the logic to export broadcasts
    },
    importBroadcasts(event) {
      const file = event.target.files[0];
      if (file) {
        // Implement the logic to import broadcasts from the selected file
      }
    },
    openFileInput() {
      this.$refs.fileInput.click();
    }
  },
  mounted() {
    this.setBroadcasts();
  },
  components: {
      AddBroadcastForm,
      EditBroadcastForm
  }
};
</script>

<style scoped>
.recipient-container{
  display: inline-flex
}
.recipient1{
  width: 30px;
  height: 30px;
  border-radius: 50px;
  background-color: rgb(228, 212, 212);
}
.recipient2{
  width: 30px;
  height: 30px;
  border-radius: 50px;
  background-color: red;
  transform: translateX(-17px);
  border-left: 2px rgb(246, 244, 241) solid

}
.recipient3{
  min-width: 50px;
  height: 30px;
  border-radius: 50px;
  background-color: rgb(14, 1, 1);
  color: white ;
  transform: translateX(-35px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-left: 2px rgb(228, 218, 198) solid
}

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
.broadcasts-table-container {
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
