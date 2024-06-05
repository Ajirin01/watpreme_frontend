<template>
  <div class="base-layout">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="light">
        <b-navbar-brand><router-link to="/"><img :src="generalSetting?.displayLogo" width="40" height="40" alt=""></router-link></b-navbar-brand>
    
        <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->
        <b-navbar-toggle target="nav-collapse">
          <template #default>
            <b-icon icon="list" style="color: black"></b-icon>
          </template>
        </b-navbar-toggle>
    
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <router-link class="nav-link" to="/team-inbox">
              <i class="bi bi-inbox"></i> Team Inbox
            </router-link>
            <router-link class="nav-link" to="/contacts">
              <i class="bi bi-people"></i> Contacts
            </router-link>
            <router-link class="nav-link" to="/broadcast">
              <i class="bi bi-megaphone"></i> Broadcast
            </router-link>
            <router-link class="nav-link" to="/automation">
              <i class="bi bi-arrow-clockwise"></i> Automation
            </router-link>

            <b-nav-item-dropdown text="more" right>
              <!-- Customize dropdown items with links -->
              <b-dropdown-item>
                <router-link class="nav-link" to="/"><i class="bi bi-speedometer2"></i> Dashboard</router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                  <router-link class="nav-link" to="/api-doc"><i class="bi bi-book"></i> API Docs</router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                  <router-link class="nav-link" to="/settings"><i class="bi bi-gear"></i> Settings</router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                  <router-link class="nav-link" to="/operator-manager"><i class="bi bi-person"></i> Operator Manager</router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                  <router-link class="nav-link" to="/integration"><i class="bi bi-diagram-3"></i> Integration</router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                  <router-link class="nav-link" to="/webhooks"><i class="bi bi-arrows-angle-contract"></i> Webhooks</router-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
    
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <div class="right-items mt-1">
                <span class="business-phone">{{businessProfile?.business?.business_admin_users[0].phone}}</span>
                <div class="online-status"></div>
                <!-- <span class="priority">High </span>
                <span class="separator-bar"> | </span> 
                <span class="connection">Connected</span> -->
                <i class="bi bi-question-circle help-icon"></i>
                <i class="bi bi-bell notification-icon"></i>
              </div>
            </b-nav-form>
    
            
    
            <img class="rounded-circle" width="40" height="40" :src="businessProfile?.profilePicture" alt="">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em><span class="username"><b>{{ businessProfile?.business?.business_admin_users[0].name.split(' ')[0] }}</b></span></em>
              </template>
              <!-- <b-dropdown-item>
                  <span class="email">{{businessProfile?.business?.business_admin_users[0].email}}</span>
              </b-dropdown-item> -->
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    
    
    <!-- Content Area -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'BaseLayout',
  data() {
    return {
      dropdownOpen: false
    };
  },
  methods: {
    ...mapActions(['setGeneralSetting', 'setBusinessProfile']),
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    }
  },
  computed: {
    ...mapState(['generalSetting', 'businessProfile'])
  },
  mounted() {
    this.setGeneralSetting();
    this.setBusinessProfile();
  },
  components: {
    // BDropdown,
    // BDropdownItem
  }
}
</script>

<style scoped>
    nav a {
      font-weight: bold;
      color: #070a0d;
    }

    nav a.router-link-exact-active {
      color: #42b983;
    }
    .nav-link{
      margin-left: 3px
    }
    .navbar-dark .navbar-nav .nav-link{
      color: rgb(99, 99, 99) !important;
      font-size: .8rem;
    }
    .right-links{
      margin-top: -20px
    }
    .separator-bar{
      padding: 0px 1px
    }
    .right-items{
      display: flex;
      margin-top: -15px;
    }
    .right-items span{
      color: black
    }
    .details span{
      color: black
    }
    .right-items i{
      color: black;
      margin-top: -2px
    }
    .email{
        margin-top: -5px;
    }
    .username{
      margin-top: -7px;
    }
    .user-info{
        display: flex;
        justify-content: flex-start;
        transform: scale(.8)
    }

    .user-info .avatar img{
        width: 40px;
        height: 40px;
        margin-top: 0px
    }
    .user-info .details{
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: left;
        text-align: left;
        margin-left: 5px;
        margin-top: 10px
    }
    .notification-icon{
        padding: 0px 10px;
        font-size: 1rem;
    }
    .help-icon{
        padding: 0px 10px;
        font-size: 1rem;
    }
    .online-status{
        background-color: rgb(25, 153, 48);
        width: 7px;
        height: 7px;
        margin: 0px 5px;
        font-size: .5rem;
        border-radius: 10px;
        margin-top: 5px
    }
    .base-layout {
        font-family: Arial, sans-serif;
    }
    
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        top: 0;
        z-index: 1000;
        width: 100%;
        font-size: .85rem;
        font-weight: 500;
    }
    
    .content {
        width: 97%;
        margin: 0 auto;
        padding-top: 100px
    }
</style>
