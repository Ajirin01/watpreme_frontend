<template>
    <div>
        <!-- Message Template Table -->
        <div class="template-table">
            <div class="table-wrapper">
                <b-table
                    striped hover
                    :items="messageTemplates"
                    :fields="fields"
                    responsive="sm"
                    @row-clicked="selectTemplate"
                >
                    <!-- Radio button column -->
                    <template #cell(select)="data">
                        <b-form-radio
                            v-model="selectedTemplate"
                            :value="data.item.id"
                            name="templateSelection"
                        ></b-form-radio>
                    </template>

                    <!-- Name column -->
                    <template #cell(name)="data">
                        {{ data.item.name }}
                    </template>

                    <!-- Status column -->
                    <template #cell(status)="data">
                        {{ data.item.status }}
                    </template>

                    <!-- Category column -->
                    <template #cell(category)="data">
                        {{ data.item.category }}
                    </template>
                </b-table>
            </div>
        </div>

        <!-- Display selected template content -->
        <div v-if="selectedTemplateContent" class="template-preview">
            <h5>Template Preview:</h5>
            <ViewTemplate />

            <!-- Display original content -->
            <div v-if="selectedTemplatetTextContent.type">
                <h5>Original Content:</h5> {{ selectedTemplatetTextContent.content }}
            </div>

            <!-- Placeholder Editor -->
            <div class="placeholder-editing" v-if="selectedTemplatePlaceholders.length">
                <h5>Placeholder Editor:</h5>
                <div v-for="(placeholder, index) in selectedTemplatePlaceholders" :key="index" class="placeholder-item">
                    <label>{{ placeholder }}</label>
                    
                    <!-- Attribute Source Selection -->
                    <b-form-select
                        v-model="attributeSource[placeholder]"
                        :options="attributeSourceOptions"
                    ></b-form-select>
                    
                    <!-- Conditional Inputs based on attribute source -->
                    <div v-if="attributeSource[placeholder] === 'Custom'">
                        <b-form-input
                            v-model="placeholderValue[placeholder]"
                            placeholder="Enter custom value"
                        ></b-form-input>
                    </div>

                    <div v-else-if="attributeSource[placeholder] === 'WhatsApp'">
                        <b-form-select
                            v-model="placeholderValue[placeholder]"
                            :options="whatsappAttributes"
                        ></b-form-select>
                    </div>

                    <div v-else-if="attributeSource[placeholder] === 'Database'">
                        <b-form-select
                            v-model="placeholderValue[placeholder]"
                            :options="databaseAttributes"
                        ></b-form-select>
                    </div>
                </div>
                <b-button @click="savePlaceholderValues">Save</b-button>
            </div>

            <!-- Display updated content -->
            <div v-if="updatedTemplateContent">
                <h5>Updated Content:</h5>
                <div v-html="updatedTemplateContent"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ViewTemplate from '@/components/ui/modals/ViewTemplate.vue';

import { addDbPrefix, addWhatsappPrefix} from '@/utils/AttributePrefixHandles'


export default {
    data() {
        return {
            selectedTemplate: null, // Selected message template ID
            selectedTemplateObject: {},
            fields: [
                { key: 'select', label: '' }, // Column for radio buttons
                { key: 'name', label: 'Name' },
                { key: 'status', label: 'Status' },
                { key: 'category', label: 'Category' }
            ],
            attributeSourceOptions: [
                { value: 'Custom', text: 'Custom' },
                { value: 'WhatsApp', text: 'WhatsApp' },
                { value: 'Database', text: 'Database' }
            ],
            whatsappAttributes: [
                { value: addWhatsappPrefix('Customer Name'), text: 'Customer Name' },
                { value: addWhatsappPrefix('Order Number'), text: 'Order Number' },
                { value: addWhatsappPrefix('Delivery Date'), text: 'Delivery Date' },
                { value: addWhatsappPrefix('Season'), text: 'Season' }
            ],
            headerContent: null,
            bodyContent: null,
            
            headerAttributeSources: {}, // Object to hold selected attribute sources for header placeholders
            bodyAttributeSources: {}, // Object to hold selected attribute sources for body placeholders
            headerPlaceholderValues: {}, // Object to hold values for header placeholders
            bodyPlaceholderValues: {}, // Object to hold values for body placeholders

            templateToSubmit: {}
        };
    },
    computed: {
        ...mapState(['messageTemplates', 'broadcastSelectedTemplate', 'selectedTemplatetTextContent', 'customAttributes']),
        // Content of the selected template
        selectedTemplateContent() {
            const selected = this.messageTemplates.find((template) => template.id === this.selectedTemplate);
            return selected;
        },
        selectedTemplatePlaceholders() {
            const content = this.selectedTemplatetTextContent.content || '';
            const regex = /{{(.*?)}}/g;
            const matches = [];
            let match;
            while ((match = regex.exec(content)) !== null) {
                matches.push(match[1].trim());
            }
            return matches;
        },
        // Computed property to get the updated content with placeholder values replaced
        updatedTemplateContent() {
            let content = this.selectedTemplatetTextContent.content || '';
            const placeholders = this.selectedTemplatePlaceholders;

            placeholders.forEach((placeholder) => {
                const value = this.placeholderValue[placeholder];
                const regex = new RegExp(`{{\\s*${placeholder}\\s*}}`, 'g');
                content = content.replace(regex, `<strong>${value || `{{${placeholder}}}`}</strong>`);
            });

            return content;
        },
        databaseAttributes() {
            return this.customAttributes.map(attribute => ({
                value: `${addDbPrefix(attribute.name)}`,
                text: attribute.name
            }));
        },
        attributeSource() {
            if (this.selectedTemplatetTextContent.type === 'header') {
                return this.headerAttributeSources;
            } else if (this.selectedTemplatetTextContent.type === 'body') {
                return this.bodyAttributeSources;
            }
            return {};
        },
        placeholderValue() {
            if (this.selectedTemplatetTextContent.type === 'header') {
                return this.headerPlaceholderValues;
            } else if (this.selectedTemplatetTextContent.type === 'body') {
                return this.bodyPlaceholderValues;
            }
            return {};
        }
    },
    methods: {
        ...mapActions(['setMessageTemplates', 'setSelectedTemplate', 'setBroadcastSelectedTemplate', 'setCustomAttributes']),
        selectTemplate(item) {
            this.selectedTemplate = item.id;
            this.setSelectedTemplate(item);
            this.selectedTemplateObject = item;
            this.initializePlaceholders();
        },
        initializePlaceholders() {
            this.selectedTemplatePlaceholders.forEach((placeholder) => {
                if (this.selectedTemplatetTextContent.type === 'header') {
                    this.$set(this.headerAttributeSources, placeholder, 'Custom');
                    this.$set(this.headerPlaceholderValues, placeholder, '');
                } else if (this.selectedTemplatetTextContent.type === 'body') {
                    this.$set(this.bodyAttributeSources, placeholder, 'Custom');
                    this.$set(this.bodyPlaceholderValues, placeholder, '');
                }
            });
        },
        savePlaceholderValues(){
            if(this.selectedTemplatetTextContent.type === "header"){
                this.headerContent = this.updatedTemplateContent;
            } else if(this.selectedTemplatetTextContent.type === "body"){
                this.bodyContent = this.updatedTemplateContent;
            }

            // console.log('Header Content:', this.headerContent);
            // console.log('Body Content:', this.bodyContent);
            console.log('Header Placeholder Values:', this.headerPlaceholderValues);
            console.log('Body Placeholder Values:', this.bodyPlaceholderValues);
        },
        saveSelectedTemplate() {
            const templateToSubmit = {
                'template': this.selectedTemplateObject, 
                'headerValues': this.headerPlaceholderValues,
                'bodyValues': this.bodyPlaceholderValues
            }

            console.log(templateToSubmit)
            this.setBroadcastSelectedTemplate(templateToSubmit);
        }
    },
    components: {
        ViewTemplate
    },
    mounted() {
        this.setMessageTemplates();
        this.setCustomAttributes();
    }
};
</script>

<style scoped>
.template-selector-container {
    font-size: 1rem;
    background-color: white;
    width: 60%;
    margin: 20px auto;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.template-table {
    margin-bottom: 20px;
}

.table-wrapper {
    max-height: 300px;
    overflow-y: auto;
}

.template-preview {
    margin-top: 10px;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 5px;
}

.placeholder-editing {
    margin-top: 20px;
}

.placeholder-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.placeholder-item label {
    margin-right: 10px;
    width: 150px;
}

.placeholder-item .b-form-select,
.placeholder-item .b-form-input {
    flex: 1;
}

.placeholder-item .b-button {
    margin-left: 10px;
}
</style>
