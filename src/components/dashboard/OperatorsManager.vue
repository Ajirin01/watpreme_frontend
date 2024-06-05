<template>
    <div class="settings-container">
      <b-card no-body>
        <b-tabs card v-model="tabIndex">
          <b-tab title="Operators" :title-link-class="linkClass(0)" active>
            <b-card-text><OperatorsTable /></b-card-text>
          </b-tab>
          <b-tab title="Teams" :title-link-class="linkClass(1)">
            <b-card-text><TeamsTable /></b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
</template>
  
<script>
    import OperatorsTable from "@/components/ui/operators/OperatorsTable"
    import TeamsTable from "@/components/ui/operators/TeamsTable"

    export default {
      props: {},
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
      mounted(){
      },
      components:{
        OperatorsTable,
        TeamsTable
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
    margin-top: 20px;
    margin-bottom: 100px;
  }
</style>
  