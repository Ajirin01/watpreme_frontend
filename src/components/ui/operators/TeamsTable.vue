<template>
  <div class="teams-table-container">
    <!-- Search input and Add New Team button -->
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

      <!-- Modal Trigger -->
      <button type="button" class="btn btn-primary add-team-btn" style="height: 30px !important" v-b-modal.modal-addTeamModal>
        <b-icon-person-plus-fill></b-icon-person-plus-fill> Add Team
      </button>
      <!-- <button data-target="addTeamModal" class="btn modal-trigger  waves-effect waves-light btn blue darken-4 add-team-btn"><i class="material-icons left">person_add</i> Add Team</button> -->
    
      <!-- Modal Structure -->
      <!-- <div id="addTeamModal" class="modal">
          <div class="modal-content">
              <h5>Add Team</h5>
              <AddTeamForm />
          </div>
          <div class="modal-footer">
              <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
          </div>
      </div> -->
    </div>

    <!-- Table -->
    <table class="table table-hover">
      <!-- Table headers -->
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="" v-model="selectAll" @change="toggleSelectAll" />
              <span></span>
            </label>
          </th>
          <th>Team Name</th>
          <th>Default Team</th>
          <th>Team Size</th>
          <th>Actions</th>
        </tr>
      </thead>
      <!-- Table body -->
      <tbody>
        <tr v-for="(team, index) in paginatedTeams" :key="index">
          <!-- Table row data -->
          <td>
            <label>
              <input type="checkbox" class="" v-model="selectedTeams" :value="team.id" />
              <span></span>
            </label>
          </td>
          <td>{{ team.name }}</td>
          <td>{{ team.default }}</td>
          <td>{{ team.size }}</td>
          <!-- <td>{{ team.team }}</td> -->
          <td>
            <!-- Dropdown trigger -->
            <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
              <template #button-content>
                <b-icon icon="three-dots-vertical"></b-icon>
              </template>
              <b-dropdown-item class="modal-trigger" v-b-modal.modal-editTeamModal @click="setSelectedTeam(team)">Edit</b-dropdown-item>
              <b-dropdown-item @click="deleteTeam(team.id)" >Delete</b-dropdown-item>
            </b-dropdown>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination buttons and info -->
    <div class="pagination-container">
      <span class="grey-text" style="margin-top: 20px">Page {{ currentPage }} of {{ totalPages }}</span>
      <input type="number" min="5" @change="updatePageSize()" style="width: 50px; height: 30px; margin-top: 10px">
      <button class="paginate-buttons" @click="previousPage" :disabled="currentPage === 1">Prev</button>
      <button v-for="page in totalPages" :key="page" class="paginate-buttons" :class="{ 'active-page': page === currentPage }" @click="goToPage(page)">{{ page }}</button>
      <button class="paginate-buttons" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>

    <div>
      <b-modal id="modal-addTeamModal" scrollable size="lg" title="Add Team">
        <AddTeamForm ref="addTeam"/>

        <template #modal-footer="{cancel}">
          <b-button size="sm" variant="danger" @click="cancel()">
            Cancel
          </b-button>
          <b-button size="sm" variant="success" @click="save()">
              save <b-icon icon="check"></b-icon>
          </b-button>
        </template>
      </b-modal>
    </div>

    <!--Edit Team Modal Structure -->
    <div>
      <b-modal id="modal-editTeamModal" scrollable size="lg" title="Edit Team">
        <EditTeamForm/>

        <template #modal-footer="{cancel}">
          <b-button size="sm" variant="danger" @click="cancel()">
            Cancel
          </b-button>
        </template>
      </b-modal>
    </div>
  </div>
</template>


<script>
//import Paginator from '@/assets/Paginator.js';
import AddTeamForm from '@/components/ui/modals/AddTeam.vue'
import EditTeamForm from '@/components/ui/modals/EditTeam.vue'

import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      size: 1,
      searchQuery: '', // Search query
      selectedTeams: [], // Array to store selected teams
      selectAll: false, // Flag to track if all checkboxes are selected
      currentPage: 1, // Current page number
      pageSize: 5, // Number of items per page
    };
  },
  computed: {
    ...mapState(['teams']),
    // Filtered teams based on search query
    filteredTeams() {
      return this.teams.filter(team =>
        team.name.toLowerCase().includes(this.searchQuery.toLowerCase()) 
        // ||
        // team.emailPhone.toLowerCase().includes(this.searchQuery.toLowerCase
      );
    },
    // Total number of pages based on the number of items and page size
    totalPages() {
      return Math.ceil(this.filteredTeams.length / this.pageSize);
    },
    // Paginated teams based on the current page and page size
    paginatedTeams() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredTeams.slice(startIndex, endIndex);
    }
  },
  methods: {
    ...mapActions(['postTeam', 'setSelectedTeam', 'fetchTeams', 'deleteTeam']),
    save(){
      this.$refs.addTeam.handleAddTeam()
    },
    addTeam() {
      // Implement logic to add new team
    },
    toggleSelectAll() {
      // Toggle selection of all checkboxes
      if (this.selectAll) {
        this.selectedTeams = this.filteredTeams.map(team => team.id);
      } else {
        this.selectedTeams = [];
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
    }

  },
  mounted() {
    this.fetchTeams()
  },
  components:{
      AddTeamForm,
      EditTeamForm
  }
};
</script>


<style scoped>
td{
  margin: auto;
}
.input-field{
  width: 200px;
}
.circle{
  border-radius: 50%;
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
.add-team-btn {
  font-size: .7rem;
  border-radius: 8px !important;
}
/* Add custom styles as needed */
.search-and-add {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.search-input {
  margin-top: 0px;
}
.teams-table-container {
  font-size: .8rem;
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
