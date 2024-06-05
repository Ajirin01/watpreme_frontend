import {  DB_PREFIX, WHATSAPP_PREFIX } from '@/constants/prefices'

export const  addDbPrefix = (attribute) => {
    return `${DB_PREFIX}${attribute}`;
}

export const  addWhatsappPrefix = (attribute) => {
    return `${WHATSAPP_PREFIX}${attribute}`;
}

export const  isDbAttribute = (attribute) => {
    return attribute.startsWith(DB_PREFIX);
}

export const  isWhatsappAttribute = (attribute) => {
    return attribute.startsWith(WHATSAPP_PREFIX);
}

export const stripPrefix = (attribute) => {
    if (isDbAttribute(attribute)) {
        return attribute.replace(DB_PREFIX, "");
    } else if (isWhatsappAttribute(attribute)) {
        return attribute.replace(WHATSAPP_PREFIX, "");
    }
    return attribute;
}

