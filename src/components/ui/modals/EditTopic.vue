<template>
    <div >
        <!-- Topic edit form -->
        <div class="form-group">
            <label for="topicValue">Name:</label>
            <input type="text" id="topicValue" v-model="selectedTopic.name" class="form-control" placeholder="Enter topic value">
        </div> 
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapState(['contacts', 'selectedTopic']),
        },
        methods: {
            ...mapActions(['updateTopic']),
            clearForm() {
                // Reset all form fields to initial values
                this.newContact.name = '';
            },

            saveEditTopic(){
                const topic = {
                    id: this.selectedTopic.id,
                    value: this.selectedTopic.value,
                    custom_topic_id: document.getElementById('topicKey').value, 
                    contact_id: this.selectedContact.id
                }
                console.log(topic)
                // console.log(this.selectedTopic)
                this.updateTopic(topic)
                this.$nextTick(() => {
                    this.$bvModal.hide('edit-topic')
                })
            },
        }
    };
</script>

  