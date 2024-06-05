<template>
    <div >
        <!-- Custom Attribute edit form -->
        <div class="form-group">
            <label for="customAttribute Value">Name:</label>
            <input type="text" id="customAttribute Value" v-model="selectedCustomAttribute .name" class="form-control" placeholder="Enter customAttribute  value">
        </div> 
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapState(['contacts', 'selectedCustomAttribute ']),
        },
        methods: {
            ...mapActions(['updateCustomAttribute ']),
            clearForm() {
                // Reset all form fields to initial values
                this.newContact.name = '';
            },

            saveEditCustomAttribute (){
                const customAttribute  = {
                    id: this.selectedCustomAttribute .id,
                    value: this.selectedCustomAttribute .value,
                    custom_Attribute_id: document.getElementById('customAttribute Key').value, 
                    contact_id: this.selectedContact.id
                }
                console.log(customAttribute )
                // console.log(this.selectedCustomAttribute )
                this.updateCustomAttribute (customAttribute )
                this.$nextTick(() => {
                    this.$bvModal.hide('edit-customAttribute ')
                })
            },
        }
    };
</script>

  