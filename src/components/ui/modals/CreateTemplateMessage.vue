<template>
    <div class="add-message-template">
        <!-- Form for adding a new message template -->
        <form class="needs-validation" novalidate>
            <!-- Row for template name and category -->
            <div class="row">
                <!-- Left column for template name -->
                <div class="col-md-6 mb-3">
                    <label for="name" class="form-label">Template Name:</label>
                    <input type="text" id="name" v-model="newTemplate.name" class="form-control" required>
                    <div class="invalid-feedback" v-if="newTemplate.name.$error">Please provide a template name.</div>
                </div>
                <!-- Right column for category -->
                <div class="col-md-6 mb-3">
                    <label for="category" class="form-label">Category:</label>
                    <select id="category" v-model="newTemplate.category" class="form-select form-control" required>
                        <option value="" disabled>Select a category</option>
                        <option value="UTILITY">Utitity</option>
                        <option value="MARKETING">Marketing</option>
                        <option value="AUTHENTICATION">Authentication</option>
                    </select>
                    <div class="invalid-feedback" v-if="newTemplate.category.$error">Please select a category.</div>
                </div>
            </div>
            <!-- Row for language and header -->
            <div class="row">
                <!-- Left column for language -->
                <div class="col-md-12 mb-2">
                    <label for="language" class="form-label">Language:</label>
                    <select id="language" v-model="newTemplate.language" class="form-select form-control" required>
                      <option value="" disabled>Select language</option>
                      <!-- Iterate over the loadedLanguages to generate options -->
                      <option v-for="(lang, index) in loadedLanguages" :value="lang" :key="index">{{ lang.language }}</option>
                      <!-- Add more options as needed -->
                    </select>
                    <div class="invalid-feedback" v-if="!newTemplate.language">Please select a language.</div>
                </div>
                
                <!-- Right column for header and conditional inputs -->
                <div class="col-md-12 mb-3">
                    <div style="width: 250px">
                        <label for="header" class="form-label">Header:</label>
                        <select id="header" v-model="newTemplate.header.type" class="form-select form-control">
                            <option value="none">None</option>
                            <option value="media">Media</option>
                            <option value="text">Text</option>
                        </select>
                    </div>

                    <!-- Conditional input for media or text -->
                    <div v-if="newTemplate.header.type === 'media'" class="mb-3">
                        <div class="col-md-6 mb-3 mt-3 d-flex justify-content-start">
                          <div class="form-check mr-4">
                            <input class="form-check-input" type="radio" id="imageRadio" value="image" v-model="newTemplate.header.mediaType">
                            <label class="form-check-label" for="imageRadio">
                              Image
                            </label>
                          </div>
                          <div class="form-check mr-4">
                            <input class="form-check-input" type="radio" id="videoRadio" value="video" v-model="newTemplate.header.mediaType">
                            <label class="form-check-label" for="videoRadio">
                              Video
                            </label>
                          </div>
                          <div class="form-check mr-4">
                            <input class="form-check-input" type="radio" id="documentRadio" value="document" v-model="newTemplate.header.mediaType">
                            <label class="form-check-label" for="documentRadio">
                              Document
                            </label>
                          </div>
                        </div>
                    
                        <div class="col-md-12">
                          <span>Accepted File Types: {{ acceptedFileTypes }}</span>
                        </div>
                    
                        <div class="col-md-12 mt-3">
                          <label for="mediaUpload" class="form-label">Upload Media:</label>
                          <b-form-group>
                            <b-form-file placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..." :accept="acceptedFileTypes" @change="previewMedia" id="file-default mediaUpload"></b-form-file>
                          </b-form-group>
                        </div>
                    </div>

                    <div v-else-if="newTemplate.header.type === 'text'" class="mb-3 mt-3">
                        <div class="col-md-12">
                            <label for="textContent" class="form-label">Text Content:</label>
                            <textarea id="textContent" v-model="newTemplate.header.text" class="form-control"></textarea>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div class="divider"></div>
            <!-- Body Text -->
            <div class="row">
                <div class="col-md-12">
                    <b-icon v-b-modal.add-attribute icon="plus-lg" class="ml-4"></b-icon>
                    <b-modal id="add-attribute" centered title="Add Attribute">
                        <p v-for="attribute in customAttributes" :key="attribute.id" class="attribute" @click="appendAttribute(attribute.name)">{{ attribute.name }}</p>
                    </b-modal>
                </div>
                <!-- Body input -->
                <div class="col-md-12 mt-2">
                    <label for="bodyText" class="form-label">Body:</label>
                    <textarea id="bodyText" v-model="newTemplate.bodyText" class="form-control"></textarea>
                </div>
            </div>

            <div class="divider"></div>

            <div class="row">
                <!-- Footer input -->
                <div class="col-md-12 mt-3">
                    <label for="footerText" class="form-label">Footer (Optional):</label>
                    <div style="margin: 0px 0px 10px 0px"><small>Add short line of text to the bottom of your message template</small></div>
                    <input type="text" id="footerText" v-model="newTemplate.footerText" class="form-control">
                </div>
            </div>

            <div class="divider"></div>

            <!-- Buttons creation options -->
            <div class="mt-3">
                <label for="buttonType">Buttons Optional:</label> <br/>
                <span class="mt-2 mb-2">Create up to two buttons that let customers response to your message or take action</span>
                <div style="width: 200px; margin-top: 15px">
                    <select v-model="buttonType" id="buttonType" class="form-select form-control">
                        <option value="none">None</option>
                        <option value="callToAction">Call to Action</option>
                        <option value="QUICK_REPLY">Quick Reply</option>
                    </select>
                </div>
            </div>

            <!-- Conditional rendering for Call to Action options -->
            <div v-if="buttonType === 'callToAction'" class="mt-3">
                <div class="row">
                    <!-- Left column for selecting CTA type -->
                    <div class="col-md-4">
                        <div class="row">
                            <div class="col-md-12">
                                <!-- <label for="ctaType">CTA Type:</label> -->
                                <select v-model="ctaType" id="ctaType" class="form-select form-control">
                                    <option value="URL">Visit Website</option>
                                    <option value="PHONE_NUMBER">Call Phone</option>
                                </select>
                            </div>
            
                            <div v-if="ctaType === 'URL'" class="col-md-12 mt-3">
                                <!-- <label for="visitWebsiteType">Visit Website Type:</label> -->
                                <select v-model="visitWebsiteType" id="visitWebsiteType" class="form-select form-control">
                                    <option value="static">Static</option>
                                    <option value="dynamic">Dynamic</option>
                                </select>
                            </div>
                        </div>
                    </div>
            
                    <!-- Right column for input fields -->
                    <div class="col-md-8">
                        <div class="row">
                            <div v-if="ctaType === 'URL'" class="col-md-12">
                                <!-- <label for="websiteUrl">Website URL:</label> -->
                                <input type="text" v-model="websiteUrl" id="websiteUrl" class="form-control" placeholder="Enter website URL">
                            </div>
                            <div v-if="ctaType === 'URL'" class="col-md-12 mt-3">
                                <!-- <label for="displayText">Display Text:</label> -->
                                <input type="text" v-model="displayText" id="displayText" class="form-control" placeholder="Enter display text">
                            </div>
            
                            <!-- Sub-options for Call Phone -->
                            <div v-if="ctaType === 'PHONE_NUMBER'" class="col-md-12">
                                <!-- <label for="phoneNumber">Phone Number:</label> -->
                                <input type="text" v-model="newTemplate.phoneNumber" id="phoneNumber" class="form-control" placeholder="Enter phone number">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

            <!-- Conditional rendering for Quick Reply options -->
            <div v-if="buttonType === 'QUICK_REPLY'" class="mt-3">
                <!-- Quick Reply Buttons -->
                <div v-for="(button, index) in quickReplyButtons" :key="index" class="mt-3">
                    <label>Button {{ index + 1 }}:</label>
                    <!-- Using slots -->
                    <b-input-group class="mt-3">
                        <template #append >
                            <b-input-group-text><strong class="text-danger" style="cursor: pointer" @click="removeQuickReplyButton(index)">X</strong></b-input-group-text>
                        </template>
                        <b-form-input v-model="quickReplyButtons[index]" :placeholder="'Enter text for Button ' + (index + 1)"></b-form-input>
                    </b-input-group>
                </div>

                <!-- Add Button -->
                <div class="mt-3">
                    <span @click="addQuickReplyButton" class="btn btn-secondary">Add Button</span>
                </div>
            </div>
        </form>
    </div>
</template>

  
<script>
    import { mapState, mapActions } from 'vuex';
    import { required, maxLength } from 'vuelidate/lib/validators';
    import whatsappTransformData from '@/utils/whatsappTransformData'
    
    import axios from "axios";

    
    export default {
        data() {
            return {
                API_BASE_URL: 'http://localhost:8000/api/',
                MEDIA_BASE_URL: 'http://localhost:8000',
                buttonType: 'none',
                ctaType: 'URL',
                websiteUrl: '',
                displayText: '',
                visitWebsiteType: 'static',
                quickReplyText: '',
                quickReplyButtons: [], // Initial empty button
                mediaUrl: null,
                mediaFile: null,
                newTemplate: {
                    name: '',
                    category: '',
                    language: {},
                    header: {
                        type: 'none'
                    },
                    bodyText: '',
                    phoneNumber: '',
                    footerText: ''
                },

                loadedLanguages: [] // Initialize as empty array
            };
        },
        validations: {
            newTemplate: {
                name: { required, maxLength: maxLength(255) },
                category: { required },
                language: { required }
            }
        },
        computed: {
            ...mapState(['customAttributes', 'messageTemplates']),
            acceptedFileTypes() {
                if (this.newTemplate.header.mediaType === 'image') {
                    return 'image/jpeg,image/png';
                } else if (this.newTemplate.header.mediaType === 'video') {
                    return 'video/mp4,video/3gpp';
                } else if (this.newTemplate.header.mediaType === 'document') {
                    return '.pdf';
                }
                return '';
            }
        },
        methods: {
            ...mapActions(['addMessageTemplate', 'setCustomAttributes']),

            saveTemplate() {
                // Include button data in the newTemplate object
                if(this.buttonType === 'QUICK_REPLY'){
                    // this.newTemplate.buttons = this.quickReplyButtons
                    this.newTemplate.buttons = this.quickReplyButtons.filter(button => button.trim() !== '');
                }else if(this.buttonType === 'callToAction'){
                    this.newTemplate.buttons = [
                        {
                            type: this.ctaType,
                            websiteUrl: this.websiteUrl,
                            displayText: this.displayText,
                            phoneNumber: this.newTemplate.phoneNumber
                        }
                    ]
                }else{
                    this.newTemplate.buttons = null; // or []
                }

                this.newTemplate.buttonType = this.buttonType

                // console.log(whatsappTransformData(this.newTemplate))

                // Include media file data in the newTemplate object
                if (this.newTemplate.header.type === 'media') {
                    // Upload media file if it exists
                    if (this.mediaFile) {
                        const formData = new FormData();
                        formData.append('file', this.mediaFile);

                        axios
                            .post(this.API_BASE_URL + "media", formData)
                            .then((response) => {
                                // If the request is successful, you can commit the response data to the store if needed
                                // this.mediaUrl = this.MEDIA_BASE_URL + response.data.data.url;
                                this.newTemplate.mediaUrl = response.data.data.id
                                console.log(this.newTemplate)
                                console.log(whatsappTransformData(this.newTemplate))

                                this.addMessageTemplate(whatsappTransformData(this.newTemplate))
                                // console.log("media posted successfully:", response.data);
                            })
                            .catch((error) => {
                                // Handle errors, e.g., log them or show an error message
                                console.error("Error posting contact attribute:", error);
                            });
                    }
                }else{
                    // Dispatch the action to add the template
                    // console.log(whatsappTransformData(this.newTemplate))
                    this.addMessageTemplate(whatsappTransformData(this.newTemplate))
                }
            },
            clearForm() {
                // Reset all form fields to initial values
                this.newTemplate.name = '';
                this.newTemplate.category = '';
                this.newTemplate.language = '';
                this.newTemplate.header = 'none';
                this.newTemplate.header.text = '';
            },
            previewMedia(event) {
                this.mediaFile = event.target.files[0];
                if (this.mediaFile) {
                    // Add logic to preview the uploaded media
                    console.log('Media uploaded:', this.mediaFile);
                }
            },
            appendAttribute(key) {
                this.newTemplate.bodyText += `{{ ${key} }}`; // Appending the attribute key to the body content
            },
            addQuickReplyButton() {
                this.quickReplyButtons.push('');
            },
            removeQuickReplyButton(index) {
                this.quickReplyButtons.splice(index, 1);
            },

            async loadLanguages() {
                try {
                    const response = await axios.get('/supported_languages.json');
                    this.loadedLanguages = response.data.supported_languages;
                } catch (error) {
                    console.error('Error loading languages:', error);
                }
            },

        },
        mounted(){
            this.loadLanguages();
            this.setCustomAttributes()
        }
    };
</script>
  

  
<style scoped>
    .attribute{
        border: 2px solid #ccc; 
        border-radius: 30px; 
        padding: 5px 10px; 
        margin: 5px; 
        display: inline-block; 
        cursor: pointer;
    }
    .divider{
        width: 100%;
        height: 2px;
        background-color: rgba(128, 128, 128, 0.454);
        margin-bottom: 10px;
        margin-top: 10px
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
  