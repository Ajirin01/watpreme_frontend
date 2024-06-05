<template>
    <div class="operators-table-container">
      <!-- Search input and Add New Operator button -->
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
        <button type="button" class="btn btn-primary add-operator-btn" style="height: 30px !important" v-b-modal.modal-addOperatorModal>
          <b-icon-person-plus-fill></b-icon-person-plus-fill> Add Operator
        </button>
        <!-- <button data-target="addOperatorModal" class="btn modal-trigger  waves-effect waves-light btn blue darken-4 add-operator-btn"><i class="material-icons left">person_add</i> Add Operator</button> -->
      
        
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
            <th><b>User</b></th>
            <th width="70"><b>Online Status</b></th>
            <th><b>Email/Phone</b></th>
            <!-- <th><b>Role</b></th> -->
            <th><b>Team</b></th>
            <th width="100"><b>Last Login IP</b></th>
            <th><b>Last Login Date</b></th>
            <th><b>Status</b></th>
            <th></th>
          </tr>
        </thead>
        <!-- Table body -->
        <tbody>
          <tr v-for="(operator, index) in paginatedOperators" :key="index">
            <!-- Table row data -->
            <td>
              <label>
                <input type="checkbox" class="" v-model="selectedOperators" :value="operator.id" />
                <span></span>
              </label>
            </td>
            <td>
                <div class="user-info">
                    <div class="avatar">
                      <img class="circle" src="https://materializecss.com/images/yuna.jpg" alt="">
                    </div>
                    <div class="details">
                      <span class="username grey-text text-darken-3"><b>{{ operator.user.name }}</b></span>
                    </div>
                </div>
            </td>
            <td>{{ operator.onlineStatus ? operator.onlineStatus : '-' }}</td>
            <td>{{ operator.user.email }} / {{ operator.user.phone }}</td>
            <!-- <td>{{ operator.role }}</td> -->
            <td>{{ operator.team.name }}</td>
            <td>{{ operator.lastLoginIP ? operator.lastLoginIP : '-' }}</td>
            <td>{{ operator.lastLoginDate ? operator.lastLoginDate : '-' }}</td>
            <td>{{ operator.status }}</td>
            <td>
              <!-- Dropdown trigger -->
              <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
                <template #button-content>
                  <b-icon icon="three-dots-vertical"></b-icon>
                </template>
                <b-dropdown-item class="modal-trigger" v-b-modal.modal-editOperatorModal @click="setSelectedOperator(operator)">Edit</b-dropdown-item>
                <b-dropdown-item @click="deleteOperator(operator.id)">Delete</b-dropdown-item>
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
        <b-modal id="modal-addOperatorModal" scrollable size="lg" title="Add Operator">
          <AddOperatorForm ref="addOperator"/>

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

      <!--Edit Operator Modal Structure -->
      <div>
        <b-modal id="modal-editOperatorModal" scrollable size="lg" title="Edit Operator">
          <EditOperatorForm ref="updateOperator"/>

          <template #modal-footer="{cancel}">
            <b-button size="sm" variant="danger" @click="cancel()">
              Cancel
            </b-button>
            <b-button size="sm" variant="success" @click="update()">
              save <b-icon icon="check"></b-icon>
            </b-button>
          </template>
        </b-modal>
      </div>
    </div>
</template>
  
  
<script>
  //import Paginator from '@/assets/Paginator.js';
  import AddOperatorForm from '@/components/ui/modals/AddOperator.vue'
  import EditOperatorForm from '@/components/ui/modals/EditOperator.vue'

  import { mapActions, mapState } from 'vuex';
  
  export default {
    data() {
      return {
        size: 1,
        searchQuery: '', // Search query
        selectedOperators: [], // Array to store selected operators
        selectAll: false, // Flag to track if all checkboxes are selected
        currentPage: 1, // Current page number
        pageSize: 5, // Number of items per page
      };
    },
    computed: {
      ...mapState(['operators']),
      // Filtered operators based on search query
      filteredOperators() {
        return this.operators.filter(operator =>
          operator.user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          operator.emailPhone.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
      // Total number of pages based on the number of items and page size
      totalPages() {
        return Math.ceil(this.filteredOperators.length / this.pageSize);
      },
      // Paginated operators based on the current page and page size
      paginatedOperators() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.filteredOperators.slice(startIndex, endIndex);
      }
    },
    methods: {
      ...mapActions(['fetchOperators', 'setSelectedOperator', 'deleteOperator']),

      save(){
        this.$refs.addOperator.addOperator()
      },
      update(){
        this.$refs.updateOperator.handleUpdateOperator()
      },
      addOperator() {
        // Implement logic to add new operator
      },
      toggleSelectAll() {
        // Toggle selection of all checkboxes
        if (this.selectAll) {
          this.selectedOperators = this.filteredOperators.map(operator => operator.id);
        } else {
          this.selectedOperators = [];
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
        this.fetchOperators()
    },
    components:{
        AddOperatorForm,
        EditOperatorForm
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
  .add-operator-btn {
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
  .operators-table-container {
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
  