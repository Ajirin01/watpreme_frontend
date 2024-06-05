const whatsappTransformData = (inputData) => {
  // return(extractVariables(inputData.bodyText))
  console.log(replaceVariablesWithIndices(inputData.bodyText));

  const bodyVariablesPair = replaceVariablesWithIndices(inputData.bodyText);
  const headerVariablesPair = replaceVariablesWithIndices(
    inputData.header.text,
  );

  const transformedData = {
    id: inputData.id,
    name: formatName(inputData.name),
    language: inputData.language,
    category: inputData.category,
    components: [],
  };

  // Add HEADER component
  if (inputData.header.type === "text") {
    transformedData.components.push({
      type: "HEADER",
      format: inputData.header.type?.toUpperCase(),
      text: headerVariablesPair.replacedText,
      example: {
        header_text: headerVariablesPair.variablesArray,
      },
    });
  } else if (inputData.header.type === "media") {
    transformedData.components.push({
      type: "HEADER",
      format: inputData.header.mediaType?.toUpperCase(),
      // text: inputData.header.text,
      example: {
        header_handle: [inputData.mediaUrl],
      },
    });
  }

  // Add BODY component
  transformedData.components.push({
    type: "BODY",
    text: bodyVariablesPair.replacedText,
    example: {
      body_text: [bodyVariablesPair.variablesArray],
    },
  });

  // Add FOOTER component
  transformedData.components.push({
    type: "FOOTER",
    text: inputData.footerText,
  });

  // Add BUTTONS component if buttons are present in the input data
  if (inputData.buttonType === "callToAction") {
    if (inputData.buttons && inputData.buttons.length > 0) {
      const buttons = inputData.buttons.map((button) => {
        if (button.type === "URL") {
          return {
            type: "URL",
            text: button.displayText,
            url: button.websiteUrl,
          };
        } else if (button.type === "PHONE_NUMBER") {
          return {
            type: "PHONE_NUMBER",
            text: button.displayText,
            phone_number: button.phoneNumber,
          };
        }
      });

      transformedData.components.push({
        type: "BUTTONS",
        buttons,
      });
    }
  } else if (inputData.buttonType === "QUICK_REPLY") {
    const buttons = inputData.buttons.map((button) => ({
      type: "QUICK_REPLY",
      text: button,
    }));
    transformedData.components.push({
      type: "BUTTONS",
      buttons,
    });
  }

  return transformedData;
};

function replaceVariablesWithIndices(text) {
  // Define a regular expression pattern to match placeholders like {{variable}}
  const placeholderPattern = /{{([^{}]+)}}/g;

  // Counter to track the current index
  let currentIndex = 1;

  // Array to store variables
  const variablesArray = [];

  // Replace placeholders in the text with their corresponding indices
  const replacedText = text?.replace(placeholderPattern, (_, variable) => {
    // Replace the variable with its index + 1
    const replacement = `{{${currentIndex}}}`;
    variablesArray.push(variable.trim());
    currentIndex++;
    return replacement;
  });

  // Return the replaced text and the array of variables
  return { replacedText, variablesArray };
}

function formatName(name) {
  // Convert the name to lowercase
  const lowercaseName = name?.toLowerCase();

  // Replace spaces with underscores
  const formattedName = lowercaseName.replace(/\s+/g, "_");

  return formattedName;
}

export default whatsappTransformData;
