import Vue from "vue";

// add mutations
export const addContact = (state, contacts) => {
  contacts.forEach((contact) => {
    state.contacts.push(contact);
  });
};
export const addCustomAttribute = (state, attribute) => {
  state.customAttributes.push(attribute);
};
export const addTopic = (state, topic) => {
  state.topics.push(topic);
};
export const addTeam = (state, team) => {
  state.teams.push(team);
};
export const addOperator = (state, operator) => {
  state.operators.push(operator);
};
export const addContactAttribute = (state, attribute) => {
  state.selectedContact.attributes.push(attribute);
};
export const addTag = (state, tag) => {
  state.tags.push(tag);
};
export const addMessageTemplate = (state, template) => {
  state.messageTemplates.push(template);
};
export const addBroadcast = (state, broadcast) => {
  state.broadcasts.push(broadcast);
};


// update mutations
export const updateContact = (state, contact) => {
  const index = state.contacts.findIndex(
    (_contact) => _contact.id === contact.id,
  );
  if (index !== -1) {
    // Use Vue.set to ensure reactivity
    Vue.set(state.contacts, index, contact);
  }
};
export const updateContactAttribute = (state, attribute) => {
  const index = state.selectedContact.attributes.findIndex(
    (attr) => attr.id === attribute.id,
  );
  if (index !== -1) {
    // Use Vue.set to ensure reactivity
    Vue.set(state.selectedContact.attributes, index, attribute);
  }
};
export const updateTopic = (state, topic) => {
  const index = state.topics.findIndex(
    (_topic) => _topic.id === topic.id,
  );
  if (index !== -1) {
    // Use Vue.set to ensure reactivity
    Vue.set(state.topics, index, topic);
  }
};
export const updateTeam = (state, team) => {
  const index = state.teams.findIndex(
    (_team) => _team.id === team.id,
  );
  if (index !== -1) {
    // Use Vue.set to ensure reactivity
    Vue.set(state.teams, index, team);
  }
};
export const updateOperator = (state, operator) => {
  const index = state.operators.findIndex(
    (_operator) => _operator.id === operator.id,
  );
  if (index !== -1) {
    // Use Vue.set to ensure reactivity
    Vue.set(state.operators, index, operator);
  }
};
export const updateCustomAttribute = (state, attribute) => {
  const index = state.customAttributes.findIndex(
    (attr) => attr.id === attribute.id,
  );
  if (index !== -1) {
    // Use Vue.set to ensure reactivity
    Vue.set(state.customAttributes, index, attribute);
  }
};
export const updateTemplate = (state, template) => {
  const index = state.messageTemplates.findIndex(
    (_template) => _template.id === template.id,
  );
  if (index !== -1) {
    // Use Vue.set to ensure reactivity
    Vue.set(state.messageTemplates, index, template);
  }
};
export const updateBroadcast = (state, broadcast) => {
  const index = state.broadcasts.findIndex(
    (_broadcast) => _broadcast.id === broadcast.id,
  );
  if (index !== -1) {
    // Use Vue.set to ensure reactivity
    Vue.set(state.broadcasts, index, broadcast);
  }
};


// delete mutations
export const deleteContactAttribute = (state, id) => {
  const index = state.selectedContact.attributes.findIndex(
    (attribute) => attribute.id === id,
  );
  if (index !== -1) {
    state.selectedContact.attributes.splice(index, 1);
  }
};
export const deleteTopic = (state, id) => {
  const index = state.topics.findIndex(
    (topic) => topic.id === id,
  );
  if (index !== -1) {
    state.topics.splice(index, 1);
  }
};
export const deleteTeam = (state, id) => {
  const index = state.teams.findIndex(
    (team) => team.id === id,
  );
  if (index !== -1) {
    state.teams.splice(index, 1);
  }
};
export const deleteOperator = (state, id) => {
  const index = state.operators.findIndex(
    (operator) => operator.id === id,
  );
  if (index !== -1) {
    state.operators.splice(index, 1);
  }
};
export const deleteCustomAttribute = (state, id) => {
  const index = state.customAttributes.findIndex(
    (attribute) => attribute.id === id,
  );
  if (index !== -1) {
    state.customAttributes.splice(index, 1);
  }
};
export const deleteContact = (state, id) => {
  const index = state.contacts.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    state.contacts.splice(index, 1);
  }
};
export const deleteBroadcast = (state, id) => {
  const index = state.broadcasts.findIndex((broadcast) => broadcast.id === id);
  if (index !== -1) {
    state.broadcasts.splice(index, 1);
  }
};


// set mutations
export const setSelectedContact = (state, contact) => {
  state.selectedContact = contact;
};
export const setSelectedAttribute = (state, attribute) => {
  state.selectedAttribute = attribute;
};
export const setSelectedTopic = (state, topic) => {
  state.selectedTopic = topic;
};
export const setSelectedTemplate = (state, template) => {
  state.selectedTemplate = template;
};
export const setSelectedBusiness = (state, business) => {
  state.selectedBusiness = business;
};
export const setSelectedBusinessProfile = (state, businessProfile) => {
  state.selectedBusinessProfile = businessProfile;
};
export const setSelectedGeneralSetting = (state, generalSetting) => {
  state.selectedGeneralSetting = generalSetting;
};
export const setSelectedTeam = (state, team) => {
  state.selectedTeam = team;
};
export const setSelectedOperator = (state, operator) => {
  state.selectedOperator = operator;
};
export const setSelectedBroadcast = (state, broadcast) => {
  state.selectedBroadcast = broadcast;
};

export const setMessageTemplates = (state, templates) => {
  state.messageTemplates = templates;
};
export const setTeams = (state, teams) => {
  state.teams = teams;
};
export const setOperators = (state, operators) => {
  state.operators = operators;
};
export const setContacts = (state, contacts) => {
  state.contacts = contacts;
  // console.log(state)
};
export const setCustomAttributes = (state, attributes) => {
  state.customAttributes = attributes;
  // console.log(state)
};
export const setTopics = (state, topics) => {
  state.topics = topics;
  // console.log(state)
};
export const setBusiness = (state, business) => {
  state.business = business;
};
export const setBusinessProfile = (state, businessProfile) => {
  state.businessProfile = businessProfile;
};
export const setGeneralSetting = (state, generalSetting) => {
  state.generalSetting = generalSetting;
};
export const setBroadcasts = (state, broadcasts) => {
  state.broadcasts = broadcasts;
};

export const setBroadcastRecipients = (state, recipients) => {
  state.broadcastRecipients = recipients;
};

export const setBroadcastMetrics = (state, metrics) => {
  state.metrics = metrics;
};

export const deleteBroadcastRecipients = (state, recipients) => {
  state.broadcastRecipients = recipients;
};

export const deleteBroadcastMetrics = (state) => {
  state.metrics = {};
};

// remove mutations
export const removeTag = (state, index) => {
  state.tags.splice(index, 1);
};

export const setBroadcastAddableContacts = (state, contacts) => {
  state.broadcastAddableContacts = contacts
}

export const setBroadcastSelectedTemplate = (state, template) => {
  state.broadcastSelectedTemplate = template
}

export const setSelectedTemplateTextContent = (state, content) => {
  state.selectedTemplatetTextContent = content
}