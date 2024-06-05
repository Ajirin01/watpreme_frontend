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
              <input type="text" id="username" v-model="newContact.username" class="form-control" required>
              <div class="invalid-feedback">Please provide a username.</div>
            </div>
            <div class="mb-3">
              <label for="phoneNumber" class="form-label">Phone Number:</label>
              <input type="tel" id="phoneNumber" v-model="newContact.phoneNumber" class="form-control" required>
              <div class="invalid-feedback">Please provide a phone number.</div>
            </div>
            <!-- <button type="submit" class="btn btn-primary">Save</button> -->
          </div>
        </div>
      </form>
    </div>
</template>
  
  
<script>
    export default {
        data() {
            return {
                newContact: {
                    username: '',
                    phoneNumber: '',
                    profilePic: null,
                },
                previewImageUrl: '', // Define previewImageUrl here
            };
        },
        methods: {
            createContact() {
                // Add new contact logic here
                // console.log('New Contact:', this.newContact);

                // Clear form fields after submission
                this.clearForm();

                // return this.newContact
            },
            clearForm() {
                // Reset all form fields to initial values
                this.newContact.username = '';
                this.newContact.phoneNumber = '';
                this.newContact.profilePic = null;
                this.previewImageUrl = ''; // Clear previewImageUrl as well
            },
            previewImage(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader(); // Create a FileReader object
                    reader.onload = () => { // Define a function to handle the file reading
                        console.log('File loaded successfully');
                        this.previewImageUrl = reader.result; // Set the previewImageUrl to the base64 data URL
                        console.log(this.previewImageUrl)
                    };
                    reader.onerror = (error) => {
                    console.error('Error reading file:', error);
                    };
                    reader.readAsDataURL(file); // Read the file as a data URL
                }
            },
            saveContact() {
                // this.createContact()
                this.$emit('contact-saved');

                return this.newContact
            }
        }
    };
</script>

  
<style>
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
  