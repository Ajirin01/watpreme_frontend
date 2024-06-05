<template>
    <div >            
        <div class="form-group">
            <label for="attributeValue">Name:</label>
            <input type="text" id="attributeName" v-model="newAttribute.name" class="form-control" placeholder="Enter attribute name">
        </div>            
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapState(['customAttributes', 'selectedAttribute']),
        },
        data() {
            return {
                newAttribute: {
                    name: ''
                }
            };
        },
        methods: {
            ...mapActions(['setSelectedAttribute', 'postCustomAttribute']),
            clearForm() {
                // Reset all form fields to initial values
                this.newAttribute.name = '';
            },

            saveCreateAttribute(){
                console.log(this.newAttribute)

                const attribute = {
                    name: this.newAttribute.name
                }

                return this.postCustomAttribute(attribute)
            }
        }
    };
</script>


<style scoped>
</style>
  