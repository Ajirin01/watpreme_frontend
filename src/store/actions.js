import axios from "axios";

// api calls start here
const BASE_URL = "http://localhost:8000/api/";
// Contacts
export const fetchContactsAction = ({ commit }) => {
  // Make an HTTP GET request to fetch contacts
  axios
    .get(BASE_URL + "contacts")
    .then((response) => {
      // If the request is successful, commit the contacts to the store
      commit("setContacts", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error fetching contacts:", error);
    });
};
export const postContactAction = ({ commit }, payload) => {
  // Make an HTTP POST request to the API endpoint
  axios
    .post(BASE_URL + "contacts", payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("addContact", response.data);
      console.log("Contact posted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error posting contact attribute:", error);
    });
};
export const deleteContactAction = ({ commit }, id) => {
  // Make an HTTP POST request to the API endpoint
  axios
    .delete(BASE_URL + "contacts/" + id)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("deleteContact", id);
      console.log("Contact deleted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error posting contact attribute:", error);
    });
};
export const updateContactAction = ({ commit }, payload) => {
  // Make an HTTP POST request to the API endpoint
  axios
    .put(BASE_URL + "contacts/" + payload.id, payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("updateContact", payload.id);
      console.log("Contact updated successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error posting contact attribute:", error);
    });
};


// Custom Attributes
export const fetchCustomAttributesAction = ({ commit }) => {
  return new Promise((resolve, reject) => {
      // Fetch custom attributes
      axios.get(BASE_URL + "custom-attributes")
          .then(response => {
              commit('setCustomAttributes', response.data);
              resolve();
          })
          .catch(error => {
              console.error(error);
              reject();
          });
  });
};
export const postContactAttributeAction = ({ commit }, payload) => {
  // Make an HTTP POST request to the API endpoint
  axios
    .post(BASE_URL + "contact-attributes", payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("addContactAttribute", response.data);
      console.log("Contact attribute posted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error posting contact attribute:", error);
    });
};
export const updateContactAttributeAction = ({ commit }, payload) => {
  console.log(payload);
  // Make an HTTP POST request to the API endpoint
  axios
    .put(BASE_URL + "contact-attributes/" + payload.id, payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("updateContactAttribute", response.data);
      console.log("Contact attribute updated successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error posting contact attribute:", error);
    });
};
export const updateCustomAttributeAction = ({ commit }, payload) => {
  console.log(payload);
  // Make an HTTP POST request to the API endpoint
  axios
    .put(BASE_URL + "custom-attributes/" + payload.id, payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("updateCustomAttribute", response.data);
      console.log("Custom attribute updated successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error posting contact attribute:", error);
    });
};
export const deleteContactAttributeAction = ({ commit }, id) => {
  // Make an HTTP POST request to the API endpoint
  axios
    .delete(BASE_URL + "contact-attributes/" + id)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("deleteContactAttribute", id);
      console.log("Contact attribute deleted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error posting contact attribute:", error);
    });
};
export const postCustomAttributeAction = ({ commit }, payload) => {
  // Add a new custom attribute to the state
  axios
    .post(BASE_URL + "custom-attributes", payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("addCustomAttribute", response.data);

      console.log("Attribute added successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error posting contact attribute:", error);
    });
};
export const deleteCustomAttributeAction = ({ commit }, attribute) => {
  // Add a new custom attribute to the state
  axios
    .delete(BASE_URL + "custom-attributes/"+ attribute)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("deleteCustomAttribute", attribute);

      console.log("Attribute deleted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error delete custom attribute:", error);
    });
};


// Topics
export const postTopicAction = ({ commit }, payload) => {
  // Make an HTTP POST request to the API endpoint
  axios
    .post(BASE_URL + "topics", payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("addTopic", response.data);
      console.log("Topic posted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error posting topic attribute:", error);
    });
};
export const fetchTopicsAction = ({ commit }) => {
  // Make an HTTP GET request to fetch contacts
  axios
    .get(BASE_URL + "topics")
    .then((response) => {
      // console.log(response.data)
      // If the request is successful, commit the contacts to the store
      commit("setTopics", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error fetching topics:", error);
    });
};
export const updateTopicAction = ({ commit }, payload) => {
  console.log(payload);
  // Make an HTTP POST request to the API endpoint
  axios
    .put(BASE_URL + "topics/" + payload.id, payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("updateTopic", response.data);
      console.log("Topic updated successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error updating topic:", error);
    });
};
export const deleteTopicAction = ({ commit }, id) => {
  // Make an HTTP POST request to the API endpoint
  axios
    .delete(BASE_URL + "topics/" + id)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("deleteTopic", id);
      console.log("Topic deleted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error deleting topic:", error);
    });
};


//Messages Template
export const fetchMessageTemplatesAction = ({ commit }) => {
  // Make an HTTP GET request to fetch contacts
  axios
    .get(BASE_URL + "template-messages")
    .then((response) => {
      console.log(response.data.data);
      // If the request is successful, commit the contacts to the store
      commit("setMessageTemplates", response.data.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error fetching contacts:", error);
    });
};
export const postMessageTemplateAction = ({ commit }, payload) => {
  // Make an HTTP POST request to the API endpoint
  axios
    .post(BASE_URL + "template-messages", payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("addMessageTemplate", response.data);
      console.log("Template posted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error posting contact attribute:", error);
    });
};
export const uploadTemplateToWhatsApp = ({ commit }, payload) => {
  console.log("payload", payload);

  axios
    .get(BASE_URL + "upload-template/" + payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("updateTemplate", response.data);

      console.log("Template updated successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error posting contact attribute:", error);
    });
};
export const syncTemplatesAction = ({ commit }) => {
  // Make an HTTP GET request to fetch contacts
  axios
    .get(BASE_URL + "sync-templates")
    .then((response) => {
      console.log(response.data.data);
      // If the request is successful, commit the contacts to the store
      commit("setMessageTemplates", response.data.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error fetching contacts:", error);
    });
};
export const updateMessageTemplateAction = ({ commit }, payload) => {
  console.log(payload);
  // Make an HTTP POST request to the API endpoint
  axios
    .put(BASE_URL + "upload-update-template/" + payload.id, payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("updateTemplate", response.data);
      console.log("Template updated successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error posting contact attribute:", error);
    });
}


//business
export const postBusinessAction = ({ commit }, payload) => {
  // Make an HTTP POST request to the API endpoint
  axios
    .post(BASE_URL + "businesses", payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("setBusiness", response.data);
      console.log("Business posted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error posting topic attribute:", error);
    });
};
export const fetchBusinessAction = ({ commit }) => {
  // Make an HTTP GET request to fetch contacts
  axios
    .get(BASE_URL + "businesses")
    .then((response) => {
      // console.log(response.data)
      // If the request is successful, commit the contacts to the store
      commit("setBusiness", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error fetching business:", error);
    });
};
export const updateBusinessAction = ({ commit }, payload) => {
  console.log(payload);
  // Make an HTTP POST request to the API endpoint
  axios
    .put(BASE_URL + "businesses/" + payload.id, payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("setBusiness", response.data);
      console.log("Business updated successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error updating topic:", error);
    });
};
export const deleteBusinessAction = ({ commit }, id) => {
  // Make an HTTP POST request to the API endpoint
  axios
    .delete(BASE_URL + "businesses/" + id)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("setBusiness", []);
      console.log("Business deleted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error deleting business:", error);
    });
};


//business profile
export const postBusinessProfileAction = ({ commit }, payload) => {
  // Make an HTTP POST request to the API endpoint
  axios
    .post(BASE_URL + "business-profiles", payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("setBusinessProfile", response.data);
      console.log("Business profile posted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error posting business profile:", error);
    });
};
export const fetchBusinessProfileAction = ({ commit }) => {
  // Make an HTTP GET request to fetch contacts
  axios
    .get(BASE_URL + "business-profiles", {id: 1})
    .then((response) => {
      console.log(response.data[0])
      // If the request is successful, commit the contacts to the store
      commit("setBusinessProfile", response.data[0]);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error fetching business profile:", error);
    });
};
export const updateBusinessProfileAction = ({ commit }, payload) => {
  console.log(payload);
  // Make an HTTP POST request to the API endpoint
  axios
    .put(BASE_URL + "business-profiles/" + payload.id, payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("setBusinessProfile", response.data);
      console.log("Business profile updated successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error updating topic:", error);
    });
};
export const deleteBusinessProfileAction = ({ commit }, id) => {
  // Make an HTTP POST request to the API endpoint
  axios
    .delete(BASE_URL + "business-profiles/" + id)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("setBusinessProfile", []);
      console.log("Business deleted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error deleting business profile:", error);
    });
};


//general settings
export const postGeneralSettingAction = ({ commit }, payload) => {
  // Make an HTTP POST request to the API endpoint
  axios
    .post(BASE_URL + "general-settings", payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("setGeneralSetting", response.data);
      console.log("Setting posted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error posting Setting:", error);
    });
};
export const fetchGeneralSettingAction = ({ commit }) => {
  // Make an HTTP GET request to fetch contacts
  axios
    .post(BASE_URL + "query-general-settings", {business_id: 1})
    .then((response) => {
      console.log(response.data[0])
      // If the request is successful, commit the contacts to the store
      commit("setGeneralSetting", response.data[0]);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error fetching Setting:", error);
    });
};
export const updateGeneralSettingAction = ({ commit }, payload) => {
  console.log(payload);
  // Make an HTTP POST request to the API endpoint
  axios
    .put(BASE_URL + "general-settings/" + payload.id, payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("setGeneralSetting", response.data);
      console.log("Setting updated successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error updating topic:", error);
    });
};
export const deleteGeneralSettingAction = ({ commit }, id) => {
  // Make an HTTP POST request to the API endpoint
  axios
    .delete(BASE_URL + "general-settings/" + id)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("setGeneralSetting", []);
      console.log("Setting deleted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error deleting Setting:", error);
    });
};

//teams
export const postTeamAction = ({ commit }, payload) => {
  // Make an HTTP POST request to the API endpoint
  axios
    .post(BASE_URL + "teams", payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("addTeam", response.data);
      console.log("Team posted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error posting team:", error);
    });
};
export const fetchTeamAction = ({ commit }) => {
  // Make an HTTP GET request to fetch contacts
  axios
    .post(BASE_URL + "query-teams", {business_id: 1})
    .then((response) => {
      console.log(response.data)
      // If the request is successful, commit the contacts to the store
      commit("setTeams", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error fetching teams:", error);
    });
};
export const updateTeamAction = ({ commit }, payload) => {
  console.log(payload);
  // Make an HTTP POST request to the API endpoint
  axios
    .put(BASE_URL + "teams/" + payload.id, payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("updateTeam", response.data);
      console.log("Team updated successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error updating team:", error);
    });
};
export const deleteTeamAction = ({ commit }, id) => {
  // Make an HTTP POST request to the API endpoint
  axios
    .delete(BASE_URL + "teams/" + id)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("deleteTeam", id);
      console.log("Team deleted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error deleting team:", error);
    });
};

//operators
export const postOperatorAction = ({ commit }, payload) => {
  console.log(payload)
  // Make an HTTP POST request to the API endpoint
  axios
    .post(BASE_URL + "operators", payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("addOperator", response.data);
      console.log("Operator posted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error posting operator:", error);
    });
};
export const fetchOperatorsAction = ({ commit }) => {
  // Make an HTTP GET request to fetch contacts
  axios
    .post(BASE_URL + "query-operators", {business_id: 1})
    .then((response) => {
      console.log(response.data)
      // If the request is successful, commit the contacts to the store
      commit("setOperators", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error fetching operators:", error);
    });
};
export const updateOperatorAction = ({ commit }, payload) => {
  console.log(payload);
  // Make an HTTP POST request to the API endpoint
  axios
    .put(BASE_URL + "operators/" + payload.id, payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("updateOperator", response.data);
      console.log("Operator updated successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error updating operator:", error);
    });
};
export const deleteOperatorAction = ({ commit }, id) => {
  // Make an HTTP POST request to the API endpoint
  axios
    .delete(BASE_URL + "operators/" + id)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("deleteOperator", id);
      console.log("Operator deleted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error deleting operator:", error);
    });
};

//broadcasts
export const postBroadcastAction = ({ commit }, payload) => {
  console.log(payload)
  // Make an HTTP POST request to the API endpoint
  axios
    .post(BASE_URL + "broadcasts", payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("addBroadcast", response.data);
      console.log("Broadcast posted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error posting broadcast:", error);
    });
};
export const fetchBroadcastsAction = ({ commit }) => {
  // Make an HTTP GET request to fetch contacts
  axios
    .post(BASE_URL + "query-broadcasts", {business_id: 1})
    .then((response) => {
      console.log(response.data)
      // If the request is successful, commit the contacts to the store
      commit("setBroadcasts", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error fetching broadcasts:", error);
    });
};
export const updateBroadcastAction = ({ commit }, payload) => {
  console.log(payload);
  // Make an HTTP POST request to the API endpoint
  axios
    .put(BASE_URL + "broadcasts/" + payload.id, payload)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("updateBroadcast", response.data);
      console.log("Broadcast updated successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error updating broadcast:", error);
    });
};
export const deleteBroadcastAction = ({ commit }, id) => {
  // Make an HTTP POST request to the API endpoint
  axios
    .delete(BASE_URL + "broadcasts/" + id)
    .then((response) => {
      // If the request is successful, you can commit the response data to the store if needed
      commit("deleteBroadcast", id);
      console.log("Broadcast deleted successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors, e.g., log them or show an error message
      console.error("Error deleting broadcast:", error);
    });
};

// api calls end here

export const addContactAction = ({ commit }, contact) => {
  // Add a new contact to the state
  commit("addContact", contact);
};

export const addTagsAction = ({ commit }, tag) => {
  // Add a new contact to the state
  commit("addTag", tag);
};

export const removeTagsAction = ({ commit }, tag) => {
  // Add a new contact to the state
  commit("removeTag", tag);
};

export const setSelectedContactAction = ({ commit }, contact) => {
  commit("setSelectedContact", contact);
};

export const setSelectedTemplateAction = ({ commit }, template) => {
  commit("setSelectedTemplate", template);
};

export const setSelectedAttributeAction = ({ commit }, attribute) => {
  commit("setSelectedAttribute", attribute);
};

export const setSelectedTopicAction = ({ commit }, topic) => {
  commit("setSelectedTopic", topic);
};

export const setSelectedTeamAction = ({ commit }, team) => {
  commit("setSelectedTeam", team);
};

export const setSelectedOperatorAction = ({ commit }, operator) => {
  commit("setSelectedOperator", operator);
};

export const setSelectedBusinessAction = ({ commit }, business) => {
  commit("setSelectedBusiness", business);
};

export const setSelectedBusinessProfileAction = ({ commit }, businessProfile) => {
  commit("setSelectedBusinessProfile", businessProfile);
};

export const setSelectedGeneralSettingAction = ({ commit }, generalSetting) => {
  commit("setSelectedGeneralSetting", generalSetting);
};

export const setBroadcastRecipientsAction = ({ commit, state }, recipients) => {
  const updatedRecipients = [...state.broadcastRecipients];

  recipients.forEach(newRecipient => {
    const index = updatedRecipients.findIndex(r => r.id === newRecipient.id);
      if (index !== -1) {
        // Update existing recipient
        updatedRecipients[index] = { ...updatedRecipients[index], ...newRecipient };
      } else {
        // Add new recipient
        updatedRecipients.push(newRecipient);
      }
    });
  commit("setBroadcastRecipients", updatedRecipients);
};

export const deleteBroadcastRecipientsAction = ({ commit }, recipients) => {
  commit("deleteBroadcastRecipients", recipients);
};

export const setBroadcastAddableRecipientsAction = ({ commit }, recipients) => {
  commit("setBroadcastAddableContacts", recipients);
};

export const setBroadcastSelectedTemplateAction = ({ commit }, template) => {
  commit("setBroadcastSelectedTemplate", template);
};

export const setSelectedTemplateTextContentAction = ({ commit }, payload) => {
  console.log(payload)
  commit("setSelectedTemplateTextContent", payload);
};


