<template>
    <div class="add-contact-form">
        <!-- Form for adding a new contact -->
        <form @submit.prevent="createContact" class="needs-validation" novalidate>
            <div class="row">
                <!-- Left column for picture selection -->
                <div class="col-md-4">
                    <div class="mb-3">
                    <label for="profilePic" class="form-label">Profile Picture:</label>
                    <!-- Use a label to wrap the input and customize the appearance of the file input -->
                    <label for="profilePic" class="custom-file-upload">
                        <input type="file" id="profilePic" accept="image/*" @change="previewImage" alt="preview" class="form-control preview-image">
                        Choose a file
                    </label>
                    </div>
                    <div class="mb-3">
                    <!-- <img :src="previewImageUrl" alt="Preview" class="img-thumbnail" v-if="previewImageUrl"> -->
                    <img :src="previewImageUrl" alt="Preview" class="img-thumbnail" v-if="previewImageUrl">
                    </div>
                </div>
                <!-- Right column for contact details -->
                <div class="col-md-8">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username:</label>
                        <input type="text" id="username" v-model="selectedContact.name" class="form-control" required>
                        <div class="invalid-feedback">Please provide a username.</div>
                    </div>
                    <div class="mb-3">
                        <label for="phoneNumber" class="form-label">Phone Number:</label>
                        <input type="tel" id="phoneNumber" v-model="selectedContact.phone" class="form-control" required>
                        <div class="invalid-feedback">Please provide a phone number.</div>
                    </div>
                    <!-- <button type="submit" class="btn btn-primary">Save</button> -->

                </div>
            </div>

            <!-- Other inputs section -->
            <div class="row">
                <div class="col-md-12">
                    <div class="other-inputs">
                        <!-- Checkbox inputs -->
                        <div class="form-check-group d-flex justify-content-left">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="smsCheckbox" v-model="selectedContact.sms">
                                <label class="form-check-label" for="smsCheckbox">Allow SMS</label>
                            </div>
                            <div class="form-check ml-4">
                                <input class="form-check-input" type="checkbox" id="broadcastCheckbox" v-model="selectedContact.broadcast">
                                <label class="form-check-label" for="broadcastCheckbox">Allow broadcast</label>
                            </div>
                        </div>

                        <div class="attributes-list">
                            <div v-for="(attribute, index) in selectedContact.attributes" :key="index" class="attribute-item">
                                <span v-if="attribute.value">{{ attribute.custom_attribute.name }}: {{ attribute.value }}</span>
                                <span v-else>{{ attribute.custom_attribute.name }}</span>
                                <b-icon v-b-modal.edit-attribute icon="pen" variant="dark" v-if="attribute.value && (attribute.custom_attribute.name !== 'name' && attribute.custom_attribute.name !== 'contact')" class="edit-icon ml-3" @click="editAttribute(attribute, index)"></b-icon>
                                <b-icon icon="trash" variant="dark" v-if="attribute.value && (attribute.custom_attribute.name !== 'name' && attribute.custom_attribute.name !== 'contact')" class="edit-icon ml-2" @click="removeAttribute(attribute.id)"></b-icon>
                                <!-- <b-icon-edit v-if="attribute.value && (attribute.key !== 'name' && attribute.key !== 'contact')" class="edit-icon" @click="removeAttribute(contactDetail, index)"></b-icon-edit> -->

                                
                            </div>
                        </div>

                        <!-- Attribute creation form -->
                        <div>
                            <b-icon v-b-modal.add-attribute icon="plus-lg" class="ml-2"></b-icon>
                        </div>
                    
                        <b-modal id="add-attribute" size="sm" title="Add attribute" ok-only>
                            <div class="form-group">
                                <label for="attributeKey">Name:</label>
                                <b-form-select id="attributeKey" v-model="newAttribute.custom_attribute_id" :options="customAttributes" value-field="id" text-field="name"></b-form-select>
                            </div>
                            <div class="form-group">
                                <label for="attributeValue">Value:</label>
                                <input type="text" id="attributeValue" v-model="newAttribute.value" class="form-control" placeholder="Enter attribute value">
                            </div>
                        
                            <template #modal-footer="{ cancel }">
                                <b-button size="sm" variant="danger" @click="cancel()">
                                    Cancel
                                </b-button>
                                <b-button size="sm" variant="success" @click="saveCreateAttribute()">
                                    Save
                                </b-button>
                            </template>
                        </b-modal>
                        
                        <!-- Attribute edit form -->
                        <b-modal id="edit-attribute" size="sm" title="Edit attribute">
                            <div class="form-group">
                                <!-- {{ selectedAttribute.custom_attribute['name'] }} -->
                                <label for="attributeKey">Name:</label>
                                <div v-if="selectedAttribute.custom_attribute">
                                    <b-form-select id="attributeKey" v-model="selectedAttribute.custom_attribute['id']" :options="customAttributes" value-field="id" text-field="name"></b-form-select>
                                </div>

                                <!-- <b-form-select id="attributeKey" v-model="selectedAttribute.name" :options="customAttributes"></b-form-select> -->
                            </div>
                            <div class="form-group">
                                <label for="attributeValue">Value:</label>
                                <input type="text" id="attributeValue" v-model="selectedAttribute.value" class="form-control" placeholder="Enter attribute value">
                            </div>
                        
                            <template #modal-footer="{ cancel }">
                                <b-button size="sm" variant="danger" @click="cancel()">
                                    Cancel
                                </b-button>
                                <b-button size="sm" variant="success" @click="saveEditAttribute()">
                                    Save
                                </b-button>
                            </template>
                        </b-modal>
                        
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapState(['contacts', 'selectedContact', 'customAttributes', 'selectedAttribute']),
        },
        data() {
            return {
                newContact: {
                    username: '',
                    phoneNumber: '',
                    profilePic: null,
                },
                previewImageUrl: '',
                newAttribute: {}
            };
        },
        methods: {
            ...mapActions(['deleteContactAttribute', 'updateContactAttribute', 'setSelectedAttribute', 'postContactAttribute']),

            createContact() {
                // Dispatch action to create contact
                this.$store.dispatch('createContact', this.newContact);
                // Clear form fields after submission
                this.clearForm();
            },
            clearForm() {
                // Reset all form fields to initial values
                this.newContact.username = '';
                this.newContact.phoneNumber = '';
                this.newContact.profilePic = null;
                this.previewImageUrl = '';
            },
            previewImage(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        console.log('File loaded successfully');
                        this.previewImageUrl = reader.result;
                    };
                    reader.onerror = (error) => {
                        console.error('Error reading file:', error);
                    };
                    reader.readAsDataURL(file);
                }
            },

            saveCreateAttribute(){
                console.log(this.newAttribute, this.selectedContact)

                const attribute = {
                    value: this.newAttribute.value,
                    custom_attribute_id: this.newAttribute.custom_attribute_id, 
                    contact_id: this.selectedContact.id
                }

                this.postContactAttribute(attribute)
            },

            saveEditAttribute(){
                const attribute = {
                    id: this.selectedAttribute.id,
                    value: this.selectedAttribute.value,
                    custom_attribute_id: document.getElementById('attributeKey').value, 
                    contact_id: this.selectedContact.id
                }
                console.log(attribute)
                // console.log(this.selectedAttribute)
                this.updateContactAttribute(attribute)
                this.$nextTick(() => {
                    this.$bvModal.hide('edit-attribute')
                })
            },
            
            editAttribute(attribute){
                this.setSelectedAttribute(attribute)
            },

            removeAttribute(id){
                this.deleteContactAttribute(id);
            }
        }
    };
</script>


  
<style scoped>
    .attributes-list {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px
    }

    .edit-icon{
        cursor: pointer;
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
    .img-thumbnail{
        width: 100px;
        height: 100px
    }
    .add-contact-form {
        margin-top: 20px;
        font-weight: 400 !important;
    }
    .input-field {
        margin-bottom: 20px;
    }
    /* Custom styling for file input */
    .custom-file-upload {
        border: 2px dashed #ccc;
        display: flex; /* Use flexbox */
        align-items: center; /* Center vertically */
        justify-content: center; /* Center horizontally */
        padding: 8px 12px;
        cursor: pointer;
        border-radius: 5px;
        background-color: #fff;
        width: 100%;
        height: 130px;
    }
    
    .custom-file-upload input[type="file"] {
        display: none;
    }
    
    .custom-file-upload:hover {
        background-color: #f0f0f0;
    }
  
</style>
  