<template>
    <div v-if="selectedTemplate">
      <div class="">
        
        <!-- Header -->
        <div class="modal-header">
          <h2>{{ selectedTemplate.name }}</h2>
        </div>
  
        <!-- Body -->
        <div class="modal-body">
          <!-- Header Component -->
          <div v-if="selectedTemplate.components && selectedTemplate.components.length > 0">
            <div v-for="(component, index) in selectedTemplate.components" :key="index">
              <div v-if="component.type === 'HEADER'">
                <img v-if="component.format === 'IMAGE'" :src="component.example.header_handle[0]" alt="Header Image" />
                <p v-else @click="handleSelectedContent(replaceIndicesWithVariables(component.text, component.example?.header_text, 'header'), 'header')"><b>{{ replaceIndicesWithVariables(component.text, component.example?.header_text, 'header') }}</b></p>
              </div>
            </div>
          </div>
          
          <!-- Body Component -->
          <div>
            <p v-if="selectedTemplate.components && selectedTemplate.components.length > 0">
              <span v-for="(component, index) in selectedTemplate.components" :key="index">
                <span v-if="component.type === 'BODY'" @click="handleSelectedContent(replaceIndicesWithVariables(component.text, component.example?.body_text, 'body'), 'body')">{{ replaceIndicesWithVariables(component.text, component.example?.body_text, 'body') }}</span>
              </span>
            </p>
          </div>
  
          <!-- Buttons Component -->
          <div v-if="selectedTemplate.components && selectedTemplate.components.length > 0">
            <div v-for="(component, index) in selectedTemplate.components" :key="index">
                <div v-if="component.type === 'BUTTONS'">
                    <div v-for="(button, buttonIndex) in component.buttons" :key="buttonIndex"><button class="btn btn-primary mt-2 form-control">{{ button.text }}</button></div>
                </div>
            </div>
          </div>
          
        </div>
  
        <!-- Footer Component -->
        <div class="modal-footer">
            <div v-if="selectedTemplate.components && selectedTemplate.components.length > 0">
                <p v-for="(component, index) in selectedTemplate.components" :key="index">
                    <span v-if="component.type === 'FOOTER'">{{ component.text }}</span>
                </p>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';

  export default {
    // props: {
    //   selectedTemplate: {
    //     type: Object,
    //     default: null
    //   }
    // },
    computed: {
        ...mapState(['selectedTemplate'])
    },
    methods: {
        ...mapActions(['setSelectedTemplateTextContent']),
        handleSelectedContent(content, type){
          this.setSelectedTemplateTextContent({content, type})
        },
        replaceIndicesWithVariables(text, variablesArray, type) {
            // Define a regular expression pattern to match placeholders like {{1}}
            const indexPattern = /{{(\d+)}}/g;
            var currentIndex = 1

            // Replace indices in the text with their corresponding variables
            const replacedText = text.replace(indexPattern, (_, index) => {
                // Get the variable from the array using the array index
                const variable = variablesArray[currentIndex-1];
                // console.log(variable)
                // If the variable exists, return it, otherwise return the original match
                if(variable !== undefined && type === 'body'){
                    return `{{${variable[index-1]}}}`
                }else if(variable !== undefined && type === 'header'){
                    return `{{${variable}}}`
                }else{
                    return `{{${index}}}`
                }
            });

            currentIndex++


            // Return the replaced text
            return replacedText;
        },
    }

  };
  </script>
  
  <style scoped>
  /* Modal styles */
  .modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
  }
  
  .modal-body {
    margin-top: 20px;
  }
  
  .modal-footer {
    margin-top: 20px;
    text-align: right;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  
  /* Additional styles for template components (adjust as needed) */
  .modal-body img {
    max-width: 100%;
  }
  </style>
  