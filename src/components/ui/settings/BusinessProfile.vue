<template>
  <div class="container">
    <div class="general-settings">
      <!-- Profile Picture Preview -->
      <div class="form-group">
        <label class="label" for="profile-picture">Profile Picture:</label>
        <div class="profile-picture-preview">
          <b-img :src="profilePicture" alt="Profile Picture" class="profile-photo" v-if="profilePicture" />
          <span v-else>No profile picture available</span>
        </div>
        <div class="mt-2">
          <b-button variant="primary" @click="openChoosePhoto()">Change Profile Picture</b-button>
          <input type="file" id="profile-picture" @change="handleProfilePictureChange" accept="image/*" style="display: none;">
        </div>
      </div>
    
      <!-- Phone Number -->
      <div class="form-group">
        <label class="label" for="phone-number">Phone Number:</label>
        <b-form-input class="form-control" v-model="formData.phoneNumber" type="text" id="phone-number"></b-form-input>
      </div>
    
      <!-- About Input Field -->
      <div class="form-group">
        <label class="label" for="about">About:</label>
        <b-form-textarea class="form-control" v-model="formData.about" id="about"></b-form-textarea>
      </div>
    
      <!-- Business Address -->
      <div class="form-group">
        <label class="label" for="business-address">Business Address:</label>
        <b-form-input class="form-control" v-model="formData.businessAddress" type="text" id="business-address"></b-form-input>
      </div>
    
      <!-- Business Description -->
      <div class="form-group">
        <label class="label" for="business-description">Business Description:</label>
        <b-form-textarea class="form-control" v-model="formData.businessDescription" id="business-description"></b-form-textarea>
      </div>
    
      <!-- Email for Business Contact -->
      <div class="form-group">
        <label class="label" for="business-email">Email for Business Contact:</label>
        <b-form-input class="form-control" v-model="formData.businessEmail" type="email" id="business-email"></b-form-input>
      </div>
    
      <!-- Business Industry -->
      <div class="form-group">
        <label class="label" for="business-industry">Business Industry:</label>
        <b-form-input class="form-control" v-model="formData.businessIndustry" type="text" id="business-industry"></b-form-input>
      </div>
    
      <!-- Business Website 1 -->
      <div class="form-group">
        <label class="label" for="website-1">Business Website 1:</label>
        <b-form-input class="form-control" v-model="formData.website1" type="url" id="website-1"></b-form-input>
      </div>
    
      <!-- Business Website 2 -->
      <div class="form-group">
        <label class="label" for="website-2">Business Website 2:</label>
        <b-form-input class="form-control" v-model="formData.website2" type="url" id="website-2"></b-form-input>
      </div>
    
      <div class="form-group">
        <b-button variant="primary" @click="saveData">Save</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      // profilePicture: '',
      // formData: {
      //   phoneNumber: '',
      //   about: '',
      //   businessAddress: '',
      //   businessDescription: '',
      //   businessEmail: '',
      //   businessIndustry: '',
      //   website1: '',
      //   website2: ''
      // }
    };
  },
  methods: {
    ...mapActions(['updateBusinessProfile']),

    handleProfilePictureChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.profilePicture = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    openChoosePhoto() {
      document.getElementById('profile-picture').click();
    },
    saveData() {
      const formData = { ...this.formData, id: this.businessProfile.id, profilePicture: this.profilePicture };
      this.updateBusinessProfile(formData);
    }
  },
  computed: {
    ...mapState(['businessProfile']),

    profilePicture: {
      get() {
        return this.businessProfile?.profilePicture;
      },
      set(value) {
        // Implement setter logic if needed
        this.businessProfile.profilePicture = value
        // console.log(value)
      }
    },

    formData: {
      get() {
        return {
          phoneNumber: this.businessProfile?.phoneNumber || '',
          about: this.businessProfile?.about || '',
          businessAddress: this.businessProfile?.businessAddress || '',
          businessDescription: this.businessProfile?.businessDescription || '',
          businessEmail: this.businessProfile?.businessEmail || '',
          businessIndustry: this.businessProfile?.businessIndustry || '',
          website1: this.businessProfile?.website1 || '',
          website2: this.businessProfile?.website2 || ''
        };
      }
    }
  }
};
</script>

<style scoped>
.profile-photo {
  width: 100px;
  height: 100px;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 20px;
}
</style>
