/**
 * Helper functions for the app
 */

// Format timestamp to readable time
export const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Format timestamp to readable date
  export const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  
  // Truncate text with ellipsis if it exceeds max length
  export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  // Generate a random ID
  export const generateId = (prefix = '') => {
    return `${prefix}${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };
  
  // Format number of likes/comments (e.g. 1000 -> 1K)
  export const formatCount = (count) => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
  };
  
  // Validate email
  export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Validation functions for forms
  export const validators = {
    required: (value) => (value ? null : 'This field is required'),
    minLength: (min) => (value) => 
      value && value.length >= min ? null : `Must be at least ${min} characters`,
    maxLength: (max) => (value) => 
      value && value.length <= max ? null : `Must be at most ${max} characters`,
    email: (value) => isValidEmail(value) ? null : 'Invalid email address',
  };
  
  // Deep clone an object
  export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  
  // Debounce function for performance optimization
  export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };