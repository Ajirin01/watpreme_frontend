<template>
  <div class="update-team-form">
    <!-- Form for updating team information -->
    <form @submit.prevent="handleUpdateTeam" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="teamName" class="form-label">Team Name:</label>
        <input type="text" id="teamName" v-model="team.name" class="form-control" required>
        <div class="invalid-feedback">Please provide a team name.</div>
      </div>
      <div class="mb-3">
        <label for="defaultTeam" class="form-label">Default Team:</label>
        <input type="checkbox" id="defaultTeam" v-model="team.default" class="form-check-input ml-3">
      </div>
      <div class="mb-3">
        <label for="teamSize" class="form-label">Team Size:</label>
        <input type="number" id="teamSize" v-model="team.size" class="form-control" required>
        <div class="invalid-feedback">Please provide the team size.</div>
      </div>
      <!-- Other fields related to team information can be added here -->
      <button type="submit" class="btn btn-primary">Update Team</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
    };
  },
  methods: {
    ...mapActions(['updateTeam']),

    handleUpdateTeam() {
      // Validate form fields if needed

      // Update team logic here
      console.log('Updated Team:', this.team);

      this.updateTeam(this.team)

    },
    clearForm() {
      // Reset all form fields to default values
      this.team = {
        name: '',
        default: false,
        size: 0
        // Reset other fields related to team information here
      };
    }
  },
  computed: {
    ...mapState(['selectedTeam']),

    team: {
      get(){
        return this.selectedTeam
      },
      set(value){
        console.log(value)
        // this.selectedTeam = value
      }
    }
  }
};
</script>

<style>
.update-team-form {
  margin-top: 20px;
  font-weight: 400 !important;
}
.input-field {
  margin-bottom: 20px;
}
</style>
