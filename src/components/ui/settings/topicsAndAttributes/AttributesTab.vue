<template>
    <div class="attributes-table-container">
      <!-- Search input and Add New Attribute(s) button -->
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
            <button type="button" class="btn btn-primary add-attributeDetail-btn" style="height: 30px !important" v-b-modal.modal-addAttributeModal>
                <b-icon-person-plus-fill></b-icon-person-plus-fill> ADD ATTRIBUTE
            </button>
        </div>
      </div>
  
      <div class="attributes-list">
        <div
          v-for="(attribute, index) in paginatedAttributes"
          :key="index"
          class="attribute-item"
        >
          {{ attribute.name }}
          <b-icon
            v-b-modal.modal-editAttributeModal
            icon="pen"
            variant="dark"
            class="edit-icon ml-1"
            @click="handleSetSelectedAttribute(attribute)"
          ></b-icon>
          <b-icon
            icon="trash"
            variant="dark"
            class="edit-icon ml-2"
            @click="handleDeleteAttribute(attribute.id)"
          ></b-icon>
        </div>
      </div>
  
      <!-- Pagination buttons and info -->
      <div class="pagination-container">
        <span class="grey-text" style="margin-top: 20px">Page {{ currentPage }} of {{ totalPages }}</span>
        <input type="number" min="5" @change="updatePageSize()" style="width: 50px; height: 30px; margin-top: 10px">
        <button class="paginate-buttons" @click="previousPage" :disabled="currentPage === 1">Prev</button>
        <button v-for="page in totalPages" :key="page" class="paginate-buttons" :class="{ 'active-page': page === currentPage }" @click="goToPage(page)">{{ page }}</button>
        <button class="paginate-buttons" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
  
      <!--Add Attribute(s) Modal Structure -->
      <b-modal id="modal-addAttributeModal" title="Add Attribute">
        <AddAttributeForm ref="addAttributeForm" @attribute-saved="handleAttributeSaved" />
  
        <template #modal-footer="{cancel}">
            <b-button size="sm" variant="danger" @click="cancel()">
              Cancel
            </b-button>
            <b-button size="sm" variant="success" @click="save()">
              save
            </b-button>
        </template>
      </b-modal>
  
      <!--Edit Attribute(s) Modal Structure -->
      <b-modal id="modal-editAttributeModal" title="Edit Attribute">
        <EditAttributeForm/>
  
        <template #modal-footer="{cancel}">
          <b-button size="sm" variant="danger" @click="cancel()">
            Cancel
          </b-button>
          <b-button size="sm" variant="success" @click="saveEditAttribute()">
            save
          </b-button>
      </template>
      </b-modal>
    </div>
  </template>
  
  <script>
  //import Paginator from '@/assets/Paginator.js';
  import AddAttributeForm from '@/components/ui/modals/AddAttribute.vue'
  import EditAttributeForm from '@/components/ui/modals/EditAttribute.vue'
  import { mapActions, mapState } from 'vuex';
  
  export default {
    data() {
      return {
        size: 1,
        searchQuery: '', // Search query
        selectedAttributes: [], // Array to store selected attributes
        selectAll: false, // Flag to track if all checkboxes are selected
        currentPage: 1, // Current page number
        pageSize: 10, // Number of items per page
      };
    },
    computed: {
        ...mapState(['customAttributes', 'selectedAttribute']),
        // Filtered attributes based on search query
        filteredAttributes() {
            return this.customAttributes.filter(attributeDetail =>
                (attributeDetail && attributeDetail.name && attributeDetail.name.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
                (attributeDetail.phone && attributeDetail.phone.toLowerCase().includes(this.searchQuery.toLowerCase()))
            );
        },
        // Total number of pages based on the number of items and page size
        totalPages() {
            return Math.ceil(this.filteredAttributes.length / this.pageSize);
        },
        // Paginated attributes based on the current page and page size
        paginatedAttributes() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.filteredAttributes.slice(startIndex, endIndex);
        }
    },
    methods: {
        ...mapActions(['setCustomAttributes', 'updateAttribute', 'deleteAttribute', 'deleteCustomAttribute', 'setSelectedAttribute']),
        isTruthy(value) {
            // Convert the value to a boolean and return it
            return Boolean(Number(value));
        },
        handleSetSelectedAttribute(attribute){
            this.setSelectedAttribute(attribute)
            console.log(this.selectedAttribute)
        },
        handleDeleteAttribute(id) {
            this.deleteCustomAttribute(id)
        },
        toggleSelectAll() {
            // Toggle selection of all checkboxes
            if (this.selectAll) {
            this.selectedAttributes = this.filteredAttributes.map(attributeDetail => attributeDetail.id);
            } else {
            this.selectedAttributes = [];
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
        removeAttribute(attributeDetail, id) {
          this.setSelectedAttribute(attributeDetail)
          // console.log(this.selectedAttribute, id)
          this.deleteAttributeAttribute(id)
        },
        saveEditAttribute(){
            console.log(this.selectedAttribute)
            this.updateAttribute(this.selectedAttribute)
        },
        save() {
            // Trigger save action of AddAttributeForm component
            this.$refs.addAttributeForm.saveCreateAttribute()
        },
        handleAttributeSaved() {
            // Handle save action completion here (e.g., close the modal)
            this.$bvModal.hide('modal-addAttributeModal'); // Close the modal
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
  
            // Initialize attributes array
            const attributes = [];
  
            // Parse each row
            for (let i = 1; i < rows.length; i++) {
                const values = rows[i].split(",");
                const attribute = {};
  
                // Assign values to corresponding headers
                for (let j = 0; j < headers.length; j++) {
                    attribute[headers[j]] = values[j];
                }
  
                // Parse the attributes field back to an object
                if (attribute.attributes) {
                  console.log(attribute.attributes)
                  attribute.attributes = JSON.parse(attribute.attributes.replace(/\|/g, ','));
                    // attribute.attributes = JSON.parse(attribute.attributes);
                }
  
                // Add attribute to attributes array
                attributes.push(attribute);
            }
  
            return attributes;
        },
  
        exportAttributes() {
            // Define the headers
            const headers = Object.keys(this.customAttributes[0]);
  
            // Convert attributes data to CSV format
            const csvContent = `${headers.join(",")}\n${this.customAttributes.map(attribute => {
                // Stringify the attribute field with a different delimiter
                const stringifiedAttribute = { ...attribute };
                stringifiedAttribute.attributes = JSON.stringify(attribute.attributes).replace(/,/g, '|');
  
                // Join values with commas
                return Object.values(stringifiedAttribute).join(",");
            }).join("\n")}`;
  
            // Create a Blob object with the CSV content
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  
            // Create a download link
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.setAttribute("download", "attributes.csv");
  
            // Simulate a click to trigger the download
            document.body.appendChild(link);
            link.click();
  
            // Cleanup
            document.body.removeChild(link);
        },
  
        importAttributes(event) {
            const file = event.target.files[0]; // Get the uploaded file
            const reader = new FileReader();
  
            // Define a callback function to handle the file reading
            reader.onload = (e) => {
                const csvData = e.target.result; // Get the CSV data
                const attributes = this.parseCSV(csvData); // Parse the CSV data
  
                // Do something with the parsed attributes data (e.g., save it to Vuex store)
                console.log(attributes);
                this.postAttribute(attributes)
            };
  
            // Read the uploaded file as text
            reader.readAsText(file);
        },
    },
    mounted() {
        // this.fetchAttributes()
        this.setCustomAttributes()
    },
    components:{
        AddAttributeForm,
        EditAttributeForm
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
    transition: 2s ease-in-out;
  }
  
  .delete-icon {
    cursor: pointer;
    margin-left: 5px;
    border-radius: 5px;
  }
  
  .delete-icon:hover {
    background-color: red;
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
  .add-attributeDetail-btn {
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
  .attributes-table-container {
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
  
  /* Initially hide the edit and delete icons */
  /* Initially hide the edit and delete icons */
  .edit-icon {
    transition: opacity 0.3s ease;
    opacity: 0;
  }
  
  /* Reveal edit and delete icons when hovering over the attribute item */
  .attribute-item:hover .edit-icon {
    display: inline-block;
    opacity: 1;
    cursor: pointer;
  }
  
  .edit-icon:hover {
    transition: opacity 0.3s ease;
    opacity: 0;
  }
  </style>
  