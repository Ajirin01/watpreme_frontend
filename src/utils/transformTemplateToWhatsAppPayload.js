// Function to transform template to WhatsApp payload
const transformTemplateToWhatsAppPayload = (templateData) => {
    console.log("$$$$$$$", templateData)
    const template = templateData.template;
    const headerValues = templateData.headerValues;
    const bodyValues = templateData.bodyValues;

    // Get header and body components
    const headerComponent = template.components.find(c => c.type === 'HEADER');
    const bodyComponent = template.components.find(c => c.type === 'BODY');

    // console.log(bodyComponent)

    // Replace header values
    let headerText = headerComponent.example.header_text;
    headerText = headerText.map((text, index) => {
        const placeholderKey = Object.keys(headerValues)[index];
        return headerValues[placeholderKey] || text;
    });

    // Replace body values
    // let bodyText = bodyComponent.text;
    // for (const [key, value] of Object.entries(bodyValues)) {
    //     bodyText = bodyText.replace(key, value);
    // }

    let bodyText = bodyComponent.example.body_text[0];
    bodyText = bodyText.map((text, index) => {
        const placeholderKey = Object.keys(bodyValues)[index];
        return bodyValues[placeholderKey] || text;
    });

    console.log("99999999999", bodyText)

    // Extract parameters from body text after replacement
    const bodyParameters = bodyText.map((text) => ({
        type: 'text',
        text: text
    }));

    return {
        messaging_product: 'whatsapp',
        to: '2347036998003',
        type: 'template',
        template: {
            name: template.name,
            language: {
                code: template.language
            },
            components: [
                {
                    type: 'header',
                    parameters: [
                        {
                            type: 'text',
                            text: headerText[0]
                        }
                    ]
                },
                {
                    type: 'body',
                    parameters: bodyParameters
                }
            ]
        }
    };
}

export default transformTemplateToWhatsAppPayload