<template>
  <div class="attributes-table-container">
    <div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab title="Attributes"><b-card-text><AttributesTab/></b-card-text></b-tab>
          <b-tab title="Topics"><b-card-text><TopicsTab/></b-card-text></b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
//import Paginator from '@/assets/Paginator.js';
import AttributesTab from '@/components/ui/settings/topicsAndAttributes/AttributesTab.vue'
import TopicsTab from '@/components/ui/settings/topicsAndAttributes/TopicsTab.vue'

export default {
  components:{
    AttributesTab,
    TopicsTab
  }
};
</script>

<style scoped>

</style>
