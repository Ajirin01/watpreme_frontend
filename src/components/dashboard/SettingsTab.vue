<template>
    <div class="settings-container">
      <div>
        <b-card no-body>
          <b-tabs card v-model="tabIndex">
            <b-tab title="Business Profile" :title-link-class="linkClass(0)" active>
              <b-card-text><BusinessProfile /></b-card-text>
            </b-tab>
            <b-tab title="General" :title-link-class="linkClass(1)">
              <b-card-text><GeneralSetting /></b-card-text>
            </b-tab>
            <b-tab title="Topics & Attributs" :title-link-class="linkClass(2)">
              <b-card-text><TopicsAndAttributes /></b-card-text>
            </b-tab>
            <b-tab title="Import Chats" :title-link-class="linkClass(3)">
              <b-card-text><ImportChats /></b-card-text>
            </b-tab>
            <b-tab title="Message Deletion" :title-link-class="linkClass(4)">
              <b-card-text><MessageDeletion /></b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
</template>
  
<script>
    import GeneralSetting from "@/components/ui/settings/GeneralSetting"
    import BusinessProfile from "@/components/ui/settings/BusinessProfile"
    import ImportChats from "@/components/ui/settings/ImportChats"
    import MessageDeletion from "@/components/ui/settings/MessageDeletion"
    import TopicsAndAttributes from "@/components/ui/settings/TopicsAndAttributes"

    export default {
      props: {
        msg: String
      },
      data() {
        return {
          tabIndex: 0
        }
      },
      methods: {
        linkClass(idx) {
          if (this.tabIndex === idx) {
            return ['bg-secondary', 'text-light']
          } else {
            return ['bg-light', 'text-dark']
          }
        }
      },
      mounted(){},
      components:{
        GeneralSetting,
        BusinessProfile,
        ImportChats,
        MessageDeletion,
        TopicsAndAttributes,
      }
    }
</script>
  
  
<style scoped>
  a{
    color: rgb(52, 50, 50) !important;
    text-transform: capitalize;
    font-size: .8rem;
  }
  #tabs-swipe-demo{
    background-color: rgb(234, 233, 233);
  }
  .settings-container{
    width: 90%;
    margin: 0 auto;
    margin-top: 60px;
    margin-bottom: 100px;
  }
</style>
  