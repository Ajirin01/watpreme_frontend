<template>
    <div class="broadcast-container">
      <div class="row">
        <!-- Column for the broadcast links -->
        <div class="col-md-3">
            <div class="links">
                <b-card-header header-tag="nav">
                    <b-nav card-header tabs style="margin-bottom: 10px;">
                      <b-nav-item to="/broadcast" exact exact-active-class="active"><b-icon icon="broadcast"></b-icon> Template Messages </b-nav-item>
                      <b-nav-item to="/broadcast-history" exact exact-active-class="active"> <b-icon icon="grid-fill"></b-icon>Broadcast History</b-nav-item>
                    </b-nav>
                </b-card-header>
            </div>
        </div>
        
        <!-- Column for the template table -->
        <div class="col-md-9">
            <div class="table-area">
                <div class="broadcast-btn-area">
                    <div class="add-broadcast">
                        <div class="container">
                            <div v-b-modal.create-template class="btn add-template-btn"><b-icon icon="plus"></b-icon> New Template Message</div>
                            
                            <b-modal id="create-template" size="lg" scrollable title="Create Template Message">
                                <CreateTemplateMessageForm ref="createTemplateModal" />

                                <template #modal-footer="{ cancel }">
                                    <b-button size="sm" variant="danger" @click="cancel()">
                                      Cancel
                                    </b-button>
                                    <!-- Button with custom close trigger value -->
                                    <b-button size="sm" variant="success" @click="saveTemplate()">
                                      save <b-icon icon="check" class="pt-1"></b-icon>
                                    </b-button>
                                </template>
                            </b-modal>
                        </div>
                    </div>
                </div>

                <div class="divider"></div>

                <div class="table-content">
                    <div class="search-area d-flex justify-content-between">
                        <!-- Search Input Field -->
                        <div class="input-field search-input col-md-3">
                            <b-input-group size="sm" class="mb-2">
                                <b-input-group-prepend is-text>
                                    <b-icon icon="search"></b-icon> <!-- Bootstrap Vue icon for search -->
                                </b-input-group-prepend>
                                <b-form-input type="search" v-model="searchQuery" placeholder="Search terms"></b-form-input>
                            </b-input-group>
                        </div>
                
                        <!-- Filter Section -->
                        <div class="filter col-md-9 d-flex justify-content-end">
                            <div style="margin-top: -8px">
                                <b-dropdown id="dropdown-form" dropleft text="Sorted by:" ref="dropdown" class="m-2">
                                <b-dropdown-form>
                                    <b-form-checkbox class="mb-3">Created at</b-form-checkbox>
                                    <b-dropdown-divider></b-dropdown-divider>

                                    <b-form-checkbox class="mb-3">Sent</b-form-checkbox>
                                    <b-dropdown-divider></b-dropdown-divider>

                                    <b-button variant="primary" size="sm" @click="onClick">Submit</b-button>
                                </b-dropdown-form>
                                
                                </b-dropdown>
                            </div>

                            <div class="refresh-area">
                                <div class="btn btn-secondary" @click="refreshData">Sync Templates</div>
                            </div>
                        </div>
                    </div>

                    <div class="whatsapp-template-policy">
                        <div class="container">
                            <span class="policy">All templates must adhere to WhatsaaApp's Template message Guidelines. <a href="">Click here to read.</a></span>
                        </div>
                    </div>

                    <div class="message-template-table">
                        <!-- Table -->
                        <table class="table table-hover">
                            <!-- Table headers -->
                            <thead>
                                <tr>
                                    <th>TEMPLATE NAME</th>
                                    <th>CATEGORY</th>
                                    <th width="70">STATUS</th>
                                    <th>LANGUAGE</th>
                                    <th>LAST UPDATED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <!-- Table body -->
                            <tbody>
                            <tr v-for="(template, index) in paginatedTemplates" :key="index">
                                <!-- Table row data -->
                                <td>{{ template.name }}</td>
                                <td>{{ template.category }}</td>
                                <td>{{ template.status }}</td>
                                <td>{{ template.language.language }}</td>
                                <td>{{ humanReadableDate(template.updated_at) }}</td>
                                <td>
                                    <b-button-toolbar>
                                        <b-button-group class="mr-1">
                                            <b-button title="view template" @click="viewTemplate(template)" v-b-modal.view-template>
                                                <b-icon icon="eye" aria-hidden="true"></b-icon>
                                            </b-button>
                                            <b-button title="upload template"
                                                    @click="uploadTemplate(template.id)"
                                                    :class="{'border-danger': !template.uploaded, 'border-success': template.uploaded}">
                                                <b-icon icon="cloud-upload" aria-hidden="true"></b-icon>
                                            </b-button>
                                            <!-- <b-button title="file" @click="openFile">
                                                <b-icon icon="file-earmark-text" aria-hidden="true"></b-icon>
                                            </b-button> -->
                                            <b-button title="delete" @click="deleteTemplate(template.id)">
                                                <b-icon icon="trash" aria-hidden="true"></b-icon>
                                            </b-button>
                                        </b-button-group>
                                    </b-button-toolbar>
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
                    </div>
                </div>
                            
                <b-modal id="view-template" size="md" scrollable title="Template Preview">
                    <ViewTemplateForm/>

                    <template #modal-footer="{ ok }">
                        <b-button size="sm" variant="warning" v-b-modal.edit-template>
                            Edit
                        </b-button>
                        <b-button size="sm" variant="success" @click="ok()">
                            OK
                        </b-button>
                    </template>
                </b-modal>

                <b-modal id="edit-template" size="lg" scrollable title="Edit Template">
                    <EditTemplateMessageForm ref="editTemplateModal"/>

                    <template #modal-footer>
                        <b-button size="sm" variant="success" @click="saveEdit()">
                            Save
                        </b-button>
                    </template>
                </b-modal>

            </div>
        </div>
      </div>
    </div>
</template>
  
<script>
    import { mapState, mapActions } from 'vuex';
    import CreateTemplateMessageForm from '@/components/ui/modals/CreateTemplateMessage.vue'
    import EditTemplateMessageForm from '@/components/ui/modals/EditTemplateMessage.vue'
    import ViewTemplateForm from '@/components/ui/modals/ViewTemplate.vue'



    import moment from 'moment';

    export default {
      props: {},
      data() {
        return {
            size: 1,
            searchQuery: '', // Search query
            currentPage: 1, // Current page number
            pageSize: 5, // Number of items per page
        }
      },
      methods: {
        ...mapActions(['setMessageTemplates', 'uploadTemplateToWhatsApp', 'syncTemplates', 'setSelectedTemplate']),

        humanReadableDate(time) {
            // Format the timestamp using moment.js or day.js
            return moment(time).fromNow(); // or dayjs(this.template.updated_at).fromNow();
        },

        onClick(){
            console.log("hello")
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
        saveTemplate(){
            this.$refs.createTemplateModal.saveTemplate()
        },
        viewTemplate(template) {
            // Add logic to view the template
            this.setSelectedTemplate(template)
            console.log("View Template", this.selectedTemplate)
        },
        uploadTemplate(id){
            this.uploadTemplateToWhatsApp(id)
        },
        openFile() {
            // Add logic to open the file
        },
        deleteTemplate(templateId) {
            // Placeholder logic (remove this when implementing the actual deletion)
            console.log('Deleting template with ID:', templateId);

            // const newMessageTemplates = this.messageTemplates.filter(template => template.id !== templateId)

            // this.setMessageTemplates(newMessageTemplates)

            // console.log('Templates after deletion', this.messageTemplates)
        },
        refreshData(){
            console.log("Refresh Data")
            this.syncTemplates()
        },
        saveEdit(){
            this.$refs.editTemplateModal.saveEdit()
            console.log(this.newTemplate)
        }

      },
      mounted(){
        this.setMessageTemplates()
      },
      computed: {
        ...mapState(['messageTemplates', 'selectedTemplate']),

        // Filtered messageTemplates based on search query
        filteredOperators() {
            return this.messageTemplates.filter(template =>
            template.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            template.category.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        // Total number of pages based on the number of items and page size
        totalPages() {
            return Math.ceil(this.filteredOperators.length / this.pageSize);
        },
        // Paginated messageTemplates based on the current page and page size
        paginatedTemplates() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.filteredOperators.slice(startIndex, endIndex);
        }
      },
      components:{
        CreateTemplateMessageForm,
        ViewTemplateForm,
        EditTemplateMessageForm
      }
    }
</script>
  
  
<style scoped>
    /* Red border class */
    .border-danger {
        background-color: #3d7bb5; /* Red color */
    }

    /* Green border class */
    .border-success {
        background-color: #28a745; /* Green color */
    }
    .broadcast-container{
        margin-bottom: 40px;
    }
    .whatsapp-template-policy{
        margin-bottom: 20px
    }
    .policy{
        background-color: #d4edda;
        padding: 10px
    }
    .divider{
        width: 100%;
        height: 2px;
        background-color: rgba(128, 128, 128, 0.454);
        margin-bottom: 10px;
        margin-top: 10px
    }
    .broadcast-btn-area{
        padding-top: 15px;
        transition: .2s ease-in-out;
    }
    .add-template-btn{
        border: gray 1.5px solid
    }
    .add-template-btn:hover{
        background-color: rgba(128, 128, 128, 0.071);
    }
    .links{
        background-color: white;
        border-radius: 5px
    }

    .table-area{
        background-color: white;
        border-radius: 5px;
        padding-bottom: 30px;
    }

    .table-content{
        padding-left: 10px;
        padding-right: 10px
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
  