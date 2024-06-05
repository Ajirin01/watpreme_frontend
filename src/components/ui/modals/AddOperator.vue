<template>
  <div class="add-operator-form">
    <!-- Form for adding a new operator -->
    <form @submit.prevent="updateOperator" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="user" class="form-label">Operator's Name:</label>
        <input type="text" id="user" v-model="newOperator.name" class="form-control" required>
        <div class="invalid-feedback">Please provide a user.</div>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="text" id="email" v-model="newOperator.email" class="form-control" required>
        <div class="invalid-feedback">Please provide an email</div>
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone:</label>
        <input type="text" id="phone" v-model="newOperator.phone" class="form-control" required>
        <div class="invalid-feedback">Please provide a phone number.</div>
      </div>
      <!-- <div class="mb-3">
        <label for="role" class="form-label">Role:</label>
        <input type="text" id="role" v-model="newOperator.role" class="form-control" required>
        <div class="invalid-feedback">Please provide a role.</div>
      </div> -->
      <div class="mb-3">
        <label for="team" class="form-label">Team:</label>
        <!-- <input type="text" id="team" v-model="newOperator.team" class="form-control" required> -->
        <select name="" id="team" v-model="newOperator.team_id" class="form-control" required>
          <option v-for="team in teams" :key="team.id" :value="team.id"> {{team.name}}</option>
        </select>
        <div class="invalid-feedback">Please provide a team.</div>
      </div>
      <!-- <div class="mb-3">
        <label for="lastLoginIP" class="form-label">Last Login IP:</label>
        <input type="text" id="lastLoginIP" v-model="newOperator.lastLoginIP" class="form-control">
      </div> -->
      <!-- <div class="mb-3">
        <label for="lastLoginDate" class="form-label">Last Login Date:</label>
        <input type="datetime-local" id="lastLoginDate" v-model="newOperator.lastLoginDate" class="form-control">
      </div> -->
      <!-- <div class="mb-3">
        <label for="status" class="form-label">Status:</label>
        <input type="text" id="status" v-model="newOperator.status" class="form-control">
      </div> -->
    </form>
    
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      newOperator: {
        name: '',
        phone:'',
        email: '',
        // role: '',
        team_id: '',
        business_id: 1,
        // lastLoginIP: '',
        // lastLoginDate: '',
        // status: ''
      }
    };
  },
  methods: {
    ...mapActions(['postOperator']),

    addOperator() {
      // Add new operator logic here
      console.log('New Operator:', this.newOperator);

      // alert(JSON.stringify(this.newOperator))

      this.postOperator(this.newOperator)

      // Clear form fields after submission
      // this.clearForm();
    },
    clearForm() {
      // Reset all form fields to empty strings
      Object.keys(this.newOperator).forEach(key => {
        this.newOperator[key] = '';
      });
    }

  },
  computed: {
    ...mapState(['teams'])
  }
};
</script>

<style>
.add-operator-form {
  margin-top: 20px;
  font-weight: 400 !important;
}
.input-field {
  margin-bottom: 20px;
}

</style>
