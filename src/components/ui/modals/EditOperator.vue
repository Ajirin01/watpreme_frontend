<template>
  <div class="add-operator-form">
    <!-- Form for adding a new operator -->
    <form @submit.prevent="handleUpdateOperator" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="user" class="form-label">Operator's Name:</label>
        <input type="text" id="user" v-model="selectedOperator.user.name" class="form-control" required>
        <div class="invalid-feedback">Please provide a user.</div>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="text" id="email" v-model="selectedOperator.user.email" class="form-control" required>
        <div class="invalid-feedback">Please provide an email</div>
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone:</label>
        <input type="text" id="phone" v-model="selectedOperator.user.phone" class="form-control" required>
        <div class="invalid-feedback">Please provide a phone number.</div>
      </div>
      <!-- <div class="mb-3">
        <label for="role" class="form-label">Role:</label>
        <input type="text" id="role" v-model="selectedOperator.role" class="form-control" required>
        <div class="invalid-feedback">Please provide a role.</div>
      </div> -->
      <div class="mb-3">
        <label for="team" class="form-label">Team:</label>
        <!-- <input type="text" id="team" v-model="selectedOperator.team" class="form-control" required> -->
        <select name="" id="team" v-model="selectedOperator.team_id" class="form-control" required>
          <option v-for="team in teams" :key="team.id" :value="team.id"> {{team.name}}</option>
        </select>
        <div class="invalid-feedback">Please provide a team.</div>
      </div>
      <!-- <div class="mb-3">
        <label for="lastLoginIP" class="form-label">Last Login IP:</label>
        <input type="text" id="lastLoginIP" v-model="selectedOperator.lastLoginIP" class="form-control">
      </div> -->
      <!-- <div class="mb-3">
        <label for="lastLoginDate" class="form-label">Last Login Date:</label>
        <input type="datetime-local" id="lastLoginDate" v-model="selectedOperator.lastLoginDate" class="form-control">
      </div> -->
      <div class="mb-3">
        <label for="status" class="form-label">Status:</label>
        <input type="text" id="status" v-model="selectedOperator.status" class="form-control">
      </div>
    </form>
    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(['updateOperator']),
    handleUpdateOperator() {
      // Call the action to update the operator
      let updateData = {
        name: this.selectedOperator.user.name,
        phone:this.selectedOperator.user.phone,
        email: this.selectedOperator.user.email,
        team_id: this.selectedOperator.team_id,
        business_id: this.selectedOperator.business_id,
        id: this.selectedOperator.id
      }
      this.updateOperator(updateData);
    }
  },
  computed: {
    ...mapState(['selectedOperator', 'teams'])
  }
};
</script>

<style scoped>
/* Add your scoped styles here */
.update-operator-form {
  margin-top: 20px;
  font-weight: 400 !important;
}
.input-field {
  margin-bottom: 20px;
}
</style>
