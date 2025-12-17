import DOMPurify from 'dompurify';

export const cleanText = (s) => (s ?? "").trim();

export const cleanFreeText = (s) => 
    DOMPurify.sanitize((s ?? "").trim(), {ALLOWED_TAGS: [], ALLOWED_ATTR: []}); 
