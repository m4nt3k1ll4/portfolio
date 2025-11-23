/**
 * Utility Functions for Terminal Portfolio
 * Contains reusable functions following DRY and Single Responsibility Principle
 */

// ============================================
// Translation Helpers
// ============================================

/**
 * Get translated command text
 * @param {string} key - Translation key
 * @returns {string} Translated text or key if not found
 */
function getCmdT(key) {
  return (typeof t === 'function') ? t(key) : key;
}

/**
 * Get translation with fallback
 * @param {string} key - Translation key
 * @param {string} fallback - Fallback text
 * @returns {string} Translated text or fallback
 */
function getTrans(key, fallback = '') {
  const result = getCmdT(key);
  return result === key ? fallback : result;
}

// ============================================
// Validation Helpers
// ============================================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
function isValidEmail(email) {
  return email && email.includes('@') && email.includes('.');
}

/**
 * Validate required field
 * @param {string} value - Value to check
 * @param {string} fieldName - Field name for error message
 * @returns {object} {valid: boolean, error: string}
 */
function validateRequired(value, fieldName) {
  if (!value || !value.trim()) {
    return {
      valid: false,
      error: `❌ ${fieldName} ${getCmdT('cmd.sendContact.invalidEmail').split(' ')[0]}`
    };
  }
  return { valid: true };
}

/**
 * Validate contact form data
 * @param {object} data - {name, email, message}
 * @returns {object} {valid: boolean, errors: array}
 */
function validateContactForm(data) {
  const errors = [];
  
  const nameCheck = validateRequired(data.name, 'Name');
  if (!nameCheck.valid) errors.push(nameCheck.error);
  
  if (!isValidEmail(data.email)) {
    errors.push(`❌ ${getCmdT('cmd.sendContact.invalidEmail')}`);
  }
  
  const msgCheck = validateRequired(data.message, 'Message');
  if (!msgCheck.valid) errors.push(msgCheck.error);
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// ============================================
// Output Formatting Helpers
// ============================================

/**
 * Create a help section with category and items
 * @param {string} categoryName - Category name (with i18n key)
 * @param {string} icon - FontAwesome icon class
 * @param {array} items - Array of {cmd, desc, descKey}
 * @returns {string} HTML string
 */
function createHelpSection(categoryName, icon, items) {
  let html = `
  <div class="help-category">
    <i class="fas ${icon}"></i>
    <h3>${getCmdT(categoryName)}</h3>
  </div>
  <div class="command-list">`;
  
  items.forEach(item => {
    const desc = item.descKey ? getCmdT(item.descKey) : item.desc;
    html += `
    <div class="command-item">
      <span class="cmd">${item.cmd}</span>
      <span class="desc">${desc}</span>
    </div>`;
  });
  
  html += `
  </div>`;
  
  return html;
}

/**
 * Create a formatted info block
 * @param {string} label - Label text
 * @param {string} value - Value text
 * @param {string} labelClass - CSS class for label (default: 'success')
 * @returns {string} HTML string
 */
function createInfoBlock(label, value, labelClass = 'success') {
  return `<span class="${labelClass}">${label}</span> ${value}`;
}

/**
 * Create a section header
 * @param {string} title - Title (with i18n key)
 * @param {string} icon - FontAwesome icon class
 * @returns {string} HTML string
 */
function createSectionHeader(titleKey, icon = 'fa-info-circle') {
  return `
<div class="section-header">
  <i class="fas ${icon}"></i>
  <h2>${getCmdT(titleKey)}</h2>
</div>`;
}

// ============================================
// Form Helpers
// ============================================

/**
 * Create form input element with stop propagation
 * @param {string} type - Input type (text, email, etc)
 * @param {string} id - Element ID
 * @param {string} placeholder - Placeholder text
 * @param {object} styles - Additional inline styles
 * @returns {object} {element, setupListeners}
 */
function createFormInput(type, id, placeholder, styles = {}) {
  const baseStyles = {
    width: '100%',
    padding: '8px',
    background: '#1a1a1a',
    color: '#00ff00',
    border: '1px solid #00ff00',
    borderRadius: '3px',
    fontFamily: "'Courier New', monospace",
    pointerEvents: 'auto',
    cursor: 'text'
  };
  
  const finalStyles = { ...baseStyles, ...styles };
  const styleStr = Object.entries(finalStyles)
    .map(([key, val]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${val}`)
    .join('; ');
  
  const tag = type === 'textarea' ? 'textarea' : 'input';
  const typeAttr = type === 'textarea' ? '' : `type="${type}"`;
  
  return {
    html: `<${tag} ${typeAttr} id="${id}" placeholder="${placeholder}" style="${styleStr};"></${tag}>`,
    id
  };
}

/**
 * Setup event propagation stoppers on form elements
 * @param {array} elements - Array of DOM elements
 */
function stopPropagationOn(elements) {
  elements.forEach(el => {
    ['click', 'mousedown', 'mouseup'].forEach(eventType => {
      el.addEventListener(eventType, (e) => e.stopPropagation());
    });
  });
}

// ============================================
// File System Helpers
// ============================================

/**
 * Check if path is valid
 * @param {string} path - Path to validate
 * @returns {boolean} True if path exists
 */
function isValidPath(path) {
  return portfolioData && portfolioData.fileSystem && portfolioData.fileSystem[path];
}

/**
 * Get file content with translation support
 * @param {string} filePath - Path to file
 * @returns {string} File content
 */
function getFileContentSafe(filePath) {
  try {
    return portfolioData.getFileContent(filePath);
  } catch (error) {
    return `${getCmdT('error.fileNotFound')}: ${filePath}`;
  }
}

// ============================================
// Google Forms Integration
// ============================================

/**
 * Send data to Google Forms
 * @param {object} data - {name, email, message}
 * @returns {Promise} Fetch promise
 */
async function sendToGoogleForms(data) {
  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScBzd01tfoUaV8RsqRFLXeg0UP-r-uI3ZT7N4q5kiLopsmAIQ/formResponse';
  const NAME_ID = 'entry.135050974';
  const EMAIL_ID = 'entry.976128578';
  const MESSAGE_ID = 'entry.1391685641';
  
  const formData = new URLSearchParams();
  formData.append(NAME_ID, data.name);
  formData.append(EMAIL_ID, data.email);
  formData.append(MESSAGE_ID, data.message);
  
  return fetch(GOOGLE_FORM_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: formData,
  });
}

// ============================================
// DOM Helpers
// ============================================

/**
 * Safely get element by ID
 * @param {string} id - Element ID
 * @returns {Element|null} Element or null
 */
function getElement(id) {
  return document.getElementById(id);
}

/**
 * Set HTML content safely
 * @param {Element} element - DOM element
 * @param {string} html - HTML content
 */
function setContent(element, html) {
  if (element) {
    element.innerHTML = html;
  }
}

/**
 * Add CSS class safely
 * @param {Element} element - DOM element
 * @param {string} className - Class name
 */
function addClass(element, className) {
  if (element) {
    element.classList.add(className);
  }
}

/**
 * Remove CSS class safely
 * @param {Element} element - DOM element
 * @param {string} className - Class name
 */
function removeClass(element, className) {
  if (element) {
    element.classList.remove(className);
  }
}

// ============================================
// Array/String Helpers
// ============================================

/**
 * Join array into HTML list items
 * @param {array} items - Items to join
 * @param {function} formatter - Optional formatter function
 * @returns {string} HTML string
 */
function createList(items, formatter = (item) => item) {
  return items.map(item => `<div class="list-item">${formatter(item)}</div>`).join('');
}

/**
 * Parse command arguments
 * @param {string} input - Full command input
 * @returns {object} {command, args}
 */
function parseCommand(input) {
  const parts = input.trim().split(/\s+/);
  const command = parts[0];
  const args = parts.slice(1);
  return { command, args };
}
