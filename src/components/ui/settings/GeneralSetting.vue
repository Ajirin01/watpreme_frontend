<template>
  <div class="general-settings container">
    <!-- Profile Picture Preview -->
    <div class="form-group">
      <label for="profile-logo" class="label">Profile Picture</label>
      <div class="profile-logo-preview">
        <b-img :src="displayLogo" alt="Profile Picture" class="profile-photo" v-if="displayLogo" />
        <span v-else>No profile picture available</span>
      </div>
    </div>

    <!-- Profile Picture Update -->
    <div class="form-group">
      <label class="label"></label> <!-- Empty label to align with other labels -->
      <b-button variant="primary" @click="openChooseLogo()">Change Profile Picture</b-button>
      <input type="file" id="profile-logo" @change="handleLogoChange" accept="image/*" style="display: none;">
    </div>

    <!-- Time Zone -->
    <div class="form-group">
      <label for="timezone" class="label">Customer Timezone:</label>
      <b-form-select class="form-control" v-model="formData.timezone" id="timezone" :options="timezones"></b-form-select>
    </div>

    <!-- Language -->
    <div class="form-group">
      <label for="language" class="label">Language:</label>
      <b-form-select class="form-control" v-model="formData.language" id="language" :options="languages"></b-form-select>
    </div>

    <!-- SMS Enabled -->
    <div class="form-group">
      <label for="smsEnabled" class="label">SMS Enabled:</label>
      <b-form-select class="form-control" v-model="formData.smsEnabled" id="smsEnabled" :options="smsOptions"></b-form-select>
    </div>

    <!-- Save Button -->
    <div class="form-group">
      <label class="label"></label> <!-- Empty label to align with other labels -->
      <b-button variant="primary" @click="saveData">Save</b-button>
    </div>
  </div>
</template>

<script>
import timezonesData from '@/assets/time_zone.json';

import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      // displayLogo: this.generalSetting.displayLogo,
      // formData: {
      //   smsEnabled: this.generalSetting?.smsEnabled || '', // Set default value from generalSetting.smsEnabled
      //   timezone: this.generalSetting?.timezone || '', // Set default value from generalSetting.timezone
      //   language: this.generalSetting?.language || '', // Set default value from generalSetting.language
      // },
      timezones: [
        { value: '', text: 'Please select an option' }
      ],
      languages: [
        { value: '', text: 'Select your preferred language' }, // Default option
        { value: 'English', text: 'English' },
        { value: 'Chinese', text: 'Chinese' },
        { value: 'Spanish', text: 'Spanish' },
        { value: 'French', text: 'French' }
      ],
      smsOptions: [
        { value: '', text: 'Select an option' }, // Default option
        { value: false, text: 'No' },
        { value: true, text: 'Yes' }
      ]
    };
  },
  methods: {
    ...mapActions(['setSelectedGeneralSetting', 'postGeneralSetting', 'updateGeneralSetting']),

    handleLogoChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.displayLogo = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    openChooseLogo() {
      document.getElementById('profile-logo').click();
    },
    saveData() {
      const formData = { ...this.formData, id: this.generalSetting.id, displayLogo: this.displayLogo };
      // alert(JSON.stringify(formData, null, 2));
      this.updateGeneralSetting(formData)
    }
  },
  computed:{
    ...mapState(['generalSetting']),

    formData: {
      get() {
        return {
          smsEnabled: Boolean(this.generalSetting?.smsEnabled || ''), // Set default value from generalSetting.smsEnabled
          timezone: this.generalSetting?.timezone || '', // Set default value from generalSetting.timezone
          language: this.generalSetting?.language || '', // Set default value from generalSetting.language
        }
      }
    },

    displayLogo: {

      get() {
        return this.generalSetting?.displayLogo;
      },
      set(value) {
        // Implement setter logic if needed
        this.generalSetting.displayLogo = value
        // console.log(value)
      }
    },
  },
  
  mounted() {
    this.timezones = timezonesData.map(timezone => {
      return {
        value: timezone.value,
        text: timezone.text,
        utc: timezone.utc.join(', ')
      };
    });
    
  }
};
</script>

<style scoped>
.label {
  color: rgb(51, 48, 48);
  display: block; /* Ensure labels appear on separate lines */
  margin-bottom: 5px; /* Add some space between labels and inputs */
}
.profile-photo {
  width: 100px;
  height: 100px;
  border-radius: 4px;
}
.form-group {
  margin-bottom: 20px;
}
</style>
