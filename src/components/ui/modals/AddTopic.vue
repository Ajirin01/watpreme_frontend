<template>
    <div >            
        <div class="form-group">
            <label for="topicValue">Name:</label>
            <input type="text" id="topicName" v-model="newTopic.name" class="form-control" placeholder="Enter topic name">
        </div>            
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapState(['customTopics', 'selectedTopic']),
        },
        data() {
            return {
                newTopic: {
                    name: ''
                }
            };
        },
        methods: {
            ...mapActions(['setSelectedTopic', 'postTopic']),
            clearForm() {
                // Reset all form fields to initial values
                this.newTopic.name = '';
            },

            saveCreateTopic(){
                console.log(this.newTopic)

                const topic = {
                    name: this.newTopic.name
                }

                return this.postTopic(topic)
            }
        }
    };
</script>


<style scoped>
</style>
  